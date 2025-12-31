"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./career-db.css";
import Link from 'next/link';

export default function CareerDBPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState("");
  const [records, setRecords] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [file, setFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    
    if (!storedUser) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
    setLoading(false);
  }, [router]);

  const tables = [
    "mast_career_ability",
    "mast_career_activity", 
    "mast_career_industry",
    "mast_career_interest",
    "mast_career_knowledge",
    "mast_career_outlook",
    "mast_career_pathway",
    "mast_career_preference",
    "mast_career_sector",
    "mast_career_skills",
    "mast_career_stem",
    "mast_career_technology",
    "mast_career_trait",
    "mast_career_zone",
    "careerchoice",
    "career_data",
    "career",
    'career_data_test'
  ];

  const handleTableSelect = async (table) => {
    setSelectedTable(table);
    if (table) {
      try {
        const response = await fetch(`/api/admin/career?table=${table}`);
        const data = await response.json();
        if (data.success) {
          setRecords(data.records || []);
        } else {
          setRecords([]);
          console.error('Error fetching records:', data.error);
        }
      } catch (error) {
        console.error("Error fetching records:", error);
        setRecords([]);
      }
    } else {
      setRecords([]);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMessage("");
  };

  const handleUpload = async () => {
    if (!file || !selectedTable) {
      setUploadMessage("❌ Please select a table and file");
      return;
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setUploadMessage("❌ Please select a CSV file");
      return;
    }

    setUploading(true);
    setUploadMessage("Uploading...");

    const formData = new FormData();
    formData.append('file', file);
    formData.append('tableName', selectedTable);

    try {
      const response = await fetch('/api/admin/career', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setUploadMessage(`✅ ${data.message}`);
        // Refresh records after upload
        await handleTableSelect(selectedTable);
        setFile(null);
        // Reset file input
        const fileInput = document.getElementById('csvFile');
        if (fileInput) fileInput.value = '';
      } else {
        // Show detailed error message
        let errorMsg = data.error || 'Upload failed';
        if (data.hint) {
          errorMsg += `. ${data.hint}`;
        }
        setUploadMessage(`❌ ${errorMsg}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadMessage(`❌ Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleAddRecord = async () => {
    if (!selectedTable) {
      alert("Please select a table first");
      return;
    }
    
    // Different prompt based on table type
    let promptMessage = "Enter record name:";
    let recordField = "option";
    
    if (selectedTable === "career_data") {
      promptMessage = "Enter career code (will be saved in 'careercode' column):";
      recordField = "careercode";
    }
    
    const recordValue = prompt(promptMessage);
    if (recordValue) {
      try {
        const recordData = selectedTable === "career_data" 
          ? { careercode: recordValue }
          : { option: recordValue };
          
        const response = await fetch('/api/admin/career', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tableName: selectedTable,
            record: recordData
          })
        });
        
        const data = await response.json();
        if (data.success) {
          alert("Record added successfully!");
          await handleTableSelect(selectedTable);
        } else {
          alert("Error: " + data.error);
        }
      } catch (error) {
        alert("Error adding record: " + error.message);
      }
    }
  };

  const getCsvNote = () => {
    if (selectedTable === "career_data") {
      return "📝 CSV should have column headers matching career_data table (e.g., maskId, careercode, Importance, zone)";
    } else if (selectedTable === "careerchoice") {
      return "📝 CSV should have column headers matching careerchoice table (e.g., career_choice, career_master)";
    } else {
      return "📝 CSV should have column headers matching database columns (e.g., option, importance, job_zone, code)";
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
 
    // Add this to the top of each admin page


    <div className="career-db-container">
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
      <header className="db-header">
        <h1>📊 Career Database Manager</h1>
        <p>Manage all career-related tables with ease</p>
        <button onClick={() => router.push("/dashboard")}>← Back to Dashboard</button>
      </header>

      <div className="db-controls">
        <div className="table-selector">
          <label>Select Table:</label>
          <select 
            value={selectedTable} 
            onChange={(e) => handleTableSelect(e.target.value)}
          >
            <option value="">Choose Table</option>
            {tables.map(table => (
              <option key={table} value={table}>{table}</option>
            ))}
          </select>
        </div>

        <div className="record-info">
          <span>Records: {records.length}</span>
          <button className="add-btn" onClick={handleAddRecord}>+ Add Record</button>
        </div>
      </div>

      <div className="csv-upload">
        <h3>Upload CSV:</h3>
        <input 
          type="file" 
          id="csvFile"
          accept=".csv" 
          onChange={handleFileChange}
          disabled={uploading || !selectedTable}
        />
        <button onClick={handleUpload} disabled={uploading || !file || !selectedTable}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {uploadMessage && (
          <p className={`upload-message ${uploadMessage.includes("✅") ? "success" : "error"}`}>
            {uploadMessage}
          </p>
        )}
        <p className="csv-note">
          {getCsvNote()}
        </p>
      </div>

      <div className="records-table">
        {selectedTable ? (
          <>
            <h3>Records in: <code>{selectedTable}</code></h3>
            {records.length > 0 ? (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      {Object.keys(records[0]).map(key => (
                        <th key={key}>{key}</th>
                      ))}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => (
                      <tr key={index}>
                        {Object.values(record).map((value, idx) => (
                          <td key={idx}>{value?.toString() || ''}</td>
                        ))}
                        <td>
                          <button className="edit-btn">Edit</button>
                          <button className="delete-btn">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-records">
                <p>No records found. Upload a CSV or add a record.</p>
              </div>
            )}
          </>
        ) : (
          <div className="placeholder">
            <h2>Select a table to get started</h2>
            <p>Choose a table from the dropdown above to view and manage records</p>
          </div>
        )}
      </div>
    </div>
  );
}