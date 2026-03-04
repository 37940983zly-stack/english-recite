import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Words } from '@/pages/Words';
import { Practice } from '@/pages/Practice';
import { Review } from '@/pages/Review';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '单词本', emoji: '📜' },
    { path: '/practice', label: '闯关竞技场', emoji: '⚔️' },
    { path: '/review', label: '训练营地', emoji: '🏕️' },
  ];

  return (
    <nav className="bg-gradient-to-r from-adventure-blue-600 via-adventure-blue-500 to-adventure-gold-500 shadow-adventure-lg border-b-4 border-adventure-gold-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-bold text-white hover:scale-105 transition-transform flex items-center gap-2">
              <span className="text-4xl">⚔️</span>
              <span className="bg-gradient-to-r from-adventure-gold-300 to-yellow-200 bg-clip-text text-transparent">
                WordHero
              </span>
            </Link>
          </div>
          <div className="flex space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-tab ${
                  location.pathname === item.path
                    ? 'bg-white text-adventure-blue-600 shadow-adventure-sm active'
                    : 'text-white/90 hover:bg-white/15 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <span>{item.label}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-adventure-blue-50 via-white to-adventure-gold-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Words />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
