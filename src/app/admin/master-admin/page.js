
"use client";

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./master-admin.css";
import Link from 'next/link';

export default function MasterAdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [records, setRecords] = useState([]);
  const [masterOptions, setMasterOptions] = useState([]);
  const [formData, setFormData] = useState({
    career_choice: "",
    career_master: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [editingId, setEditingId] = useState(null);
  const router = useRouter();

  // Add mounted check to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const storedUser = localStorage.getItem("authUser");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
    setLoading(false);
    
    // Load career choices from master table
    fetchMasterOptions();
    // Load existing records
    fetchRecords();
  }, [router, mounted]);

  const fetchMasterOptions = async () => {
    try {
      const response = await fetch(`/api/admin/career?table=mast_career_ability`);
      const data = await response.json();
      if (data.success) {
        setMasterOptions(data.records || []);
      }
    } catch (error) {
      console.error("Error fetching master options:", error);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await fetch(`/api/admin/career?table=careerchoice`);
      const data = await response.json();
      if (data.success) {
        setRecords(data.records || []);
      } else {
        setRecords([]);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
      setRecords([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.career_choice.trim()) {
      setMessage({ type: "error", text: "Career Choice is required" });
      return;
    }

    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      if (editingId) {
        const response = await fetch('/api/admin/career', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tableName: 'careerchoice',
            mastid: editingId,
            record: {
              career_choice: formData.career_choice,
              career_master: formData.career_master || null
            }
          })
        });

        const data = await response.json();

        if (data.success) {
          setMessage({ type: "success", text: "Record updated successfully!" });
          resetForm();
          await fetchRecords();
        } else {
          setMessage({ type: "error", text: data.error || "Failed to update record" });
        }
      } else {
        const response = await fetch('/api/admin/career', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tableName: 'careerchoice',
            record: {
              career_choice: formData.career_choice,
              career_master: formData.career_master || null
            }
          })
        });

        const data = await response.json();

        if (data.success) {
          setMessage({ type: "success", text: "Record added successfully!" });
          resetForm();
          await fetchRecords();
        } else {
          setMessage({ type: "error", text: data.error || "Failed to add record" });
        }
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error: " + error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (record) => {
    setFormData({
      career_choice: record.career_choice || "",
      career_master: record.career_master || ""
    });
    setEditingId(record.choiceid || record.mastid);
    
    // FIX: Add browser check for scrollTo
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = async (id) => {
    // FIX: Add browser check for confirm
    if (typeof window !== 'undefined' && !confirm("Are you sure you want to delete this record?")) return;

    try {
      const response = await fetch('/api/admin/career', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableName: 'careerchoice',
          mastid: id
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "Record deleted successfully!" });
        if (editingId === id) resetForm();
        await fetchRecords();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to delete record" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error: " + error.message });
    }
  };

  const resetForm = () => {
    setFormData({
      career_choice: "",
      career_master: ""
    });
    setEditingId(null);
    setMessage({ type: "", text: "" });
  };

  // Don't render until mounted to prevent hydration errors
  if (!mounted || loading) return <div className="loading">Loading...</div>;

  return (
    <div className="master-admin-container">
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
      
      <header className="admin-header">
        <h1>🎯 Career Choice Master Admin</h1>
        <p>Manage career choices and related data</p>
        <button onClick={() => router.push("/admin/career-db")} className="back-btn">
          ← Back to Upload
        </button>
      </header>

      {/* Data Entry Form */}
      <div className="data-entry-card">
        <h2>Career Choice Data Entry Form</h2>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="entry-form">
          {/* Career Choice Field - Dropdown from master */}
          <div className="form-group">
            <label htmlFor="career_choice" className="required-label">
              Career Choice *
            </label>
            <select
              id="career_choice"
              name="career_choice"
              value={formData.career_choice}
              onChange={handleInputChange}
              required
              className="form-input"
            >
              <option value="">Select a career choice</option>
              {masterOptions.map((option) => (
                <option key={option.mastid} value={option.option}>
                  {option.option}
                </option>
              ))}
            </select>
            <div className="input-hint">Select from master career abilities</div>
          </div>

          {/* Career Master Field - User Input */}
          <div className="form-group">
            <label htmlFor="career_master">
              Career Master
            </label>
            <input
              type="text"
              id="career_master"
              name="career_master"
              value={formData.career_master}
              onChange={handleInputChange}
              placeholder="Enter career master"
              className="form-input"
            />
            <div className="input-hint">Enter master category or grouping</div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="submit" 
              className={`submit-btn ${editingId ? 'update-btn' : ''}`} 
              disabled={submitting}
            >
              {submitting ? "Processing..." : editingId ? "Update" : "Submit"}
            </button>
            <button type="button" className="reset-btn" onClick={resetForm}>
              Reset
            </button>
            {editingId && (
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Records Table */}
      <div className="records-section">
        <h2>All Records</h2>
        <p className="section-subtitle">View, Edit, and Delete Career Choices</p>

        {records.length > 0 ? (
          <div className="table-wrapper">
            <table className="records-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Career Choice</th>
                  <th>Career Master</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.choiceid || record.mastid}>
                    <td>{record.choiceid || record.mastid}</td>
                    <td>{record.career_choice || '-'}</td>
                    <td>{record.career_master || '-'}</td>
                    <td className="actions-cell">
                      <button 
                        className="edit-btn-small"
                        onClick={() => handleEdit(record)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn-small"
                        onClick={() => handleDelete(record.choiceid || record.mastid)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-records">
            <p>No records found. Add your first record above.</p>
          </div>
        )}
      </div>
    </div>
  );
}