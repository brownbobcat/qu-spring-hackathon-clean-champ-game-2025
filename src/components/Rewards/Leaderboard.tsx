import React from "react";
import styles from "./Leaderboard.module.css";
import Avatar from "../Profile/Avatar";
import { useUser } from "../../context/UserContext";

const Leaderboard: React.FC = () => {
  const { users } = useUser();

  // Sort users by points in descending order
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Leaderboard</h2>

      {sortedUsers.length === 0 ? (
        <div className={styles.emptyMessage}>
          <p className={styles.emptyText}>
            No users yet. Create a profile to get started!
          </p>
        </div>
      ) : (
        <div>
          {sortedUsers.slice(0, 3).length > 0 && (
            <div className={styles.podium}>
              {/* Second place */}
              {sortedUsers.length > 1 && (
                <div className={`${styles.podiumPlace} ${styles.secondPlace}`}>
                  <div className={styles.avatarContainer}>
                    <Avatar
                      avatarId={sortedUsers[1].avatarId}
                      size="md"
                      className={styles.secondAvatar}
                    />
                  </div>
                  <div
                    className={`${styles.podiumStand} ${styles.secondStand}`}
                  >
                    <span
                      className={`${styles.rankLabel} ${styles.secondLabel}`}
                    >
                      2nd
                    </span>
                    <span className={`${styles.points} ${styles.secondPoints}`}>
                      {sortedUsers[1].points}
                    </span>
                  </div>
                  <p className={`${styles.userName} ${styles.otherUserName}`}>
                    {sortedUsers[1].name}
                  </p>
                </div>
              )}

              {/* First place */}
              <div className={`${styles.podiumPlace} ${styles.firstPlace}`}>
                <div className={styles.crown}>👑</div>
                <div className={styles.avatarContainer}>
                  <Avatar
                    avatarId={sortedUsers[0].avatarId}
                    size="lg"
                    className={styles.firstAvatar}
                  />
                </div>
                <div className={`${styles.podiumStand} ${styles.firstStand}`}>
                  <span className={`${styles.rankLabel} ${styles.firstLabel}`}>
                    1st
                  </span>
                  <span className={`${styles.points} ${styles.firstPoints}`}>
                    {sortedUsers[0].points}
                  </span>
                </div>
                <p className={`${styles.userName} ${styles.firstUserName}`}>
                  {sortedUsers[0].name}
                </p>
              </div>

              {/* Third place */}
              {sortedUsers.length > 2 && (
                <div className={`${styles.podiumPlace} ${styles.thirdPlace}`}>
                  <div className={styles.avatarContainer}>
                    <Avatar
                      avatarId={sortedUsers[2].avatarId}
                      size="md"
                      className={styles.thirdAvatar}
                    />
                  </div>
                  <div className={`${styles.podiumStand} ${styles.thirdStand}`}>
                    <span
                      className={`${styles.rankLabel} ${styles.thirdLabel}`}
                    >
                      3rd
                    </span>
                    <span className={`${styles.points} ${styles.thirdPoints}`}>
                      {sortedUsers[2].points}
                    </span>
                  </div>
                  <p className={`${styles.userName} ${styles.otherUserName}`}>
                    {sortedUsers[2].name}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Rest of the leaderboard */}
          <div>
            <div className={styles.leaderboardHeader}>
              <span>Rank</span>
              <span>Name</span>
              <span>Points</span>
            </div>

            {sortedUsers.map((user, index) => (
              <div
                key={user.id}
                className={`${styles.leaderboardRow} ${
                  index < 3
                    ? styles.topThreeRow +
                      " " +
                      (index === 0
                        ? styles.firstRow
                        : index === 1
                        ? styles.secondRow
                        : styles.thirdRow)
                    : styles.otherRow
                }`}
              >
                <span
                  className={`${styles.rankBadge} ${
                    index === 0
                      ? styles.firstBadge
                      : index === 1
                      ? styles.secondBadge
                      : index === 2
                      ? styles.thirdBadge
                      : styles.otherBadge
                  }`}
                >
                  {index + 1}
                </span>

                <div className={styles.userInfo}>
                  <Avatar
                    avatarId={user.avatarId}
                    size="sm"
                    className={styles.userAvatar}
                  />
                  <span>{user.name}</span>
                </div>

                <span className={styles.userPoints}>{user.points}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
