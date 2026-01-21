import { getCourseModuleById } from "@/lib/api-client";
import Module from "@/Components/course/Module.jsx";

const page = async ({ params }) => {
  const { moduleId, courseId } = await params;
  const response = await getCourseModuleById(moduleId);
  console.log("Module Data:", response.module);
  return (
    <div className="text-black">
      <Module module={response.module} courseId={courseId} />
    </div>
  );
};

export default page;
