/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import styles from "./Achievements.module.css";
import { useUser } from "../../context/UserContext";

const Achievements: React.FC = () => {
  const { currentUser } = useUser();

  if (!currentUser) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Achievements</h2>
        <div className={styles.emptyMessage}>
          <p className={styles.emptyText}>
            Create a profile to track achievements!
          </p>
        </div>
      </div>
    );
  }

  // Group achievements by status (unlocked/locked)
  const unlockedAchievements = currentUser.achievements.filter(
    (achievement) => achievement.unlockedAt !== null
  );

  const lockedAchievements = currentUser.achievements.filter(
    (achievement) => achievement.unlockedAt === null
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Achievements</h2>

      <div className={styles.progressHeader}>
        <h3 className={styles.progressTitle}>Your Progress</h3>
        <span className={styles.progressBadge}>
          {unlockedAchievements.length}/{currentUser.achievements.length}{" "}
          Unlocked
        </span>
      </div>

      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{
            width: `${
              currentUser.achievements.length > 0
                ? (unlockedAchievements.length /
                    currentUser.achievements.length) *
                  100
                : 0
            }%`,
          }}
        ></div>
      </div>

      {unlockedAchievements.length > 0 && (
        <div className={styles.achievementsSection}>
          <h3 className={`${styles.sectionTitle} ${styles.unlockTitle}`}>
            Unlocked
          </h3>
          <div className={styles.achievementsGrid}>
            {unlockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`${styles.achievementCard} ${styles.unlockedCard}`}
              >
                <span className={styles.achievementIcon}>
                  {achievement.icon}
                </span>
                <div className={styles.achievementInfo}>
                  <div className={styles.achievementTitle}>
                    {achievement.title}
                  </div>
                  <div className={styles.achievementDesc}>
                    {achievement.description}
                  </div>
                  <div className={styles.unlockDate}>
                    Unlocked:{" "}
                    {new Date(achievement.unlockedAt!).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {lockedAchievements.length > 0 && (
        <div className={styles.achievementsSection}>
          <h3 className={`${styles.sectionTitle} ${styles.lockTitle}`}>
            Locked
          </h3>
          <div className={styles.achievementsGrid}>
            {lockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`${styles.achievementCard} ${styles.lockedCard}`}
              >
                <span
                  className={`${styles.achievementIcon} ${styles.lockedIcon}`}
                >
                  {achievement.icon}
                </span>
                <div className={styles.achievementInfo}>
                  <div className={styles.achievementTitle}>
                    {achievement.title}
                  </div>
                  <div className={styles.achievementDesc}>
                    {achievement.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
