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

export const getUserEnrolledCourses = async (userId) => {
  return await client.get(`/api/progress/user/${userId}?populate=courseId`, {
    credentials: "include",
  });
};

export const enrollInCourse = async (courseId) => {
  const body = { courseId: courseId };
  return await client.post("/api/progress/enroll", body, {
    credentials: "include",
  });
};

export const checkEnrollment = async (courseId) => {
  return await client.get(`/api/progress/check/${courseId}`, {
    credentials: "include",
  });
};

export const getAllCourses = async () => {
  return await client.get("/api/courses/all", {
    next: { revalidate: 10 },
  });
};

export const getCourseById = async (courseId) => {
  return await client.get(`/api/courses/id/${courseId}`, {
    next: { revalidate: 10 },
  });
};

export const generateCourse = async (body) => {
  return await client.post("/api/courses/generate", body, {
    credentials: "include",
  });
};

export const logoutUser = async () => {
  return await client.post("/api/auth/logout", { credentials: "include" });
};
