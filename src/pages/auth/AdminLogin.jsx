import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminLogin() {
  const { loginAdmin, admin } = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (admin) {
    navigate('/admin');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const ok = loginAdmin(username, password);
    if (ok) navigate('/admin');
    else setError('Invalid username or password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-display text-2xl font-bold">
            L
          </div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-800">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">LuxeGlow Makeup Studio</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
              <User size={15} /> Username
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="admin"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
              <Lock size={15} /> Password
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn-primary w-full">Sign In</button>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
            <strong>Demo credentials:</strong><br />
            Username: <code className="font-mono">admin</code><br />
            Password: <code className="font-mono">admin123</code>
          </div>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          <Link to="/" className="hover:text-pink-500">← Back to website</Link>
        </p>
      </div>
    </div>
  );
}
