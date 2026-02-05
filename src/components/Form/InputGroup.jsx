import React from 'react';

export default function InputGroup({ label, id, children }) {
    return (
        // Only wrap if it's not a checkbox group or similar that handles its own layout
        <div className="input-group">
            <label htmlFor={id} className="label">{label}</label>
            {children}
        </div>
    );
}
