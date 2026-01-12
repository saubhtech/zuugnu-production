"use client";

import { useState, useEffect } from 'react';
import './career-test.css';

export default function CareerTestPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [careerGroups, setCareerGroups] = useState([]);
  const [careerSubgroups, setCareerSubgroups] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [careerTestForm, setCareerTestForm] = useState({ career_test: '' });
  const [careerGroupForm, setCareerGroupForm] = useState({ career_group: '' });
  const [careerSubgroupForm, setCareerSubgroupForm] = useState({ 
    careergroupid: '', 
    career_subgroup: '' 
  });
  const [careerQuestionForm, setCareerQuestionForm] = useState({
    careersubgroupid: '',
    test_question: '',
    optscore1: '',
    optscore2: '',
    optscore3: '',
    optscore4: '',
    optscore5: ''
  });

  // Message states
  const [messages, setMessages] = useState({
    1: { text: '', type: '' },
    2: { text: '', type: '' },
    3: { text: '', type: '' },
    4: { text: '', type: '' }
  });

  // Load dropdowns on mount
  useEffect(() => {
    loadCareerGroups();
    loadCareerSubgroups();
  }, []);

  // Fetch career groups
  const loadCareerGroups = async () => {
    try {
      const response = await fetch('/api/career-group');
      const data = await response.json();
      if (data.success) {
        setCareerGroups(data.data);
      }
    } catch (error) {
      console.error('Error loading career groups:', error);
    }
  };

  // Fetch career subgroups
  const loadCareerSubgroups = async () => {
    try {
      const response = await fetch('/api/career-subgroup');
      const data = await response.json();
      if (data.success) {
        setCareerSubgroups(data.data);
      }
    } catch (error) {
      console.error('Error loading career subgroups:', error);
    }
  };

  // Show message helper
  const showMessage = (tabNumber, text, type) => {
    setMessages(prev => ({
      ...prev,
      [tabNumber]: { text, type, show: true }
    }));

    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [tabNumber]: { text: '', type: '', show: false }
      }));
    }, 5000);
  };

  // Form submission handlers
  const handleCareerTestSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/career-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(careerTestForm)
      });

      const data = await response.json();
      
      if (data.success) {
        showMessage(1, data.message, 'success');
        setCareerTestForm({ career_test: '' });
      } else {
        showMessage(1, data.error, 'error');
      }
    } catch (error) {
      showMessage(1, 'Failed to add career test', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCareerGroupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/career-group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(careerGroupForm)
      });

      const data = await response.json();
      
      if (data.success) {
        showMessage(2, data.message, 'success');
        setCareerGroupForm({ career_group: '' });
        loadCareerGroups(); // Refresh dropdown
      } else {
        showMessage(2, data.error, 'error');
      }
    } catch (error) {
      showMessage(2, 'Failed to add career group', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCareerSubgroupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/career-subgroup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(careerSubgroupForm)
      });

      const data = await response.json();
      
      if (data.success) {
        showMessage(3, data.message, 'success');
        setCareerSubgroupForm({ careergroupid: '', career_subgroup: '' });
        loadCareerSubgroups(); // Refresh dropdown
      } else {
        showMessage(3, data.error, 'error');
      }
    } catch (error) {
      showMessage(3, 'Failed to add career subgroup', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCareerQuestionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/career-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(careerQuestionForm)
      });

      const data = await response.json();
      
      if (data.success) {
        showMessage(4, data.message, 'success');
        setCareerQuestionForm({
          careersubgroupid: '',
          test_question: '',
          optscore1: '',
          optscore2: '',
          optscore3: '',
          optscore4: '',
          optscore5: ''
        });
      } else {
        showMessage(4, data.error, 'error');
      }
    } catch (error) {
      showMessage(4, 'Failed to add career question', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="career-test-container">
      <div className="container">
        <div className="header">
          <h1>Career Test Data Entry System</h1>
          <p>Manage career assessments, groups, subgroups, and questions</p>
        </div>

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 0 ? 'active' : ''}`}
            onClick={() => setActiveTab(0)}
          >
            Career Test
          </button>
          <button 
            className={`tab ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            Career Group
          </button>
          <button 
            className={`tab ${activeTab === 2 ? 'active' : ''}`}
            onClick={() => setActiveTab(2)}
          >
            Career Subgroup
          </button>
          <button 
            className={`tab ${activeTab === 3 ? 'active' : ''}`}
            onClick={() => setActiveTab(3)}
          >
            Career Questions
          </button>
        </div>

        {/* Tab 1: Career Test */}
        <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
          <div className="info-box">
            <strong>Master Career Test:</strong> Define the type of career assessment test
          </div>
          {messages[1].show && (
            <div className={messages[1].type === 'success' ? 'success-message' : 'error-message'}>
              {messages[1].text}
            </div>
          )}
          <form onSubmit={handleCareerTestSubmit}>
            <div className="form-group">
              <label htmlFor="career_test">Career Test Name <span className="required">*</span></label>
              <input
                type="text"
                id="career_test"
                value={careerTestForm.career_test}
                onChange={(e) => setCareerTestForm({ career_test: e.target.value })}
                required
                placeholder="e.g., Holland Code Career Test"
              />
              <div className="note">Must be unique</div>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Career Test'}
            </button>
          </form>
        </div>

        {/* Tab 2: Career Group */}
        <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
          <div className="info-box">
            <strong>Master Career Group:</strong> Define broad career categories
          </div>
          {messages[2].show && (
            <div className={messages[2].type === 'success' ? 'success-message' : 'error-message'}>
              {messages[2].text}
            </div>
          )}
          <form onSubmit={handleCareerGroupSubmit}>
            <div className="form-group">
              <label htmlFor="career_group">Career Group Name <span className="required">*</span></label>
              <input
                type="text"
                id="career_group"
                value={careerGroupForm.career_group}
                onChange={(e) => setCareerGroupForm({ career_group: e.target.value })}
                required
                placeholder="e.g., Information Technology"
              />
              <div className="note">Must be unique</div>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Career Group'}
            </button>
          </form>
        </div>

        {/* Tab 3: Career Subgroup */}
        <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
          <div className="info-box">
            <strong>Career Subgroup:</strong> Define specific career areas within a group
          </div>
          {messages[3].show && (
            <div className={messages[3].type === 'success' ? 'success-message' : 'error-message'}>
              {messages[3].text}
            </div>
          )}
          <form onSubmit={handleCareerSubgroupSubmit}>
            <div className="form-group">
              <label htmlFor="careergroupid">Career Group <span className="required">*</span></label>
              <select
                id="careergroupid"
                value={careerSubgroupForm.careergroupid}
                onChange={(e) => setCareerSubgroupForm(prev => ({ ...prev, careergroupid: e.target.value }))}
                required
              >
                <option value="">-- Select Career Group --</option>
                {careerGroups.map(group => (
                  <option key={group.careergroupid} value={group.careergroupid}>
                    {group.career_group}
                  </option>
                ))}
              </select>
              <div className="note">Select the parent career group</div>
            </div>
            <div className="form-group">
              <label htmlFor="career_subgroup">Career Subgroup Name <span className="required">*</span></label>
              <input
                type="text"
                id="career_subgroup"
                value={careerSubgroupForm.career_subgroup}
                onChange={(e) => setCareerSubgroupForm(prev => ({ ...prev, career_subgroup: e.target.value }))}
                required
                placeholder="e.g., Software Development"
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Career Subgroup'}
            </button>
          </form>
        </div>

        {/* Tab 4: Career Questions */}
        <div className={`tab-content ${activeTab === 3 ? 'active' : ''}`}>
          <div className="info-box">
            <strong>Career Questions:</strong> Add test questions with scoring options
          </div>
          {messages[4].show && (
            <div className={messages[4].type === 'success' ? 'success-message' : 'error-message'}>
              {messages[4].text}
            </div>
          )}
          <form onSubmit={handleCareerQuestionSubmit}>
            <div className="form-group">
              <label htmlFor="careersubgroupid">Career Subgroup <span className="required">*</span></label>
              <select
                id="careersubgroupid"
                value={careerQuestionForm.careersubgroupid}
                onChange={(e) => setCareerQuestionForm(prev => ({ ...prev, careersubgroupid: e.target.value }))}
                required
              >
                <option value="">-- Select Career Subgroup --</option>
                {careerSubgroups.map(subgroup => (
                  <option key={subgroup.careersubgroupid} value={subgroup.careersubgroupid}>
                    {subgroup.career_subgroup} ({subgroup.career_group})
                  </option>
                ))}
              </select>
              <div className="note">Select the career subgroup this question belongs to</div>
            </div>
            <div className="form-group">
              <label htmlFor="test_question">Test Question <span className="required">*</span></label>
              <textarea
                id="test_question"
                value={careerQuestionForm.test_question}
                onChange={(e) => setCareerQuestionForm(prev => ({ ...prev, test_question: e.target.value }))}
                required
                placeholder="Enter the career assessment question..."
              />
            </div>
            <div className="form-group">
              <label>Option Scores (1 to 5)</label>
              <div className="score-grid">
                {[1, 2, 3, 4, 5].map(num => (
                  <div className="score-item" key={num}>
                    <label htmlFor={`optscore${num}`}>Option {num} Score</label>
                    <input
                      type="number"
                      id={`optscore${num}`}
                      value={careerQuestionForm[`optscore${num}`]}
                      onChange={(e) => setCareerQuestionForm(prev => ({ 
                        ...prev, 
                        [`optscore${num}`]: e.target.value 
                      }))}
                      min="0"
                      max="100"
                      placeholder="0-100"
                    />
                  </div>
                ))}
              </div>
              <div className="note">Optional: Assign scores to each answer option</div>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Question'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}