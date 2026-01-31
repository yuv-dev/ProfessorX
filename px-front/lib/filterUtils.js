// utils/filterUtils.js

export const filterCourses = (courses, filterStatus, searchQuery) => {
  return courses.filter((course) => {
    // 1. Safe access to nested properties
    const progress = course.progress || {};
    const status = progress.status || "active"; // Default to active if undefined
    
    // 2. Status Match
    const matchesStatus = 
      filterStatus === "All" || 
      status.toLowerCase() === filterStatus.toLowerCase();

    // 3. Search Match (Title or Description)
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      course.title?.toLowerCase().includes(query) || 
      course.description?.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });
};

export const sortCourses = (courses, sortBy) => {
  // Create a copy to avoid mutating original state
  return [...courses].sort((a, b) => {
    const dateA = new Date(a.lastAccessed || a.enrollmentDate);
    const dateB = new Date(b.lastAccessed || b.enrollmentDate);

    if (sortBy === "recent") return dateB - dateA; // Newest first
    if (sortBy === "oldest") return dateA - dateB; // Oldest first
    
    // Sort by Progress % (High to Low)
    if (sortBy === "progress") {
      const progA = (a.progress?.completedModules?.length || 0);
      const progB = (b.progress?.completedModules?.length || 0);
      return progB - progA;
    }
    return 0;
  });
};