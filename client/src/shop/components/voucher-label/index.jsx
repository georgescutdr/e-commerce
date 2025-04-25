import React, { useState, useEffect } from 'react';
import './voucher-label.css';
import { PiTagFill } from 'react-icons/pi';

export const VoucherLabel = ({ vouchers = [] }) => {
    const [validVouchers, setValidVouchers] = useState([]);

    useEffect(() => {
        const now = new Date();

        const filtered = vouchers
            .filter(voucher => {
                if (!voucher || !voucher.id) return false;

                // If there's an expiration date, check it
                if (voucher.expires_at) {
                    const expiresAt = new Date(voucher.expires_at);
                    return expiresAt >= now;
                }

                return true; // No expiration = still valid
            });

        // Deduplicate by voucher ID
        const deduplicated = Array.from(new Map(filtered.map(v => [v.id, v])).values());

        setValidVouchers(deduplicated);
    }, [vouchers]);

    return (
        <div className="voucher-status">
            {validVouchers.length > 0 && (
                <div className="voucher-message">
                    <PiTagFill className="voucher-icon" />
                    This product has a voucher
                </div>
            )}
        </div>
    );
};
