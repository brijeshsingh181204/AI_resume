import React, { useState, useEffect } from 'react';
import { UserButton, useUser } from "@clerk/clerk-react";
import "./Header.css";

function Header() {
    const { user, isSignedIn } = useUser();
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`header-container ${scrolled ? 'header-scrolled' : ''}`}>
            <div className="header-content">
                <a className="logo-container">
                    RESUME
                    <sup class="ai-badge">AI</sup>
                </a>
                

                {isSignedIn ? (
                    <div className='auth-buttons'>
                        <a href='/dashboard'>
                            <button className="dashboard-button">
                                <span>Dashboard</span>
                            </button>
                        </a>
                        <div className="user-button-wrapper">
                            <UserButton />
                        </div>
                    </div>
                ) : (
                    <a href='/auth/sign-in'>
                        <button className="get-started-button">
                            <span>Get Started</span>
                        </button>
                    </a>
                )}
            </div>
        </header>
    );
}

export default Header;