'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import './dashboard.css';

// CRM Layout Components
import Sidebar from './crm-components/Sidebar';

// CRM Sections
import Dashboard from './crm-components/sections/Dashboard';
import Leads from './crm-components/sections/Leads';
import Campaigns from './crm-components/sections/Campaigns';
import Messages from './crm-components/sections/Messages';
import Team from './crm-components/sections/Team';
import Analytics from './crm-components/sections/Analytics';
import Templates from './crm-components/sections/Templates';
import Automation from './crm-components/sections/Automation';
import Settings from './crm-components/sections/Settings';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  const router = useRouter();

  // 🔐 AUTH CHECK
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');

    if (!storedUser) {
      router.push('/login');
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error('Invalid auth data');
      localStorage.removeItem('authUser');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('authUser');
    router.push('/logout');
  };

  // ⏳ LOADING STATE
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        color: '#667eea'
      }}>
        Loading...
      </div>
    );
  }

  // ✅ WHATSAPP CRM UI
  return (
    <div style={styles.appContainer}>
      <Sidebar
        active={activeSection}
        onChange={setActiveSection}
      />

      <div style={styles.mainContent}>
        {/* Pass logout handler to all sections that need it */}
        {activeSection === 'dashboard' && <Dashboard user={user} onLogout={handleLogout} />}
        {activeSection === 'leads' && <Leads user={user} onLogout={handleLogout} />}
        {activeSection === 'campaigns' && <Campaigns user={user} onLogout={handleLogout} />}
        {activeSection === 'messages' && <Messages user={user} onLogout={handleLogout} />}
        {activeSection === 'team' && <Team user={user} onLogout={handleLogout} />}
        {activeSection === 'analytics' && <Analytics user={user} onLogout={handleLogout} />}
        {activeSection === 'templates' && <Templates user={user} onLogout={handleLogout} />}
        {activeSection === 'automation' && <Automation user={user} onLogout={handleLogout} />}
        {activeSection === 'settings' && <Settings user={user} onLogout={handleLogout} />}
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: '#f5f7fa',
  },
};