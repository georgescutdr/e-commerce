import React from 'react';
import { Skeleton } from 'primereact/skeleton';

export const NavbarSkeleton = () => {
    
    return (
        <div
            style={{
                position: 'absolute',
                top: '15px',
                width: '100%',
                padding: '0.75rem 3rem',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            }}
        >
            {/* First row */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '0.1rem',
                }}
            >
                {/* Logo */}
                <Skeleton
                    width="120px"
                    height="46px"
                />

                {/* Search Bar */}
                <Skeleton
                    width="40%"
                    height="43px"
                />

                {/* Right: Buttons */}
                <Skeleton
                    width="112px"
                    height="43px"
                />
                <Skeleton
                    width="112px"
                    height="43px"
                />
                <Skeleton
                    width="112px"
                    height="43px"
                />
            </div>

            {/* Second row: menu buttons */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    width: '100%',
                    marginTop: '10px'
                }}
            >
                <Skeleton
                    width="112px"
                    height="43px"
                />
                <Skeleton
                    width="112px"
                    height="43px"
                />
                <Skeleton
                    width="112px"
                    height="43px"
                  
                />
            </div>

            {/* Keyframes added via global style tag */}
            <style>{`
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.4; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default NavbarSkeleton;
