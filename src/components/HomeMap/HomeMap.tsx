/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import styles from "./HomeMap.module.css";
import Zone from "./Zone";
import TaskList from "../TaskManagement/TaskList";
import { useTask } from "../../context/TaskContext";
import { useUser } from "../../context/UserContext";

const HomeMap: React.FC = () => {
  const { zones, claimZone, getTasksByZone } = useTask();
  const { currentUser } = useUser();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(zoneId);
  };

  const handleClaimZone = () => {
    if (currentUser && selectedZone) {
      claimZone(selectedZone, currentUser.id);
    }
  };

  const selectedZoneObj = zones.find((zone) => zone.id === selectedZone);
  const isSelectedZoneClaimed = selectedZoneObj?.claimedBy !== null;
  const isClaimedByCurrentUser =
    currentUser && selectedZoneObj?.claimedBy === currentUser.id;

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <h2 className={styles.title}>Home Map</h2>
        <div className={styles.map}>
          {zones.map((zone) => (
            <Zone
              key={zone.id}
              zone={zone}
              onClick={() => handleZoneClick(zone.id)}
            />
          ))}
        </div>

        <div className={styles.info}>
          <div>
            {selectedZone ? (
              <div>
                <h3 className={styles.zoneTitle}>
                  Selected: {selectedZoneObj?.name}
                </h3>
                <p className={styles.zoneDescription}>
                  {selectedZoneObj?.description}
                </p>
              </div>
            ) : (
              <p className={styles.noSelection}>Select a zone to see details</p>
            )}
          </div>

          {selectedZone && currentUser && !isSelectedZoneClaimed && (
            <button onClick={handleClaimZone} className={styles.claimButton}>
              Claim Zone
            </button>
          )}

          {isClaimedByCurrentUser && (
            <span className={`${styles.badge} ${styles.badgeGreen}`}>
              Claimed by you
            </span>
          )}

          {isSelectedZoneClaimed && !isClaimedByCurrentUser && (
            <span className={`${styles.badge} ${styles.badgeYellow}`}>
              Already claimed
            </span>
          )}
        </div>
      </div>

      <div className={styles.tasksContainer}>
        {selectedZone ? (
          <TaskList zoneId={selectedZone} />
        ) : (
          <div className={styles.noTasksMessage}>
            <p>Select a zone to see tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeMap;
