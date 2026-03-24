import { useState, useEffect } from 'react';
import './QuoteWidget.css';

interface Quote {
    text: string;
    author: string;
}

const QUOTES: Quote[] = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
];

export default function QuoteWidget() {
    const [quote, setQuote] = useState<Quote>(QUOTES[0]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Set random quote on load
        setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, []);

    const getNewQuote = () => {
        setIsAnimating(true);
        setTimeout(() => {
            let newQuote;
            do {
                newQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
            } while (newQuote.text === quote.text);
            setQuote(newQuote);
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className="quote-widget glass">
            <div className={`quote-content ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                <div className="quote-icon">💭</div>
                <blockquote className="quote-text">"{quote.text}"</blockquote>
                <div className="quote-author">— {quote.author}</div>
            </div>
            <button className="refresh-quote-btn" onClick={getNewQuote} aria-label="New quote">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
            </button>
        </div>
    );
}
