import React from "react";
import styles from "./Zone.module.css";
import { Zone as ZoneType } from "../../types";
import { useUser } from "../../context/UserContext";
import { useTask } from "../../context/TaskContext";

interface ZoneProps {
  zone: ZoneType;
  onClick: () => void;
}

const Zone: React.FC<ZoneProps> = ({ zone, onClick }) => {
  const { currentUser } = useUser();
  const { getTasksByZone } = useTask();

  const tasks = getTasksByZone(zone.id);
  const completedTasks = tasks.filter((task) => task.isCompleted);
  const completionPercentage =
    tasks.length > 0
      ? Math.round((completedTasks.length / tasks.length) * 100)
      : 0;

  const isClaimed = Boolean(zone.claimedBy);
  const isClaimedByCurrentUser =
    currentUser && zone.claimedBy === currentUser.id;

  return (
    <div
      onClick={onClick}
      className={`${styles.zone} 
          ${isClaimed ? styles.zoneClaimed : styles.zoneUnclaimed}
          ${isClaimedByCurrentUser ? styles.zoneClaimedByCurrentUser : ""}`}
      style={{
        left: `${zone.position.x}%`,
        top: `${zone.position.y}%`,
        width: `${zone.position.width}%`,
        height: `${zone.position.height}%`,
        backgroundColor: `${zone.color}${isClaimed ? "80" : "50"}`, // Add transparency
      }}
    >
      <h3 className={styles.zoneName}>{zone.name}</h3>

      {isClaimed && (
        <div className={styles.claimedText}>
          {isClaimedByCurrentUser ? "Claimed by you" : "Claimed"}
        </div>
      )}

      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      <div className={styles.taskCount}>
        {completedTasks.length}/{tasks.length} tasks
      </div>
    </div>
  );
};

export default Zone;
