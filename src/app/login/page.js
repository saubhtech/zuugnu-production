"use client";

import { useState } from "react";
import Image from "next/image";
import "./login.css";

export default function LoginPage() {
  const [registerName, setRegisterName] = useState("");
  const [registerWhatsappNumber, setRegisterWhatsappNumber] = useState("");
  const [registerCountryCode, setRegisterCountryCode] = useState("+91");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  // ✅ SIMPLE WhatsApp Registration - No Backend Needed
  const handleRegister = () => {
    // Validation
    if (!registerName.trim()) {
      setRegisterMessage("❌ Please enter your full name");
      return;
    }

    if (!registerWhatsappNumber.trim() || registerWhatsappNumber.length < 10) {
      setRegisterMessage("❌ Please enter a valid 10-digit WhatsApp number");
      return;
    }

    setLoading(true);
    setRegisterMessage("");

    try {
      const fullName = registerName.trim();
      const whatsapp = `${registerCountryCode}${registerWhatsappNumber}`;
      
      // Create WhatsApp message
      const message = `${fullName}\nWhatsApp: ${whatsapp}`;
      const encodedMessage = encodeURIComponent(message);
      
      // Open WhatsApp with pre-filled message to +91 8800607598
      const whatsappUrl = `https://wa.me/918800607598?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      
      setRegisterMessage(
        `✅ Opening WhatsApp...\n\nPlease click SEND to complete your registration.`
      );
      
      // Clear form after 3 seconds
      setTimeout(() => {
        setRegisterName("");
        setRegisterWhatsappNumber("");
        setRegisterMessage("");
      }, 3000);

    } catch (error) {
      setRegisterMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!whatsappNumber.trim() || !password.trim()) {
      setLoginMessage("Please enter both WhatsApp number and password");
      return;
    }

    setLoading(true);
    setLoginMessage("");

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatsapp: countryCode + whatsappNumber,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authUser", JSON.stringify(data.user));
        setLoginMessage("Login successful! Redirecting...");

        if (password === "admin123") {
          setTimeout(() => {
            window.location.href = "/admin/career-db";
          }, 1000);
        } else if (password === "user123") {
          setTimeout(() => {
            window.location.href = "/career-choice";
          }, 1000);
        } else {
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        }
      } else {
        setLoginMessage(data.error || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setLoginMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    const whatsappMessage = encodeURIComponent(
      "I forgot my password. Please help me reset it."
    );
    window.open(`https://wa.me/918800607598?text=${whatsappMessage}`, "_blank");
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <button
          className="back-btn"
          onClick={() => (window.location.href = "/")}
        >
          🏠
        </button>
      </div>

      <div className="login-content">
        {/* Register Card */}
        <div className="auth-card">
          <div className="card-logo">
            <Image
              src="/images/zuugnu.jpeg"
              width={120}
              height={120}
              alt="Zuugnu Logo"
              priority
            />
          </div>

          <h2 className="card-title">
            <span className="icon">👤</span> Register
          </h2>

          <p className="card-subtitle">
            Register Full Name
          </p>
          <p className="card-subtitle">
            Or 📱 WhatsApp "Register [Your Name]" to <strong>+91 8800607598</strong>
          </p>

          <input
            type="text"
            className="register-input"
            placeholder="Register Yash Singh"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            disabled={loading}
            style={{ marginBottom: "15px" }}
          />

          <div className="input-group">
            <select
              className="country-code"
              value={registerCountryCode}
              onChange={(e) => setRegisterCountryCode(e.target.value)}
              disabled={loading}
            >
              <option value="+91">IN +91</option>
              <option value="+1">US +1</option>
              <option value="+44">UK +44</option>
              <option value="+61">AU +61</option>
            </select>
          </div>

          <div
            className="input-group whatsapp-input"
            style={{ marginBottom: "20px" }}
          >
            <span className="whatsapp-icon">📱</span>
            <input
              type="tel"
              className="form-input"
              placeholder="WhatsApp number"
              value={registerWhatsappNumber}
              onChange={(e) =>
                setRegisterWhatsappNumber(e.target.value.replace(/\D/g, ""))
              }
              disabled={loading}
              maxLength="10"
            />
          </div>

          <p className="receive-password">
            Click below to send registration via WhatsApp
          </p>

          <button
            className="whatsapp-btn"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Opening WhatsApp..." : "Register via WhatsApp"}
          </button>

          {registerMessage && (
            <p
              className={`message ${
                registerMessage.includes("✅") ? "success" : "error"
              }`}
            >
              {registerMessage}
            </p>
          )}
        </div>

        {/* Sign In Card */}
        <div className="auth-card">
          <div className="card-logo">
            <Image
              src="/images/zuugnu.jpeg"
              width={120}
              height={120}
              alt="Zuugnu Logo"
              priority
            />
          </div>

          <h2 className="card-title">
            <span className="icon">🔐</span> Sign In
          </h2>

          <form onSubmit={handleSignIn}>
            <div className="input-group">
              <select
                className="country-code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={loading}
              >
                <option value="+91">IN +91</option>
                <option value="+1">US +1</option>
                <option value="+44">UK +44</option>
                <option value="+61">AU +61</option>
              </select>
            </div>

            <div className="input-group whatsapp-input">
              <span className="whatsapp-icon">📱</span>
              <input
                type="tel"
                className="form-input"
                placeholder="WhatsApp number"
                value={whatsappNumber}
                onChange={(e) =>
                  setWhatsappNumber(e.target.value.replace(/\D/g, ""))
                }
                disabled={loading}
                maxLength="10"
              />
            </div>

            <div className="input-group password-input">
              <span className="lock-icon">🔒</span>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling;
                  input.type = input.type === "password" ? "text" : "password";
                }}
              >
                👁️
              </button>
            </div>

            <button
              type="button"
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>

            <button type="submit" className="submit-btn" disabled={loading}>
              ✓ {loading ? "Signing In..." : "Submit"}
            </button>

            {loginMessage && (
              <p
                className={`message ${
                  loginMessage.toLowerCase().includes("error") ||
                  loginMessage.toLowerCase().includes("invalid")
                    ? "error"
                    : "success"
                }`}
              >
                {loginMessage}
              </p>
            )}
          </form>
        </div>
      </div>

      <footer className="login-footer">
        <p>© 2025 Zuugnu.com | All rights reserved</p>
      </footer>
    </div>
  );
}