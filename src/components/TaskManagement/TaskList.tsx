import React from "react";
import styles from "./TaskList.module.css";
import Task from "./Task";
import { useTask } from "../../context/TaskContext";

interface TaskListProps {
  zoneId: string;
}

const TaskList: React.FC<TaskListProps> = ({ zoneId }) => {
  const { getTasksByZone, getZoneById } = useTask();

  const tasks = getTasksByZone(zoneId);
  const zone = getZoneById(zoneId);

  if (!zone) {
    return <div>Zone not found</div>;
  }

  const completedTasks = tasks.filter((task) => task.isCompleted);
  const pendingTasks = tasks.filter((task) => !task.isCompleted);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{zone.name} Tasks</h2>
      <p className={styles.description}>{zone.description}</p>

      <div className={styles.statsBar}>
        <div className={styles.statsText}>
          {completedTasks.length} of {tasks.length} tasks completed
        </div>
        <div className={styles.pointsBadge}>
          Total points:{" "}
          {tasks.reduce(
            (sum, task) => sum + (task.isCompleted ? task.pointValue : 0),
            0
          )}
        </div>
      </div>

      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{
            width: `${
              tasks.length > 0
                ? (completedTasks.length / tasks.length) * 100
                : 0
            }%`,
          }}
        ></div>
      </div>

      {pendingTasks.length > 0 ? (
        <>
          <h3 className={styles.sectionTitle}>Pending Tasks</h3>
          {pendingTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </>
      ) : (
        <div className={styles.allCompleted}>
          <span className={styles.checkmark}>✓</span>
          <p className={styles.allCompletedText}>
            All tasks completed in this zone!
          </p>
        </div>
      )}

      {completedTasks.length > 0 && (
        <>
          <h3 className={styles.sectionTitle}>Completed Tasks</h3>
          {completedTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </>
      )}
    </div>
  );
};

export default TaskList;
