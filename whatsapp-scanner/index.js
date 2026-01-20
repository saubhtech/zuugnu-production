import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import Pino from "pino";
import qrcode from "qrcode-terminal";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  host: "88.222.241.228",
  user: "saubhtech",
  password: "ManiKiMala1954",
  database: "saubh",
  port: 5432,
  ssl: false,
});


// Generate password
function generatePassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let pass = "";
  for (let i = 0; i < 4; i++)
    pass += chars[Math.floor(Math.random() * chars.length)];
  return pass;
}

let sock; // Global socket

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");
  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    auth: state,
    logger: Pino({ level: "silent" }),
    browser: ["LocalScanner", "Chrome", "120"],
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("\n📱 Scan this QR (LOCAL BACKUP)\n");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("✅ WhatsApp connected (LOCAL)");
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut;
      console.log("❌ Disconnected. Reconnect:", shouldReconnect);
      if (shouldReconnect) start();
    }
  });

  // MESSAGE LISTENER
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;

    for (const msg of messages) {
      if (msg.message?.protocolMessage) continue;
      if (!msg.message) continue;
      if (msg.key.fromMe) continue;

      const senderPhone = msg.key.remoteJid.split("@")[0];

      let text = "";
      const msgContent = msg.message;

      if (msgContent?.conversation) {
        text = msgContent.conversation;
      } else if (msgContent?.extendedTextMessage?.text) {
        text = msgContent.extendedTextMessage.text;
      }

      text = text.trim();
      if (!text) continue;

      const lower = text.toLowerCase();

      console.log(`💬 Message from ${senderPhone}: "${text}"`);

      // 🟢 LOGIN COMMAND — always generate new password
      if (lower === "login" || lower === "signin" || lower === "log") {
        try {
          const user = await pool.query(
            `SELECT * FROM whatsapp_users WHERE phone = $1 AND is_active = true`,
            [senderPhone]
          );

          if (user.rows.length === 0) {
            await sock.sendMessage(msg.key.remoteJid, {
              text: '❌ You are not registered.\nSend: "Register Your Name"'
            });
            continue;
          }

          const newPass = generatePassword();

          await pool.query(
            `UPDATE whatsapp_users SET password = $1, last_login = NOW() WHERE phone = $2`,
            [newPass, senderPhone]
          );

          await sock.sendMessage(msg.key.remoteJid, {
            text:
              `👋 Hello ${user.rows[0].name}\n\n` +
              `🔐 New Password: *${newPass}*\n\n` +
              `🌐 Login: https://crm.saubh.in\n` +
              `📱 User ID: ${senderPhone}`
          });

          console.log(`🔁 New password issued for ${user.rows[0].name}`);
        } catch (err) {
          console.error("❌ Login error:", err);
        }
        continue;
      }

      // 🟡 REGISTER COMMAND — keep original behaviour
      if (lower.startsWith("register ")) {
        const name = text.replace(/register\s+/i, "").trim();

        if (!name || name.length < 2) {
          await sock.sendMessage(msg.key.remoteJid, {
            text: "👤 Send like: Register Yash Singh"
          });
          continue;
        }

        try {
          const existing = await pool.query(
            `SELECT * FROM whatsapp_users WHERE phone = $1`,
            [senderPhone]
          );

          if (existing.rows.length > 0) {
            await sock.sendMessage(msg.key.remoteJid, {
              text:
                `Hello ${existing.rows[0].name}! 👋\n\n` +
                `You are already registered.\n\n` +
                `🧾 User ID: ${senderPhone}\n` +
                `🔐 Password: ${existing.rows[0].password}\n\n` +
                `Login at: https://crm.saubh.in`
            });
            continue;
          }

          const pass = generatePassword();

          await pool.query(
            `INSERT INTO whatsapp_users (phone, name, password, is_active, is_admin, created_at)
             VALUES ($1, $2, $3, true, false, NOW())`,
            [senderPhone, name, pass]
          );

          await sock.sendMessage(msg.key.remoteJid, {
            text:
              `Welcome ${name}! 🎉\n\n` +
              `🧾 User ID: ${senderPhone}\n` +
              `🔐 Password: ${pass}\n\n` +
              `Login at: https://crm.saubh.in`
          });

          console.log(`🟢 Registered: ${name}`);
        } catch (err) {
          console.error("❌ Register error:", err);
        }
      }
    }
  });
}

start();
