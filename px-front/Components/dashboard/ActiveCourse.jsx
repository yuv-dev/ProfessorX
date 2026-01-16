
const ActiveCourse = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Your Courses</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h4 className="font-semibold">React Mastery</h4>
            <p className="text-sm text-gray-500 mt-1">
              12 lessons • Intermediate
            </p>
            <button className="mt-3 text-blue-600 text-sm font-medium">
              Resume →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCourse;
