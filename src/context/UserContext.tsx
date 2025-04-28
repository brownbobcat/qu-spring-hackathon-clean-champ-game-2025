// UserContext.tsx - Make sure you have these properly implemented
import React, { createContext, useState, useContext, useEffect } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import { User, Achievement } from "../types";

// Define the initial achievements
const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: "achievement-1",
    title: "First Clean",
    description: "Complete your first cleaning task",
    icon: "🧹",
    unlockedAt: null,
  },
  {
    id: "achievement-2",
    title: "Speed Demon",
    description: "Complete a timed challenge under the limit",
    icon: "⏱️",
    unlockedAt: null,
  },
  {
    id: "achievement-3",
    title: "Zone Master",
    description: "Claim all zones in the house at least once",
    icon: "🏠",
    unlockedAt: null,
  },
  {
    id: "achievement-4",
    title: "Point Collector",
    description: "Earn 100 points",
    icon: "💯",
    unlockedAt: null,
  },
];

// Define the default users (empty initially)
const DEFAULT_USERS: User[] = [];

type UserContextType = {
  users: User[];
  currentUser: User | null;
  createUser: (name: string, avatarId: number) => void;
  setCurrentUser: (userId: string) => void;
  updateUserPoints: (userId: string, pointsToAdd: number) => void;
  completeTask: (userId: string, taskId: string) => void;
  unlockAchievement: (userId: string, achievementId: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUserState] = useState<User | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedUsers = getFromLocalStorage("users") || DEFAULT_USERS;
    const storedCurrentUser = getFromLocalStorage("currentUser");

    console.log("Loading users from localStorage:", storedUsers);

    setUsers(storedUsers);

    if (storedCurrentUser) {
      setCurrentUserState(storedCurrentUser);
      console.log("Current user set to:", storedCurrentUser);
    }
  }, []);

  // Create a new user
  const createUser = (name: string, avatarId: number) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      avatarId,
      points: 0,
      completedTasks: [],
      achievements: [...DEFAULT_ACHIEVEMENTS], // Create a deep copy of the achievements
      joinedDate: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUserState(newUser);

    // Save to localStorage
    saveToLocalStorage("users", updatedUsers);
    saveToLocalStorage("currentUser", newUser);
  };

  // Update the current user
  const setCurrentUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUserState(user);
      saveToLocalStorage("currentUser", user);
    }
  };

  // THIS IS THE CRITICAL FUNCTION - Update user points
  const updateUserPoints = (userId: string, pointsToAdd: number) => {
    console.log(
      `Updating points for user ${userId}: adding ${pointsToAdd} points`
    );

    if (pointsToAdd <= 0) {
      console.log("Points to add must be greater than 0");
      return;
    }

    // Create a new array of users with updated points
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const updatedUser = {
          ...user,
          points: user.points + pointsToAdd,
        };

        console.log(
          `Updated user ${user.name}: points from ${user.points} to ${updatedUser.points}`
        );

        // Check if this unlocks the Point Collector achievement
        if (
          updatedUser.points >= 100 &&
          updatedUser.achievements.find((a) => a.id === "achievement-4")
            ?.unlockedAt === null
        ) {
          updatedUser.achievements = updatedUser.achievements.map((a) =>
            a.id === "achievement-4"
              ? { ...a, unlockedAt: new Date().toISOString() }
              : a
          );
        }

        return updatedUser;
      }
      return user;
    });

    // Update state and localStorage
    setUsers(updatedUsers);
    saveToLocalStorage("users", updatedUsers);

    // If this is the current user, update the current user state too
    if (currentUser && currentUser.id === userId) {
      const updatedCurrentUser =
        updatedUsers.find((u) => u.id === userId) || null;
      if (updatedCurrentUser) {
        setCurrentUserState(updatedCurrentUser);
        saveToLocalStorage("currentUser", updatedCurrentUser);
        console.log("Updated current user state:", updatedCurrentUser);
      }
    }
  };

  // Complete a task
  const completeTask = (userId: string, taskId: string) => {
    console.log(`Marking task ${taskId} as completed for user ${userId}`);

    // Only add if it's not already completed
    const user = users.find((u) => u.id === userId);
    if (!user || user.completedTasks.includes(taskId)) {
      return;
    }

    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const updatedUser = {
          ...user,
          completedTasks: [...user.completedTasks, taskId],
        };

        // If this is their first task, unlock the First Clean achievement
        if (updatedUser.completedTasks.length === 1) {
          updatedUser.achievements = updatedUser.achievements.map((a) =>
            a.id === "achievement-1"
              ? { ...a, unlockedAt: new Date().toISOString() }
              : a
          );
        }

        return updatedUser;
      }
      return user;
    });

    // Update state and localStorage
    setUsers(updatedUsers);
    saveToLocalStorage("users", updatedUsers);

    // Update current user if needed
    if (currentUser && currentUser.id === userId) {
      const updatedCurrentUser =
        updatedUsers.find((u) => u.id === userId) || null;
      if (updatedCurrentUser) {
        setCurrentUserState(updatedCurrentUser);
        saveToLocalStorage("currentUser", updatedCurrentUser);
      }
    }
  };

  // Unlock an achievement
  const unlockAchievement = (userId: string, achievementId: string) => {
    console.log(`Unlocking achievement ${achievementId} for user ${userId}`);

    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const updatedAchievements = user.achievements.map((achievement) =>
          achievement.id === achievementId && !achievement.unlockedAt
            ? { ...achievement, unlockedAt: new Date().toISOString() }
            : achievement
        );

        return { ...user, achievements: updatedAchievements };
      }
      return user;
    });

    // Update state and localStorage
    setUsers(updatedUsers);
    saveToLocalStorage("users", updatedUsers);

    // Update current user if needed
    if (currentUser && currentUser.id === userId) {
      const updatedCurrentUser =
        updatedUsers.find((u) => u.id === userId) || null;
      if (updatedCurrentUser) {
        setCurrentUserState(updatedCurrentUser);
        saveToLocalStorage("currentUser", updatedCurrentUser);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        createUser,
        setCurrentUser,
        updateUserPoints,
        completeTask,
        unlockAchievement,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
