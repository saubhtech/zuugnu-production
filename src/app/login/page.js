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
      window.open(whatsappUrl, "_blank");

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
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp "Register [Your Name]" to <strong>+91 8800607598</strong>
            </span>
          </p>
          <p className="card-subtitle">To recieve your login password</p>

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
            <span className="whatsapp-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </span>
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
              <span className="whatsapp-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </span>
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
              {/* <button
                type="button"
                className="toggle-password"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling;
                  input.type = input.type === "password" ? "text" : "password";
                }}
              >
                👁️
              </button> */}
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
