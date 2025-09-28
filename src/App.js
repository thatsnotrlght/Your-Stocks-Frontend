import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Define a soft text color for general use
const SOFT_TEXT_COLOR = '#CFCFCF'; 

// Data is now defined outside and used as the initial state
const INITIAL_CHART_DATA = [
  { time: '19:00', value: 5458 },
  { time: '20:00', value: 5462 },
  { time: '21:00', value: 5470 },
  { time: '22:00', value: 5460 },
  { time: '23:00', value: 5468 },
];

const indices = [
  { name: 'Fitness Venture', value: 85.5, change: 2.1, color: 'green', flag: '🏋️' },
  { name: 'Career Goals', value: 92.4, change: -0.5, color: 'red', flag: '💼' },
  { name: 'Financial Health', value: 65.2, change: -1.2, color: 'red', flag: '💰' },
];

const friendHuddles = [
  { symbol: 'Jamie G.', price: 50, change: 0.33, color: 'green', status: 'Gym Goals' },
  { symbol: 'Alex M.', price: 120, change: -0.27, color: 'red', status: 'Book Club' },
];

const TradingDashboard = () => {
  // 1. STATE MANAGEMENT
  const [chartData, setChartData] = React.useState(INITIAL_CHART_DATA);
  const [showModal, setShowModal] = React.useState(false);
  const [score, setScore] = React.useState(5); 

  // 2. HANDLER FUNCTIONS
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmitScore = () => {
    // 1. Create a new time label
    const now = new Date();
    const newTime = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');

    // 2. Calculate the new chart value based on the score (1-10)
    // The value changes by up to +/- 10 points depending on the score
    const lastValue = chartData[chartData.length - 1].value;
    const valueChange = (score - 5) * 2; 
    const newChartValue = lastValue + valueChange;

    const newPoint = {
      time: newTime,
      value: newChartValue,
    };

    // 3. Update the state (adds new point, removes the oldest if too long)
    setChartData((prevData) => {
        const newData = [...prevData, newPoint];
        // Keep only the last 8 data points for a clean chart
        if (newData.length > 8) {
            return newData.slice(1);
        }
        return newData;
    });

    // 4. Close and reset
    handleCloseModal();
    setScore(5);
  };

  return (
    // Outer container: Base color is soft white
    <div className="bg-[#170633] font-sans d-flex flex-column" style={{ color: SOFT_TEXT_COLOR }}> 
      
      {/* HEADER - Simplified Bootstrap Flex */}
      <header className="bg-[#30155E] p-4 d-flex justify-content-between align-items-center">
        <span className="h4 font-weight-bold" style={{ color: '#A478FF' }}>$SART</span>
      </header>
      
      <main className="p-4 flex-grow-1 overflow-y-auto"> 
        <div className="container-fluid p-0"> 

          {/* EQ VALUE & BUTTONS ROW */}
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="text-2xl font-semibold mb-2" style={{ color: '#A478FF' }}>Portfolio</h2>
              
              <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded-lg shadow-sm" 
                  style={{ backgroundColor: '#1e0c40' }}>
                {/* EQ Value */}
                <div>
                  <div 
                    className="h2 font-weight-bold mb-1" 
                    style={{ 
                      background: 'linear-gradient(90deg, #A478FF, #FFCC00)', 
                      WebkitBackgroundClip: 'text', 
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    EQ 67,031.12
                  </div>
                  <div className="text-sm" style={{ color: SOFT_TEXT_COLOR }}>
                    Your current Emotional Equity
                  </div>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <button 
                    onClick={handleOpenModal} 
                    className="btn text-white rounded-pill px-4 py-2 shadow-sm"
                    style={{ backgroundColor: '#30155e' }}
                  >
                    Check In
                  </button>
                  <button 
                    className="btn text-white rounded-pill px-4 py-2 shadow-sm"
                    style={{ backgroundColor: '#220d44' }}
                  >
                    Invest
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CHART SECTION ROW */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="bg-[#1e0c40] p-4 rounded-lg shadow-lg" style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  {/* CHART NOW USES chartData STATE */}
                  <LineChart data={chartData}>
                    <XAxis dataKey="time" stroke="#6B7280" />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} stroke="#6B7280" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                    <Line type="monotone" dataKey="value" stroke="#A478FF" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* SUB-PORTFOLIOS SECTION ROW - Responsive Grid */}
          <div className="row g-3 mb-4">
            <div className="col-12">
              <h3 className="h5 font-weight-bold mb-3 text-white">Sub-Portfolios</h3>
            </div>
            {indices.map((index) => (
              <div key={index.name} className="col-6 col-md-4 col-lg-3"> 
                <div className="bg-[#1e0c40] p-3 rounded-lg shadow-sm sub-portfolio-card">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-sm" style={{ color: SOFT_TEXT_COLOR }}> 
                      <span className="me-2 fs-5">{index.flag}</span>
                      {index.name}
                    </span>
                    <span className={`badge text-xs px-2 py-1 rounded-pill ${index.color === 'green' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                      {index.change > 0 ? '+' : ''}{index.change}%
                    </span>
                  </div>
                  <div className="h5 font-weight-bold" style={{ color: SOFT_TEXT_COLOR }}>{index.value.toLocaleString()}</div>
                </div>
              </div>
            ))}
            
            {/* CARE COINS CARD - Integrated with Sub-Portfolios */}
            <div className="col-6 col-md-4 col-lg-3">
              <div className="bg-[#30155e] p-3 rounded-lg shadow-sm sub-portfolio-card" style={{ border: '1px solid #A478FF40' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-sm" style={{ color: SOFT_TEXT_COLOR }}> 
                    <span className="me-2 fs-5">💝</span>
                    Care Coins
                  </span>
                  <span className="badge text-xs px-2 py-1 rounded-pill" style={{ backgroundColor: '#A478FF', color: 'white' }}>
                    Send
                  </span>
                </div>
                <div className="h5 font-weight-bold" style={{ color: '#FFCC00' }}>247 coins</div>
                <div className="text-xs mt-1" style={{ color: '#ceb9e2' }}>
                  Support friends' goals
                </div>
              </div>
            </div>
          </div>
          
        </div> {/* Closing container-fluid */}
      </main>

      {/* 3. CHECK-IN MODAL (POPUP) STRUCTURE */}
      {/* Uses dynamic classes to show/hide the modal without needing Bootstrap JS directly */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} 
           tabIndex="-1" 
           role="dialog"
           style={{ backgroundColor: showModal ? 'rgba(0, 0, 0, 0.6)' : 'transparent' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content" style={{ backgroundColor: '#1e0c40' }}>
                  
                  <div className="modal-header" style={{ borderBottom: '1px solid #30155E' }}>
                      <h5 className="modal-title" style={{ color: '#A478FF' }}>Daily Emotional Check-In</h5>
                      {/* Close button uses the handleCloseModal function */}
                      <button type="button" className="btn-close text-white" aria-label="Close" onClick={handleCloseModal}></button>
                  </div>
                  
                  <div className="modal-body">
                      <p className="lead" style={{ color: SOFT_TEXT_COLOR }}>Rate your emotional status right now (1 = Bearish, 10 = Bullish):</p>
                      
                      {/* Score Input (Range 1-10) */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="h1 mb-0" style={{ color: '#A478FF' }}>{score}</span>
                          <input
                              type="range"
                              className="form-range flex-grow-1 mx-3"
                              min="1"
                              max="10"
                              value={score}
                              onChange={(e) => setScore(Number(e.target.value))}
                              id="scoreRange"
                          />
                      </div>

                      {/* Dynamic Description */}
                      <p className="text-muted small">
                          {score < 4 && "📉 Low score means times are tough. Remember to take a break."}
                          {score >= 4 && score <= 7 && "⚖️ Stable score. Ready to maintain progress."}
                          {score > 7 && "🚀 High score! Emotional equity soaring. Log this victory."}
                      </p>
                  </div>
                  
                  <div className="modal-footer" style={{ borderTop: '1px solid #30155E' }}>
                      <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                      <button type="button" 
                              className="btn text-white" 
                              style={{ backgroundColor: '#A478FF' }}
                              onClick={handleSubmitScore}>
                          Log Score
                      </button>
                  </div>
              </div>
          </div>
      </div>
      {/* Modal Backdrop (manually controlled for state visibility) */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default TradingDashboard;