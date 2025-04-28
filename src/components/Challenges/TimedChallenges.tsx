import React, { useState, useEffect } from "react";
import styles from "./TimedChallenge.module.css";
import { TimedChallenge as TimedChallengeType } from "../../types";
import { useTask } from "../../context/TaskContext";
import { useUser } from "../../context/UserContext";

interface TimedChallengeProps {
  challenge: TimedChallengeType;
}

const TimedChallenge: React.FC<TimedChallengeProps> = ({ challenge }) => {
  const { tasks, startChallenge, abandonChallenge } = useTask();
  const { currentUser } = useUser();

  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  const challengeTasks = challenge.tasks
    .map((taskId) => tasks.find((t) => t.id === taskId))
    .filter((task) => task !== undefined);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    if (!challenge.isActive || !challenge.startedAt) {
      setTimeRemaining(null);
      return;
    }

    // Calculate initial time remaining
    const calculateTimeRemaining = () => {
      const startTime = new Date(challenge.startedAt || "").getTime();
      const currentTime = new Date().getTime();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      const remaining = challenge.timeLimit - elapsedSeconds;

      // Don't go below zero
      return remaining > 0 ? remaining : 0;
    };

    // Set initial time
    setTimeRemaining(calculateTimeRemaining());

    // Create timer that updates every second
    const timerInterval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      // If time runs out, clear the interval
      if (remaining <= 0) {
        clearInterval(timerInterval);
      }
    }, 1000);

    // Clean up interval on unmount or if challenge becomes inactive
    return () => clearInterval(timerInterval);
  }, [challenge.isActive, challenge.startedAt, challenge.timeLimit]);

  // Effect to count completed tasks
  useEffect(() => {
    if (challenge.isActive) {
      const count = challengeTasks.filter((task) => task?.isCompleted).length;
      setCompletedTasksCount(count);
    }
  }, [challenge.isActive, challengeTasks]);

  const handleStartChallenge = () => {
    if (currentUser) {
      startChallenge(challenge.id, currentUser.id);
    }
  };

  const handleAbandonChallenge = () => {
    abandonChallenge(challenge.id);
  };

  // Determine the challenge status
  let statusElement = null;
  let actionButton = null;

  if (challenge.completedAt) {
    // Completed challenge
    const completionDate = new Date(challenge.completedAt).toLocaleDateString();
    statusElement = (
      <div className={styles.completedStatus}>
        Completed on {completionDate}
      </div>
    );
  } else if (challenge.isActive) {
    // Active challenge
    const timeDisplay =
      timeRemaining !== null
        ? timeRemaining > 0
          ? formatTime(timeRemaining)
          : "Time's up!"
        : "Loading...";

    statusElement = (
      <div className={styles.progressContainer}>
        <div className={styles.progressInfo}>
          <span>
            Progress: {completedTasksCount}/{challengeTasks.length}
          </span>
          <span
            className={
              timeRemaining !== null && timeRemaining < 300
                ? styles.timeWarning
                : ""
            }
          >
            Time left: {timeDisplay}
          </span>
        </div>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{
              width: `${
                challengeTasks.length > 0
                  ? (completedTasksCount / challengeTasks.length) * 100
                  : 0
              }%`,
            }}
          ></div>
        </div>
      </div>
    );

    actionButton = (
      <button onClick={handleAbandonChallenge} className={styles.abandonButton}>
        Abandon Challenge
      </button>
    );
  } else {
    // Available challenge
    actionButton = (
      <button
        onClick={handleStartChallenge}
        className={styles.startButton}
        disabled={!currentUser}
      >
        Start Challenge
      </button>
    );
  }

  return (
    <div
      className={`${styles.challengeCard} ${
        challenge.isActive ? styles.activeChallenge : ""
      }`}
    >
      <h3 className={styles.challengeTitle}>{challenge.title}</h3>
      <p className={styles.challengeDescription}>{challenge.description}</p>

      <div className={styles.tasksContainer}>
        <div className={styles.taskHeader}>Tasks:</div>
        <ul className={styles.taskList}>
          {challengeTasks.map(
            (task) =>
              task && (
                <li key={task.id} className={styles.taskItem}>
                  <span
                    className={task.isCompleted ? styles.completedTask : ""}
                  >
                    {task.title}
                  </span>
                  {task.isCompleted && (
                    <span className={styles.checkmark}>✓</span>
                  )}
                </li>
              )
          )}
        </ul>
      </div>

      <div className={styles.challengeDetails}>
        <div className={styles.timeLimit}>
          <span className={styles.detailLabel}>Time limit:</span>{" "}
          {formatTime(challenge.timeLimit)}
        </div>
        <div className={styles.bonusPoints}>
          <span className={styles.detailLabel}>Bonus points:</span>{" "}
          {challenge.bonusPoints}
        </div>
      </div>

      {statusElement}
      {actionButton}
    </div>
  );
};

export default TimedChallenge;
