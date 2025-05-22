import React, { createContext, useState, useContext, useEffect } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import { User, Achievement } from "../types";

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

  const createUser = (name: string, avatarId: number) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      avatarId,
      points: 0,
      completedTasks: [],
      achievements: [...DEFAULT_ACHIEVEMENTS],
      joinedDate: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUserState(newUser);

    saveToLocalStorage("users", updatedUsers);
    saveToLocalStorage("currentUser", newUser);
  };

  const setCurrentUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUserState(user);
      saveToLocalStorage("currentUser", user);
    }
  };

  const updateUserPoints = (userId: string, pointsToAdd: number) => {
    console.log(
      `Updating points for user ${userId}: adding ${pointsToAdd} points`
    );

    if (pointsToAdd <= 0) {
      console.log("Points to add must be greater than 0");
      return;
    }

    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const updatedUser = {
          ...user,
          points: user.points + pointsToAdd,
        };

        console.log(
          `Updated user ${user.name}: points from ${user.points} to ${updatedUser.points}`
        );

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

    setUsers(updatedUsers);
    saveToLocalStorage("users", updatedUsers);

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

  const completeTask = (userId: string, taskId: string) => {
    console.log(`Marking task ${taskId} as completed for user ${userId}`);

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

    setUsers(updatedUsers);
    saveToLocalStorage("users", updatedUsers);

    if (currentUser && currentUser.id === userId) {
      const updatedCurrentUser =
        updatedUsers.find((u) => u.id === userId) || null;
      if (updatedCurrentUser) {
        setCurrentUserState(updatedCurrentUser);
        saveToLocalStorage("currentUser", updatedCurrentUser);
      }
    }
  };

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

    setUsers(updatedUsers);
    saveToLocalStorage("users", updatedUsers);

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
