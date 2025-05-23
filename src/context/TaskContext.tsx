import React, { createContext, useState, useContext, useEffect } from "react";
import { Task, Zone, TaskDifficulty, TimedChallenge } from "../types";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import { useUser } from "./UserContext";

const DEFAULT_ZONES: Zone[] = [
  {
    id: "kitchen",
    name: "Kitchen",
    description: "Where the cooking happens",
    claimedBy: null,
    claimedAt: null,
    position: { x: 10, y: 10, width: 30, height: 20 },
    color: "#FFD700",
  },
  {
    id: "living-room",
    name: "Living Room",
    description: "The main hangout space",
    claimedBy: null,
    claimedAt: null,
    position: { x: 40, y: 10, width: 30, height: 20 },
    color: "#87CEEB",
  },
  {
    id: "bathroom",
    name: "Bathroom",
    description: "Keep it sparkling clean",
    claimedBy: null,
    claimedAt: null,
    position: { x: 10, y: 40, width: 20, height: 20 },
    color: "#98FB98",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    description: "Your personal space",
    claimedBy: null,
    claimedAt: null,
    position: { x: 40, y: 40, width: 30, height: 30 },
    color: "#DDA0DD",
  },
];

const DEFAULT_TASKS: Task[] = [
  {
    id: "task-1",
    zoneId: "kitchen",
    title: "Wash dishes",
    description: "Clean all dishes in the sink",
    difficulty: TaskDifficulty.EASY,
    pointValue: 10,
    isCompleted: false,
    completedBy: null,
    completedAt: null,
    estimatedTimeMinutes: 10,
  },
  {
    id: "task-2",
    zoneId: "kitchen",
    title: "Clean countertops",
    description: "Wipe all kitchen surfaces",
    difficulty: TaskDifficulty.EASY,
    pointValue: 5,
    isCompleted: false,
    completedBy: null,
    completedAt: null,
    estimatedTimeMinutes: 5,
  },
  {
    id: "task-3",
    zoneId: "kitchen",
    title: "Mop floor",
    description: "Mop the kitchen floor thoroughly",
    difficulty: TaskDifficulty.MEDIUM,
    pointValue: 15,
    isCompleted: false,
    completedBy: null,
    completedAt: null,
    estimatedTimeMinutes: 15,
  },

  {
    id: "task-4",
    zoneId: "living-room",
    title: "Vacuum carpet",
    description: "Vacuum the entire living room",
    difficulty: TaskDifficulty.MEDIUM,
    pointValue: 15,
    isCompleted: false,
    completedBy: null,
    completedAt: null,
    estimatedTimeMinutes: 10,
  },
  {
    id: "task-5",
    zoneId: "living-room",
    title: "Dust furniture",
    description: "Dust all surfaces and decorations",
    difficulty: TaskDifficulty.EASY,
    pointValue: 10,
    isCompleted: false,
    completedBy: null,
    completedAt: null,
    estimatedTimeMinutes: 8,
  },

  {
    id: "task-6",
    zoneId: "bathroom",
    title: "Clean toilet",
    description: "Clean toilet inside and out",
    difficulty: TaskDifficulty.MEDIUM,
    pointValue: 15,
    isCompleted: false,
    completedBy: null,
    completedAt: null,
    estimatedTimeMinutes: 10,
  },
  {
    id: "task-7",
    zoneId: "bathroom",
    title: "Scrub shower",
    description: "Clean shower walls and floor",
    difficulty: TaskDifficulty.HARD,
    pointValue: 20,
    isCompleted: false,
    completedBy: null,
    completedAt: null,
    estimatedTimeMinutes: 20,
  },

  {
    id: "task-8",
    zoneId: "bedroom",
    title: "Make bed",
    description: "Make your bed neatly",
    difficulty: TaskDifficulty.EASY,
    pointValue: 5,
    isCompleted: false,
    completedBy: null,
    completedAt: null,
    estimatedTimeMinutes: 3,
  },
  {
    id: "task-9",
    zoneId: "bedroom",
    title: "Organize closet",
    description: "Arrange clothes and items in closet",
    difficulty: TaskDifficulty.HARD,
    pointValue: 25,
    isCompleted: false,
    completedBy: null,
    completedAt: null,
    estimatedTimeMinutes: 30,
  },
];

