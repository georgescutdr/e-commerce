import React from 'react';
import './options.css';

export const Options = ({ items = [] }) => {
    return (
        <div className="options-style">
            <h4 className="options-title">Available Options</h4>
            <div className="options-grid">
                {items.map((option, idx) => (
                    <div key={idx} className="option-pill">
                        {option.name}
                    </div>
                ))}
            </div>
        </div>
    );
};
