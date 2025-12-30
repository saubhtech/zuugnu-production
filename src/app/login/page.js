"use client";

import { useState } from "react";
import Image from "next/image";
import "./login.css";

export default function LoginPage() {
  // ✅ REQUIRED LOGIN STATES
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

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
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        setLoginMessage(data.error || "Invalid credentials");
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
        <button className="back-btn" onClick={() => (window.location.href = "/")}>
          🏠
        </button>
      </div>

      <div className="login-content">
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

          <p style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>
            Demo Login:<br />
            User: 9770370187 / user123<br />
            Admin: 8800607598 / admin123
          </p>

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









// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import "./login.css";

// export default function LoginPage() {
//   // const [registerName, setRegisterName] = useState("");
//   // const [registerWhatsappNumber, setRegisterWhatsappNumber] = useState("");
//   // const [registerCountryCode, setRegisterCountryCode] = useState("+91");
//   // const [whatsappNumber, setWhatsappNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [countryCode, setCountryCode] = useState("+91");
//   const [loading, setLoading] = useState(false);
//   const [registerMessage, setRegisterMessage] = useState("");
//   const [loginMessage, setLoginMessage] = useState("");

//   // const handleRegister = async () => {
//   //   if (!registerName.trim()) {
//   //     setRegisterMessage("Please enter your full name");
//   //     return;
//   //   }

//   //   if (!registerWhatsappNumber.trim()) {
//   //     setRegisterMessage("Please enter your WhatsApp number");
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   setRegisterMessage("");

//   //   try {
//   //     const cleanName = registerName.replace(/^register\s+/i, "").trim();
//   //     const fullWhatsapp = registerCountryCode + registerWhatsappNumber;

//   //     const response = await fetch("/api/auth/register", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({
//   //         fullName: cleanName,
//   //         whatsapp: fullWhatsapp,
//   //       }),
//   //     });

//   //     const data = await response.json();

//   //     if (data.exists) {
//   //       setRegisterMessage(data.message);
//   //       setLoading(false);
//   //       return;
//   //     }

//   //     if (response.ok && data.success) {
//   //       const welcomeMessage = encodeURIComponent(
//   //         `Hello ${cleanName}!\n\n` +
//   //           `✅ Your registration is complete!\n\n` +
//   //           `📱 Login ID: ${fullWhatsapp}\n` +
//   //           `🔐 Password: ${data.password}\n\n` +
//   //           `🌐 Login at: zuugnu.com/login\n\n` +
//   //           `Thank you for registering with Zuugnu! 🎉`
//   //       );

//   //       const whatsappUrl = `https://wa.me/${fullWhatsapp.replace(
//   //         "+",
//   //         ""
//   //       )}?text=${welcomeMessage}`;
//   //       window.open(whatsappUrl, "_blank");

//   //       setRegisterMessage(
//   //         `✅ Registration successful! Password: ${data.password}. Check WhatsApp for details!`
//   //       );
//   //       setRegisterName("");
//   //       setRegisterWhatsappNumber("");
//   //     } else {
//   //       setRegisterMessage(data.error || "Registration failed. Please try again.");
//   //     }
//   //   } catch (error) {
//   //     setRegisterMessage("An error occurred. Please try again.");
//   //     console.error("Registration error:", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSignIn = async (e) => {
//     e.preventDefault();

//     if (!whatsappNumber.trim() || !password.trim()) {
//       setLoginMessage("Please enter both WhatsApp number and password");
//       return;
//     }

//     setLoading(true);
//     setLoginMessage("");

//     try {
//       const response = await fetch("/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           whatsapp: countryCode + whatsappNumber,
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("authUser", JSON.stringify(data.user));

//         setLoginMessage("Login successful! Redirecting...");
//         setTimeout(() => {
//           window.location.href = "/dashboard";
//         }, 1000);
//       } else {
//         setLoginMessage(data.error || "Invalid credentials. Please try again.");
//       }
//     } catch (error) {
//       setLoginMessage("An error occurred. Please try again.");
//       console.error("Sign in error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotPassword = () => {
//     const whatsappMessage = encodeURIComponent(
//       "I forgot my password. Please help me reset it."
//     );
//     const whatsappUrl = `https://wa.me/918800607598?text=${whatsappMessage}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   return (
//     <div className="login-container">
//       <div className="login-header">
//         <button
//           className="back-btn"
//           onClick={() => (window.location.href = "/")}
//         >
//           🏠
//         </button>
//       </div>

//       <div className="login-content">
//         {/* Register Card */}
//         {/* <div className="auth-card">
//           <div className="card-logo">
//             <Image
//               src="/images/zuugnu.jpeg"
//               width={120}
//               height={120}
//               alt="Zuugnu Logo"
//               priority
//             />
//           </div>

//           <h2 className="card-title">
//             <span className="icon">👤</span> Register
//           </h2>

//           <p className="card-subtitle">Enter Your Details to Register</p>

//           <input
//             type="text"
//             className="register-input"
//             placeholder="Your Full Name (e.g., Yash Singh)"
//             value={registerName}
//             onChange={(e) => setRegisterName(e.target.value)}
//             disabled={loading}
//             style={{ marginBottom: "15px" }}
//           />

//           <div className="input-group">
//             <select
//               className="country-code"
//               value={registerCountryCode}
//               onChange={(e) => setRegisterCountryCode(e.target.value)}
//               disabled={loading}
//             >
//               <option value="+91">IN +91</option>
//               <option value="+1">US +1</option>
//               <option value="+44">UK +44</option>
//               <option value="+61">AU +61</option>
//             </select>
//           </div>

//           <div className="input-group whatsapp-input" style={{ marginBottom: "20px" }}>
//             <span className="whatsapp-icon">📱</span>
//             <input
//               type="tel"
//               className="form-input"
//               placeholder="WhatsApp number"
//               value={registerWhatsappNumber}
//               onChange={(e) =>
//                 setRegisterWhatsappNumber(e.target.value.replace(/\D/g, ""))
//               }
//               disabled={loading}
//               maxLength="10"
//             />
//           </div>

//           <p className="receive-password">
//             You'll receive password via WhatsApp
//           </p>

//           <button className="whatsapp-btn" onClick={handleRegister} disabled={loading}>
//             {loading ? "Processing..." : "Register & Get Password"}
//           </button>

//           {registerMessage && (
//             <p className={`message ${registerMessage.includes("✅") ? "success" : "error"}`}>
//               {registerMessage}
//             </p>
//           )}
//         </div> */}

//         {/* Sign In Card */}
//         <div className="auth-card">
//           <div className="card-logo">
//             <Image
//               src="/images/zuugnu.jpeg"
//               width={120}
//               height={120}
//               alt="Zuugnu Logo"
//               priority
//             />
//           </div>

//           <h2 className="card-title">
//             <span className="icon">🔐</span> Sign In
//           </h2>

//           <form onSubmit={handleSignIn}>
//             <div className="input-group">
//               <select
//                 className="country-code"
//                 value={countryCode}
//                 onChange={(e) => setCountryCode(e.target.value)}
//                 disabled={loading}
//               >
//                 <option value="+91">IN +91</option>
//                 <option value="+1">US +1</option>
//                 <option value="+44">UK +44</option>
//                 <option value="+61">AU +61</option>
//               </select>
//             </div>

//             <div className="input-group whatsapp-input">
//               <span className="whatsapp-icon">📱</span>
//               <input
//                 type="tel"
//                 className="form-input"
//                 placeholder="Whatsapp number"
//                 value={whatsappNumber}
//                 onChange={(e) =>
//                   setWhatsappNumber(e.target.value.replace(/\D/g, ""))
//                 }
//                 disabled={loading}
//                 maxLength="10"
//               />
//             </div>

//             <div className="input-group password-input">
//               <span className="lock-icon">🔒</span>
//               <input
//                 type="password"
//                 className="form-input"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled={loading}
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={(e) => {
//                   const input = e.currentTarget.previousElementSibling;
//                   input.type = input.type === "password" ? "text" : "password";
//                 }}
//               >
//                 👁️
//               </button>
//             </div>

//             <button
//               type="button"
//               className="forgot-password"
//               onClick={handleForgotPassword}
//             >
//               Forgot Password?
//             </button>

//             <button type="submit" className="submit-btn" disabled={loading}>
//               ✓ {loading ? "Signing In..." : "Submit"}
//             </button>

//             {loginMessage && (
//               <p className={`message ${loginMessage.includes("Invalid") || loginMessage.includes("error") || loginMessage.includes("failed") ? "error" : "success"}`}>
//                 {loginMessage}
//               </p>
//             )}
//           </form>
//         </div>
//       </div>

//       <footer className="login-footer">
//         <p>© 2025 Zuugnu.com | All rights reserved</p>
//       </footer>
//     </div>
//   );
// }