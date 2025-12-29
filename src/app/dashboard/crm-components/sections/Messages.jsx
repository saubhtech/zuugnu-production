"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

export default function Messages() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [waitTime, setWaitTime] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [retryAfter, setRetryAfter] = useState(null);
  const [countdown, setCountdown] = useState("");

  const socketRef = useRef(null);
  const waitTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io("http://localhost:3001", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Connected to WebSocket server");
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket server");
    });

    socketRef.current.on("error", (err) => {
      console.error("WebSocket error:", err);
    });

    // Listen for QR code (NEW FORMAT)
    socketRef.current.on("qr", (data) => {
      console.log("📱 QR code received");
      setQrCode(data.qr);
      setIsConnecting(true);
      setError(null);
      setConnectionStatus("connecting");

      // Auto-expire QR after timeout
      if (data.expiresIn) {
        setTimeout(() => {
          if (connectionStatus === "connecting") {
            setQrCode(null);
            setError("QR code expired. Please try again.");
            setIsConnecting(false);
            setConnectionStatus("disconnected");
          }
        }, data.expiresIn);
      }
    });

    // Listen for rate limiting (NEW)
    socketRef.current.on("session:rate_limited", ({ message, waitTime, retryAfter }) => {
      console.log("⏳ Rate limited:", message);
      setIsRateLimited(true);
      setConnectionStatus("rate_limited");
      setError(message);
      setRetryAfter(retryAfter);
      setQrCode(null);
      setIsConnecting(false);
      setShowModal(false);

      // Start countdown
      startCountdown(retryAfter);
    });

    // Listen for successful connection (NEW FORMAT)
    socketRef.current.on("session:connected", (data) => {
      console.log("✅ Session connected:", data);
      handleConnectionSuccess(data);
    });

    // Listen for session ready (OLD FORMAT - keep for backward compatibility)
    socketRef.current.on("session_ready", (data) => {
      console.log("✅ Session ready:", data);
      handleConnectionSuccess(data);
    });

    socketRef.current.on("connected", (data) => {
      console.log("✅ Connected:", data);
      handleConnectionSuccess(data);
    });

    // Listen for old session connected event (backward compatibility)
    socketRef.current.on("session_connected", (data) => {
      console.log("✅ Session connected (old):", data);
      if (data.status === "connected") {
        handleConnectionSuccess(data);
      }
    });

    // Listen for errors (NEW FORMAT)
    socketRef.current.on("session:error", (data) => {
      console.error("❌ Session error:", data);
      
      if (data.error === "rate_limited" && data.retryAfter) {
        setIsRateLimited(true);
        setRetryAfter(data.retryAfter);
        setError(data.message);
        setConnectionStatus("rate_limited");
        startCountdown(data.retryAfter);
      } else {
        setError(data.message || data.error);
      }
      
      setIsConnecting(false);
      setQrCode(null);
    });

    // Listen for old error format (backward compatibility)
    socketRef.current.on("session_error", (data) => {
      console.error("❌ Session error (old):", data);
      setError(data.error);
      setIsConnecting(false);
      setQrCode(null);
      
      if (data.waitTime) {
        setWaitTime(data.waitTime);
        startWaitTimer(data.waitTime);
      }
    });

    // Listen for error 515 specifically (backward compatibility)
    socketRef.current.on("error_515", (data) => {
      console.error("🚨 Error 515:", data);
      setError(data.message);
      setIsConnecting(false);
      setQrCode(null);
      setIsRateLimited(true);
      
      const waitSeconds = data.waitTime || 300; // Default 5 minutes
      const retryTime = Date.now() + (waitSeconds * 1000);
      setRetryAfter(retryTime);
      startCountdown(retryTime);
    });

    // Listen for session stopped (NEW)
    socketRef.current.on("session:stopped", (data) => {
      console.log("🛑 Session stopped:", data);
      setConnectionStatus("disconnected");
      setIsConnecting(false);
      setQrCode(null);
    });

    // Listen for logged out (NEW)
    socketRef.current.on("session:logged_out", (data) => {
      console.log("👋 Logged out:", data);
      setConnectionStatus("disconnected");
      setIsConnecting(false);
      setQrCode(null);
      setError("Logged out from WhatsApp");
    });

    // Listen for disconnection (backward compatibility)
    socketRef.current.on("session_disconnected", (data) => {
      console.log("❌ Session disconnected:", data);
      setConnectionStatus("disconnected");
      setIsConnecting(false);
      setQrCode(null);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (waitTimerRef.current) {
        clearInterval(waitTimerRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  // Start countdown timer (NEW)
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

  // Handle successful connection and redirect
  const handleConnectionSuccess = (data) => {
    console.log("🎉 Handling connection success:", data);
    
    setIsConnecting(false);
    setQrCode(null);
    setError(null);
    setConnectionStatus("connected");
    setShowModal(false);
    setIsRateLimited(false);
    stopCountdown();

    // Save session data to localStorage
    const sessionData = {
      id: data.sessionId,
      name: data.name || sessionName,
      phone: data.phone,
      number: data.phone,
      status: "connected",
      connectedAt: data.connectedAt || new Date().toISOString(),
    };

    localStorage.setItem("activeSession", JSON.stringify(sessionData));
    localStorage.setItem("activeSessionId", data.sessionId);

    console.log("💾 Session saved to localStorage:", sessionData);

    // Show success message
    alert(`✅ Connected successfully!\n\nSession: ${sessionData.name}\nPhone: ${sessionData.phone}\n\nRedirecting to inbox...`);

    // Redirect to inbox after short delay
    setTimeout(() => {
      console.log("🔄 Redirecting to inbox...");
      window.location.href = `/dashboard/inbox?session=${data.sessionId}`;
    }, 1500);
  };

  // Start countdown timer (OLD - keep for backward compatibility)
  const startWaitTimer = (seconds) => {
    if (waitTimerRef.current) {
      clearInterval(waitTimerRef.current);
    }

    waitTimerRef.current = setInterval(() => {
      setWaitTime((prev) => {
        if (prev <= 1) {
          clearInterval(waitTimerRef.current);
          setError(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Format wait time (OLD)
  const formatWaitTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Check session health before connecting (NEW)
  const checkSessionHealth = async (sessionId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/sessions/${sessionId}/status`
      );
      const data = await response.json();

      if (!data.metrics.canConnect.allowed) {
        const waitMs = data.metrics.canConnect.waitTime;
        const waitMinutes = Math.ceil(waitMs / 60000);
        const waitSeconds = Math.ceil(waitMs / 1000);
        
        setIsRateLimited(true);
        setConnectionStatus("rate_limited");
        setError(
          `Please wait ${waitMinutes > 0 ? waitMinutes + ' minutes' : waitSeconds + ' seconds'} before connecting`
        );
        setRetryAfter(Date.now() + waitMs);
        startCountdown(Date.now() + waitMs);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error checking session health:", error);
      return true; // Allow connection attempt if health check fails
    }
  };

  // Clear session (NEW)
  const handleClearSession = async () => {
    if (!sessionId.trim()) {
      alert("Please enter a session ID first");
      return;
    }

    try {
      await fetch(`http://localhost:3001/api/sessions/${sessionId}/clear`, {
        method: "POST"
      });
      
      setIsRateLimited(false);
      setRetryAfter(null);
      setCountdown("");
      setWaitTime(0);
      setError(null);
      setConnectionStatus("disconnected");
      stopCountdown();
      
      alert("✅ Session cleared! You can try connecting again.");
    } catch (error) {
      console.error("Error clearing session:", error);
      setError("Failed to clear session");
    }
  };

  // Start new session
  const handleStartSession = async () => {
    if (!sessionId.trim()) {
      alert("Please enter a session ID");
      return;
    }

    // Check old wait timer (backward compatibility)
    if (waitTime > 0) {
      alert(`Please wait ${formatWaitTime(waitTime)} before trying again`);
      return;
    }

    // Check rate limiting
    if (isRateLimited) {
      alert(`Please wait ${countdown} before trying again`);
      return;
    }

    // Check session health
    const canConnect = await checkSessionHealth(sessionId.trim());
    if (!canConnect) {
      return;
    }

    setShowModal(true);
    setIsConnecting(true);
    setError(null);
    setQrCode(null);
    setConnectionStatus("connecting");

    console.log(`🚀 Starting session: ${sessionId}`);

    // Join session first
    socketRef.current.emit("join_session", sessionId.trim());

    // Then start the session
    socketRef.current.emit("start_session", {
      sessionId: sessionId.trim(),
      sessionName: sessionName.trim() || sessionId.trim(),
    });
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setQrCode(null);
    setIsConnecting(false);
  };

  return (
    <>
      <style>{`
        .messages-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          padding: 20px;
        }

        .connect-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 40px;
          max-width: 500px;
          width: 100%;
        }

        .connect-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .connect-icon {
          font-size: 60px;
          margin-bottom: 20px;
        }

        .connect-title {
          font-size: 28px;
          font-weight: 700;
          color: #333;
          margin-bottom: 10px;
        }

        .connect-subtitle {
          font-size: 14px;
          color: #666;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .connect-button {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .connect-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .connect-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }

        .clear-button {
          width: 100%;
          padding: 14px;
          background: #f59e0b;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 10px;
        }

        .clear-button:hover {
          background: #d97706;
          transform: translateY(-2px);
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
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          padding: 30px;
          max-width: 500px;
          width: 100%;
          position: relative;
        }

        .modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
        }

        .modal-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          color: #333;
        }

        .qr-container {
          display: flex;
          justify-content: center;
          margin: 30px 0;
        }

        .qr-code {
          max-width: 100%;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .loading {
          text-align: center;
          padding: 40px;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-box {
          background: #fee;
          border: 2px solid #fcc;
          border-radius: 10px;
          padding: 15px;
          margin: 20px 0;
          color: #c33;
        }

        .warning-box {
          background: #ffeaa7;
          border: 2px solid #fdcb6e;
          border-radius: 10px;
          padding: 15px;
          margin: 20px 0;
          color: #d63031;
          text-align: center;
        }

        .rate-limit-box {
          background: #ff6b6b;
          border: 2px solid #ee5a6f;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
          color: white;
          text-align: center;
        }

        .wait-timer {
          font-size: 32px;
          font-weight: 700;
          margin-top: 10px;
          font-family: 'Courier New', monospace;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-top: 10px;
        }

        .status-connected {
          background: #d4edda;
          color: #155724;
        }

        .status-connecting {
          background: #fff3cd;
          color: #856404;
        }

        .status-disconnected {
          background: #f8d7da;
          color: #721c24;
        }

        .status-rate_limited {
          background: #ff6b6b;
          color: white;
        }

        .info-box {
          background: #e3f2fd;
          border: 2px solid #90caf9;
          border-radius: 10px;
          padding: 15px;
          margin-top: 20px;
          font-size: 13px;
          color: #1565c0;
        }

        .info-box strong {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
        }
      `}</style>

      <div className="messages-page">
        <div className="connect-card">
          <div className="connect-header">
            <div className="connect-icon">📱</div>
            <h1 className="connect-title">Connect WhatsApp</h1>
            <p className="connect-subtitle">
              Enter your session details to generate a QR code
            </p>
            <span className={`status-badge status-${connectionStatus}`}>
              {connectionStatus === "connected" && "🟢 Connected"}
              {connectionStatus === "connecting" && "🟡 Connecting..."}
              {connectionStatus === "disconnected" && "🔴 Disconnected"}
              {connectionStatus === "rate_limited" && "🔒 Rate Limited"}
            </span>
          </div>

          {/* Rate Limited Warning (NEW) */}
          {isRateLimited && countdown && (
            <div className="rate-limit-box">
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>🚨</div>
              <div><strong>Rate Limited by WhatsApp</strong></div>
              <div style={{ fontSize: "14px", marginTop: "5px" }}>
                Too many connection attempts detected
              </div>
              <div className="wait-timer">{countdown}</div>
              <div style={{ fontSize: "12px", marginTop: "10px" }}>
                Please wait before trying again
              </div>
            </div>
          )}

          {/* Old Wait Timer (backward compatibility) */}
          {!isRateLimited && waitTime > 0 && (
            <div className="warning-box">
              <div>⏱️ Please wait before trying again</div>
              <div className="wait-timer">{formatWaitTime(waitTime)}</div>
            </div>
          )}

          {/* Error Display */}
          {error && !isRateLimited && (
            <div className="error-box">
              <strong>⚠️ Error:</strong> {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Session ID</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Session_1732"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Session Name (Optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., My WhatsApp"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
            />
          </div>

          <button
            className="connect-button"
            onClick={handleStartSession}
            disabled={
              !sessionId.trim() || 
              waitTime > 0 || 
              isConnecting || 
              isRateLimited
            }
          >
            {isConnecting ? "Connecting..." : 
             isRateLimited ? "🔒 Rate Limited" : 
             "Generate QR Code"}
          </button>

          {/* Clear Session Button (NEW) */}
          {(isRateLimited || error) && sessionId.trim() && (
            <button
              className="clear-button"
              onClick={handleClearSession}
            >
              🔄 Clear Session & Reset
            </button>
          )}

          {/* Help Info */}
          {isRateLimited && (
            <div className="info-box">
              <strong>ℹ️ Why am I rate limited?</strong>
              WhatsApp temporarily blocks connection attempts to prevent spam. 
              This happens when you try to connect multiple times in a short period. 
              Wait for the timer to expire, or click "Clear Session & Reset" to start fresh.
            </div>
          )}
        </div>

        {/* QR Code Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>

              <div className="modal-header">
                <h2 className="modal-title">Scan QR Code</h2>
                <p>Open WhatsApp on your phone and scan this code</p>
              </div>

              {error && (
                <div className="error-box">
                  <strong>⚠️ Error:</strong> {error}
                </div>
              )}

              {qrCode ? (
                <div className="qr-container">
                  <img
                    src={qrCode}
                    alt="WhatsApp QR Code"
                    className="qr-code"
                  />
                </div>
              ) : (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Generating QR code...</p>
                </div>
              )}

              <p style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>
                1. Open WhatsApp on your phone<br />
                2. Tap Menu or Settings<br />
                3. Tap Linked Devices<br />
                4. Tap Link a Device<br />
                5. Point your phone at this screen to scan the code
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}