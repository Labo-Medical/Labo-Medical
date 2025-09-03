import { useEffect } from 'react';

// Emergency test component to verify React is working
export default function EmergencyTest() {
  console.log('🚨 EMERGENCY TEST COMPONENT RENDERING 🚨');
  
  useEffect(() => {
    // Create a DOM element directly to ensure visibility
    const emergencyDiv = document.createElement('div');
    emergencyDiv.id = 'emergency-visibility-test';
    emergencyDiv.innerHTML = `
      <div style="
        position: fixed !important;
        top: 0px !important;
        left: 0px !important;
        width: 100vw !important;
        height: 100vh !important;
        background: rgba(255, 0, 255, 0.3) !important;
        z-index: 999999999 !important;
        pointer-events: none !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      ">
        <div style="
          background: #ff00ff !important;
          color: white !important;
          padding: 30px !important;
          border-radius: 10px !important;
          font-size: 24px !important;
          font-weight: bold !important;
          text-align: center !important;
          border: 5px solid white !important;
          pointer-events: auto !important;
        ">
          🚨 EMERGENCY TEST VISIBLE 🚨<br>
          REACT IS WORKING!<br>
          <button onclick="this.parentElement.parentElement.remove()" style="
            background: white;
            color: #ff00ff;
            border: none;
            padding: 10px 20px;
            margin-top: 10px;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
          ">CLOSE</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(emergencyDiv);
    
    // Clean up after 10 seconds
    setTimeout(() => {
      const el = document.getElementById('emergency-visibility-test');
      if (el) el.remove();
    }, 10000);
    
    return () => {
      const el = document.getElementById('emergency-visibility-test');
      if (el) el.remove();
    };
  }, []);
  
  return (
    <div 
      style={{
        position: 'fixed',
        right: '10px',
        bottom: '10px',
        zIndex: 999999998,
        background: '#ff00ff',
        color: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        border: '3px solid #ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
        boxShadow: '0 0 20px rgba(255,0,255,0.8)',
      }}
    >
      🚨 REACT TEST 🚨
      <div style={{ marginTop: '5px', fontSize: '12px' }}>
        Component rendering!
      </div>
    </div>
  );
}
