/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import styles from "./UserProfile.module.css";
import Avatar from "./Avatar";
import { useUser } from "../../context/UserContext";

// Available avatar options for selection
const AVATAR_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const UserProfile = () => {
  const { currentUser, users, createUser, setCurrentUser } = useUser();

  // This state controls whether the user creation form is shown
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const handleCreateUser = (e: any) => {
    e.preventDefault();

    if (newUserName.trim()) {
      createUser(newUserName.trim(), selectedAvatar);
      setIsCreatingUser(false);
      setNewUserName("");
      setSelectedAvatar(0);
    }
  };

  // The key issue - fix the Add Another User button functionality
  const handleAddAnotherUser = () => {
    // Simply set the isCreatingUser state to true to show the creation form
    setIsCreatingUser(true);
  };

  return (
    <div className={styles.container}>
      {currentUser ? (
        <div>
          {isCreatingUser ? (
            // Show the user creation form when isCreatingUser is true
            <div>
              <h2 className={styles.title}>Create Another Profile</h2>
              <form className={styles.createForm} onSubmit={handleCreateUser}>
                <div className={styles.formField}>
                  <label htmlFor="userName" className={styles.label}>
                    Name
                  </label>
                  <input
                    id="userName"
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className={styles.textInput}
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.label}>Choose Avatar</label>
                  <div className={styles.avatarGrid}>
                    {AVATAR_OPTIONS.map((avatarId) => (
                      <button
                        key={avatarId}
                        type="button"
                        onClick={() => setSelectedAvatar(avatarId)}
                        className={`${styles.avatarButton} ${
                          selectedAvatar === avatarId
                            ? styles.selectedAvatar
                            : ""
                        }`}
                      >
                        <Avatar avatarId={avatarId} size="sm" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formButtons}>
                  <button type="submit" className={styles.submitButton}>
                    Create Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreatingUser(false)}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // Show the current user profile when isCreatingUser is false
            <div>
              <div className={styles.profileHeader}>
                <Avatar avatarId={currentUser.avatarId} size="lg" />
                <div className={styles.profileInfo}>
                  <h2 className={styles.userName}>{currentUser.name}</h2>
                  <p className={styles.joinDate}>
                    Joined:{" "}
                    {new Date(currentUser.joinedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className={styles.statsCard}>
                <div className={styles.statRow}>
                  <h3 className={styles.statLabel}>Total Points</h3>
                  <span className={styles.pointsValue}>
                    {currentUser.points}
                  </span>
                </div>
                <div className={styles.statRow}>
                  <h3 className={styles.statLabel}>Tasks Completed</h3>
                  <span className={styles.tasksValue}>
                    {currentUser.completedTasks.length}
                  </span>
                </div>
              </div>

              <div className={styles.achievementsSection}>
                <h3 className={styles.sectionTitle}>Achievements</h3>
                <div className={styles.achievementsGrid}>
                  {currentUser.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`${styles.achievementCard} ${
                        achievement.unlockedAt ? styles.unlocked : styles.locked
                      }`}
                    >
                      <span
                        className={`${styles.achievementIcon} ${
                          !achievement.unlockedAt ? styles.lockedIcon : ""
                        }`}
                      >
                        {achievement.icon}
                      </span>
                      <div>
                        <div className={styles.achievementName}>
                          {achievement.title}
                        </div>
                        <div className={styles.achievementDescription}>
                          {achievement.description}
                        </div>
                        {achievement.unlockedAt && (
                          <div className={styles.unlockDate}>
                            Unlocked:{" "}
                            {new Date(
                              achievement.unlockedAt
                            ).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {users.length > 1 && (
                <div className={styles.switchUserSection}>
                  <h3 className={styles.sectionTitle}>Switch User</h3>
                  <div className={styles.userList}>
                    {users
                      .filter((user) => user.id !== currentUser.id)
                      .map((user) => (
                        <button
                          key={user.id}
                          onClick={() => setCurrentUser(user.id)}
                          className={styles.userButton}
                        >
                          <Avatar avatarId={user.avatarId} size="sm" />
                          <span className={styles.avatarUsername}>
                            {user.name}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleAddAnotherUser}
                className={styles.createButton}
              >
                Add Another User
              </button>
            </div>
          )}
        </div>
      ) : isCreatingUser ? (
        <div>
          <h2 className={styles.title}>Create Your Profile</h2>
          <form className={styles.createForm} onSubmit={handleCreateUser}>
            <div className={styles.formField}>
              <label htmlFor="userName" className={styles.label}>
                Your Name
              </label>
              <input
                id="userName"
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className={styles.textInput}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Choose Avatar</label>
              <div className={styles.avatarGrid}>
                {AVATAR_OPTIONS.map((avatarId) => (
                  <button
                    key={avatarId}
                    type="button"
                    onClick={() => setSelectedAvatar(avatarId)}
                    className={`${styles.avatarButton} ${
                      selectedAvatar === avatarId ? styles.selectedAvatar : ""
                    }`}
                  >
                    <Avatar avatarId={avatarId} size="sm" />
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formButtons}>
              <button type="submit" className={styles.submitButton}>
                Create Profile
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingUser(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.welcomeBox}>
          <h2 className={styles.welcomeTitle}>Welcome to CleanChamp!</h2>
          <p className={styles.welcomeText}>
            Get started by creating your profile
          </p>
          <button
            onClick={() => setIsCreatingUser(true)}
            className={styles.submitButton}
          >
            Create Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
