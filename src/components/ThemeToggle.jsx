import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button onClick={toggle} title="Toggle theme" className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-black/30 text-white hover:bg-black/40 transition">
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
