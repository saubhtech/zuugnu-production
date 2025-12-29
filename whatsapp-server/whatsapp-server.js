// whatsapp-server.js - FIXED FOR ERROR 515
import { Browsers } from "@whiskeysockets/baileys";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
} from "@whiskeysockets/baileys";
import Pino from "pino";
import qrcode from "qrcode";
import pkg from "pg";
const { Pool } = pkg;
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
});

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Yk123@yk",
  database: "zuugnu",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("connect", () => console.log("✅ Database connected"));
pool.on("error", (err) => console.error("❌ Database error:", err));

const sessions = new Map();
const connectionAttempts = new Map(); // Track connection attempts
const logger = Pino({ level: "silent" });

// Ensure auth directories exist
function ensureAuthDir(sessionId) {
  const authDir = path.join(__dirname, `auth_${sessionId}`);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }
  return authDir;
}

// Clear auth state (for error 515)
function clearAuthState(sessionId) {
  const authDir = path.join(__dirname, `auth_${sessionId}`);
  try {
    if (fs.existsSync(authDir)) {
      // Remove entire directory
      fs.rmSync(authDir, { recursive: true, force: true });
      console.log(`🗑️  Completely cleared auth for ${sessionId}`);
      
      // Also delete any .json files in root
      const rootFiles = fs.readdirSync(__dirname);
      rootFiles.forEach(file => {
        if (file.startsWith(`auth_${sessionId}`) || 
            file.includes(sessionId) && (file.endsWith('.json') || file.endsWith('.store'))) {
          fs.unlinkSync(path.join(__dirname, file));
        }
      });
    }
  } catch (error) {
    console.error(`Failed to clear auth for ${sessionId}:`, error);
  }
}

// Check if session can connect (rate limiting)
function canAttemptConnection(sessionId) {
  const attempts = connectionAttempts.get(sessionId) || {
    count: 0,
    lastAttempt: 0,
    got515: false,
    got515Time: 0,
  };

  const now = Date.now();
  const timeSinceLastAttempt = now - attempts.lastAttempt;

  // If error 515 occurred, require 10 minute wait (increased from 5)
  if (attempts.got515) {
    const timeSince515 = now - attempts.got515Time;
    if (timeSince515 < 10 * 60 * 1000) {
      const remainingTime = Math.ceil((10 * 60 * 1000 - timeSince515) / 1000);
      console.log(
        `⏳ ${sessionId}: Must wait ${remainingTime}s after error 515`
      );
      return {
        allowed: false,
        waitTime: remainingTime,
        reason: "error_515_cooldown",
      };
    } else {
      // Clear 515 flag after cooldown period
      attempts.got515 = false;
      attempts.got515Time = 0;
      attempts.count = 0;
      connectionAttempts.set(sessionId, attempts);
    }
  }

  // Normal rate limiting: max 2 attempts per 2 hours (more conservative)
  if (attempts.count >= 2 && timeSinceLastAttempt < 2 * 60 * 60 * 1000) {
    const remainingTime = Math.ceil(
      (2 * 60 * 60 * 1000 - timeSinceLastAttempt) / 1000
    );
    console.log(`⏳ ${sessionId}: Rate limited. Wait ${remainingTime}s`);
    return {
      allowed: false,
      waitTime: remainingTime,
      reason: "rate_limit",
    };
  }

  // Reset counter if cooldown period has passed
  if (timeSinceLastAttempt > 2 * 60 * 60 * 1000) {
    attempts.count = 0;
  }

  return { allowed: true };
}

// Record connection attempt
function recordConnectionAttempt(sessionId, got515 = false) {
  const attempts = connectionAttempts.get(sessionId) || {
    count: 0,
    lastAttempt: 0,
    got515: false,
    got515Time: 0,
  };

  attempts.count += 1;
  attempts.lastAttempt = Date.now();

  if (got515) {
    attempts.got515 = true;
    attempts.got515Time = Date.now();
    console.log(
      `🚨 ${sessionId}: Error 515 recorded at ${new Date().toISOString()}`
    );
  }

  connectionAttempts.set(sessionId, attempts);

  // Log current state
  console.log(
    `📊 ${sessionId} attempts: ${attempts.count}, last: ${new Date(
      attempts.lastAttempt
    ).toISOString()}`
  );
}

