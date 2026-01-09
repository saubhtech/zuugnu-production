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
    8: "💪", 9: "⚡", 10: "🏭", 11: "❤️", 12: "📚", 13: "📈", 
    14: "🛤️", 15: "⭐", 16: "🎯", 17: "🔧", 18: "🔬", 
    19: "💻", 20: "🎭", 21: "🌍"
  };

  // ✅ Helper to show graph with top data
  const showTopData = (career, dataKey, title) => {
    const data = career[dataKey];
    
    console.log(`Showing ${title} for ${career.name}:`, data); // Debug log
    
    if (!data || data.length === 0) {
      console.warn(`No data available for ${title} in ${career.name}`);
      return;
    }

    const sorted = [...data].sort((a, b) => b.importance - a.importance);
    const topData = sorted.slice(0, 20);

    setGraphTitle(`${career.name} – ${title} (Top ${topData.length})`);
    setGraphData(topData);
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
          if (value !== null && value !== "" && value !== undefined) {
            acc[key] = [value];
          }
          return acc;
        },
        {}
      );

      console.log("Sending filters:", cleanedFilters); // Debug log

      const response = await fetch("/api/career/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters: cleanedFilters }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Received careers data:", data.careers); // Debug log
        
        // ✅ Log each career's data structure
        data.careers.forEach(career => {
          console.log(`Career: ${career.name}`, {
            ability: career.ability?.length || 0,
            activity: career.activity?.length || 0,
            knowledge: career.knowledge?.length || 0,
            preference: career.preference?.length || 0,
            skills: career.skills?.length || 0,
            technology: career.technology?.length || 0,
            traits: career.traits?.length || 0
          });
        });

        setCareers(data.careers);
      } else {
        console.error("Search failed:", data.message);
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

  // ✅ Helper function to check if data exists and has valid items
  const hasValidData = (data) => {
    return data && Array.isArray(data) && data.length > 0;
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
              <div className="filter-header">
                <label className="filter-label">
                  <span className="filter-icon">
                    {filterIcons[choiceId] || "🔹"}
                  </span>
                  {filter.name}
                </label>
                
                {selectedFilters[choiceId] && (
                  <button
                    onClick={() => {
                      setSelectedFilters((prev) => {
                        const newFilters = { ...prev };
                        delete newFilters[choiceId];
                        return newFilters;
                      });
                    }}
                    className="clear-filter-btn"
                    title="Clear selection"
                  >
                    ✕
                  </button>
                )}
              </div>
              
              <select
                value={selectedFilters[choiceId] || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setSelectedFilters((prev) => {
                      const newFilters = { ...prev };
                      delete newFilters[choiceId];
                      return newFilters;
                    });
                  } else {
                    setSelectedFilters((prev) => ({
                      ...prev,
                      [choiceId]: parseInt(value)
                    }));
                  }
                }}
                className="single-select-dropdown"
              >
                <option value="">-- Select an option --</option>
                {filter.options.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              
              {selectedFilters[choiceId] && (
                <div className="selected-option">
                  ✓ {filter.options.find(o => o.id === selectedFilters[choiceId])?.label}
                </div>
              )}
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
                <td colSpan="8" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                  {searching ? "Searching..." : "No careers found. Select filters and click Apply."}
                </td>
              </tr>
            ) : (
              displayedCareers.map((career) => (
                <tr key={career.id}>
                  <td className="occupation-name" title={career.details}>
                    {career.name}
                  </td>
                  
                  {/* ✅ Abilities */}
                  <td>
                    <span
                      className={`graph-icon ${hasValidData(career.ability) ? 'clickable' : 'disabled'}`}
                      onClick={() => hasValidData(career.ability) && showTopData(career, 'ability', 'Abilities')}
                      title={hasValidData(career.ability) ? `View ${career.ability.length} abilities` : 'No data available'}
                    >
                      📊
                    </span>
                  </td>
                  
                  {/* ✅ Activities */}
                  <td>
                    <span
                      className={`graph-icon ${hasValidData(career.activity) ? 'clickable' : 'disabled'}`}
                      onClick={() => hasValidData(career.activity) && showTopData(career, 'activity', 'Activities')}
                      title={hasValidData(career.activity) ? `View ${career.activity.length} activities` : 'No data available'}
                    >
                      📊
                    </span>
                  </td>
                  
                  {/* ✅ Knowledge */}
                  <td>
                    <span
                      className={`graph-icon ${hasValidData(career.knowledge) ? 'clickable' : 'disabled'}`}
                      onClick={() => hasValidData(career.knowledge) && showTopData(career, 'knowledge', 'Knowledge')}
                      title={hasValidData(career.knowledge) ? `View ${career.knowledge.length} knowledge areas` : 'No data available'}
                    >
                      📊
                    </span>
                  </td>
                  
                  {/* ✅ Preference */}
                  <td>
                    <span
                      className={`graph-icon ${hasValidData(career.preference) ? 'clickable' : 'disabled'}`}
                      onClick={() => hasValidData(career.preference) && showTopData(career, 'preference', 'Preference')}
                      title={hasValidData(career.preference) ? `View ${career.preference.length} preferences` : 'No data available'}
                    >
                      📊
                    </span>
                  </td>
                  
                  {/* ✅ Skills */}
                  <td>
                    <span
                      className={`graph-icon ${hasValidData(career.skills) ? 'clickable' : 'disabled'}`}
                      onClick={() => hasValidData(career.skills) && showTopData(career, 'skills', 'Skills')}
                      title={hasValidData(career.skills) ? `View ${career.skills.length} skills` : 'No data available'}
                    >
                      📊
                    </span>
                  </td>
                  
                  {/* ✅ Technology */}
                  <td>
                    <span
                      className={`graph-icon ${hasValidData(career.technology) ? 'clickable' : 'disabled'}`}
                      onClick={() => hasValidData(career.technology) && showTopData(career, 'technology', 'Technology')}
                      title={hasValidData(career.technology) ? `View ${career.technology.length} technologies` : 'No data available'}
                    >
                      📊
                    </span>
                  </td>
                  
                  {/* ✅ Traits */}
                  <td>
                    <span
                      className={`graph-icon ${hasValidData(career.traits) ? 'clickable' : 'disabled'}`}
                      onClick={() => hasValidData(career.traits) && showTopData(career, 'traits', 'Traits')}
                      title={hasValidData(career.traits) ? `View ${career.traits.length} traits` : 'No data available'}
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
          Showing {startIndex + 1} to {Math.min(endIndex, filteredCareers.length)} of {filteredCareers.length} records
        </div>
        <div className="pagination-buttons">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>Previous</button>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>

      {showGraph && (
        <div className="graph-modal-overlay" onClick={() => setShowGraph(false)}>
          <div className="graph-modal" onClick={(e) => e.stopPropagation()}>
            <button className="graph-close-icon" onClick={() => setShowGraph(false)}>×</button>

            <div className="graph-modal-header">
              <h2>{graphTitle}</h2>
              <p className="graph-subtitle">Importance distribution (0–100)</p>
            </div>

            <div className="graph-bars">
              {graphData.map((item, idx) => {
                const barHeight = graphData.length > 10 ? "14px" : graphData.length > 6 ? "16px" : "18px";

                return (
                  <div key={idx} className="bar-row">
                    <span className="bar-label">{item.option}</span>
                    <div className="bar" style={{ height: barHeight }}>
                      <div className="bar-fill" style={{ width: `${item.importance}%` }}>
                        {item.importance}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="graph-modal-footer">
              <button className="close-btn" onClick={() => setShowGraph(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}