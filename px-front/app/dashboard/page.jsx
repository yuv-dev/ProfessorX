import Stats from "@/Components/dashboard/Stats";
import StreakCalendar from "@/Components/dashboard/StreakCalender";
import ContinueLearning from "@/Components/dashboard/ContinueLearning";
import ActiveCourse from "@/Components/dashboard/ActiveCourse";
import AIRecommendation from "@/Components/dashboard/AIRecommendation";
import Analytics from "@/Components/dashboard/Analytics";

import { aiRecommendationsData } from "@/seed/aiRecommendations";

const page = () => {
  const userProgress = ["2025-12-27", "2025-12-26", "2025-12-25", "2025-12-20"];

  return (
    <div className="text-black p-4 flex flex-col gap-8">
      <section className=" gap-5 flex justify-between border-2 border-gray-100 rounded-xl min-h-40 p-4">
        <div>
          <Analytics />
          <Stats />
        </div>
        <div>
          <StreakCalendar streakDates={userProgress} />
        </div>
      </section>
      <section>
        <ContinueLearning />
      </section>
      <section>
        <ActiveCourse />
      </section>
      <section>
        <AIRecommendation data={aiRecommendationsData} />
      </section>
    </div>
  );
};

export default page;
