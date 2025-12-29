import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo-container">
          <div className="logo-img">
            <Image
              src="/images/zuugnu.jpeg"
              width={32}
              height={32}
              alt="Zuugnu logo"
              priority
            />
          </div>
          <span className="logo-text">Zuugnu</span>
        </div>
        <ul className="nav-menu">
          <li>
            <Link href="#gig-work">Gig-Work</Link>
          </li>
          <li>
            <Link href="#branding">Branding</Link>
          </li>
          <li>
            <Link href="#academy">Academy</Link>
          </li>
          <li>
            <Link href="#support">Support</Link>
          </li>
          <li>
            <Link href="/login" className="btn-login">
              Login
            </Link>
          </li>
        </ul>
        <button className="mobile-toggle">☰</button>
      </nav>
    </header>
  );
}
