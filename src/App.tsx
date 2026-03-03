import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Words } from '@/pages/Words';
import { Practice } from '@/pages/Practice';
import { Review } from '@/pages/Review';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '📚 单词本', emoji: '📚' },
    { path: '/practice', label: '🎮 闯关练习', emoji: '🎮' },
    { path: '/review', label: '📖 智能复习', emoji: '📖' },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-bold text-white hover:scale-105 transition-transform">
              🦸 WordHero
            </Link>
          </div>
          <div className="flex space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                  location.pathname === item.path
                    ? 'bg-white text-purple-600 shadow-lg scale-105'
                    : 'text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                {item.label}
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
