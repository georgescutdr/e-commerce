import React from 'react';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import './view-toggle-buttons.css';

export const ViewToggleButtons = ({ viewMode, setViewMode }) => {
    return (
        <div className="view-toggle-buttons">
            <Button
                icon={PrimeIcons.TH_LARGE}
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
            />
            <Button
                icon={PrimeIcons.LIST}
                className={`view-toggle-btn ${viewMode === 'stack' ? 'active' : ''}`}
                onClick={() => setViewMode('stack')}
                aria-label="Stack View"
            />
        </div>
    );
};

export default ViewToggleButtons;
