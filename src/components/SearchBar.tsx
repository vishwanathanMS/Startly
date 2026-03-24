import { useState, useRef, useEffect } from 'react';
import './SearchBar.css';

const SEARCH_ENGINES = [
    { name: 'Google', url: 'https://www.google.com/search?q=', icon: '🔍' },
    { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', icon: '🦆' },
    { name: 'Bing', url: 'https://www.bing.com/search?q=', icon: '🅱️' },
    { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=', icon: '▶️' },
];

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [selectedEngine] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Focus search bar on load
        inputRef.current?.focus();

        // Focus on "/" key press
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === '/' && document.activeElement !== inputRef.current) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            const engine = SEARCH_ENGINES[selectedEngine];
            window.location.href = engine.url + encodeURIComponent(query);
        }
    };



    return (
        <div className="search-bar-container">
            <form onSubmit={handleSearch} className="search-bar glass-strong">
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search ${SEARCH_ENGINES[selectedEngine].name}...`}
                    className="search-input"
                />

                <button type="submit" className="search-btn" aria-label="Search">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                </button>
            </form>
        </div>
    );
}
