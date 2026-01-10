import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MergeTool from './pdftools/MergeTool'
import SplitTool from './pdftools/SplitTool'

function App() {
  const [activeTool, setActiveTool] = useState('merge');

  return (
    <>
      <div className="premium-bg"></div>
      <Header activeTool={activeTool} setActiveTool={setActiveTool} />
      
      <main className="container" style={{ flex: 1 }}>
        <section className="grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          padding: '4rem 0'
        }}>
          <div className="hero-text">
            <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              {activeTool === 'merge' ? 'Merge PDFs.' : 'Split PDFs.'} <br />
              <span style={{ color: activeTool === 'merge' ? 'var(--nav-merge)' : 'var(--nav-split)' }}>Zero Friction.</span>
            </h2>
            <ul style={{ listStyle: 'none', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1.1rem' }}>
              <li>✨ {activeTool === 'merge' ? 'Combine multiple documents effortlessly' : 'Extract pages into separate files'}</li>
              <li>🚀 Lightning fast processing</li>
              <li>🔒 Secure by design — your files stay private</li>
              <li>🌈 A clean, premium, intuitive experience</li>
            </ul>
          </div>
          
          {activeTool === 'merge' ? <MergeTool /> : <SplitTool />}
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App
