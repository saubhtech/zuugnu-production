"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./career-choice.css";

export default function CareerChoicePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [careers, setCareers] = useState([]);
  const [searching, setSearching] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [showGraph, setShowGraph] = useState(false);
  const [graphTitle, setGraphTitle] = useState("");
  const [graphData, setGraphData] = useState([]);

  const router = useRouter();

  const filterIcons = {
    8: "💪", // Ability
    9: "⚡", // Activity
    10: "🏭", // Industry
    11: "❤️", // Interest
    12: "📚", // Knowledge
    13: "📈", // Outlook
    14: "🛤️", // Pathway
    15: "⭐", // Preference
    16: "🎯", // Sector
    17: "🔧", // Skills
    18: "🔬", // STEM
    19: "💻", // Technology
    20: "🎭", // Traits
    21: "🌍", // Zone
  };

  const openAbilityGraph = (career) => {
    const filtered = career.ability.filter((a) => a.importance > 30);

    if (filtered.length === 0) {
      alert("No abilities with importance above 30");
      return;
    }

    setGraphTitle(career.name + " – Career Abilities");
    setGraphData(filtered);
    setShowGraph(true);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
    loadFilters();
  }, [router]);

  const loadFilters = async () => {
    try {
      const response = await fetch("/api/career/filters");
      const data = await response.json();

      if (data.success) {
        setFilterOptions(data.filters);
      }
    } catch (error) {
      console.error("Failed to load filters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setSearching(true);
    setCurrentPage(1);

    try {
      const cleanedFilters = Object.entries(selectedFilters).reduce(
        (acc, [key, value]) => {
          if (value && value.length > 0 && value[0] !== null) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      const response = await fetch("/api/career/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters: cleanedFilters }),
      });

      const data = await response.json();

      if (data.success) {
        setCareers(data.careers);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleReset = () => {
    setSelectedFilters({});
    setCareers([]);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const filteredCareers = careers.filter((career) =>
    career.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCareers.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const displayedCareers = filteredCareers.slice(startIndex, endIndex);

  if (loading) return <div className="loading">Loading career data...</div>;

  return (
    <div className="career-container">
      <header className="career-header">
        <button className="home-btn" onClick={() => router.push("/dashboard")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </button>

        <div className="header-content">
          <h1>🎯 Career Explorer</h1>
          <p>Discover your ideal career path</p>
        </div>
      </header>

      <div className="filters-section">
        <div className="filters-grid">
          {Object.entries(filterOptions).map(([choiceId, filter]) => (
            <div key={choiceId} className="filter-item">
              <label className="filter-label">
                <span className="filter-icon">
                  {filterIcons[choiceId] || "🔹"}
                </span>
                {filter.name}
              </label>
              <select
                value={selectedFilters[choiceId]?.[0] || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    setSelectedFilters((prev) => ({
                      ...prev,
                      [choiceId]: [parseInt(value)],
                    }));
                  } else {
                    const newFilters = { ...selectedFilters };
                    delete newFilters[choiceId];
                    setSelectedFilters(newFilters);
                  }
                }}
              >
                <option value="">Select {filter.name}</option>
                {filter.options.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        <div className="show-entries">
          <span>Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>entries</span>
        </div>

        <div className="filter-actions">
          <button
            className="apply-btn"
            onClick={handleSearch}
            disabled={searching}
          >
            {searching ? "Searching..." : "Apply Filters"}
          </button>
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className="search-box">
          <span>Search:</span>
          <input
            type="text"
            placeholder="Search careers..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="table-section">
        <table className="career-table">
          <thead>
            <tr>
              <th>Occupations</th>
              <th>📊 Abilities</th>
              <th>⚡ Activities</th>
              <th>📚 Knowledge</th>
              <th>⭐ Preference</th>
              <th>🔧 Skills</th>
              <th>💻 Technology</th>
              <th>🎭 Traits</th>
            </tr>
          </thead>
          <tbody>
            {displayedCareers.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#64748b",
                  }}
                >
                  {searching
                    ? "Searching..."
                    : "No careers found. Select filters and click Apply."}
                </td>
              </tr>
            ) : (
              displayedCareers.map((career) => (
                <tr key={career.id}>
                  <td className="occupation-name">{career.name}</td>
                  <td>
                    <span
                      className="graph-icon clickable"
                      onClick={() => openAbilityGraph(career)}
                    >
                      📊
                    </span>
                  </td>

                  <td>
                    <span
                      className="graph-icon"
                      title={career.activity
                        .map((a) => `${a.option} (${a.importance})`)
                        .join(", ")}
                    >
                      📊
                    </span>
                  </td>
                  <td>
                    <span
                      className="graph-icon"
                      title={career.knowledge
                        .map((a) => `${a.option} (${a.importance})`)
                        .join(", ")}
                    >
                      📊
                    </span>
                  </td>
                  <td>
                    <span
                      className="graph-icon"
                      title={career.preference
                        .map((a) => `${a.option} (${a.importance})`)
                        .join(", ")}
                    >
                      📊
                    </span>
                  </td>
                  <td>
                    <span
                      className="graph-icon"
                      title={career.skills
                        .map((a) => `${a.option} (${a.importance})`)
                        .join(", ")}
                    >
                      📊
                    </span>
                  </td>
                  <td>
                    <span
                      className="graph-icon"
                      title={career.technology
                        .map((a) => `${a.option} (${a.importance})`)
                        .join(", ")}
                    >
                      📊
                    </span>
                  </td>
                  <td>
                    <span
                      className="graph-icon"
                      title={career.traits
                        .map((a) => `${a.option} (${a.importance})`)
                        .join(", ")}
                    >
                      📊
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredCareers.length)} of{" "}
          {filteredCareers.length} records
        </div>
        <div className="pagination-buttons">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            First
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            Last
          </button>
        </div>
      </div>

      {showGraph && (
        <div className="graph-modal-overlay">
          <div className="graph-modal">
            <div className="graph-modal-header">
              <h2>{graphTitle}</h2>
            </div>

            <div className="graph-bars">
              {graphData.map((item, idx) => {
                const barHeight =
                  graphData.length > 10
                    ? "14px"
                    : graphData.length > 6
                    ? "16px"
                    : "18px";

                return (
                  <div key={idx} className="bar-row">
                    <span className="bar-label">{item.option}</span>
                    <div className="bar" style={{ height: barHeight }}>
                      <div
                        className="bar-fill"
                        style={{ width: `${item.importance}%` }}
                      >
                        {item.importance}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 👇 CLOSE BUTTON ALWAYS VISIBLE AFTER SCROLL */}
            <div className="graph-modal-footer">
              <button className="close-btn" onClick={() => setShowGraph(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
