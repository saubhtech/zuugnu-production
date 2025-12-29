import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-img">
              <Image
                src="/images/zuugnu.jpeg"
                width={40}
                height={40}
                alt="zuugnu"
              />
            </div>
            <span className="footer-logo-text">
              Empowering Businesses. Enabling Associates. Enriching Community
            </span>
          </div>
        </div>

        <div className="footer-content">
          <div className="footer-section">
            <h4>Zuugnu</h4>
            <ul>
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">How It Works</Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="#">Success Stories</Link>
              </li>
              <li>
                <Link href="#">Team and Support</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Business</h4>
            <ul>
              <li>
                <Link href="#">Operating System</Link>
              </li>
              <li>
                <Link href="#">Digital Branding & Leads</Link>
              </li>
              <li>
                <Link href="#">Post Requirements</Link>
              </li>
              <li>
                <Link href="#">Subscription</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Associates</h4>
            <ul>
              <li>
                <Link href="#">Become an Associate</Link>
              </li>
              <li>
                <Link href="#">Training Programs</Link>
              </li>
              <li>
                <Link href="#">Browse Gig-Works</Link>
              </li>
              <li>
                <Link href="#">Calculate Earnings</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms of Service</Link>
              </li>
              <li>
                <Link href="#">Escrow System</Link>
              </li>
              <li>
                <Link href="#">Refund Policy</Link>
              </li>
              <li>
                <Link href="#">GDPR Compliance</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Newsletter</h4>
            <form className="newsletter-form">
              <input type="text" placeholder="Name" required />
              <input type="tel" placeholder="WhatsApp" required />
              <input type="email" placeholder="Email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact & Social Strip */}
      {/* Contact & Social Strip */}
      <div className="footer-strip">
        <div className="footer-contact-row">
          <a
            href="https://wa.me/918800607598"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            📞 <span>+91 8800607598</span>
          </a>

          <a href="mailto:mail@zuugnu.com" className="contact-item">
            ✉️ <span>mail@zuugnu.com</span>
          </a>
        </div>

        <div className="footer-social-row">
          <a
            href="https://wa.me/918800607598"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="WhatsApp"
          >
            📞
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Instagram"
          >
            📸
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="LinkedIn"
          >
            in
          </a>

          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="X"
          >
            𝕏
          </a>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="YouTube"
          >
            ▶
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          AIPTTAT Association || Incorporated under section 8 of the MCA, Govt
          of India || Licence Number 128032 || © 2025 Zuugnu Tech. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
