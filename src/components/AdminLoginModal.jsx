import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Eye, EyeOff } from 'lucide-react';

function AdminLoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = '@dmin123';
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      auth.login();
      onClose && onClose();
      navigate('/');
      return;
    }
    setError('Invalid username or password');
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="absolute inset-0 overlay-bg backdrop-blur-sm" onClick={() => { setError(''); onClose && onClose(); }} />
      <div className="relative w-full max-w-md mx-4 rounded-3xl modal-card border shadow-2xl p-6 z-40">
        <button
          type="button"
          onClick={() => { setError(''); onClose && onClose(); }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-sm"
        >
          ×
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl panel-bg border text-white">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Admin Login</h2>
            <p className="text-sm text-gray-400">Sign in to manage groups and systems</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg panel-input px-3 py-3 text-sm placeholder:text-neutral-500 focus-accent"
              placeholder="admin"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="admin-password">Password</label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg panel-input px-3 py-3 text-sm placeholder:text-neutral-500 focus-accent pr-10"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <button
            type="submit"
            className="w-full btn-accent font-semibold py-2.5 rounded-lg transition-colors text-sm"
          >
            Sign in
          </button>

          <div className="mt-2 text-center text-xs text-gray-500">Use the static admin credentials set for this demo.</div>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginModal;
