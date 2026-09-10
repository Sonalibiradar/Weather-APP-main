import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBoxProps {
    onSearch: (city: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <input
                type="text"
                placeholder="Search for a city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button
                type="submit"
                style={{
                    position: 'absolute',
                    right: '4px',
                    top: '4px',
                    bottom: '4px',
                    padding: '8px 12px',
                    background: 'transparent',
                    color: 'var(--accent-color)'
                }}
            >
                <Search size={20} />
            </button>
        </form>
    );
};
