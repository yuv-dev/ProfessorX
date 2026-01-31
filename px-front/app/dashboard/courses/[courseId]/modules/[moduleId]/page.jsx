import {
  getCourseById,
  getCourseModuleById,
} from "@/lib/api-client";
import Module from "@/Components/course/Module.jsx";
import CourseBreadcrumb from "@/Components/course/Breadcrumb";
import ModuleNavigation from "@/Components/course/ModuleNavigation";

const page = async ({ params }) => {
  const { moduleId, courseId } = await params;
  const { course } = await getCourseById(courseId);
  const response = await getCourseModuleById(moduleId);
  const modulesList = course.modules;
  const currentIndex = modulesList.findIndex(
    (m) => m._id.toString() === moduleId,
  );

  // Identify the neighbors
  const prevModule = currentIndex > 0 ? modulesList[currentIndex - 1] : null;
  const nextModule =
    currentIndex < modulesList.length - 1
      ? modulesList[currentIndex + 1]
      : null;

  return (
    <div className="text-black">
      <CourseBreadcrumb
        activeTitle={response.module.moduleTitle}
        courseId={response.module.courseId._id}
        courseTitle={response.module.courseId.title}
      />
      <Module
        module={response.module}
        courseId={courseId}
        nextModule={nextModule}
      />
      <ModuleNavigation
        courseId={courseId}
        prev={prevModule}
        next={nextModule}
      />
    </div>
  );
};

export default page;
