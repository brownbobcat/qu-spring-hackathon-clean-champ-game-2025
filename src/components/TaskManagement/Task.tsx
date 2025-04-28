/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import styles from "./Task.module.css";
import { Task as TaskType, TaskDifficulty } from "../../types";
import { useTask } from "../../context/TaskContext";
import { useUser } from "../../context/UserContext";

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const { currentUser, updateUserPoints } = useUser();
  const { completeTask } = useTask();

  const handleCompleteTask = () => {
    if (currentUser && !task.isCompleted) {
      console.log(
        `⭐ Completing task: ${task.title} for user: ${currentUser.name}`
      );
      console.log(`⭐ Points before: ${currentUser?.points}`);
      console.log(`⭐ Task points value: ${task.pointValue}`);

      // Call task completion method
      completeTask(task.id, currentUser.id);

      // FOR DEBUGGING: Force update points directly if needed
      // This shouldn't be necessary in normal operation
      // console.log("Directly updating points as fallback");
      updateUserPoints(currentUser.id, task.pointValue);

      // Log after a delay to see updated state
      setTimeout(() => {
        console.log(`⭐ Points after (delayed check): ${currentUser?.points}`);
      }, 500);
    }
  };

  // Determine difficulty badge class
  const getDifficultyClass = (difficulty: TaskDifficulty) => {
    switch (difficulty) {
      case TaskDifficulty.EASY:
        return styles.easyBadge;
      case TaskDifficulty.MEDIUM:
        return styles.mediumBadge;
      case TaskDifficulty.HARD:
        return styles.hardBadge;
      default:
        return "";
    }
  };

  return (
    <div
      className={`${styles.taskItem} ${
        task.isCompleted ? styles.taskCompleted : styles.taskIncomplete
      }`}
    >
      <div className={styles.taskHeader}>
        <h3
          className={`${styles.taskTitle} ${
            task.isCompleted ? styles.taskTitleCompleted : ""
          }`}
        >
          {task.title}
        </h3>
        <span
          className={`${styles.difficultyBadge} ${getDifficultyClass(
            task.difficulty
          )}`}
        >
          {task.difficulty}
        </span>
      </div>

      <p
        className={`${styles.taskDescription} ${
          task.isCompleted ? styles.taskDescriptionCompleted : ""
        }`}
      >
        {task.description}
      </p>

      <div className={styles.taskFooter}>
        <div className={styles.timeInfo}>
          <svg
            className={styles.timeIcon}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z"
              clipRule="evenodd"
            />
          </svg>
          <span className={styles.timeText}>
            {task.estimatedTimeMinutes} min
          </span>
        </div>

        <div className={styles.pointsInfo}>
          <svg
            className={styles.pointsIcon}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <span className={styles.pointsText}>{task.pointValue} pts</span>
        </div>

        {!task.isCompleted ? (
          <button
            onClick={handleCompleteTask}
            disabled={!currentUser}
            className={styles.completeButton}
          >
            Complete
          </button>
        ) : (
          <span className={styles.completedBadge}>Completed</span>
        )}
      </div>

      {task.isCompleted && task.completedAt && (
        <div className={styles.completionInfo}>
          Completed: {new Date(task.completedAt).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default Task;
