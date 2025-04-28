/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/localStorage.ts

// Save data to localStorage
export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(`cleanchamp_${key}`, serializedData);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

// Get data from localStorage
export const getFromLocalStorage = (key: string): any => {
  try {
    const serializedData = localStorage.getItem(`cleanchamp_${key}`);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error getting data from localStorage:", error);
    return null;
  }
};

// Remove data from localStorage
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(`cleanchamp_${key}`);
  } catch (error) {
    console.error("Error removing data from localStorage:", error);
  }
};

// Clear all CleanChamp data from localStorage
export const clearCleanChampData = (): void => {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("cleanchamp_")) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error("Error clearing CleanChamp data from localStorage:", error);
  }
};
