import AIRecommendationCard from "./AIRecommendationCard";

const AIRecommendations = ({ data }) => {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-4">🤖 AI-Powered Recommendations</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {data.map((rec, i) => (
          <AIRecommendationCard key={i} rec={rec} />
        ))}
      </div>
    </section>
  );
};

export default AIRecommendations;
