import { getCourseModuleById } from "@/lib/api-client";
import Module from "@/Components/course/Module.jsx";
import CourseBreadcrumb from "@/Components/course/Breadcrumb";

const page = async ({ params }) => {
  const { moduleId, courseId } = await params;
  const response = await getCourseModuleById(moduleId);
  console.log("Module Data:", response.module);
  return (
    <div className="text-black">
      <CourseBreadcrumb
        activeTitle={response.module.moduleTitle}
        courseId={response.module.courseId._id}
        courseTitle={response.module.courseId.title}
      />
      <Module module={response.module} courseId={courseId} />
    </div>
  );
};

export default page;
