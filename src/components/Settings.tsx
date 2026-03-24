import './Settings.css';

interface SettingsProps {
    settings: {
        isDarkMode: boolean;
        showWeather: boolean;
        showQuote: boolean;
        showTodo: boolean;
        userName: string;
    };
    onUpdateSettings: (settings: any) => void;
    onClose: () => void;
}

export default function Settings({ settings, onUpdateSettings, onClose }: SettingsProps) {
    return (
        <div className="settings-overlay" onClick={onClose}>
            <div className="settings-panel glass-strong" onClick={(e) => e.stopPropagation()}>
                <div className="settings-header">
                    <h2>⚙️ Settings</h2>
                    <button className="close-btn" onClick={onClose} aria-label="Close settings">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="settings-content">
                    {/* Personalization */}
                    <section className="settings-section">
                        <h3>Personalization</h3>
                        <div className="setting-item">
                            <label htmlFor="userName">Your Name</label>
                            <input
                                id="userName"
                                type="text"
                                value={settings.userName}
                                onChange={(e) => onUpdateSettings({ userName: e.target.value })}
                                placeholder="Enter your name"
                                className="glass"
                            />
                        </div>
                    </section>


                    {/* Widgets */}
                    <section className="settings-section">
                        <h3>Widgets</h3>
                        <div className="widget-toggles">
                            <label className="toggle-item">
                                <span>Weather Widget</span>
                                <input
                                    type="checkbox"
                                    checked={settings.showWeather}
                                    onChange={(e) => onUpdateSettings({ showWeather: e.target.checked })}
                                    className="toggle-checkbox"
                                />
                                <span className="toggle-switch"></span>
                            </label>

                            <label className="toggle-item">
                                <span>Inspirational Quote</span>
                                <input
                                    type="checkbox"
                                    checked={settings.showQuote}
                                    onChange={(e) => onUpdateSettings({ showQuote: e.target.checked })}
                                    className="toggle-checkbox"
                                />
                                <span className="toggle-switch"></span>
                            </label>

                            <label className="toggle-item">
                                <span>Todo List</span>
                                <input
                                    type="checkbox"
                                    checked={settings.showTodo}
                                    onChange={(e) => onUpdateSettings({ showTodo: e.target.checked })}
                                    className="toggle-checkbox"
                                />
                                <span className="toggle-switch"></span>
                            </label>
                        </div>
                    </section>

                    {/* Keyboard Shortcuts */}
                    <section className="settings-section">
                        <h3>Keyboard Shortcuts</h3>
                        <div className="shortcuts-list">
                            <div className="shortcut-item">
                                <span>Open Settings</span>
                                <kbd>Ctrl + K</kbd>
                            </div>
                            <div className="shortcut-item">
                                <span>Focus Search</span>
                                <kbd>/</kbd>
                            </div>
                            <div className="shortcut-item">
                                <span>Edit Quick Link</span>
                                <kbd>Right Click</kbd>
                            </div>
                        </div>
                    </section>

                    {/* About */}
                    <section className="settings-section">
                        <div className="about-section">
                            <h3>About Startly</h3>
                            <p>A beautiful, feature-rich browser start page to boost your productivity.</p>
                            <p className="version">Version 1.0.0</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
