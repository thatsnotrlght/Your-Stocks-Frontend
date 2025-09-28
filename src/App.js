import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Menu, TrendingUp, TrendingDown } from 'lucide-react';

const data = [
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
  // { name: 'Nikkei 225', value: 38596.40, change: -0.09, color: 'red', flag: '🇯🇵' },
];

const friendHuddles = [
  { symbol: 'Jamie G.', price: 50, change: 0.33, color: 'green', status: 'Gym Goals' },
  {  symbol: 'Alex M.', price: 120, change: -0.27, color: 'red', status: 'Book Club' },
  { symbol: 'SPX', price: 5464.61, change: -0.16, color: 'red' },
  { symbol: 'BTCUSD', price: 64444, change: 0.33, color: 'green' },
  { symbol: 'VIX', price: 13.2, change: -0.6, color: 'red' },
  { symbol: 'XAUUSD', price: 2321.875, change: -1.62, color: 'red' },
  { symbol: 'WTICOUS', price: 80.952, change: -0.83, color: 'red' },
  { symbol: 'USDJPY', price: 159.76, change: 0.54, color: 'green' },
];

const TradingDashboard = () => {
  return (
    <div className="bg-[#170633] text-white min-h-screen font-sans flex flex-col">
      {/* This is the start to the header/ navigation bar */}
      <header className="bg-[#30155E] p-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="text-2xl font-bold text-[#A478FF]">$SART</span>
          <nav className="hidden md:flex space-x-6">
          {/* 'Products', 'Community', 'Markets', 'News', 'Brokers' */}
            {[].map((item) => (
              <a key={item} href="#" className="text-[#A478FF] hover:text-[#1E0C40] transition-colors duration-200">{item}</a>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input type="text" placeholder="Search" className="bg-gray-700 text-white rounded-full py-2 px-4 pl-10 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <button className="bg-blue-600 rounded-full p-2 hover:bg-blue-700 transition-colors duration-200">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>
      
      {/* Main area of screen */}
      {/* Uses indices array to display the top boxes */}
      <main className="p-4 overflow-y-auto"> {/* Removed flex-grow/flex from main */}
        
        {/* Bootstrap Container for centring and responsiveness */}
        <div className="container-fluid"> 
          
          {/* Main Portfolio Row (All content stacked vertically) */}
          <div className="row">
              <div className="col-12">
                  <h2 className="text-2xl font-semibold mb-3 text-[#A478FF]">Portfolio</h2>
              </div>
          </div>

          {/* EQ VALUE & BUTTONS Row */}
          <div className="row mb-4">
              <div className="col-12 d-flex justify-content-between align-items-center">
                  <div>
                      <div className="h3 font-weight-bold text-[#ceb9e2]">EQ 67,031.12</div> {/* Bootstrap h3 for size */}
                      <div className="text-sm text-[#ceb9e2]">Your current Emotional Equity</div>
                  </div>
                  <div className="btn-group" role="group"> {/* Bootstrap button group */}
                      <button className="btn btn-sm text-white rounded-pill me-2" style={{ backgroundColor: '#30155e' }}>
                          Check In
                      </button>
                      <button className="btn btn-sm text-white rounded-pill" style={{ backgroundColor: '#220d44' }}>
                          Invest
                      </button>
                  </div>
              </div>
          </div>
          
          {/* CHART SECTION Row */}
          <div className="row mb-4">
              <div className="col-12">
                  <div className="bg-[#1e0c40] p-4 rounded-lg shadow-lg" style={{ height: '300px' }}> {/* Inlining height */}
                      <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={data}>
                              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={false} />
                          </LineChart>
                      </ResponsiveContainer>
                  </div>
              </div>
          </div>

          {/* SUB-PORTFOLIOS SECTION Row (Uses Bootstrap columns for responsiveness) */}
          <h3 className="h5 font-weight-bold mb-3 text-white">Sub-Portfolios</h3>
          <div className="row g-3 mb-4"> {/* g-3 for Bootstrap gutter spacing */}
              {indices.map((index) => (
                  <div key={index.name} className="col-6 col-md-4 col-lg-3"> {/* 2 columns on mobile, 3+ on wider screens */}
                      <div className="bg-[#1e0c40] p-3 rounded-lg shadow-sm">
                          {/* ... card content (Tailwind classes kept for color/text) ... */}
                          <div className="text-xl font-bold">{index.value.toLocaleString()}</div>
                          {/* ... rest of card content ... */}
                      </div>
                  </div>
              ))}
          </div>

          {/* FRIEND HUDDLES / CARE COINS SECTION Row */}
          <div className="row mb-4">
              <div className="col-12">
                  <h3 className="h5 font-weight-bold mb-3 text-white">Friend Huddles</h3>
                  <ul className="list-unstyled"> {/* Remove default list styling */}
                      {friendHuddles.slice(0, 3).map((item) => (
                          <li key={item.symbol} className="d-flex justify-content-between align-items-center p-3 mb-2 rounded-lg" style={{ backgroundColor: '#30155e' }}>
                              {/* ... (list item content) ... */}
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
          
        </div> {/* Closing container-fluid */}
      </main>
    </div>
  );
};

export default TradingDashboard;