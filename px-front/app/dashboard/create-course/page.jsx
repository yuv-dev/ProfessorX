"use client";

import { useState } from "react";
import { generateCourse } from "@/lib/api-client";

export default function CreateCoursePage() {
  const [profile, setProfile] = useState({
    currentLevel: "beginner",
    knownLanguages: [],
    targetLanguage: "",
    learningGoal: "",
    preferredStyle: "project-based",
  });

  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleKnownLanguagesChange = (value) => {
    const arr = value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    handleChange("knownLanguages", arr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCourse(null);

    try {
      // const resp = await fetch("/api/generate-course", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     user: { name, email },
      //     profile,
      //   }),
      // });

      const resp = await generateCourse({ profile });

      if (!resp.ok) {
        setError(resp.error || "Something went wrong");
        return;
      }
      console.log("resp", resp);

      setCourse(resp);
    } catch (err) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br text-black from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Create Your Personalized Course
          </h1>
          <p className="text-gray-600">
            Tell us about yourself and we&apos;ll craft the perfect learning
            path
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6 animate-slide-up"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="animate-fade-in animation-delay-100">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Level
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                value={profile.currentLevel}
                onChange={(e) => handleChange("currentLevel", e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="animate-fade-in animation-delay-200">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Known Languages (comma-separated)
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="javascript, python"
                onChange={(e) => handleKnownLanguagesChange(e.target.value)}
              />
            </div>
          </div>

          <div className="animate-fade-in animation-delay-300">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Language
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={profile.targetLanguage}
              onChange={(e) => handleChange("targetLanguage", e.target.value)}
              placeholder="rust, go, python..."
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="animate-fade-in animation-delay-400">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Learning Goal
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={profile.learningGoal}
                onChange={(e) => handleChange("learningGoal", e.target.value)}
                placeholder="backend dev, fullstack, DSA..."
              />
            </div>

            <div className="animate-fade-in animation-delay-500">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Style
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                value={profile.preferredStyle}
                onChange={(e) => handleChange("preferredStyle", e.target.value)}
              >
                <option value="project-based">Project-based</option>
                <option value="theory-first">Theory-first</option>
                <option value="examples-heavy">Examples-heavy</option>
                <option value="interactive">Interactive</option>
                <option value="video-tutorials">Video Tutorials</option>
                <option value="challenge-driven">Challenge-driven</option>
                <option value="step-by-step">Step-by-step</option>
                <option value="exploratory">Exploratory</option>
                <option value="reading-focused">Reading-focused</option>
                <option value="peer-learning">Peer Learning</option>
                <option value="gamified">Gamified</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            S
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating Course...
              </div>
            ) : (
              "Generate Course"
            )}
          </button>
          {error && (
            <div className="text-xs bg-red-50 border border-red-200 text-red-700 px-4 py-3x rounded-lg animate-fade-in">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          )}
        </form>

        {course && (
          <div className="mt-8 bg-white shadow-xl rounded-2xl p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Course Generated!
            </h2>
            <p className="text-sm text-gray-600">{course.roadmap}</p>
            <div className="mt-4 space-y-3">
              {course.modules?.map((m, idx) => (
                <div key={idx} className="border rounded p-3">
                  <h3 className="font-semibold">{m.moduleTitle}</h3>
                  <p className="text-sm text-gray-700">{m.summary}</p>
                  <p className="text-xs text-gray-500">
                    Lessons: {m.lessons?.length || 0}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
