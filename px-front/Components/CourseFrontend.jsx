"use client";
import React, { useState } from "react";

// EXPECTED JSON SHAPE: matches pythonCourse exactly
// Pass pythonCourse as a prop or import it

export default function CourseFrontend({ course }) {
  const [activeModule, setActiveModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-4xl font-bold">Python Full-Stack Roadmap</h1>
          <p className="text-slate-400">Duration: {course.roadmap.duration}</p>
        </header>

        {/* DAILY PLAN */}
        <section className="bg-slate-900 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">30-Day Daily Plan</h2>
          <ul className="space-y-2 text-slate-300 list-disc list-inside">
            {course.roadmap.dailyPlan.map((day, i) => (
              <li key={i}>{day}</li>
            ))}
          </ul>
        </section>

        {/* MODULES */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Modules</h2>

          {course.modules.map((module, mi) => (
            <div key={mi} className="bg-slate-900 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">{module.moduleTitle}</h3>
                  <p className="text-slate-400">{module.summary}</p>
                </div>
                <button
                  onClick={() => setActiveModule(activeModule === mi ? null : mi)}
                  className="text-sm px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700"
                >
                  {activeModule === mi ? "Hide" : "View"}
                </button>
              </div>

              {/* LEARNING OUTCOMES */}
              <ul className="list-disc list-inside text-slate-300">
                {module.learningOutcomes.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>

              {/* LESSONS */}
              {activeModule === mi && (
                <div className="space-y-4 pt-4">
                  {module.lessons.map((lesson, li) => (
                    <div
                      key={li}
                      className="border border-slate-800 rounded-xl p-5 space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-xl font-semibold">{lesson.lessonTitle}</h4>
                        <button
                          onClick={() =>
                            setActiveLesson(
                              activeLesson === `${mi}-${li}` ? null : `${mi}-${li}`
                            )
                          }
                          className="text-xs px-3 py-1 rounded bg-slate-800"
                        >
                          {activeLesson === `${mi}-${li}` ? "Close" : "Open"}
                        </button>
                      </div>

                      {activeLesson === `${mi}-${li}` && (
                        <div className="space-y-4 text-slate-300">
                          <p>{lesson.explanation}</p>
                          <p className="italic text-slate-400">{lesson.analogy}</p>

                          {/* CODE EXAMPLES */}
                          {lesson.examples && (
                            <pre className="bg-black/60 rounded-lg p-4 text-sm overflow-x-auto">
                              {typeof lesson.examples === "string"
                                ? lesson.examples
                                : JSON.stringify(lesson.examples, null, 2)}
                            </pre>
                          )}

                          {/* PRACTICE TASKS */}
                          <div>
                            <h5 className="font-semibold">Practice Tasks</h5>
                            <ul className="list-disc list-inside">
                              {lesson.practiceTasks.map((t, i) => (
                                <li key={i}>{t}</li>
                              ))}
                            </ul>
                          </div>

                          {/* MINI QUIZ */}
                          <div>
                            <h5 className="font-semibold">Mini Quiz</h5>
                            <ul className="list-decimal list-inside">
                              {lesson.miniQuiz.map((q, i) => (
                                <li key={i}>{q}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* PROJECTS */}
        <section className="bg-slate-900 rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Projects</h2>

          <div>
            <h3 className="font-semibold">Mini Projects</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {course.projects.miniProjects.map((p, i) => (
                <div key={i} className="bg-slate-800 rounded-xl p-4">
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="text-slate-300 text-sm">{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Final Project</h3>
            <p className="text-slate-300">{course.projects.finalProject.title}</p>
            <ul className="list-disc list-inside text-slate-400">
              {course.projects.finalProject.spec?.features?.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* WEEKLY QUIZZES */}
        <section className="grid md:grid-cols-2 gap-6">
          {course.weeklyQuizzes.map((w, i) => (
            <div key={i} className="bg-slate-900 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Week {w.week} Quiz</h3>
              <ul className="list-decimal list-inside text-slate-300">
                {w.questions.map((q, qi) => (
                  <li key={qi}>{q}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* STUDY GUIDE */}
        <section className="bg-slate-900 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-2">Study Guide</h2>
          <p className="text-slate-300">{course.studyGuide}</p>
        </section>
      </div>
    </div>
  );
}
