"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import "./career-choice.css";
import Link from 'next/link';

export default function CareerChoicePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [records, setRecords] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editRecord, setEditRecord] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef(null);
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
  }, [router, mounted]);

  useEffect(() => {
    if (!loading && mounted) {
      fetchRecords();
    }
  }, [loading, mounted]);

  useEffect(() => {
    if (mounted) {
      handleSearch();
    }
  }, [searchTerm, records, mounted]);

  const fetchRecords = async () => {
    try {
      const response = await fetch("/api/admin/career-choice");
      const data = await response.json();
      if (data.success) {
        setRecords(data.records || []);
        setFilteredData(data.records || []);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const handleSearch = () => {
    if (searchTerm === "") {
      setFilteredData(records);
    } else {
      const filtered = records.filter(
        (record) =>
          record.choiceid.toString().includes(searchTerm.toLowerCase()) ||
          record.career_choice.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.mast_career.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
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
    const career_choice = formData.get("career_choice");
    const mast_career = formData.get("mast_career");

    try {
      if (modalMode === "edit" && editRecord) {
        const response = await fetch("/api/admin/career-choice", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editRecord.choiceid,
            record: { career_choice, mast_career },
          }),
        });
        const data = await response.json();
        if (data.success) {
          alert("Record updated successfully!");
          fetchRecords();
          closeModal();
        }
      } else {
        const response = await fetch("/api/admin/career-choice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            record: { career_choice, mast_career },
          }),
        });
        const data = await response.json();
        if (data.success) {
          alert("Record added successfully!");
          fetchRecords();
          closeModal();
        }
      }
    } catch (error) {
      alert("Error saving record: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      const response = await fetch("/api/admin/career-choice", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Record deleted successfully!");
        fetchRecords();
      }
    } catch (error) {
      alert("Error deleting record: " + error.message);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];

    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      alert("Please upload a CSV file");
      return;
    }

    setUploading(true);
    setUploadMessage("");

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const response = await fetch("/api/admin/career-choice?upload=true", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadMessage(
          `✅ Successfully imported ${data.insertedCount || data.inserted} records!`
        );
        alert(
          `CSV imported successfully! ${data.insertedCount || data.inserted} records added`
        );
        fetchRecords();
        setTimeout(() => {
          closeUploadModal();
        }, 2000);
      } else {
        setUploadMessage(`❌ Error: ${data.message || data.error}`);
        alert(`Error: ${data.message || data.error}`);
      }
    } catch (error) {
      setUploadMessage(`❌ Upload failed: ${error.message}`);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const paginatedRecords = filteredData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalPages = Math.ceil(filteredData.length / perPage);

  const uniqueChoices = new Set(records.map((r) => r.career_choice)).size;
  const uniqueCareers = new Set(records.map((r) => r.mast_career)).size;

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
        <h1>Career Choice Management</h1>
        <p>Manage all career choice records</p>
      </div>

      <div className="content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Records</div>
            <div className="stat-value">{records.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Unique Career Choices</div>
            <div className="stat-value">{uniqueChoices}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Unique Master Careers</div>
            <div className="stat-value">{uniqueCareers}</div>
          </div>
        </div>

        <div className="toolbar">
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => openModal("add")}>
              <span>+</span> Add New Record
            </button>
            <button className="btn btn-success" onClick={openUploadModal}>
              📁 Upload CSV
            </button>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <div className="search-box">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                type="text"
                placeholder="Search by ID, career choice, or master career..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                <th>Choice ID</th>
                <th>Career Choice</th>
                <th>Master Career</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((record) => (
                  <tr key={record.choiceid}>
                    <td>
                      <span className="badge">{record.choiceid}</span>
                    </td>
                    <td>
                      <strong>{record.career_choice}</strong>
                    </td>
                    <td>{record.mast_career}</td>
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
                          onClick={() => handleDelete(record.choiceid)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    <div className="empty-state">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      <h3>{searchTerm ? "No records match your search" : "No records found"}</h3>
                      <p>
                        {searchTerm
                          ? "Try adjusting your search terms"
                          : "Get started by adding your first career choice record"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <div className="pagination-info">
            {filteredData.length > 0
              ? `Showing ${(currentPage - 1) * perPage + 1} to ${Math.min(
                  currentPage * perPage,
                  filteredData.length
                )} of ${filteredData.length} entries${searchTerm ? " (filtered)" : ""}`
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
        <div
          className="modal show"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2>{modalMode === "edit" ? "Edit Record" : "Add New Record"}</h2>
            </div>
            <form onSubmit={handleSaveRecord}>
              {modalMode === "edit" && (
                <div className="form-group">
                  <label>Choice ID</label>
                  <input type="number" value={editRecord?.choiceid} disabled />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="career_choice">Career Choice *</label>
                <input
                  type="text"
                  id="career_choice"
                  name="career_choice"
                  required
                  maxLength="200"
                  defaultValue={editRecord?.career_choice || ""}
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div className="form-group">
                <label htmlFor="mast_career">Master Career *</label>
                <input
                  type="text"
                  id="mast_career"
                  name="mast_career"
                  required
                  maxLength="100"
                  defaultValue={editRecord?.mast_career || ""}
                  placeholder="e.g., Technology & IT"
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
        <div
          className="modal show"
          onClick={(e) => e.target === e.currentTarget && closeUploadModal()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2>Upload CSV to Career Choice</h2>
              <div className="table-name">
                CSV must have two columns: "career_choice" and "mast_career"
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
                <small
                  style={{
                    display: "block",
                    marginTop: "8px",
                    color: "#6b7280",
                  }}
                >
                  CSV format: Two columns named "career_choice" and "mast_career"
                  <br />
                  <strong>Example:</strong>
                  <br />
                  career_choice,mast_career
                  <br />
                  Software Engineer,Technology & IT
                  <br />
                  Doctor,Healthcare
                  <br />
                  Teacher,Education
                </small>
              </div>

              {uploadMessage && (
                <div
                  style={{
                    padding: "12px",
                    marginBottom: "20px",
                    borderRadius: "8px",
                    backgroundColor: uploadMessage.includes("✅")
                      ? "#d1fae5"
                      : "#fee2e2",
                    color: uploadMessage.includes("✅") ? "#065f46" : "#991b1b",
                  }}
                >
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