const NEW_CHALLENGES: TimedChallenge[] = [
  {
    id: "challenge-3",
    title: "Full House Sweep",
    description: "Complete one task in each zone of the house",
    timeLimit: 1800,
    tasks: ["task-1", "task-4", "task-6", "task-8"],
    bonusPoints: 75,
    isActive: false,
    startedAt: null,
    completedAt: null,
    completedBy: null,
  },
  {
    id: "challenge-4",
    title: "Hard Task Marathon",
    description: "Complete all hard difficulty tasks in the house",
    timeLimit: 3600,
    tasks: ["task-7", "task-9"],
    bonusPoints: 100,
    isActive: false,
    startedAt: null,
    completedAt: null,
    completedBy: null,
  },
  {
    id: "challenge-5",
    title: "Morning Refresh",
    description: "Start your day with quick cleaning tasks",
    timeLimit: 600,
    tasks: ["task-2", "task-5", "task-8"],
    bonusPoints: 30,
    isActive: false,
    startedAt: null,
    completedAt: null,
    completedBy: null,
  },
  {
    id: "challenge-6",
    title: "Weekend Deep Clean",
    description: "Tackle the most time-consuming tasks",
    timeLimit: 5400,
    tasks: ["task-3", "task-4", "task-7", "task-9"],
    bonusPoints: 120,
    isActive: false,
    startedAt: null,
    completedAt: null,
    completedBy: null,
  },
  {
    id: "challenge-7",
    title: "Last Minute Tidy",
    description: "Quick cleanup before guests arrive",
    timeLimit: 900,
    tasks: ["task-2", "task-5", "task-8"],
    bonusPoints: 35,
    isActive: false,
    startedAt: null,
    completedAt: null,
    completedBy: null,
  },
];

const DEFAULT_CHALLENGES: TimedChallenge[] = [
  {
    id: "challenge-1",
    title: "Kitchen Speed Clean",
    description: "Complete all kitchen tasks in record time",
    timeLimit: 1200,
    tasks: ["task-1", "task-2", "task-3"],
    bonusPoints: 50,
    isActive: false,
    startedAt: null,
    completedAt: null,
    completedBy: null,
  },
  {
    id: "challenge-2",
    title: "Bathroom Blitz",
    description: "Make the bathroom shine quickly",
    timeLimit: 900,
    tasks: ["task-6", "task-7"],
    bonusPoints: 40,
    isActive: false,
    startedAt: null,
    completedAt: null,
    completedBy: null,
  },
  ...NEW_CHALLENGES,
];