// Database helper functions (same as before)
async function saveContact(phone, name, profilePic = null) {
  try {
    const query = `
      INSERT INTO contacts (phone, name, profile_pic)
      VALUES ($1, $2, $3)
      ON CONFLICT (phone) DO UPDATE
      SET name = EXCLUDED.name, profile_pic = EXCLUDED.profile_pic
      RETURNING id
    `;
    const result = await pool.query(query, [phone, name || phone, profilePic]);
    return result.rows[0]?.id;
  } catch (error) {
    console.error("Error saving contact:", error);
    return null;
  }
}

async function saveSession(sessionId, name, phone, status) {
  try {
    const query = `
      INSERT INTO whatsapp_sessions (id, name, phone, status, connected_at, last_active)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      ON CONFLICT (id) DO UPDATE
      SET phone = EXCLUDED.phone, 
          status = EXCLUDED.status, 
          connected_at = CASE WHEN EXCLUDED.status = 'connected' THEN NOW() ELSE whatsapp_sessions.connected_at END,
          last_active = NOW()
    `;
    await pool.query(query, [sessionId, name, phone, status]);
  } catch (error) {
    console.error("Error saving session:", error);
  }
}

async function saveConversation(
  sessionId,
  contactId,
  chatId,
  lastMessage,
  isGroup = false
) {
  try {
    const query = `
      INSERT INTO conversations (session_id, contact_id, chat_id, last_message, last_message_time, is_group)
      VALUES ($1, $2, $3, $4, NOW(), $5)
      ON CONFLICT (chat_id) DO UPDATE
      SET last_message = EXCLUDED.last_message, 
          last_message_time = NOW(),
          unread_count = conversations.unread_count + 1
      RETURNING id
    `;
    const result = await pool.query(query, [
      sessionId,
      contactId,
      chatId,
      lastMessage,
      isGroup,
    ]);
    return result.rows[0]?.id;
  } catch (error) {
    console.error("Error saving conversation:", error);
    return null;
  }
}

async function saveMessage(
  conversationId,
  messageId,
  senderPhone,
  text,
  isFromMe,
  timestamp
) {
  try {
    const query = `
      INSERT INTO messages (conversation_id, message_id, sender_phone, text, is_from_me, timestamp, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (message_id) DO NOTHING
    `;
    await pool.query(query, [
      conversationId,
      messageId,
      senderPhone,
      text,
      isFromMe,
      timestamp,
      isFromMe ? "read" : "sent",
    ]);
  } catch (error) {
    console.error("Error saving message:", error);
  }
}

