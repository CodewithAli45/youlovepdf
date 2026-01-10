import React from 'react';
import '../styles/Header.css';

const Header = ({ activeTool, setActiveTool }) => {
  return (
    <header className="fixed-header">
      
      <div className="header-content">
        <div className="logo" onClick={() => setActiveTool('merge')}>
          <div className="logo-icon">
            <img src="/logo.png" alt="PDF Orbit Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span className="logo-text">PDF Orbit</span>
        </div>

        <div className="nav-links">
          <div 
            className={`nav-item nav-merge ${activeTool === 'merge' ? 'active' : ''}`}
            onClick={() => setActiveTool('merge')}
          >
            <svg style={{ width: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Merge
          </div>
          <div 
            className={`nav-item nav-split ${activeTool === 'split' ? 'active' : ''}`}
            onClick={() => setActiveTool('split')}
          >
            <svg style={{ width: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m0-14l4.121 4.121" />
            </svg>
            Split
          </div>
          <button className="help-btn" title="Help">
            <svg style={{ width: '20px', color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
