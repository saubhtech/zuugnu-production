import './globals.css';

export const metadata = {
  title: 'Zuugnu - Community-Driven Phygital Gig-Work Platform',
  description:
    'Zuugnu - Community-driven phygital gig-work aggregator platform. Build brands, generate organic leads, and earn through escrow-backed payments.',
  keywords:
    'gig economy, phygital platform, UGC, social media amplification, organic leads, business branding, escrow payments',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
