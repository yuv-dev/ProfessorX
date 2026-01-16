import { Brain, TrendingUp, Clock, Target } from "lucide-react";

const iconMap = {
  study_next: Brain,
  weak_area: TrendingUp,
  habit: Clock,
  career: Target,
};

const priorityStyle = {
  high: "border-blue-500",
  medium: "border-yellow-400",
  low: "border-gray-300",
};

const AIRecommendationCard = ({ rec }) => {
  const Icon = iconMap[rec.type];

  return (
    <div
      className={`bg-white p-4 rounded-xl shadow-sm border-l-4 ${
        priorityStyle[rec.priority]
      }`}
    >
      <div className="flex gap-3 items-start">
        <Icon className="text-blue-600 mt-1" size={22} />
        <div className="flex-1">
          <h4 className="font-semibold">{rec.title}</h4>
          <p className="text-sm text-gray-500 mt-1">{rec.reason}</p>
          <button className="mt-3 text-sm font-medium text-blue-600">
            {rec.actionLabel} →
          </button>
        </div>
      </div>
    </div>
  );
};
export default AIRecommendationCard;
