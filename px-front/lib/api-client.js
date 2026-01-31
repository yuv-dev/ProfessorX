import { cache } from "react";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function apiRequest(endpoint, options = {}) {
  const { method = "GET", body, headers, ...extraOptions } = options;
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      // If using Server-to-Server tokens, inject them here:
      //   'X-Internal-Secret': process.env.INTERNAL_SERVICE_TOKEN,
      ...headers,
    },
    credentials: "include", //Since we are using cookie based auth
    ...extraOptions,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, config);

    // 1. Handle HTTP errors (4xx, 5xx)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    // 2. Handle empty responses (204 No Content)
    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    // 3. Centralized Logging (to Sentry, Axiom, etc.)
    console.error(`[API Fetch Error]: ${endpoint}`, error.message);
    throw error;
  }
}

export const client = {
  get: (url, options) => apiRequest(url, { ...options, method: "GET" }),
  post: (url, body, options) =>
    apiRequest(url, { ...options, method: "POST", body }),
  put: (url, body, options) =>
    apiRequest(url, { ...options, method: "PUT", body }),
  delete: (url, options) => apiRequest(url, { ...options, method: "DELETE" }),
};

/*************************************************************************** */

// API functions
export const sendHeartBeat = async (courseId) => {
  const body = { courseId: courseId };
  return await client.post("/api/dashboard/heartbeat", body);
};

//Global Progress APIs
export const getDashboardData = async () => {
  return await client.get("/api/global-progress/");
};
export const updateActivityStats = async (sessionDurationMinutes=0) => {
  const body = { sessionDurationMinutes};
  return await client.post("/api/global-progress/activity", body);
};
export const updateLastActiveModule = async (courseId, moduleId, progressPercentage) => {
  const body = { courseId, moduleId, progressPercentage};
  return await client.put("/api/global-progress/module", body);
};
export const updateSkill = async (subject, rank) => {
  const body = {subject, rank};
  return await client.put("/api/global-progress/skill", body);
};
export const addMilestone = async (title) => {
  const body = { title};
  return await client.post("/api/global-progress/milestone", body);
};



//Course Progress APIs
export const getUserEnrolledCourses = async (userId) => {
  return await client.get(`/api/progress/user/${userId}?populate=courseId`);
};

export const enrollInCourse = async (courseId) => {
  const body = { courseId: courseId };
  return await client.post("/api/progress/enroll", body);
};

export const checkEnrollment = async (courseId) => {
  return await client.get(`/api/progress/check/${courseId}`);
};

export const updateProgress = async (courseId, moduleId) => {
  const body = { courseId, moduleId };
  return await client.put("/api/progress/update-last-active-module", body);
};

export const getProgressByCourseId = async (courseId) => {
  const response = await client.get(`/api/progress/course/${courseId}`);
  return response;
};

export const markModuleCompleted = async (courseId, moduleId) => {
  const body = { courseId, moduleId };
  return await client.put("/api/progress/mark-module-completed", body);
};

export const markCourseAsCompleted = async (courseId) => {
  return await client.put(`/api/progress/course/${courseId}/complete`);
};

export const getAllCourses = async () => {
  return await client.get("/api/courses/all", {
    next: { revalidate: 10 },
  });
};

export const getCourseById = cache(async (courseId) => {
  return await client.get(`/api/courses/id/${courseId}`, {
    next: { revalidate: 10 },
  });
});

export const getCourseModuleById = async (moduleId) => {
  return await client.get(`/api/courses/modules/id/${moduleId}`, {
    next: { revalidate: 10 },
  });
};

export const getCourseProjectById = async (projectId) => {
  return await client.get(`/api/courses/projects/id/${projectId}`, {
    next: { revalidate: 10 },
  });
};

export const getProjectByCourseId = async (courseId) => {
  return await client.get(`/api/courses/projects/${courseId}`, {
    next: { revalidate: 10 },
  });
};

export const generateCourse = async (body) => {
  return await client.post("/api/courses/generate", body);
};



//auth
export const googleLogin = async (credential) => {
  return await client.post("/api/auth/google", { credential });
};

export const restoreSession = async () => {
  return await client.get("/api/auth/me");
};

export const logoutUser = async () => {
  return await client.post("/api/auth/logout");
};
