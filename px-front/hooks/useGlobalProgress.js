import { useState, useEffect, useCallback } from "react";
import {
  getDashboardData,
  updateActivityStats,
  updateLastActiveModule,
} from "@/lib/api-client";

export const useGlobalProgress = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial data
  const fetchProgress = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDashboardData();
      console.log("data", data);
      setProgress(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load progress");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // --- Actions ---

  // Call this when user enters the dashboard or logs in
  const recordActivity = useCallback(async (minutes = 0) => {
    try {
      const updatedActivity = await updateActivityStats(minutes);
      setProgress((prev) => {
        if (!prev) return null;
        return { ...prev, activity: updatedActivity };
      });
    } catch (err) {
      console.error("Activity sync failed", err);
    }
  }, []);

  // Call this when video player pauses or unmounts
  const saveModuleProgress = async (courseId, moduleId, percent) => {
    try {
      const updatedModule = await updateLastActiveModule(
        courseId,
        moduleId,
        percent,
      );
      setProgress((prev) => ({ ...prev, lastActiveModule: updatedModule }));
    } catch (err) {
      console.error("Save progress failed", err);
    }
  };

  return {
    progress,
    loading,
    error,
    refresh: fetchProgress,
    recordActivity,
    saveModuleProgress,
  };
};
