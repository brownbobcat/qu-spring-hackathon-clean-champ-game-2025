import React from "react";
import { Link } from "react-router-dom";
import styles from "./ChallengesPage.module.css";
import { useTask } from "../context/TaskContext";
import { useUser } from "../context/UserContext";
import TimedChallenge from "../components/Challenges/TimedChallenges";

const ChallengesPage: React.FC = () => {
  const {
    timedChallenges,
    getAvailableChallenges,
    getActiveChallenges,
    getCompletedChallenges,
  } = useTask();

  const { currentUser } = useUser();

  // Get challenges using the new helper functions
  const activeChallenges = getActiveChallenges();
  const availableChallenges = getAvailableChallenges();
  const completedChallenges = currentUser
    ? getCompletedChallenges(currentUser.id)
    : [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Timed Challenges</h1>

      {!currentUser ? (
        <div className={styles.noUserMessage}>
          <h2 className={styles.messageTitle}>Create a Profile First</h2>
          <p className={styles.messageText}>
            You need to create a user profile before participating in
            challenges.
          </p>
          <Link to="/profile" className={styles.profileButton}>
            Go to Profile
          </Link>
        </div>
      ) : (
        <div>
          {activeChallenges.length > 0 && (
            <div className={styles.sectionContainer}>
              <h2 className={styles.sectionHeader}>
                <span className={styles.activeIcon}>▶</span>
                <span>Active Challenges</span>
              </h2>
              {activeChallenges.map((challenge) => (
                <TimedChallenge key={challenge.id} challenge={challenge} />
              ))}
            </div>
          )}

          {availableChallenges.length > 0 && (
            <div className={styles.sectionContainer}>
              <h2 className={styles.sectionHeader}>Available Challenges</h2>
              {availableChallenges.map((challenge) => (
                <TimedChallenge key={challenge.id} challenge={challenge} />
              ))}
            </div>
          )}

          {completedChallenges.length > 0 && (
            <div className={styles.sectionContainer}>
              <h2 className={styles.sectionHeader}>Completed Challenges</h2>
              {completedChallenges.map((challenge) => (
                <TimedChallenge key={challenge.id} challenge={challenge} />
              ))}
            </div>
          )}

          {timedChallenges.length === 0 && (
            <div className={styles.noDataMessage}>
              <h2 className={styles.noDataTitle}>No Challenges Available</h2>
              <p className={styles.noDataText}>
                Check back later for new challenges to complete!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChallengesPage;
