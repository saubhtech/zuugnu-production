"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./career-choice.css";

export default function CareerChoicePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [occupations, setOccupations] = useState([
    {
      id: 1,
      name: "Web Designer",
      abilities: "Creative",
      activities: "Indoor",
      knowledge: "Computer Science",
      preference: "Remote",
      skills: "UI/UX",
      technology: "Software",
      traits: "Detail-oriented",
    },
    {
      id: 2,
      name: "Software Developer",
      abilities: "Analytical",
      activities: "Indoor",
      knowledge: "Engineering",
      preference: "Hybrid",
      skills: "Coding",
      technology: "Software",
      traits: "Strategic",
    },
    {
      id: 3,
      name: "Data Scientist",
      abilities: "Analytical",
      activities: "Indoor",
      knowledge: "Computer Science",
      preference: "Remote",
      skills: "Problem Solving",
      technology: "AIML",
      traits: "Detail-oriented",
    },
    {
      id: 4,
      name: "Healthcare Manager",
      abilities: "Social",
      activities: "Mixed",
      knowledge: "Business",
      preference: "On-site",
      skills: "Leadership",
      technology: "Hardware",
      traits: "Collaborative",
    },
    {
      id: 5,
      name: "Financial Analyst",
      abilities: "Analytical",
      activities: "Indoor",
      knowledge: "Business",
      preference: "Hybrid",
      skills: "Problem Solving",
      technology: "Software",
      traits: "Strategic",
    },
    {
      id: 6,
      name: "Mechanical Engineer",
      abilities: "Technical",
      activities: "Mixed",
      knowledge: "Engineering",
      preference: "On-site",
      skills: "Problem Solving",
      technology: "Hardware",
      traits: "Detail-oriented",
    },
    {
      id: 7,
      name: "Teacher",
      abilities: "Social",
      activities: "Indoor",
      knowledge: "Education",
      preference: "On-site",
      skills: "Communication",
      technology: "Software",
      traits: "Collaborative",
    },
    {
      id: 8,
      name: "Marketing Manager",
      abilities: "Creative",
      activities: "Mixed",
      knowledge: "Business",
      preference: "Hybrid",
      skills: "Leadership",
      technology: "Software",
      traits: "Strategic",
    },
    {
      id: 9,
      name: "AI Specialist",
      abilities: "Analytical",
      activities: "Indoor",
      knowledge: "Computer Science",
      preference: "Remote",
      skills: "Problem Solving",
      technology: "AIML",
      traits: "Strategic",
    },
    {
      id: 10,
      name: "Civil Engineer",
      abilities: "Technical",
      activities: "Outdoor",
      knowledge: "Engineering",
      preference: "On-site",
      skills: "Problem Solving",
      technology: "Hardware",
      traits: "Detail-oriented",
    },
  ]);

  const [filters, setFilters] = useState({
    ability: "",
    activity: "",
    industry: "",
    interest: "",
    knowledge: "",
    outlook: "",
    pathway: "",
    preference: "",
    sector: "",
    skills: "",
    stem: "",
    technology: "",
    traits: "",
    zone: "",
  });

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

  // ✅ SIMPLE STRING ARRAY WITH ICONS
  const filterOptions = {
    ability: [
      " Select Ability",
      "📊 Analytical",
      "🎨 Creative",
      "⚙️ Technical",
      "👥 Social",
      "🔧 Practical",
    ],
    activity: [
      " Select Activity",
      "🏢 Indoor",
      "🌳 Outdoor",
      "🔄 Mixed",
      "📍 Field Work",
      "💼 Desk Job",
    ],
    industry: [
      " Select Industry",
      "💻 Technology",
      "🏥 Healthcare",
      "💰 Finance",
      "📚 Education",
      "🏭 Manufacturing",
      "🛍️ Retail",
      "🏗️ Construction",
    ],
    interest: [
      " Select Interest",
      "🔬 Technology",
      "🎭 Arts",
      "🧪 Science",
      "📈 Business",
      "🩺 Healthcare",
      "✏️ Education",
      "🔧 Engineering",
    ],
    knowledge: [
      " Select Knowledge",
      "💾 Computer Science",
      "📊 Business",
      "⚙️ Engineering",
      "🩺 Healthcare",
      "📖 Education",
      "➗ Mathematics",
      "⚛️ Physics",
    ],
    outlook: [
      " Select Outlook",
      "🌟 Excellent",
      "👍 Good",
      "➖ Average",
      "📉 Declining",
      "🚀 Emerging",
    ],
    pathway: [
      " Select Pathway",
      "🏛️ Traditional",
      "🔄 Alternative",
      "🔧 Vocational",
      "💻 Technical",
      "🎓 Academic",
    ],
    preference: [
      " Select Preference",
      "🏠 Remote",
      "🏢🏠 Hybrid",
      "🏢 On-site",
      "🔄 Flexible",
      "✈️ Travel",
    ],
    sector: [
      " Select Sector",
      "🏛️ Public",
      "💼 Private",
      "🤝 Non-profit",
      "🇮🇳 Government",
      "🚀 Startup",
    ],
    skills: [
      " Select Skills",
      "💬 Communication",
      "👑 Leadership",
      "🧩 Problem Solving",
      "🤝 Teamwork",
      "💻 Technical Skills",
      "🎨 Creativity",
      "📈 Analytical",
    ],
    stem: [
      " Select STEM",
      "🧪 Science",
      "💻 Technology",
      "⚙️ Engineering",
      "🧮 Mathematics",
      "🔬💻⚙️🧮 All STEM",
      "📚 Non-STEM",
    ],
    technology: [
      " Select Technology",
      "💾 Software",
      "🔧 Hardware",
      "🧠 AIML",
      "🤖 Robotics",
      "🧬 Biotech",
      "🌱 Clean Tech",
      "🚫 None",
    ],
    traits: [
      " Select Traits",
      "🔍 Detail-oriented",
      "♟️ Strategic",
      "🤝 Collaborative",
      "🦸 Independent",
      "🔄 Adaptable",
      "💪 Persistent",
      "💡 Innovative",
    ],
    zone: [
      "🗺️ Select Zone",
      "1️⃣ Zone 1",
      "2️⃣ Zone 2",
      "3️⃣ Zone 3",
      "4️⃣ Zone 4",
      "5️⃣ Zone 5",
    ],
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleSearch = () => {
    const filtered = occupations.filter((occ) => {
      return (
        (!filters.ability ||
          filters.ability.includes("Select") ||
          occ.abilities === filters.ability.replace(/^[^\w\s]+/, "").trim()) &&
        (!filters.activity ||
          filters.activity.includes("Select") ||
          occ.activities ===
            filters.activity.replace(/^[^\w\s]+/, "").trim()) &&
        (!filters.preference ||
          filters.preference.includes("Select") ||
          occ.preference ===
            filters.preference.replace(/^[^\w\s]+/, "").trim()) &&
        (!filters.technology ||
          filters.technology.includes("Select") ||
          occ.technology ===
            filters.technology.replace(/^[^\w\s]+/, "").trim()) &&
        (!filters.traits ||
          filters.traits.includes("Select") ||
          occ.traits === filters.traits.replace(/^[^\w\s]+/, "").trim())
      );
    });
    return filtered;
  };

  const filteredOccupations = handleSearch();

  const filterIcons = {
  ability: (
    <svg viewBox="0 0 64 64">
      <circle cx="32" cy="20" r="8" />
      <path d="M32 30L32 44M26 38L32 44L38 38" />
    </svg>
  ),

  activity: (
    <svg viewBox="0 0 64 64">
      <rect x="12" y="20" width="40" height="32" rx="4" />
      <circle cx="32" cy="36" r="6" />
    </svg>
  ),

  industry: (
    <svg viewBox="0 0 64 64">
      <rect x="10" y="30" width="16" height="24" />
      <rect x="30" y="20" width="16" height="34" />
    </svg>
  ),

  interest: (
    <svg viewBox="0 0 64 64">
      <path d="M32 50L18 38C13 33 13 25 18 20C23 15 31 15 32 20C33 15 41 15 46 20C51 25 51 33 46 38L32 50Z" />
    </svg>
  ),

  knowledge: (
    <svg viewBox="0 0 64 64">
      <rect x="16" y="14" width="32" height="36" />
      <line x1="20" y1="24" x2="44" y2="24" />
    </svg>
  ),

  outlook: (
    <svg viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="20" />
      <path d="M32 32L44 20" />
    </svg>
  ),

  pathway: (
    <svg viewBox="0 0 64 64">
      <path d="M12 52L24 40L36 46L52 12" />
      <circle cx="12" cy="52" r="4" />
      <circle cx="24" cy="40" r="4" />
      <circle cx="36" cy="46" r="4" />
    </svg>
  ),

  preference: (
    <svg viewBox="0 0 64 64">
      <rect x="14" y="20" width="36" height="32" rx="4" />
    </svg>
  ),

  sector: (
    <svg viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="20" />
      <line x1="32" y1="12" x2="32" y2="52" />
      <line x1="12" y1="32" x2="52" y2="32" />
    </svg>
  ),

  skills: (
    <svg viewBox="0 0 64 64">
      <path d="M32 10L38 28H56L42 39L47 56L32 45L17 56L22 39L8 28H26Z" />
    </svg>
  ),

  stem: (
    <svg viewBox="0 0 64 64">
      <circle cx="32" cy="28" r="10" />
      <line x1="22" y1="28" x2="42" y2="28" />
    </svg>
  ),

  technology: (
    <svg viewBox="0 0 64 64">
      <rect x="10" y="16" width="44" height="32" rx="4" />
      <line x1="32" y1="48" x2="32" y2="56" />
    </svg>
  ),

  traits: (
    <svg viewBox="0 0 64 64">
      <circle cx="32" cy="24" r="10" />
      <path d="M16 52C16 42 24 34 32 34C40 34 48 42 48 52" />
    </svg>
  ),

  zone: (
    <svg viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="20" />
      <circle cx="32" cy="32" r="8" />
    </svg>
  ),
};


  if (loading) return <div className="loading">Loading career data...</div>;

  return (
    <div className="career-container">
      <header className="career-header">
        <button className="home-btn" onClick={() => router.push("/dashboard")}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </button>

        <div className="header-content">
          <h1 className="career-title">
            <span className="title-icon">
              {/* Career Explorer Icon */}
              <svg viewBox="0 0 64 64" width="28" height="28" fill="none">
                <circle
                  cx="32"
                  cy="32"
                  r="20"
                  stroke="#4A90E2"
                  strokeWidth="3"
                />
                <path
                  d="M32 32L42 22"
                  stroke="#4A90E2"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="32" cy="32" r="2" fill="#4A90E2" />
              </svg>
            </span>
            Career Choice Explorer
          </h1>

          <p className="career-subtitle">
            Find your perfect career match based on your preferences
          </p>
        </div>
      </header>

      <div className="filters-section">
        <h2>🔍 Filter Careers</h2>
        <div className="filters-grid">
          {Object.keys(filters).map((filterKey) => (
            <div key={filterKey} className="filter-item">
              <label>
                <span className="filter-icon">{filterIcons[filterKey]}</span>
                Career {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
              </label>
              <select
                value={filters[filterKey]}
                onChange={(e) => handleFilterChange(filterKey, e.target.value)}
              >
                {filterOptions[filterKey]?.map((opt, index) => (
                  <option key={index} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="filter-actions">
          <button className="apply-btn" onClick={handleSearch}>
            Apply Filters
          </button>
          <button
            className="reset-btn"
            onClick={() =>
              setFilters({
                ability: "",
                activity: "",
                industry: "",
                interest: "",
                knowledge: "",
                outlook: "",
                pathway: "",
                preference: "",
                sector: "",
                skills: "",
                stem: "",
                technology: "",
                traits: "",
                zone: "",
              })
            }
          >
            Reset All
          </button>
        </div>
      </div>

      <div className="results-section">
        <div className="results-header">
          <div className="entries-info">
            <span>Show </span>
            <select defaultValue="10">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span> entries</span>
          </div>

          <div className="search-box">
            <input type="text" placeholder="Search careers..." />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        <div className="table-container">
          <table className="career-table">
            <thead>
              <tr>
                <th>Occupations</th>
                <th>Abilities</th>
                <th>Activities</th>
                <th>Knowledge</th>
                <th>Preference</th>
                <th>Skills</th>
                <th>Technology</th>
                <th>Traits</th>
              </tr>
            </thead>
            <tbody>
              {filteredOccupations.map((occ) => (
                <tr key={occ.id}>
                  <td>
                    <strong>{occ.name}</strong>
                  </td>
                  <td>{occ.abilities}</td>
                  <td>{occ.activities}</td>
                  <td>{occ.knowledge}</td>
                  <td>{occ.preference}</td>
                  <td>{occ.skills}</td>
                  <td>{occ.technology}</td>
                  <td>{occ.traits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span>
            Showing 1 to {filteredOccupations.length} of {occupations.length}{" "}
            records
          </span>
          <div className="pagination-controls">
            <button>First</button>
            <button>Previous</button>
            <button>Next</button>
            <button>Last</button>
          </div>
        </div>
      </div>
    </div>
  );
}
