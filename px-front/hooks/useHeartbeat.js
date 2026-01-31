"use client";
import { useEffect } from "react";
import { sendHeartBeat } from "@/lib/api-client";

export function useHeartbeat(courseId) {
  useEffect(() => {
    if (!courseId) return;

    const sendPing = async () => {
      // Only ping if the user is actually looking at the course
      if (document.visibilityState === "visible") {
        try {
          await sendHeartBeat(courseId);
        } catch (e) {
          console.warn("Heartbeat missed");
        }
      }
    };

    // Trigger every 60 seconds
    const interval = setInterval(sendPing, 60000);

    // Also trigger once immediately on load
    sendPing();

    return () => clearInterval(interval);
  }, [courseId]);
}
