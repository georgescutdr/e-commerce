import React from 'react';
import './footer-styles.css';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <div className="footer-links">
                    <a href="/" className="footer-link">Home</a>
                    <a href="/about" className="footer-link">About</a>
                    <a href="/contact" className="footer-link">Contact</a>
                    <a href="/privacy" className="footer-link">Privacy Policy</a>
                </div>
                <div className="footer-social">
                    <a href="https://facebook.com" className="footer-social-link">
                        <i className="pi pi-facebook"></i>
                    </a>
                    <a href="https://twitter.com" className="footer-social-link">
                        <i className="pi pi-twitter"></i>
                    </a>
                    <a href="https://linkedin.com" className="footer-social-link">
                        <i className="pi pi-linkedin"></i>
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
