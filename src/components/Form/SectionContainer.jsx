import React from 'react';

export default function SectionContainer({ title, children }) {
    return (
        <div className="glass-panel" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                {title}
            </h2>
            {children}
        </div>
    )
}