type TaskContextType = {
  zones: Zone[];
  tasks: Task[];
  timedChallenges: TimedChallenge[];
  claimZone: (zoneId: string, userId: string) => void;
  completeTask: (taskId: string, userId: string) => void;
  startChallenge: (challengeId: string, userId: string) => void;
  completeChallenge: (
    challengeId: string,
    userId: string,
    timeSpentSeconds: number
  ) => void;
  getTasksByZone: (zoneId: string) => Task[];
  getZoneById: (zoneId: string) => Zone | undefined;
  resetData: () => void;
  getChallengeProgress: (challengeId: string) => {
    totalTasks: number;
    completedTasks: number;
    timeRemaining: number | null;
    isExpired: boolean;
  };
  getAvailableChallenges: () => TimedChallenge[];
  getActiveChallenges: () => TimedChallenge[];
  getCompletedChallenges: (userId?: string) => TimedChallenge[];
  abandonChallenge: (challengeId: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [timedChallenges, setTimedChallenges] = useState<TimedChallenge[]>([]);
  const {
    updateUserPoints,
    completeTask: markTaskCompletedForUser,
    unlockAchievement,
  } = useUser();

  useEffect(() => {
    const storedZones = getFromLocalStorage("zones") || DEFAULT_ZONES;
    const storedTasks = getFromLocalStorage("tasks") || DEFAULT_TASKS;
    const storedChallenges =
      getFromLocalStorage("challenges") || DEFAULT_CHALLENGES;

    setZones(storedZones);
    setTasks(storedTasks);
    setTimedChallenges(storedChallenges);
  }, []);

  const saveData = (
    updatedZones?: Zone[],
    updatedTasks?: Task[],
    updatedChallenges?: TimedChallenge[]
  ) => {
    if (updatedZones) {
      setZones(updatedZones);
      saveToLocalStorage("zones", updatedZones);
    }

    if (updatedTasks) {
      setTasks(updatedTasks);
      saveToLocalStorage("tasks", updatedTasks);
    }

    if (updatedChallenges) {
      setTimedChallenges(updatedChallenges);
      saveToLocalStorage("challenges", updatedChallenges);
    }
  };

  const claimZone = (zoneId: string, userId: string) => {
    const updatedZones = zones.map((zone) => {
      if (zone.id === zoneId) {
        return {
          ...zone,
          claimedBy: userId,
          claimedAt: new Date().toISOString(),
        };
      }
      return zone;
    });

    saveData(updatedZones);

    const userClaimedZones = updatedZones.filter(
      (zone) => zone.claimedBy === userId
    );
    if (userClaimedZones.length === zones.length) {
      unlockAchievement(userId, "achievement-3");
    }
  };

  const completeTask = (taskId: string, userId: string) => {
    console.log(`TaskContext: Completing task ${taskId} for user ${userId}`);

    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      console.log(`Task ${taskId} not found`);
      return;
    }

    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          isCompleted: true,
          completedBy: userId,
          completedAt: new Date().toISOString(),
        };
      }
      return t;
    });

    saveData(undefined, updatedTasks);

    console.log(`Task points value: ${task.pointValue}`);

    updateUserPoints(userId, task.pointValue);
    markTaskCompletedForUser(userId, taskId);

    const activeChallenge = timedChallenges.find(
      (c) =>
        c.isActive && c.startedAt && c.tasks.includes(taskId) && !c.completedAt
    );

    if (activeChallenge) {
      const allChallengeTasksCompleted = activeChallenge.tasks.every(
        (taskId) => updatedTasks.find((t) => t.id === taskId)?.isCompleted
      );

      if (allChallengeTasksCompleted) {
        console.log(`All tasks completed for challenge ${activeChallenge.id}`);

        const startTime = new Date(activeChallenge.startedAt || "").getTime();
        const endTime = new Date().getTime();
        const timeSpentSeconds = Math.floor((endTime - startTime) / 1000);

        completeChallenge(activeChallenge.id, userId, timeSpentSeconds);
      }
    }
  };

  const startChallenge = (challengeId: string) => {
    const updatedChallenges = timedChallenges.map((challenge) => {
      if (challenge.id === challengeId) {
        return {
          ...challenge,
          isActive: true,
          startedAt: new Date().toISOString(),
          completedAt: null,
          completedBy: null,
        };
      }
      return challenge;
    });

    saveData(undefined, undefined, updatedChallenges);
  };

  const completeChallenge = (
    challengeId: string,
    userId: string,
    timeSpentSeconds: number
  ) => {
    console.log(`Completing challenge ${challengeId} for user ${userId}`);

    const challenge = timedChallenges.find((c) => c.id === challengeId);
    if (!challenge) {
      console.log(`Challenge ${challengeId} not found`);
      return;
    }

    const updatedChallenges = timedChallenges.map((c) => {
      if (c.id === challengeId) {
        return {
          ...c,
          isActive: false,
          completedAt: new Date().toISOString(),
          completedBy: userId,
        };
      }
      return c;
    });

    saveData(undefined, undefined, updatedChallenges);

    if (timeSpentSeconds <= challenge.timeLimit) {
      console.log(
        `Awarding ${challenge.bonusPoints} bonus points for completing challenge in time`
      );

      updateUserPoints(userId, challenge.bonusPoints);

      unlockAchievement(userId, "achievement-2");
    }
  };

  const getTasksByZone = (zoneId: string) => {
    return tasks.filter((task) => task.zoneId === zoneId);
  };

  const getZoneById = (zoneId: string) => {
    return zones.find((zone) => zone.id === zoneId);
  };

  const resetData = () => {
    saveData(DEFAULT_ZONES, DEFAULT_TASKS, DEFAULT_CHALLENGES);
  };

  const getChallengeProgress = (challengeId: string) => {
    const challenge = timedChallenges.find((c) => c.id === challengeId);
    if (!challenge || !challenge.isActive || !challenge.startedAt) {
      return {
        totalTasks: 0,
        completedTasks: 0,
        timeRemaining: null,
        isExpired: false,
      };
    }

    const totalTasks = challenge.tasks.length;
    const completedTasks = challenge.tasks.filter(
      (taskId) => tasks.find((t) => t.id === taskId)?.isCompleted
    ).length;

    const startTime = new Date(challenge.startedAt).getTime();
    const currentTime = new Date().getTime();
    const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    const timeRemaining = challenge.timeLimit - elapsedSeconds;
    const isExpired = timeRemaining <= 0;

    return { totalTasks, completedTasks, timeRemaining, isExpired };
  };

  const getAvailableChallenges = () => {
    return timedChallenges.filter(
      (challenge) => !challenge.isActive && !challenge.completedAt
    );
  };

  const getActiveChallenges = () => {
    return timedChallenges.filter((challenge) => challenge.isActive);
  };

  const getCompletedChallenges = (userId?: string) => {
    return timedChallenges.filter(
      (challenge) =>
        challenge.completedAt && (!userId || challenge.completedBy === userId)
    );
  };

  const abandonChallenge = (challengeId: string) => {
    const updatedChallenges = timedChallenges.map((c) => {
      if (c.id === challengeId) {
        return {
          ...c,
          isActive: false,
          startedAt: null,
        };
      }
      return c;
    });

    saveData(undefined, undefined, updatedChallenges);
  };

  return (
    <TaskContext.Provider
      value={{
        zones,
        tasks,
        timedChallenges,
        claimZone,
        completeTask,
        startChallenge,
        completeChallenge,
        getTasksByZone,
        getZoneById,
        resetData,

        getChallengeProgress,
        getAvailableChallenges,
        getActiveChallenges,
        getCompletedChallenges,
        abandonChallenge,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
