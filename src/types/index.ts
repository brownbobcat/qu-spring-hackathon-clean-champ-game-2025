export type User = {
  id: string;
  name: string;
  avatarId: number;
  points: number;
  completedTasks: string[]; // IDs of completed tasks
  achievements: Achievement[];
  joinedDate: string;
};

export type Zone = {
  id: string;
  name: string;
  description: string;
  claimedBy: string | null; // User ID who claimed this zone
  claimedAt: string | null; // Timestamp when zone was claimed
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  color: string;
};

export enum TaskDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Task = {
  id: string;
  zoneId: string;
  title: string;
  description: string;
  difficulty: TaskDifficulty;
  pointValue: number;
  isCompleted: boolean;
  completedBy: string | null; // User ID
  completedAt: string | null; // Timestamp
  estimatedTimeMinutes: number;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
};

export type TimedChallenge = {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in seconds
  tasks: string[]; // IDs of tasks involved
  bonusPoints: number;
  isActive: boolean;
  startedAt: string | null;
  completedAt: string | null;
  completedBy: string | null; // User ID
};
