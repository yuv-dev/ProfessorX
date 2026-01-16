import { pythonCourse } from "../lib/PythonCourse";

// // Mock JSON (replace with API / props)
// const data = {
//   roadmap: {
//     duration: "8 Weeks",
//     dailyplan: ["Learn core concepts", "Build mini tasks", "Revise & quiz"],
//   },
//   modules: [
//     {
//       moduleTitle: "Module 1: Foundations",
//       summary: "Understand the basics with hands-on practice",
//       learningOutcomes: [
//         "Understand fundamentals",
//         "Write basic programs",
//         "Think problem-first",
//       ],
//       lessons: [
//         {
//           lessonTitle: "Intro Lesson",
//           explanation: "This lesson explains the core idea.",
//           analogy: "Like learning alphabets before writing sentences.",
//           examples: "console.log('Hello World')",
//           practiceTasks: ["Print output", "Use variables"],
//           miniQuiz: ["What is a variable?", "What is output?"],
//         },
//       ],
//     },
//   ],
//   projects: {
//     miniProjects: ["CLI Tool", "Simple App"],
//     finalProject: { title: "Full Stack App", description: "End-to-end build" },
//   },
//   weeklyQuizzes: ["Week 1 Quiz", "Week 2 Quiz"],
//   studyGuide: "Revise daily, build weekly, test yourself.",
// };

const data = pythonCourse;

export default function LearningRoadmapUI() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <header className="space-y-4">
          <h1 className="text-4xl font-bold">Learning Roadmap</h1>
          <p className="text-slate-400">Duration: {data.roadmap.duration}</p>
        </header>

        {/* Daily Plan */}
        <section className="bg-slate-900 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Daily Plan</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            {data.roadmap.dailyPlan.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Modules */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold">Modules</h2>
          {data.modules.map((module, i) => (
            <div
              key={i}
              className="bg-slate-900 rounded-2xl p-6 space-y-6 shadow"
            >
              <div>
                <h3 className="text-2xl font-bold">{module.moduleTitle}</h3>
                <p className="text-slate-400">{module.summary}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Learning Outcomes</h4>
                <ul className="list-disc list-inside text-slate-300">
                  {module.learningOutcomes.map((outcome, j) => (
                    <li key={j}>{outcome}</li>
                  ))}
                </ul>
              </div>

              {/* Lessons */}
              <div className="space-y-6">
                {module.lessons.map((lesson, k) => (
                  <div
                    key={k}
                    className="border border-slate-800 rounded-xl p-5"
                  >
                    <h4 className="text-xl font-semibold mb-2">
                      {lesson.lessonTitle}
                    </h4>
                    <p className="text-slate-300 mb-2">{lesson.explanation}</p>
                    <p className="italic text-slate-400 mb-2">
                      Analogy: {lesson.analogy}
                    </p>
                    <pre className="bg-slate-950 p-3 rounded-lg text-sm overflow-x-auto">
                      {lesson.examples}
                    </pre>

                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold">Practice Tasks</h5>
                        <ul className="list-disc list-inside text-slate-300">
                          {lesson.practiceTasks.map((task, t) => (
                            <li key={t}>{task}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold">Mini Quiz</h5>
                        <ul className="list-decimal list-inside text-slate-300">
                          {lesson.miniQuiz.map((q, qx) => (
                            <li key={qx}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="bg-slate-900 rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <div className="mb-4">
            <h3 className="font-semibold">Mini Projects</h3>
            {data.projects.miniProjects.map((project, i) => (
              <div key={i} className="list-disc list-inside text-slate-300">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold">Final Project</h3>
            <p className="text-slate-300">{data.projects.finalProject.title}</p>
          </div>
        </section>

        {/* Quizzes & Guide */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-3">Weekly Quizzes</h2>
              {data.weeklyQuizzes.map((quiz, i) => (
                <div key={i} className="list-disc list-inside text-slate-300">
                  <p>week: {quiz.week}</p>
            </div>
              ))}
          </div>
          <div className="bg-slate-900 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-3">Study Guide</h2>
            <p className="text-slate-300">{data.studyGuide}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
