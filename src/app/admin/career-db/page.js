"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function CareerDBPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (!user) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <div className="admin-nav">
        <nav style={{ padding: '10px', background: '#f5f5f5', marginBottom: '20px' }}>
          <h3>Admin Navigation</h3>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link href="/admin/career-choice">Career Choice</Link>
            <Link href="/admin/career-db">Career DB</Link>
            <Link href="/admin/career-master">Career Master</Link>
            <Link href="/admin/master-admin">Master Admin</Link>
          </div>
        </nav>
      </div>
      
      <h1>Career DB Manager</h1>
      <p>Page is working. Full functionality coming soon.</p>
      
      <div style={{ marginTop: "20px", padding: "15px", background: "#f0f0f0" }}>
        <h3>Temporary Notice:</h3>
        <p>The full table management features will be enabled after successful build.</p>
      </div>
    </div>
  );
}