// CREATE WHATSAPP SESSION - FIXED CONFIGURATION
// CREATE WHATSAPP SESSION - COMPREHENSIVE 515 FIX
async function createSession(sessionId, sessionName = "Session", socket = null) {
  try {
    console.log(`📱 Creating session: ${sessionId}`);
    
    // ENHANCED: Check if we had 515 recently with longer cooldown
    if (connectionAttempts.has(sessionId)) {
      const attempts = connectionAttempts.get(sessionId);
      if (attempts.got515) {
        const timeSince515 = Date.now() - attempts.got515Time;
        // 30 MINUTE cooldown for 515 errors
        if (timeSince515 < 30 * 60 * 1000) {
          const waitSeconds = Math.ceil((30 * 60 * 1000 - timeSince515) / 1000);
          const waitMinutes = Math.ceil(waitSeconds / 60);
          
          socket?.emit("error_515", {
            sessionId,
            message: `IP flagged by WhatsApp. Wait ${waitMinutes} minutes.`,
            waitTime: waitSeconds,
            severity: "high"
          });
          throw new Error(`IP flagged. Wait ${waitMinutes} minutes.`);
        }
      }
    }

    // Check normal rate limiting
    const canConnect = canAttemptConnection(sessionId);
    if (!canConnect.allowed) {
      socket?.emit("session_error", {
        sessionId,
        error: `Rate limited. Please wait ${canConnect.waitTime} seconds.`,
        waitTime: canConnect.waitTime,
        code: 429
      });
      throw new Error(`Rate limited. Please wait ${canConnect.waitTime} seconds.`);
    }

    // Record attempt BEFORE any delay
    recordConnectionAttempt(sessionId);
    
    // CRITICAL: Clear ALL old auth data first
    clearAuthState(sessionId);
    
    // Create fresh auth directory
    ensureAuthDir(sessionId);
    
    // Add HUMAN-LIKE delay before connecting (5-8 seconds)
    console.log(`⏳ ${sessionId}: Simulating human connection delay...`);
    const humanDelay = 5000 + Math.random() * 3000;
    await new Promise(resolve => setTimeout(resolve, humanDelay));
    
    // Get auth state AFTER delay
    const { state, saveCreds } = await useMultiFileAuthState(`./auth_${sessionId}`);
    const { version } = await fetchLatestBaileysVersion();

    console.log(`Using WA version ${version.join(".")}`);

    // Create logger - SILENT but required
    const logger = Pino({ 
      level: "silent",
      transport: {
        target: 'pino-pretty',
        options: { colorize: false }
      }
    });
    
    // ============ CONFIGURED WHATSAPP SOCKET ============
    const sock = makeWASocket({
      version,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, logger),
      },
      
      // CRITICAL: Use MOBILE browser fingerprint
      browser: ["Android", "Chrome", "10.0.0"], // Mobile iOS WhatsApp
      
      // IMPORTANT: Tell WhatsApp this is mobile
      mobile: false, // Keep false for WhatsApp Web but use mobile browser string
      
      // Connection settings optimized to avoid detection
      connectTimeoutMs: 90000, // Longer timeout
      keepAliveIntervalMs: 20000, // Less frequent keepalive
      defaultQueryTimeoutMs: 60000,
      
      // Event settings to reduce detection
      emitOwnEvents: false, // Don't emit unnecessary events
      markOnlineOnConnect: false, // Don't appear online immediately
      syncFullHistory: false, // Don't sync old messages
      fireInitQueries: false, // Don't query immediately
      
      // Aggressiveness reduction
      retryRequestDelayMs: 10000, // Longer retry delay
      maxMsgRetryCount: 1, // Fewer retries
      maxCommitRetries: 1, // Fewer transaction retries
      
      // Resource management
      generateHighQualityLinkPreview: false,
      mediaCache: { maxItems: 10 },
      
      // Message handling
      patchMessageBeforeSending: (message) => {
        // Clean metadata
        if (message?.reactionMessage?.key?.participant) {
          delete message.reactionMessage.key.participant;
        }
        return message;
      },
      
      // Ignore unnecessary traffic
      shouldIgnoreJid: (jid) => {
        return jid?.endsWith('@broadcast') || 
               jid?.endsWith('@newsletter') ||
               jid?.includes('status');
      },
      
      // Required
      getMessage: async () => undefined,
      logger: logger,
    });
    // ============ END CONFIGURATION ============

    // Handle credentials update
    sock.ev.on("creds.update", saveCreds);

    // ENHANCED connection handler with delays
    sock.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect, qr, isNewLogin } = update;
      
      console.log(`🔗 ${sessionId} connection update:`, { 
        connection, 
        qr: !!qr,
        isNewLogin 
      });
      
      // ============ QR CODE HANDLING WITH DELAY ============
      if (qr) {
        console.log(`🔲 QR Code generated for ${sessionId}`);
        
        try {
          // CRITICAL: Delay QR emission (simulates network latency)
          await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
          
          const qrDataURL = await qrcode.toDataURL(qr);
          console.log(`✅ QR generated (${qrDataURL.length} chars)`);
          
          if (socket?.connected) {
            socket.emit("qr", { 
              sessionId, 
              qr: qrDataURL,
              expiresIn: 35000, // 35 seconds
              message: "Scan within 35 seconds"
            });
          }
          
          io.to(sessionId).emit("qr", { 
            sessionId, 
            qr: qrDataURL,
            expiresIn: 35000
          });
          
          // Auto-expire QR after timeout
          setTimeout(() => {
            if (sessions.has(sessionId) && connection !== "open") {
              console.log(`⏰ ${sessionId}: QR expired`);
              socket?.emit("qr_expired", { sessionId });
            }
          }, 35000);
          
        } catch (err) {
          console.error("❌ QR generation error:", err);
        }
      }
      
      // ============ SUCCESSFUL CONNECTION ============
      if (connection === "open") {
        console.log(`✅ ${sessionId} connected successfully!`);
        
        // Small delay before emitting success
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const user = sock.user;
        const phone = user?.id?.split(":")[0]?.replace("+", "") || "Unknown";
        
        await saveSession(sessionId, sessionName, phone, "connected");
        sessions.set(sessionId, sock);
        
        // Reset connection attempts on success
        connectionAttempts.delete(sessionId);

        // Prepare session data
        const sessionData = {
          sessionId,
          phone,
          name: user?.name || sessionName,
          status: "connected",
          connectedAt: new Date().toISOString(),
          platform: "whatsapp-web"
        };
        
        // Emit success events with delay between them
        if (socket?.connected) {
          socket.emit("connected", sessionData);
          await new Promise(resolve => setTimeout(resolve, 500));
          socket.emit("session_ready", sessionData);
        }
        
        io.to(sessionId).emit("session_connected", sessionData);
        setTimeout(() => {
          io.to(sessionId).emit("session_ready", sessionData);
        }, 1000);
      }
      
      // ============ CONNECTION CLOSED ============
      if (connection === "close") {
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        const error = lastDisconnect?.error;
        const reason = DisconnectReason[statusCode] || "Unknown";
        
        console.log(`❌ ${sessionId} disconnected. Code: ${statusCode}, Reason: ${reason}`);
        
        sessions.delete(sessionId);
        await saveSession(sessionId, sessionName, null, "disconnected");
        
        io.to(sessionId).emit("session_disconnected", {
          sessionId,
          status: "disconnected",
          reason,
          statusCode,
          timestamp: new Date().toISOString()
        });
        
        // ============ ERROR 515 HANDLING ============
        if (statusCode === 515) {
          console.log(`🚨 ${sessionId}: Error 515 detected! Clearing auth...`);
          
          // Enhanced 515 handling with longer cooldown
          recordConnectionAttempt(sessionId, true);
          
          // Clear auth immediately
          clearAuthState(sessionId);
          
          // Wait before notifying
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Progressive cooldown: longer wait for repeated 515s
          const attempts = connectionAttempts.get(sessionId);
          const cooldownMinutes = Math.min(30 + (attempts.count * 10), 120); // 30min to 2hrs
          
          if (socket?.connected) {
            socket.emit("error_515", {
              sessionId,
              message: `WhatsApp rejected connection (Error 515). Your IP may be flagged. Wait ${cooldownMinutes} minutes or change network.`,
              waitTime: cooldownMinutes * 60,
              cooldownMinutes,
              severity: "critical",
              recommendation: "Switch to mobile hotspot or wait 24 hours"
            });
          }
          
          // Also emit to room
          io.to(sessionId).emit("session:error", {
            sessionId,
            error: "whatsapp_rejected",
            code: 515,
            message: `WhatsApp rejected connection. IP flagged for ${cooldownMinutes} minutes.`,
            retryAfter: Date.now() + (cooldownMinutes * 60 * 1000)
          });
        }
        
        // Handle timeout (408)
        else if (statusCode === 408) {
          console.log(`⏰ ${sessionId}: Connection timed out`);
          io.to(sessionId).emit("session:error", {
            sessionId,
            error: "connection_timeout",
            code: 408,
            message: "QR code expired. Please try again.",
            retryAfter: Date.now() + (2 * 60 * 1000) // 2 minutes
          });
        }
      }
      
      // ============ CONNECTING STATE ============
      if (connection === "connecting") {
        console.log(`🔄 ${sessionId}: Connecting to WhatsApp...`);
        if (socket?.connected) {
          socket.emit("session:status", {
            sessionId,
            status: "connecting",
            message: "Establishing secure connection..."
          });
        }
      }
    });
    
    return sock;
  } catch (error) {
    console.error(`❌ Error creating session ${sessionId}:`, error);
    
    // Enhanced error reporting
    if (socket?.connected) {
      socket.emit("session_error", {
        sessionId,
        error: error.message,
        code: error.status || 500,
        timestamp: new Date().toISOString()
      });
    }
    
    // Cleanup on error
    if (error.message.includes("515") || error.message.includes("flagged")) {
      clearAuthState(sessionId);
    }
    
    throw error;
  }
}
// Process incoming message
async function processIncomingMessage(sock, sessionId, msg) {
  try {
    if (!msg.message) return;

    const chatId = msg.key.remoteJid;
    const messageId = msg.key.id;
    const fromMe = msg.key.fromMe;
    const senderPhone = chatId.split("@")[0];
    const timestamp = msg.messageTimestamp
      ? new Date(msg.messageTimestamp * 1000)
      : new Date();

    let messageText = "";
    const messageContent = msg.message;

    if (messageContent?.conversation) {
      messageText = messageContent.conversation;
    } else if (messageContent?.extendedTextMessage?.text) {
      messageText = messageContent.extendedTextMessage.text;
    } else if (messageContent?.imageMessage?.caption) {
      messageText = messageContent.imageMessage.caption || "[Image]";
    } else if (messageContent?.videoMessage?.caption) {
      messageText = messageContent.videoMessage.caption || "[Video]";
    } else if (messageContent?.documentMessage?.caption) {
      messageText = messageContent.documentMessage.caption || "[Document]";
    } else if (messageContent?.audioMessage) {
      messageText = "[Audio]";
    } else if (messageContent?.stickerMessage) {
      messageText = "[Sticker]";
    } else {
      messageText = "[Media]";
    }

    console.log(
      `💬 ${sessionId} - ${
        fromMe ? "Sent" : "Received"
      } from ${senderPhone}: ${messageText.substring(0, 50)}...`
    );

    if (fromMe) return;

    const contactName = msg.pushName || senderPhone;
    const contactId = await saveContact(senderPhone, contactName);

    const isGroup = chatId.includes("@g.us");
    const conversationId = await saveConversation(
      sessionId,
      contactId,
      chatId,
      messageText,
      isGroup
    );

    if (conversationId) {
      await saveMessage(
        conversationId,
        messageId,
        senderPhone,
        messageText,
        fromMe,
        timestamp
      );

      io.to(sessionId).emit("new_message", {
        sessionId,
        chatId,
        messageId,
        text: messageText,
        senderPhone,
        senderName: contactName,
        fromMe,
        timestamp: timestamp.toISOString(),
        conversationId,
        isGroup,
      });
    }
  } catch (error) {
    console.error("Error processing message:", error);
  }
}

