import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.branding}>
            <div className={styles.logo}>
              <span className={styles.logoWhite}>Clean</span>
              <span className={styles.logoYellow}>Champ</span>
              <span className={styles.logoWhite}>🧹</span>
            </div>
            <p className={styles.slogan}>Make cleaning fun and competitive!</p>
          </div>

          <div className={styles.links}>
            <div className={styles.linksColumn}>
              <h3 className={styles.linksTitle}>Features</h3>
              <ul className={styles.linksList}>
                <li className={styles.linksItem}>Interactive Home Map</li>
                <li className={styles.linksItem}>Task Management</li>
                <li className={styles.linksItem}>Points & Rewards</li>
                <li className={styles.linksItem}>Timed Challenges</li>
              </ul>
            </div>

            <div className={styles.linksColumn}>
              <h3 className={styles.linksTitle}>About</h3>
              <ul className={styles.linksList}>
                <li className={styles.linksItem}>Project</li>
                <li className={styles.linksItem}>Contact</li>
                <li className={styles.linksItem}>Privacy</li>
                <li className={styles.linksItem}>Terms</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>
            &copy; {new Date().getFullYear()} CleanChamp. All rights reserved.
          </p>
          <p className={styles.techStack}>
            Made with React, TypeScript, and CSS Modules
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
