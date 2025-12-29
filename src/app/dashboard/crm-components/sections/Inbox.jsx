"use client";

import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export default function Inbox() {
  const [activeSession, setActiveSession] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState({});

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize
  useEffect(() => {
    // Get active session from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdFromUrl = urlParams.get("session");

    if (sessionIdFromUrl) {
      console.log("📱 Loading session from URL:", sessionIdFromUrl);
      loadSession(sessionIdFromUrl);
    } else {
      // Try to get from localStorage
      const sessionData = localStorage.getItem("activeSession");
      if (sessionData) {
        try {
          const session = JSON.parse(sessionData);
          console.log("📱 Loading session from localStorage:", session);
          setActiveSession(session);
        } catch (error) {
          console.error("Failed to parse session data:", error);
          // Redirect to sessions page if no valid session
          window.location.href = "/dashboard/sessions";
        }
      } else {
        // No session found, redirect to sessions page
        window.location.href = "/dashboard/sessions";
      }
    }
  }, []);

  // Load session details
  const loadSession = async (sessionId) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/session/${sessionId}/status`
      );
      const data = await res.json();
      if (data.success && data.status === "connected") {
        setActiveSession({
          id: sessionId,
          name: data.name || sessionId,
          phone: data.phone,
          status: data.status,
        });
        localStorage.setItem("activeSessionId", sessionId);
      }
    } catch (error) {
      console.error("Failed to load session:", error);
    }
  };

  // Initialize WebSocket connection
  const initializeSocket = () => {
    socketRef.current = io("http://localhost:3001", {
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Connected to WebSocket server");
      if (activeSession?.id) {
        socketRef.current.emit("join_session", activeSession.id);
      }
    });

    socketRef.current.on("new_message", (data) => {
      console.log("📨 New message received:", data);

      // Update conversations list
      setConversations((prev) => {
        const updated = prev.map((conv) =>
          conv.chat_id === data.chatId
            ? {
                ...conv,
                last_message: data.text,
                last_message_time: data.timestamp,
                unread_count: (conv.unread_count || 0) + 1,
              }
            : conv
        );

        // If conversation doesn't exist, fetch updated list
        if (!updated.find((c) => c.chat_id === data.chatId)) {
          loadConversations();
        }

        return updated;
      });

      // Add message to current chat if it matches
      if (selectedConversation?.chat_id === data.chatId) {
        setMessages((prev) => [
          ...prev,
          {
            id: data.messageId,
            text: data.text,
            sender_phone: data.senderPhone,
            sender_name: data.senderName,
            is_from_me: data.fromMe,
            timestamp: data.timestamp,
            status: "received",
          },
        ]);

        // Mark as read
        markAsRead(selectedConversation.id);
      }
    });

    socketRef.current.on("message_sent", (data) => {
      console.log("✅ Message sent:", data);
      // Update message status if needed
    });

    socketRef.current.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  };

  // Load conversations when session is available
  useEffect(() => {
    if (!activeSession?.id) return;

    // Join session room
    if (socketRef.current) {
      socketRef.current.emit("join_session", activeSession.id);
    }

    loadConversations();
  }, [activeSession]);

  // Load conversations from database
  const loadConversations = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3001/api/conversations?sessionId=${activeSession.id}`
      );
      const data = await res.json();

      if (data.success) {
        const convs = data.conversations || [];
        setConversations(convs);
        setFilteredConversations(convs);

        // Calculate unread counts
        const counts = {};
        convs.forEach((conv) => {
          counts[conv.id] = conv.unread_count || 0;
        });
        setUnreadCounts(counts);
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load messages for selected conversation
  const loadMessages = async (conversation) => {
    setSelectedConversation(conversation);

    try {
      const res = await fetch(
        `http://localhost:3001/api/messages?conversationId=${conversation.id}`
      );
      const data = await res.json();

      if (data.success) {
        setMessages(data.messages || []);

        // Mark conversation as read
        if (conversation.unread_count > 0) {
          markAsRead(conversation.id);
        }
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  // Mark conversation as read
  const markAsRead = async (conversationId) => {
    try {
      // Update local state
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === conversationId ? { ...conv, unread_count: 0 } : conv
        )
      );

      setUnreadCounts((prev) => ({ ...prev, [conversationId]: 0 }));

      // TODO: Update in database via API
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !activeSession) return;

    setSending(true);

    try {
      // Send via WebSocket
      if (socketRef.current) {
        socketRef.current.emit("send_message", {
          sessionId: activeSession.id,
          to: selectedConversation.phone,
          message: newMessage,
        });
      }

      // Also send via HTTP API as backup
      const res = await fetch("http://localhost:3001/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: activeSession.id,
          to: selectedConversation.phone,
          message: newMessage,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Add message to local state immediately
        const tempMessage = {
          id: `temp_${Date.now()}`,
          text: newMessage,
          sender_phone: activeSession.phone,
          sender_name: "You",
          is_from_me: true,
          timestamp: new Date().toISOString(),
          status: "sending",
        };

        setMessages((prev) => [...prev, tempMessage]);
        setNewMessage("");

        // Update conversation last message
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === selectedConversation.id
              ? {
                  ...conv,
                  last_message: newMessage,
                  last_message_time: new Date().toISOString(),
                }
              : conv
          )
        );

        // Update message status when confirmed
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === tempMessage.id
                ? { ...msg, status: "sent", id: data.messageId }
                : msg
            )
          );
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      alert(`Error sending message: ${error.message}`);
    } finally {
      setSending(false);
    }
  };

  // Send file/attachment
  const sendAttachment = (file) => {
    if (!file) return;

    // For now, just send as text message mentioning file
    const message = `📎 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    setNewMessage(message);
  };

  // Search conversations
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredConversations(conversations);
      return;
    }

    const filtered = conversations.filter(
      (conv) =>
        conv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.phone?.includes(searchQuery) ||
        conv.last_message?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredConversations(filtered);
  }, [searchQuery, conversations]);

  // Format date/time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!activeSession) {
    return (
      <div style={styles.noSession}>
        <div style={styles.noSessionIcon}>📱</div>
        <h2>No WhatsApp Session Selected</h2>
        <p>Please go to Sessions and connect a WhatsApp account first</p>
        <button
          style={styles.backButton}
          onClick={() => (window.location.href = "/dashboard/sessions")}
        >
          Go to Sessions
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Profile Header */}
        <div style={styles.profileHeader}>
          <div style={styles.profileAvatar}>
            {activeSession.phone?.charAt(0) || "W"}
          </div>
          <div style={styles.profileInfo}>
            <div style={styles.profileName}>
              {activeSession.name || "WhatsApp"}
            </div>
            <div style={styles.profileStatus}>
              <span style={styles.statusDot}></span>
              Connected to {activeSession.phone || "WhatsApp"}
            </div>
          </div>
          <div style={styles.sidebarActions}>
            <button style={styles.iconButton} title="Status">
              <span style={styles.icon}>💬</span>
            </button>
            <button style={styles.iconButton} title="New chat">
              <span style={styles.icon}>✏️</span>
            </button>
            <button style={styles.iconButton} title="Menu">
              <span style={styles.icon}>⋮</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={styles.searchContainer}>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search or start new chat"
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Conversations List */}
        <div style={styles.conversationsList}>
          {loading ? (
            <div style={styles.loading}>Loading conversations...</div>
          ) : filteredConversations.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>💬</div>
              <p>No conversations yet</p>
              <p style={styles.emptySubtext}>
                Start a new chat from the menu above
              </p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                style={{
                  ...styles.conversationItem,
                  ...(selectedConversation?.id === conv.id
                    ? styles.conversationSelected
                    : {}),
                }}
                onClick={() => loadMessages(conv)}
              >
                <div style={styles.conversationAvatar}>
                  {conv.name?.charAt(0) || conv.phone?.charAt(0) || "?"}
                  {unreadCounts[conv.id] > 0 && (
                    <div style={styles.unreadBadge}>
                      {unreadCounts[conv.id] > 9 ? "9+" : unreadCounts[conv.id]}
                    </div>
                  )}
                </div>
                <div style={styles.conversationContent}>
                  <div style={styles.conversationHeader}>
                    <div style={styles.conversationName}>
                      {conv.name || conv.phone}
                    </div>
                    <div style={styles.conversationTime}>
                      {formatTime(conv.last_message_time)}
                    </div>
                  </div>
                  <div style={styles.conversationPreview}>
                    <span style={styles.previewText}>
                      {conv.last_message || "No messages yet"}
                    </span>
                    {conv.unread_count > 0 && (
                      <div style={styles.unreadIndicator}></div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={styles.chatArea}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div style={styles.chatHeader}>
              <div style={styles.chatHeaderInfo}>
                <div style={styles.chatAvatar}>
                  {selectedConversation.name?.charAt(0) ||
                    selectedConversation.phone?.charAt(0) ||
                    "?"}
                </div>
                <div>
                  <div style={styles.chatName}>
                    {selectedConversation.name || selectedConversation.phone}
                  </div>
                  <div style={styles.chatStatus}>
                    {selectedConversation.phone}
                  </div>
                </div>
              </div>
              <div style={styles.chatActions}>
                <button style={styles.chatActionButton} title="Video call">
                  <span style={styles.actionIcon}>📹</span>
                </button>
                <button style={styles.chatActionButton} title="Audio call">
                  <span style={styles.actionIcon}>📞</span>
                </button>
                <button style={styles.chatActionButton} title="Search">
                  <span style={styles.actionIcon}>🔍</span>
                </button>
                <button style={styles.chatActionButton} title="Menu">
                  <span style={styles.actionIcon}>⋮</span>
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div style={styles.messagesContainer}>
              {messages.length === 0 ? (
                <div style={styles.noMessages}>
                  <div style={styles.noMessagesIcon}>💬</div>
                  <p>No messages yet</p>
                  <p style={styles.noMessagesSubtext}>
                    Send your first message to start the conversation
                  </p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={msg.id || index}
                    style={{
                      ...styles.messageWrapper,
                      justifyContent: msg.is_from_me
                        ? "flex-end"
                        : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        ...styles.messageBubble,
                        ...(msg.is_from_me
                          ? styles.messageSent
                          : styles.messageReceived),
                      }}
                    >
                      <div style={styles.messageText}>{msg.text}</div>
                      <div style={styles.messageMeta}>
                        <span style={styles.messageTime}>
                          {formatTime(msg.timestamp)}
                        </span>
                        {msg.is_from_me && (
                          <span style={styles.messageStatus}>
                            {msg.status === "sending"
                              ? "🕐"
                              : msg.status === "sent"
                              ? "✓"
                              : msg.status === "delivered"
                              ? "✓✓"
                              : msg.status === "read"
                              ? "✓✓🔵"
                              : "✓"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div style={styles.inputContainer}>
              <div style={styles.inputActions}>
                <button
                  style={styles.inputActionButton}
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach file"
                >
                  <span style={styles.inputActionIcon}>📎</span>
                </button>
                <button style={styles.inputActionButton} title="Emoji">
                  <span style={styles.inputActionIcon}>😊</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => sendAttachment(e.target.files[0])}
                />
              </div>
              <div style={styles.inputWrapper}>
                <textarea
                  style={styles.messageInput}
                  placeholder="Type a message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows={1}
                />
              </div>
              <button
                style={{
                  ...styles.sendButton,
                  ...(!newMessage.trim() && styles.sendButtonDisabled),
                }}
                onClick={sendMessage}
                disabled={!newMessage.trim() || sending}
              >
                {sending ? "🕐" : "📤"}
              </button>
            </div>
          </>
        ) : (
          <div style={styles.noChatSelected}>
            <div style={styles.welcomeIcon}>💬</div>
            <h2>Welcome to WhatsApp CRM</h2>
            <p>Select a conversation from the sidebar to start messaging</p>
            <div style={styles.welcomeTips}>
              <div style={styles.tip}>
                <span style={styles.tipIcon}>📱</span>
                <div>
                  <strong>Real WhatsApp Messages</strong>
                  <p>Send and receive real WhatsApp messages</p>
                </div>
              </div>
              <div style={styles.tip}>
                <span style={styles.tipIcon}>💾</span>
                <div>
                  <strong>Database Storage</strong>
                  <p>All messages stored in PostgreSQL</p>
                </div>
              </div>
              <div style={styles.tip}>
                <span style={styles.tipIcon}>⚡</span>
                <div>
                  <strong>Real-time Updates</strong>
                  <p>Instant message delivery and notifications</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message-enter {
          animation: fadeIn 0.3s ease;
        }
      `}</style>
    </div>
  );
}

