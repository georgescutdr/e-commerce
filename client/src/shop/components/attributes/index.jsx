import React from 'react';
import './attributes.css';

export const Attributes = ({ items = [] }) => {
    return (
        <div className="attributes-style">
            <h4 className="attributes-title">Product Features</h4>
            {items.length === 0 ? (
                <p className="attributes-empty">No attributes available</p>
            ) : (
                <table className="attributes-table">
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td className="attribute-name">{ item.name }</td>
                                <td className="attribute-value">{ item.value }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
