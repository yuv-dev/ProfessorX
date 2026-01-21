"use client";

import { useActionState } from "react";
import { createCourseAction } from "@/lib/actions"; // Import the server action

const initialState = {
  course: null,
  error: null,
};

export default function CreateCoursePage() {
  // useActionState handles the form submission, loading state, and returned data
  const [state, formAction, isPending] = useActionState(
    createCourseAction,
    initialState,
  );

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

        {/* The action prop connects the form to the Server Action */}
        <form
          action={formAction}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6 animate-slide-up"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="animate-fade-in animation-delay-100">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Level
              </label>
              {/* Added 'name' attribute to identify this field in the Server Action */}
              <select
                name="currentLevel"
                defaultValue="beginner"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
                name="knownLanguages"
                placeholder="javascript, python"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="animate-fade-in animation-delay-300">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Language
            </label>
            <input
              name="targetLanguage"
              required
              placeholder="rust, go, python..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="animate-fade-in animation-delay-400">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Learning Goal
              </label>
              <input
                name="learningGoal"
                placeholder="backend dev, fullstack, DSA..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="animate-fade-in animation-delay-500">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Style
              </label>
              <select
                name="preferredStyle"
                defaultValue="project-based"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="project-based">Project-based</option>
                <option value="theory-first">Theory-first</option>
                <option value="examples-heavy">Examples-heavy</option>
                <option value="interactive">Interactive</option>
                <option value="video-tutorials">Video Tutorials</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating Course...
              </div>
            ) : (
              "Generate Course"
            )}
          </button>

          {state.error && (
            <div className="text-xs bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fade-in">
              <p className="font-medium">Error:</p>
              <p>{state.error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