function setupMessageListener(sock, sessionId) {
  // Already handled in createSession
}

// Socket.IO handlers
io.on("connection", (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  socket.on("join_session", (sessionId) => {
    socket.join(sessionId);
    console.log(`📱 Client ${socket.id} joined session: ${sessionId}`);

    const sock = sessions.get(sessionId);
    if (sock) {
      socket.emit("session_status", {
        sessionId,
        status: "connected",
        phone: sock.user?.id?.split(":")[0]?.replace("+", "") || "Unknown",
      });
    }
  });

  socket.on("start_session", async ({ sessionId, sessionName }) => {
    try {
      console.log(`🚀 Starting session ${sessionId} for client ${socket.id}`);

      if (sessions.has(sessionId)) {
        const existingSock = sessions.get(sessionId);
        socket.emit("session_status", {
          sessionId,
          status: "connected",
          phone:
            existingSock.user?.id?.split(":")[0]?.replace("+", "") || "Unknown",
        });
        return;
      }

      await createSession(sessionId, sessionName || "Session", socket);
      socket.join(sessionId);
    } catch (error) {
      console.error(`Failed to start session ${sessionId}:`, error);
      socket.emit("session_error", {
        sessionId,
        error: error.message,
      });
    }
  });

  socket.on("send_message", async ({ sessionId, to, message }) => {
    try {
      const sock = sessions.get(sessionId);
      if (!sock) {
        socket.emit("error", {
          sessionId,
          error: "Session not connected. Please connect first.",
        });
        return;
      }

      const jid = to.includes("@") ? to : `${to}@s.whatsapp.net`;
      const sent = await sock.sendMessage(jid, { text: message });

      console.log(`📤 ${sessionId} sent message to ${to}`);

      socket.emit("message_sent", {
        sessionId,
        messageId: sent.key.id,
        to,
        timestamp: new Date().toISOString(),
      });

      io.to(sessionId).emit("message_sent", {
        sessionId,
        messageId: sent.key.id,
        to,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("error", {
        sessionId,
        error: error.message,
      });
    }
  });

  socket.on("get_conversations", async (sessionId) => {
    try {
      const result = await pool.query(
        `
        SELECT 
          c.id,
          c.chat_id,
          c.last_message,
          c.last_message_time,
          c.unread_count,
          c.is_group,
          ct.name,
          ct.phone,
          ct.profile_pic
        FROM conversations c
        LEFT JOIN contacts ct ON c.contact_id = ct.id
        WHERE c.session_id = $1
        ORDER BY c.last_message_time DESC NULLS LAST
        LIMIT 100
      `,
        [sessionId]
      );

      socket.emit("conversations_list", {
        sessionId,
        conversations: result.rows,
      });
    } catch (error) {
      console.error("Error getting conversations:", error);
      socket.emit("error", {
        sessionId,
        error: error.message,
      });
    }
  });

  socket.on("get_messages", async ({ sessionId, conversationId }) => {
    try {
      const result = await pool.query(
        `
        SELECT 
          m.id,
          m.message_id,
          m.sender_phone,
          m.text,
          m.is_from_me,
          m.timestamp,
          m.status,
          c.name as sender_name
        FROM messages m
        LEFT JOIN contacts c ON m.sender_phone = c.phone
        WHERE m.conversation_id = $1
        ORDER BY m.timestamp ASC
        LIMIT 100
      `,
        [conversationId]
      );

      socket.emit("messages_list", {
        sessionId,
        conversationId,
        messages: result.rows,
      });
    } catch (error) {
      console.error("Error getting messages:", error);
      socket.emit("error", {
        sessionId,
        error: error.message,
      });
    }
  });

  socket.on("disconnect_session", async (sessionId) => {
    try {
      const sock = sessions.get(sessionId);
      if (sock) {
        await sock.logout();
        sessions.delete(sessionId);
      }

      await saveSession(sessionId, null, null, "disconnected");

      socket.emit("session_disconnected", { sessionId });
      io.to(sessionId).emit("session_disconnected", { sessionId });
    } catch (error) {
      console.error("Error disconnecting session:", error);
      socket.emit("error", { sessionId, error: error.message });
    }
  });

  socket.on("disconnect", () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

// API Endpoints (same as before)
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    activeSessions: sessions.size,
    uptime: process.uptime(),
  });
});

app.get("/api/sessions", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, phone, status, last_active, created_at
      FROM whatsapp_sessions
      ORDER BY created_at DESC
      LIMIT 50
    `);
    res.json({ success: true, sessions: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/connect", async (req, res) => {
  try {
    const { sessionId, sessionName } = req.body;
    if (!sessionId) {
      return res
        .status(400)
        .json({ success: false, error: "Session ID required" });
    }

    res.json({
      success: true,
      sessionId,
      message: "Use WebSocket to connect. Endpoint: ws://localhost:3001",
      ws_url: "ws://localhost:3001",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/disconnect", async (req, res) => {
  try {
    const { sessionId } = req.body;
    const sock = sessions.get(sessionId);

    if (sock) {
      await sock.logout();
      sessions.delete(sessionId);
    }

    await pool.query(
      `UPDATE whatsapp_sessions SET status = 'disconnected' WHERE id = $1`,
      [sessionId]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`
╔═══════════════════════════════════════════╗
║   🚀 WhatsApp Server v4.0 - ERROR 515 FIX║
║   📡 Port: ${PORT}                          ║
║   📍 Host: 0.0.0.0                       ║
║   🔌 WebSocket: Ready                    ║
║   💾 PostgreSQL: Active                  ║
║   ⚡ Baileys: v7.0.0-rc.9                ║
║   ✅ Fixed Error 515 + Rate Limiting     ║
╚═══════════════════════════════════════════╝
  `);
  console.log(`\n📱 Open: http://localhost:3000/dashboard/sessions`);
  console.log(`🔗 WebSocket: ws://localhost:${PORT}`);
  console.log(`🩺 Health: http://localhost:${PORT}/api/health\n`);
});
