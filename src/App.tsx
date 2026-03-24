import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import QuickLinks from './components/QuickLinks';
import Clock from './components/Clock';
import Weather from './components/Weather';
import QuoteWidget from './components/QuoteWidget';
import TodoList from './components/TodoList';
import Settings from './components/Settings';

interface AppSettings {
  isDarkMode: boolean;
  showWeather: boolean;
  showQuote: boolean;
  showTodo: boolean;
  userName: string;
}

function App() {
  const [settings, setSettings] = useState<AppSettings>({
    isDarkMode: false,
    showWeather: true,
    showQuote: true,
    showTodo: true,
    userName: 'Friend',
  });

  const [showSettings, setShowSettings] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('startly-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Keyboard shortcuts
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for settings
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSettings(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (settings.isDarkMode) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
  }, [settings.isDarkMode]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('startly-settings', JSON.stringify(updated));
  };

  return (
    <div className="app">
      {/* Top Right Controls */}
      <div className="top-layout-controls">
        <button
          className="theme-toggle-btn glass"
          onClick={() => updateSettings({ isDarkMode: !settings.isDarkMode })}
          aria-label="Toggle Theme"
        >
          {settings.isDarkMode ? (
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <circle cx="12" cy="12" r="5" />
               <line x1="12" y1="1" x2="12" y2="3" />
               <line x1="12" y1="21" x2="12" y2="23" />
               <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
               <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
               <line x1="1" y1="12" x2="3" y2="12" />
               <line x1="21" y1="12" x2="23" y2="12" />
               <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
               <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
             </svg>
          ) : (
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
             </svg>
          )}
        </button>
        <button
          className="settings-btn glass"
          onClick={() => setShowSettings(!showSettings)}
          aria-label="Settings"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6m0-18a9 9 0 0 1 9 9m-9-9a9 9 0 0 0-9 9m18 0a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9 9" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Section */}
        <div className="top-section fade-in">
          <Clock />
          <h1 className="greeting slide-up">
            {greeting}, <span className="accent-text">{settings.userName}</span>
          </h1>
        </div>

        {/* Search Section */}
        <div className="search-section slide-up">
          <SearchBar />
        </div>

        {/* Quick Links */}
        <div className="links-section slide-up">
          <QuickLinks />
        </div>

        {/* Widgets Section */}
        <div className="widgets-section">
          {settings.showWeather && (
            <div className="widget-item fade-in">
              <Weather />
            </div>
          )}

          {settings.showQuote && (
            <div className="widget-item fade-in">
              <QuoteWidget />
            </div>
          )}

          {settings.showTodo && (
            <div className="widget-item fade-in">
              <TodoList />
            </div>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <Settings
          settings={settings}
          onUpdateSettings={updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Keyboard Shortcut Hint */}
      <div className="keyboard-hint">
        Press <kbd>Ctrl</kbd> + <kbd>K</kbd> for settings
      </div>
    </div>
  );
}

export default App;
