"use server";

import { generateCourse } from "@/lib/api-client";
import { redirect } from "next/navigation";

export async function createCourseAction(prevState, formData) {
  let newCourseId = null;

  try {
    const rawProfile = {
      currentLevel: formData.get("currentLevel"),
      targetLanguage: formData.get("targetLanguage"),
      learningGoal: formData.get("learningGoal"),
      preferredStyle: formData.get("preferredStyle"),
      knownLanguages: formData.get("knownLanguages")
        ?.toString()
        .split(",")
        .map((lang) => lang.trim())
        .filter(Boolean) || [],
    };

    const resp = await generateCourse({ profile: rawProfile });
    console.log("generateCourse response:", resp);
    if (!resp || !resp.ok) {
      return { error: resp?.error || "Failed to generate course" };
    }

    // Assume the API returns an ID like resp.id or resp.courseId
    newCourseId = resp.id || resp.courseId; 

  } catch (err) {
    return { error: err.message || "Request failed" };
  }

  // CALL REDIRECT OUTSIDE THE TRY/CATCH
  if (newCourseId) {
    redirect(`/dashboard/courses/${newCourseId}`);
  }
}