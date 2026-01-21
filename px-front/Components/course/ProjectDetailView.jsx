"use client";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProjectDetailView({ courseId, data, isFinal }) {
  const router = useRouter();

  const onBack = () => {
    router.push(`/dashboard/courses/${courseId}`);
  };

  return (
    <div className="space-y-10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 font-medium mb-6 hover:underline"
      >
        <ArrowLeft size={20} /> Back to Course
      </button>

      {/* Header Section */}
      <section>
        <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 uppercase tracking-tighter mb-4">
          {isFinal ? "Final Capstone Project" : "Mini Project"}
        </div>
        <h1 className="text-4xl font-black text-gray-900">
          {data?.projectTitle}
        </h1>
        <p className="text-lg text-gray-600 mt-4 leading-relaxed">
          {data?.description}
        </p>
      </section>

      {/* Grid Content */}
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-pink-800">
            <ClipboardList className="text-blue-600" size={20} /> Requirements
          </h3>
          <ul className="space-y-3">
            {data?.requirements.map((req, i) => (
              <li key={i} className="text-gray-700 flex gap-2">
                <span className="text-blue-500">•</span> {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Conditional rendering for Final Project exclusive fields */}
        {isFinal && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-purple-700">
                Core Features
              </h3>
              <ul className="space-y-3">
                {data?.features?.map((f, i) => (
                  <li key={i} className="text-gray-700 flex gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2" />{" "}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Stretch Goals */}
      {isFinal && (
        <section className="bg-gray-900 rounded-3xl p-8 border border-slate-200 text-white">
          <h3 className="text-2xl font-bold mb-8 text-amber-500">
            #Stretch Goals
          </h3>
          <div className="space-y-8 relative">
            {data?.stretchGoals.map((goal, i) => (
              <div key={i} className="flex gap-6 relative z-10">
                <div className="shrink-0 w-10 h-10 bg-gray-100 border-2 border-blue-600 rounded-xl flex items-center justify-center font-bold text-blue-600 shadow-sm">
                  {i + 1}
                </div>
                <p className="text-gray-100 text-lg pt-1">{goal}</p>
              </div>
            ))}
            {/* Vertical Line Connector */}
            <div className="absolute left-5 top-0 w-0.5 h-full bg-slate-200 z-0"></div>
          </div>
        </section>
      )}

      {/* Steps - Both have this */}
      <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-black">
        <h3 className="text-2xl font-bold mb-8">Implementation Steps</h3>
        <div className="space-y-8 relative">
          {data?.steps.map((step, i) => (
            <div key={i} className="flex gap-6 relative z-10">
              <div className="shrink-0 w-10 h-10 bg-white border-2 border-blue-600 rounded-xl flex items-center justify-center font-bold text-blue-600 shadow-sm">
                {i + 1}
              </div>
              <p className="text-gray-700 text-lg pt-1">{step}</p>
            </div>
          ))}
          {/* Vertical Line Connector */}
          <div className="absolute left-5 top-0 w-0.5 h-full bg-slate-200 z-0"></div>
        </div>
      </section>
    </div>
  );
}
