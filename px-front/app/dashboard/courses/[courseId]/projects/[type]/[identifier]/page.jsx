import { getProjectByCourseId } from "@/lib/api-client";
import ProjectDetailView from "@/Components/course/ProjectDetailView";
import CourseBreadcrumb from "@/Components/course/Breadcrumb";

export default async function ProjectPage({ params }) {
  const { courseId, type, identifier } = await params;

  // 1. Fetch the project document using the courseId link
  const { project } = await getProjectByCourseId(courseId);
  console.log("Fetched Project Data:", project);
  let displayData = null;

  // 2. Extract the specific content based on the URL
  if (type === "final") {
    displayData = project.finalProject;
  } else if (type === "mini") {
    const index = parseInt(identifier);
    displayData = project.miniProjects[index];
  }
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <CourseBreadcrumb
        activeTitle={displayData.projectTitle}
        courseId={project.courseId._id}
        courseTitle={project.courseId.title}
      />

      <ProjectDetailView
        data={displayData}
        courseId={courseId}
        isFinal={type === "final"}
      />
    </div>
  );
}