// Styles object
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  // Sidebar styles
  sidebar: {
    width: "400px",
    backgroundColor: "white",
    borderRight: "1px solid #e0e0e0",
    display: "flex",
    flexDirection: "column",
  },

  profileHeader: {
    display: "flex",
    alignItems: "center",
    padding: "10px 16px",
    backgroundColor: "#f0f2f5",
    borderBottom: "1px solid #e0e0e0",
    height: "60px",
  },

  profileAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#00a884",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },

  profileInfo: {
    flex: 1,
    marginLeft: "15px",
  },

  profileName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111b21",
  },

  profileStatus: {
    fontSize: "12px",
    color: "#667781",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#00a884",
  },

  sidebarActions: {
    display: "flex",
    gap: "10px",
  },

  iconButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    color: "#54656f",
    padding: "8px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
  },

  iconButtonHover: {
    backgroundColor: "#f5f6f6",
  },

  searchContainer: {
    padding: "10px 16px",
    backgroundColor: "white",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
    borderRadius: "8px",
    padding: "8px 16px",
  },

  searchIcon: {
    color: "#667781",
    marginRight: "10px",
  },

  searchInput: {
    flex: 1,
    border: "none",
    background: "none",
    outline: "none",
    fontSize: "14px",
    color: "#111b21",
  },

  conversationsList: {
    flex: 1,
    overflowY: "auto",
  },

  conversationItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    borderBottom: "1px solid #f0f2f5",
  },

  conversationSelected: {
    backgroundColor: "#f0f2f5",
  },

  conversationAvatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#00a884",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
    position: "relative",
  },

  unreadBadge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    backgroundColor: "#25d366",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "bold",
  },

  conversationContent: {
    flex: 1,
    marginLeft: "15px",
    minWidth: 0, // For text overflow
  },

  conversationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "4px",
  },

  conversationName: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#111b21",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  conversationTime: {
    fontSize: "12px",
    color: "#667781",
    whiteSpace: "nowrap",
  },

  conversationPreview: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  previewText: {
    fontSize: "14px",
    color: "#667781",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flex: 1,
  },

  unreadIndicator: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#25d366",
    marginLeft: "8px",
  },

  loading: {
    padding: "40px 20px",
    textAlign: "center",
    color: "#667781",
  },

  emptyState: {
    padding: "60px 20px",
    textAlign: "center",
    color: "#667781",
  },

  emptyIcon: {
    fontSize: "50px",
    marginBottom: "20px",
    opacity: 0.5,
  },

  emptySubtext: {
    fontSize: "14px",
    marginTop: "8px",
  },

  // Chat area styles
  chatArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#efeae2",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2300a884' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
  },

  chatHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    backgroundColor: "#f0f2f5",
    borderBottom: "1px solid #e0e0e0",
    height: "60px",
  },

  chatHeaderInfo: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  chatAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#00a884",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },

  chatName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111b21",
  },

  chatStatus: {
    fontSize: "12px",
    color: "#667781",
  },

  chatActions: {
    display: "flex",
    gap: "10px",
  },

  chatActionButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    color: "#54656f",
    padding: "8px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
  },

  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  messageWrapper: {
    display: "flex",
    animation: "fadeIn 0.3s ease",
  },

  messageBubble: {
    maxWidth: "65%",
    padding: "8px 12px",
    borderRadius: "8px",
    position: "relative",
    wordBreak: "break-word",
  },

  messageSent: {
    backgroundColor: "#d9fdd3",
    borderTopRightRadius: "0",
  },

  messageReceived: {
    backgroundColor: "white",
    borderTopLeftRadius: "0",
    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
  },

  messageText: {
    fontSize: "14px",
    color: "#111b21",
    lineHeight: "1.4",
  },

  messageMeta: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "4px",
    marginTop: "4px",
  },

  messageTime: {
    fontSize: "11px",
    color: "#667781",
  },

  messageStatus: {
    fontSize: "11px",
    color: "#667781",
  },

  inputContainer: {
    display: "flex",
    alignItems: "center",
    padding: "10px 16px",
    backgroundColor: "#f0f2f5",
    borderTop: "1px solid #e0e0e0",
    gap: "10px",
  },

  inputActions: {
    display: "flex",
    gap: "8px",
  },

  inputActionButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    color: "#54656f",
    padding: "8px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  inputWrapper: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "8px 12px",
  },

  messageInput: {
    width: "100%",
    border: "none",
    outline: "none",
    resize: "none",
    fontSize: "14px",
    color: "#111b21",
    fontFamily: "inherit",
    maxHeight: "100px",
    minHeight: "20px",
  },

  sendButton: {
    background: "#00a884",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    color: "white",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
  },

  sendButtonDisabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },

  noChatSelected: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    textAlign: "center",
    color: "#667781",
  },

  welcomeIcon: {
    fontSize: "80px",
    marginBottom: "30px",
    opacity: 0.7,
  },

  welcomeTips: {
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "400px",
  },

  tip: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    textAlign: "left",
  },

  tipIcon: {
    fontSize: "30px",
    opacity: 0.7,
  },

  noMessages: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#667781",
  },

  noMessagesIcon: {
    fontSize: "60px",
    marginBottom: "20px",
    opacity: 0.5,
  },

  noMessagesSubtext: {
    fontSize: "14px",
    marginTop: "8px",
  },

  noSession: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    padding: "40px",
    color: "#667781",
  },

  noSessionIcon: {
    fontSize: "80px",
    marginBottom: "30px",
    opacity: 0.7,
  },

  backButton: {
    marginTop: "30px",
    padding: "12px 24px",
    backgroundColor: "#00a884",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },

  backButtonHover: {
    backgroundColor: "#008f70",
  },
};
