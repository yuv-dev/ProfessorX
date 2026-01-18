import { getCourseById } from "@/lib/api-client";
import CourseFrontend from "@/Components/course/CourseFrontend";

const page = async ({ params }) => {
  const { courseId } = await params;
  const response = await getCourseById(courseId);
  const courseData = response.course || {};
  console.log("Course Data:", courseData);

  return (
    <div className=" text-black">
      <CourseFrontend courseData={courseData} />
    </div>
  );
};

export default page;
