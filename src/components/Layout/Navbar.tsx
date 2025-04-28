// src/components/Layout/Navbar.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import Avatar from "../Profile/Avatar";
import { useUser } from "../../context/UserContext";

const Navbar: React.FC = () => {
  const { currentUser } = useUser();
  console.log("currentUser", currentUser);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/challenges", label: "Challenges" },
    { path: "/leaderboard", label: "Leaderboard" },
    { path: "/profile", label: "Profile" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navFlex}>
          <div className={styles.logoSection}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoWhite}>Clean</span>
              <span className={styles.logoYellow}>Champ</span>
              <span className={styles.logoWhite}>🧹</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className={styles.desktopNav}>
            <div className={styles.navItems}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${styles.navButton} ${
                    location.pathname === item.path
                      ? styles.activeNavButton
                      : styles.inactiveNavButton
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {currentUser && (
                <div className={styles.userInfo}>
                  <Avatar avatarId={currentUser.avatarId} size="sm" />
                  <div className={styles.userDetails}>
                    <div className={styles.userName}>{currentUser.name}</div>
                    <div className={styles.userPoints}>
                      {currentUser.points} points
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className={styles.mobileMenuButton}>
            <button
              onClick={toggleMobileMenu}
              className={styles.menuButtonInner}
              aria-label="Toggle menu"
            >
              <svg
                className={styles.menuIcon}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuInner}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.mobileNavButton} ${
                  location.pathname === item.path
                    ? styles.mobileActiveNavButton
                    : styles.mobileInactiveNavButton
                }`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}

            {currentUser && (
              <div className={styles.mobileUserInfo}>
                <Avatar avatarId={currentUser.avatarId} size="sm" />
                <div className={styles.mobileUserDetails}>
                  <div className={styles.mobileUserName}>
                    {currentUser.name}
                  </div>
                  <div className={styles.mobileUserPoints}>
                    {currentUser.points} points
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
