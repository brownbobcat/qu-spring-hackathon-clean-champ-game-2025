// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.css";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import HomeMap from "./components/HomeMap/HomeMap";
import UserProfile from "./components/Profile/UserProfile";
import Leaderboard from "./components/Rewards/Leaderboard";
import { UserProvider } from "./context/UserContext";
import { TaskProvider } from "./context/TaskContext";
import ChallengesPage from "./pages/ChallengesPage";
import Achievements from "./components/Rewards/Achievement";

const App: React.FC = () => {
  return (
    <UserProvider>
      <TaskProvider>
        <BrowserRouter>
          <div className={styles.app}>
            <Navbar />
            <main className={styles.main}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className={styles.container}>
                      <HomeMap />
                    </div>
                  }
                />
                <Route path="/challenges" element={<ChallengesPage />} />
                <Route
                  path="/leaderboard"
                  element={
                    <div className={styles.container}>
                      <h1 className={styles.pageTitle}>
                        Leaderboard & Achievements
                      </h1>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Leaderboard />
                        <Achievements />
                      </div>
                    </div>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <div className={styles.container}>
                      <h1 className={styles.pageTitle}>Your Profile</h1>
                      <UserProfile />
                    </div>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TaskProvider>
    </UserProvider>
  );
};

export default App;
