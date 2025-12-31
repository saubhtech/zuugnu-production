"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "./career-master.css";
import Link from 'next/link';

export default function CareerMasterPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [currentTable, setCurrentTable] = useState("mast_career_ability");
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editRecord, setEditRecord] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef(null);
  const router = useRouter();

  const tables = [
    { value: "mast_career_ability", label: "Career Ability" },
    { value: "mast_career_activity", label: "Career Activity" },
    { value: "mast_career_industry", label: "Career Industry" },
    { value: "mast_career_interest", label: "Career Interest" },
    { value: "mast_career_knowledge", label: "Career Knowledge" },
    { value: "mast_career_outlook", label: "Career Outlook" },
    { value: "mast_career_pathway", label: "Career Pathway" },
    { value: "mast_career_preference", label: "Career Preference" },
    { value: "mast_career_sector", label: "Career Sector" },
    { value: "mast_career_skills", label: "Career Skills" },
    { value: "mast_career_stem", label: "Career STEM" },
    { value: "mast_career_technology", label: "Career Technology" },
    { value: "mast_career_trait", label: "Career Trait" },
    { value: "mast_career_zone", label: "Career Zone" },
  ];

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
  }, [router, mounted]);

  useEffect(() => {
    if (!loading && mounted) {
      fetchRecords();
    }
  }, [currentTable, loading, mounted]);

  const fetchRecords = async () => {
    try {
      const response = await fetch(`/api/admin/career?table=${currentTable}`);
      const data = await response.json();
      if (data.success) {
        setRecords(data.records || []);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const handleTableChange = (e) => {
    setCurrentTable(e.target.value);
    setCurrentPage(1);
  };

  const openModal = (mode, record = null) => {
    setModalMode(mode);
    setEditRecord(record);
    setShowModal(true);
  };

  const openUploadModal = () => {
    setUploadMessage("");
    setShowUploadModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditRecord(null);
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveRecord = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const option = formData.get("option");

    try {
      if (modalMode === "edit" && editRecord) {
        const response = await fetch("/api/admin/career", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tableName: currentTable,
            id: editRecord.mastid,
            record: { option },
          }),
        });
        const data = await response.json();
        if (data.success && typeof window !== 'undefined') {
          alert("Record updated successfully!");
          fetchRecords();
          closeModal();
        }
      } else {
        const response = await fetch("/api/admin/career", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tableName: currentTable,
            record: { option },
          }),
        });
        const data = await response.json();
        if (data.success && typeof window !== 'undefined') {
          alert("Record added successfully!");
          fetchRecords();
          closeModal();
        }
      }
    } catch (error) {
      if (typeof window !== 'undefined') {
        alert("Error saving record: " + error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (typeof window !== 'undefined' && !confirm("Are you sure you want to delete this record?")) return;

    try {
      const response = await fetch("/api/admin/career", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableName: currentTable,
          id: id,
        }),
      });
      const data = await response.json();
      if (data.success && typeof window !== 'undefined') {
        alert("Record deleted successfully!");
        fetchRecords();
      }
    } catch (error) {
      if (typeof window !== 'undefined') {
        alert("Error deleting record: " + error.message);
      }
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    
    if (!file) {
      if (typeof window !== 'undefined') alert("Please select a CSV file");
      return;
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      if (typeof window !== 'undefined') alert("Please upload a CSV file");
      return;
    }

    setUploading(true);
    setUploadMessage("");

    const formData = new FormData();
    formData.append("csvFile", file);
    formData.append("tableName", currentTable);

    try {
      const response = await fetch(`/api/admin/career?upload=true`, {
        method: "POST",
        body: formData,
      });

      console.log("Upload response status:", response.status);
      const data = await response.json();
      console.log("Upload response data:", data);
      
      if (data.success) {
        setUploadMessage(`✅ Successfully imported ${data.insertedCount || data.inserted} records!`);
        if (typeof window !== 'undefined') {
          alert(`CSV imported successfully! ${data.insertedCount || data.inserted} records added to ${currentTable}`);
        }
        fetchRecords();
        setTimeout(() => {
          closeUploadModal();
        }, 2000);
      } else {
        setUploadMessage(`❌ Error: ${data.message || data.error}`);
        if (typeof window !== 'undefined') {
          alert(`Error: ${data.message || data.error}`);
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadMessage(`❌ Upload failed: ${error.message}`);
      if (typeof window !== 'undefined') {
        alert(`Upload failed: ${error.message}`);
      }
    } finally {
      setUploading(false);
    }
  };

  const paginatedRecords = records.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalPages = Math.ceil(records.length / perPage);

  // Don't render until mounted to prevent hydration errors
  if (!mounted || loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
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
      
      <div className="header">
        <h1>Career Master Tables Management</h1>
        <p>Manage all career master data tables in one place</p>
      </div>

      <div className="content">
        <div className="table-selector">
          <div className="table-selector-header">
            <h3>Select Master Table</h3>
          </div>
          <select value={currentTable} onChange={handleTableChange}>
            {tables.map((table) => (
              <option key={table.value} value={table.value}>
                {table.label}
              </option>
            ))}
          </select>
        </div>

        <div className="toolbar">
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="btn btn-primary" onClick={() => openModal("add")}>
              <span>+</span> Add Single Record
            </button>
            <button className="btn btn-success" onClick={openUploadModal}>
              📁 Upload CSV
            </button>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div className="current-table-badge">
              <span>{currentTable}</span>
            </div>
            <div className="view-selector">
              <label htmlFor="perPage">Show:</label>
              <select
                id="perPage"
                value={perPage}
                onChange={(e) => {
                  setPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Mast ID</th>
                <th>Option</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((record) => (
                  <tr key={record.mastid}>
                    <td>{record.mastid}</td>
                    <td>{record.option}</td>
                    <td style={{ textAlign: "right" }}>
                      <div className="actions">
                        <button
                          className="btn btn-primary btn-small"
                          onClick={() => openModal("edit", record)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() => handleDelete(record.mastid)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">
                    <div className="empty-state">
                      <h3>No records found</h3>
                      <p>Get started by adding your first record or uploading a CSV</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <div className="pagination-info">
            {records.length > 0
              ? `Showing ${(currentPage - 1) * perPage + 1} to ${Math.min(
                  currentPage * perPage,
                  records.length
                )} of ${records.length} entries`
              : "No entries"}
          </div>
          <div className="pagination-controls">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ← Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="page-btn"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal show" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>{modalMode === "edit" ? "Edit Record" : "Add New Record"}</h2>
              <div className="table-name">{currentTable}</div>
            </div>
            <form onSubmit={handleSaveRecord}>
              {modalMode === "edit" && (
                <div className="form-group">
                  <label>Mast ID</label>
                  <input type="number" value={editRecord?.mastid} disabled />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="option">Option *</label>
                <textarea
                  id="option"
                  name="option"
                  required
                  maxLength="255"
                  defaultValue={editRecord?.option || ""}
                  placeholder="Enter option value..."
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Upload Modal */}
      {showUploadModal && (
        <div className="modal show" onClick={(e) => e.target === e.currentTarget && closeUploadModal()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Upload CSV to {currentTable}</h2>
              <div className="table-name">
                CSV must have one column: "option"
              </div>
            </div>
            <form onSubmit={handleFileUpload}>
              <div className="form-group">
                <label htmlFor="csvFile">Select CSV File *</label>
                <input
                  type="file"
                  id="csvFile"
                  ref={fileInputRef}
                  accept=".csv"
                  required
                />
                <small style={{ display: "block", marginTop: "8px", color: "#6b7280" }}>
                  CSV format: One column named "option". Each row is one option value.
                  <br />
                  <strong>Example:</strong>
                  <br />
                  option
                  <br />
                  Communication Skills
                  <br />
                  Problem Solving
                  <br />
                  Leadership
                </small>
              </div>
              
              {uploadMessage && (
                <div style={{
                  padding: "12px",
                  marginBottom: "20px",
                  borderRadius: "8px",
                  backgroundColor: uploadMessage.includes("✅") ? "#d1fae5" : "#fee2e2",
                  color: uploadMessage.includes("✅") ? "#065f46" : "#991b1b"
                }}>
                  {uploadMessage}
                </div>
              )}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeUploadModal}
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-success"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload CSV"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}