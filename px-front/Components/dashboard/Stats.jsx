
const Stats = () => {
  const stats = [
    { label: "Courses Enrolled", value: 6 },
    { label: "Lessons Completed", value: 124 },
    { label: "Weekly Streak 🔥", value: "5 days" },
    { label: "Total Hours", value: "42h" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">{s.label}</p>
          <p className="text-xl font-bold">{s.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
