"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [sessionName, setSessionName] = useState("");
  const [connectingSession, setConnectingSession] = useState(null);
  const [showDisconnectAlert, setShowDisconnectAlert] = useState(false);
  const [disconnectingSession, setDisconnectingSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [error, setError] = useState(null);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [retryAfter, setRetryAfter] = useState(null);
  const [countdown, setCountdown] = useState("");

  const socketRef = useRef(null);
  const cooldownTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const qrTimeoutRef = useRef(null);

  console.log("🔍 State:", {
    connectingSession,
    loading,
    qrCode: !!qrCode,
    socketConnected,
    error,
    isRateLimited,
    countdown
  });

  // Initialize socket - ONCE ONLY
  useEffect(() => {
    console.log("🔌 Initializing WebSocket...");

    socketRef.current = io("http://localhost:3001", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected");
      setSocketConnected(true);
      setError(null);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
      setSocketConnected(false);
      setError("Disconnected from server. Reconnecting...");
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("❌ Connection error:", err);
      setSocketConnected(false);
      setError("Cannot connect to server. Make sure server is running.");
    });

    // Global error handlers
    socketRef.current.on("session:error", (data) => {
      console.error("❌ Session error:", data);
      handleSessionError(data);
    });

    socketRef.current.on("session:rate_limited", (data) => {
      console.log("⏳ Rate limited:", data);
      handleRateLimit(data);
    });

    loadSessions();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (cooldownTimerRef.current) {
        clearInterval(cooldownTimerRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      if (qrTimeoutRef.current) {
        clearTimeout(qrTimeoutRef.current);
      }
    };
  }, []);

  // Setup listeners when connecting
  useEffect(() => {
    if (!socketRef.current || !connectingSession) return;

    console.log(`🎯 Setting up listeners for: ${connectingSession}`);

    const handleQR = (data) => {
      console.log("📱 QR received:", data);
      
      // Check if this QR is for our session
      const sessionMatch = data.sessionId == connectingSession || 
                          data.sessionId === connectingSession;
      
      if (sessionMatch && data.qr) {
        console.log("✅ QR matches current session, displaying...");
        setQrCode(data.qr);
        setLoading(false);
        setError(null);
        
        // Clear any existing timeout
        if (qrTimeoutRef.current) {
          clearTimeout(qrTimeoutRef.current);
        }
        
        // Auto-expire QR after 40 seconds
        qrTimeoutRef.current = setTimeout(() => {
          if (qrCode) {
            console.log("⏰ QR expired");
            setQrCode(null);
            setError("QR code expired. Please generate a new one.");
            setLoading(false);
          }
        }, data.expiresIn || 40000);
      }
    };

    const handleConnected = (data) => {
      console.log("✅ Connected:", data);
      if (data.sessionId == connectingSession || data.sessionId === connectingSession) {
        handleConnectionSuccess(data);
      }
    };

    const handleSessionReady = (data) => {
      console.log("✅ Session ready:", data);
      if (data.sessionId == connectingSession || data.sessionId === connectingSession) {
        handleConnectionSuccess(data);
      }
    };

    const handleSessionError = (data) => {
      console.error("❌ Session error:", data);
      if (data.sessionId == connectingSession || data.sessionId === connectingSession) {
        setLoading(false);
        setQrCode(null);
        
        if (data.error?.includes("rate") || data.code === 429) {
          handleRateLimit({
            message: data.error || "Rate limited",
            waitTime: data.waitTime,
            retryAfter: Date.now() + (data.waitTime || 300) * 1000
          });
        } else {
          setError(data.error || data.message || "Connection failed");
        }
      }
    };

    const handleError515 = (data) => {
      console.error("🚨 Error 515:", data);
      if (data.sessionId == connectingSession || data.sessionId === connectingSession) {
        handleRateLimit({
          message: data.message || "WhatsApp rejected connection (Error 515)",
          waitTime: data.waitTime || 300,
          retryAfter: Date.now() + (data.waitTime || 300) * 1000,
          severity: "high"
        });
      }
    };

    const handleDisconnected = (data) => {
      console.log("📱 Session disconnected:", data);
      if (data.sessionId == connectingSession || data.sessionId === connectingSession) {
        setLoading(false);
        setQrCode(null);
        
        if (data.statusCode === 515) {
          handleRateLimit({
            message: "Connection rejected by WhatsApp (Error 515)",
            waitTime: 300,
            retryAfter: Date.now() + 300000,
            severity: "high"
          });
        } else if (data.statusCode === 408) {
          setError("QR code timed out. Please try again.");
        }
      }
    };

    // Attach listeners
    socketRef.current.on("qr", handleQR);
    socketRef.current.on("connected", handleConnected);
    socketRef.current.on("session_ready", handleSessionReady);
    socketRef.current.on("session:connected", handleConnected);
    socketRef.current.on("session_error", handleSessionError);
    socketRef.current.on("error_515", handleError515);
    socketRef.current.on("session_disconnected", handleDisconnected);
    socketRef.current.on("session:error", handleSessionError);

    // Join session room
    socketRef.current.emit("join_session", connectingSession);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("qr", handleQR);
        socketRef.current.off("connected", handleConnected);
        socketRef.current.off("session_ready", handleSessionReady);
        socketRef.current.off("session:connected", handleConnected);
        socketRef.current.off("session_error", handleSessionError);
        socketRef.current.off("error_515", handleError515);
        socketRef.current.off("session_disconnected", handleDisconnected);
        socketRef.current.off("session:error", handleSessionError);
      }
      
      if (qrTimeoutRef.current) {
        clearTimeout(qrTimeoutRef.current);
      }
    };
  }, [connectingSession]);

  const handleRateLimit = (data) => {
    console.log("⏳ Rate limit detected:", data);
    
    setIsRateLimited(true);
    setLoading(false);
    setQrCode(null);
    
    const waitTime = data.waitTime || 300;
    const retryTimestamp = data.retryAfter || Date.now() + (waitTime * 1000);
    
    setRetryAfter(retryTimestamp);
    setError(data.message || "Rate limited by WhatsApp");
    
    startCountdown(retryTimestamp);
  };

  const startCountdown = (targetTime) => {
    stopCountdown();
    
    const updateCountdown = () => {
      const now = Date.now();
      const remaining = targetTime - now;
      
      if (remaining <= 0) {
        setCountdown("");
        setIsRateLimited(false);
        setRetryAfter(null);
        setError(null);
        setCooldownTime(0);
        stopCountdown();
        return;
      }
      
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      
      if (minutes > 0) {
        setCountdown(`${minutes}m ${seconds}s`);
      } else {
        setCountdown(`${seconds}s`);
      }
      
      setCooldownTime(Math.ceil(remaining / 1000));
    };
    
    updateCountdown();
    countdownIntervalRef.current = setInterval(updateCountdown, 1000);
  };

  const stopCountdown = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  };

  const handleConnectionSuccess = (data) => {
    console.log("🎉 Connection success:", data);
    
    setLoading(false);
    setQrCode(null);
    setError(null);
    setIsRateLimited(false);
    setCountdown("");
    setCooldownTime(0);
    stopCountdown();
    
    closeConnectModal();
    loadSessions();
    
    alert(`✅ Connected successfully!\n\nSession: ${data.name || data.sessionId}\nPhone: ${data.phone || "Unknown"}`);
  };

  const loadSessions = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/sessions");
      const data = await res.json();
      if (data.success) {
        setSessions(data.sessions || []);
      }
    } catch (error) {
      console.error("Failed to load sessions:", error);
    }
  };

  const openConnectModal = (sessionId = null) => {
    const newSessionId = sessionId || `whatsapp_${Date.now()}`;
    setConnectingSession(newSessionId);
    setShowConnectModal(true);
    setQrCode(null);
    setSessionName(`WhatsApp_${Date.now().toString().slice(-4)}`);
    setLoading(false);
    setError(null);
    setIsRateLimited(false);
    setCountdown("");
    setCooldownTime(0);
    stopCountdown();
    
    if (qrTimeoutRef.current) {
      clearTimeout(qrTimeoutRef.current);
    }
  };

  const closeConnectModal = () => {
    setShowConnectModal(false);
    setQrCode(null);
    setLoading(false);
    setConnectingSession(null);
    setError(null);
    setCooldownTime(0);
    setIsRateLimited(false);
    setCountdown("");
    
    if (cooldownTimerRef.current) {
      clearInterval(cooldownTimerRef.current);
    }
    if (qrTimeoutRef.current) {
      clearTimeout(qrTimeoutRef.current);
    }
    stopCountdown();
  };

  const checkSessionHealth = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/sessions/${connectingSession}/status`);
      const data = await response.json();
      
      if (data.metrics?.canConnect?.allowed === false) {
        const waitMs = data.metrics.canConnect.waitTime;
        const retryTime = Date.now() + waitMs;
        
        handleRateLimit({
          message: `Please wait ${Math.ceil(waitMs/60000)} minutes before connecting`,
          waitTime: Math.ceil(waitMs/1000),
          retryAfter: retryTime
        });
        return false;
      }
      return true;
    } catch (error) {
      console.error("Health check failed:", error);
      return true; // Proceed if health check fails
    }
  };

  const connectViaQR = async () => {
    // Clear previous state
    setError(null);
    
    // Check socket connection
    if (!socketRef.current?.connected) {
      setError("Not connected to server. Please wait for connection...");
      socketRef.current.connect();
      return;
    }
    
    // Check rate limits
    if (isRateLimited && retryAfter) {
      const remaining = Math.ceil((retryAfter - Date.now()) / 1000);
      setError(`Please wait ${countdown} (${remaining}s) before trying again.`);
      return;
    }
    
    // Check session health
    const canConnect = await checkSessionHealth();
    if (!canConnect) {
      return;
    }
    
    console.log("🚀 Starting connection for:", connectingSession);
    
    setLoading(true);
    setQrCode(null);
    
    // Emit both events for compatibility
    socketRef.current.emit("join_session", connectingSession);
    socketRef.current.emit("start_session", {
      sessionId: connectingSession,
      sessionName: sessionName || `WhatsApp_${Date.now().toString().slice(-4)}`,
    });
    
    // Shorter timeout for development
    setTimeout(() => {
      if (loading && !qrCode) {
        console.log("⏰ Connection attempt timeout");
        setLoading(false);
        setError("Connection timed out. Check server logs.");
      }
    }, 15000);
  };

  const clearSessionState = async () => {
    if (!connectingSession) return;
    
    try {
      const response = await fetch('http://localhost:3001/api/clear-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: connectingSession })
      });
      
      if (response.ok) {
        setIsRateLimited(false);
        setRetryAfter(null);
        setCountdown("");
        setCooldownTime(0);
        setError(null);
        stopCountdown();
        
        alert("✅ Session state cleared. You can try connecting again.");
      }
    } catch (error) {
      console.error("Failed to clear session:", error);
      setError("Failed to clear session state");
    }
  };

  const initiateDisconnect = (session) => {
    setDisconnectingSession(session);
    setShowDisconnectAlert(true);
  };

  const confirmDisconnect = async () => {
    if (!disconnectingSession) return;

    try {
      if (socketRef.current) {
        socketRef.current.emit("disconnect_session", disconnectingSession.id);
      }

      const res = await fetch("http://localhost:3001/api/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: disconnectingSession.id }),
      });

      const data = await res.json();
      if (data.success) {
        loadSessions();
      }
    } catch (error) {
      console.error("Disconnect failed:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setShowDisconnectAlert(false);
      setDisconnectingSession(null);
    }
  };

  const openMessages = (session) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeSession", JSON.stringify(session));
      window.location.href = `/dashboard/messages?session=${session.id}`;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .sessions-page {
          min-height: 100vh;
          background: #f8fafc;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .sessions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding: 0 20px;
        }

        .sessions-title {
          font-size: 32px;
          font-weight: 700;
          color: #1e293b;
        }

        .connection-status {
          padding: 12px 20px;
          margin: 10px 20px 20px;
          border-radius: 8px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          background: ${socketConnected ? "#d1fae5" : "#fee2e2"};
          color: ${socketConnected ? "#065f46" : "#7f1d1d"};
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .sessions-container {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .sessions-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 600;
          color: #1e293b;
        }

        .add-session-btn {
          background: #22c55e;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .add-session-btn:hover {
          background: #16a34a;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(34, 197, 94, 0.2);
        }

        .add-session-btn:disabled {
          background: #94a3b8;
          cursor: not-allowed;
          transform: none;
        }

        .sessions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 20px;
        }

        .session-card {
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s;
          background: white;
        }

        .session-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .session-card.active {
          border-color: #22c55e;
          background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
        }

        .session-card.inactive {
          border-color: #fecaca;
          background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .modal {
          background: white;
          border-radius: 16px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e2e8f0;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #64748b;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #f1f5f9;
        }

        .modal-body {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #1e293b;
          font-size: 14px;
        }

        .form-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }

        .form-input:disabled {
          background: #f8fafc;
          cursor: not-allowed;
        }

        .error-message {
          background: #fee2e2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: fadeIn 0.3s ease;
        }

        .warning-message {
          background: #fef3c7;
          border: 1px solid #fde68a;
          color: #92400e;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rate-limit-message {
          background: #ff6b6b;
          border: 1px solid #ee5a6f;
          color: white;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 16px;
          text-align: center;
          animation: pulse 2s infinite;
        }

        .countdown-timer {
          font-size: 32px;
          font-weight: 700;
          margin: 10px 0;
          font-family: 'Courier New', monospace;
          color: white;
        }

        .cooldown-message {
          background: #fef3c7;
          border: 1px solid #fde68a;
          color: #92400e;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
          text-align: center;
          font-weight: 600;
        }

        .qr-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 12px;
          margin: 20px 0;
          border: 1px solid #e2e8f0;
          animation: fadeIn 0.5s ease;
        }

        .qr-code-img {
          width: 250px;
          height: 250px;
          border: 4px solid white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .qr-label {
          margin-top: 16px;
          color: #64748b;
          font-size: 14px;
          text-align: center;
          line-height: 1.5;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid #e2e8f0;
          border-top: 3px solid #22c55e;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.8; }
          100% { opacity: 1; }
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          background: #22c55e;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .btn-primary:hover:not(:disabled) {
          background: #16a34a;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(34, 197, 94, 0.2);
        }

        .btn-primary:disabled {
          background: #94a3b8;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          width: 100%;
          padding: 14px;
          background: #f59e0b;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          margin-top: 10px;
        }

        .btn-secondary:hover {
          background: #d97706;
          transform: translateY(-2px);
        }

        .btn {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn-connect {
          background: #d1fae5;
          color: #059669;
        }

        .btn-connect:hover:not(:disabled) {
          background: #a7f3d0;
          transform: translateY(-2px);
        }

        .btn-messages {
          background: #dbeafe;
          color: #2563eb;
        }

        .btn-messages:hover {
          background: #bfdbfe;
          transform: translateY(-2px);
        }

        .btn-disconnect {
          background: #fee2e2;
          color: #dc2626;
        }

        .btn-disconnect:hover {
          background: #fecaca;
          transform: translateY(-2px);
        }

        .session-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .session-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
        }

        .info-label {
          color: #64748b;
          font-size: 14px;
        }

        .info-value {
          color: #1e293b;
          font-weight: 600;
          font-size: 14px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          background: #f1f5f9;
          margin-bottom: 16px;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .status-dot.active {
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3);
          animation: pulse 2s infinite;
        }

        .status-dot.inactive {
          background: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
        }

        .status-dot.connecting {
          background: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.3);
          animation: pulse 1s infinite;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #64748b;
        }

        .empty-state-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .info-box {
          background: #e3f2fd;
          border: 1px solid #90caf9;
          border-radius: 8px;
          padding: 12px;
          margin-top: 16px;
          font-size: 13px;
          color: #1565c0;
        }

        .info-box strong {
          display: block;
          margin-bottom: 6px;
          font-size: 14px;
        }
      `}</style>

      <div className="sessions-page">
        <div className="sessions-header">
          <h1 className="sessions-title">WhatsApp Sessions</h1>
        </div>

        <div className="connection-status">
          <span className={`status-dot ${socketConnected ? 'active' : 'inactive'}`}></span>
          {socketConnected ? "✅ WebSocket Connected" : "❌ WebSocket Disconnected"}
          {!socketConnected && (
            <button 
              onClick={() => socketRef.current?.connect()}
              style={{ 
                marginLeft: '10px', 
                padding: '4px 12px', 
                fontSize: '12px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reconnect
            </button>
          )}
        </div>

        <div className="sessions-container">
          <div className="sessions-top">
            <h2 className="section-title">
              Active Sessions ({sessions.filter((s) => s.status === "connected").length})
            </h2>
            <button
              className="add-session-btn"
              onClick={() => openConnectModal()}
              disabled={loading || !socketConnected || isRateLimited}
            >
              <span>+</span> Add New Session
            </button>
          </div>

          {sessions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📱</div>
              <h3>No WhatsApp sessions yet</h3>
              <p>Add your first session to start messaging</p>
            </div>
          ) : (
            <div className="sessions-grid">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`session-card ${
                    session.status === "connected" ? "active" : "inactive"
                  }`}
                >
                  <div className="status-badge">
                    <span
                      className={`status-dot ${
                        session.status === "connected" ? "active" : "inactive"
                      }`}
                    />
                    {session.status === "connected" ? "ACTIVE" : "INACTIVE"}
                  </div>

                  <div className="session-info">
                    <div className="info-row">
                      <span className="info-label">Session:</span>
                      <span className="info-value">{session.name || session.id}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Phone:</span>
                      <span className="info-value">{session.phone || "Not connected"}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Last Active:</span>
                      <span className="info-value">{formatDate(session.last_active)}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Status:</span>
                      <span className="info-value" style={{
                        color: session.status === 'connected' ? '#22c55e' : '#ef4444',
                        fontWeight: 'bold'
                      }}>
                        {session.status === 'connected' ? '🟢 Online' : '🔴 Offline'}
                      </span>
                    </div>
                  </div>

                  <div className="session-actions">
                    {session.status === "connected" ? (
                      <>
                        <button className="btn btn-messages" onClick={() => openMessages(session)}>
                          💬 Messages
                        </button>
                        <button className="btn btn-disconnect" onClick={() => initiateDisconnect(session)}>
                          🚫 Disconnect
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-connect"
                        onClick={() => openConnectModal(session.id)}
                        disabled={!socketConnected || isRateLimited}
                      >
                        🔗 Connect
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Connect Modal */}
      {showConnectModal && (
        <div className="modal-overlay" onClick={closeConnectModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Connect WhatsApp</h2>
              <button className="close-btn" onClick={closeConnectModal}>×</button>
            </div>

            <div className="modal-body">
              {/* Rate Limit Warning */}
              {isRateLimited && (
                <div className="rate-limit-message">
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>🚨</div>
                  <div><strong>Rate Limited by WhatsApp</strong></div>
                  <div style={{ fontSize: "14px", marginTop: "5px", marginBottom: "10px" }}>
                    Too many connection attempts detected
                  </div>
                  <div className="countdown-timer">{countdown || formatTime(cooldownTime)}</div>
                  <div style={{ fontSize: "12px", marginTop: "10px" }}>
                    Please wait before trying again
                  </div>
                </div>
              )}

              {/* Error Messages */}
              {error && !isRateLimited && (
                <div className="error-message">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Warning Messages */}
              {!isRateLimited && cooldownTime > 0 && (
                <div className="warning-message">
                  <span>⏱️</span>
                  <span>Please wait {formatTime(cooldownTime)} before trying again</span>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Session Name (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Primary WhatsApp"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  disabled={loading || isRateLimited}
                />
              </div>

              {loading && !qrCode ? (
                <div className="qr-container">
                  <div className="loading-spinner"></div>
                  <p className="qr-label">Connecting to WhatsApp...</p>
                </div>
              ) : qrCode ? (
                <div className="qr-container">
                  <img
                    src={qrCode}
                    alt="WhatsApp QR Code"
                    className="qr-code-img"
                    onLoad={() => console.log("✅ QR image loaded successfully")}
                    onError={(e) => {
                      console.error("❌ QR image failed to load");
                      setError("Failed to load QR code. Please try again.");
                      setQrCode(null);
                    }}
                  />
                  <p className="qr-label">
                    1. Open WhatsApp on your phone<br />
                    2. Tap Menu → Linked Devices<br />
                    3. Tap "Link a Device"<br />
                    4. Scan this QR code within 40 seconds
                  </p>
                </div>
              ) : (
                <>
                  <button
                    className="btn-primary"
                    onClick={connectViaQR}
                    disabled={loading || !socketConnected || isRateLimited || cooldownTime > 0}
                  >
                    {loading ? "⏳ Connecting..." : 
                     isRateLimited ? "🔒 Rate Limited" : 
                     "🔲 Generate QR Code"}
                  </button>

                  {/* Clear Session Button */}
                  {(isRateLimited || error?.includes("515")) && (
                    <>
                      <button
                        className="btn-secondary"
                        onClick={clearSessionState}
                        disabled={loading}
                      >
                        🔄 Clear Session & Reset
                      </button>
                      
                      <div className="info-box">
                        <strong>ℹ️ Why am I rate limited?</strong>
                        WhatsApp temporarily blocks connection attempts to prevent spam. 
                        This happens when you try to connect multiple times in a short period. 
                        Wait for the timer to expire, or click "Clear Session & Reset" to start fresh.
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Connection Instructions */}
              {!qrCode && !loading && !isRateLimited && (
                <div className="info-box">
                  <strong>📱 Connection Tips:</strong>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>Make sure your phone has internet connection</li>
                    <li>WhatsApp must be installed and logged in on your phone</li>
                    <li>If QR fails, wait 5 minutes before retrying</li>
                    <li>Use a new session ID if repeatedly failing</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}