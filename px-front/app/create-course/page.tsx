"use client";

import { useState } from "react";

type Profile = {
  currentLevel: string;
  knownLanguages: string[];
  targetLanguage: string;
  learningGoal: string;
  preferredStyle: string;
};

export default function CreateCoursePage() {
  const [profile, setProfile] = useState<Profile>({
    currentLevel: "beginner",
    knownLanguages: [],
    targetLanguage: "",
    learningGoal: "",
    preferredStyle: "project-based",
  });

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof Profile, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };   

  const handleKnownLanguagesChange = (value: string) => {
    const arr = value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    handleChange("knownLanguages", arr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCourse(null);

    try {
      const resp = await fetch("/api/generate-course", {
        method: "POST",
        body: JSON.stringify({
          user: { name, email },
          profile,
        }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setCourse(data.course);
    } catch (err: any) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-2xl font-bold">Create Your Personalized Course</h1>

      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              className="border rounded w-full px-2 py-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              className="border rounded w-full px-2 py-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Current Level</label>
          <select
            className="border rounded w-full px-2 py-1"
            value={profile.currentLevel}
            onChange={(e) => handleChange("currentLevel", e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Known Languages (comma-separated)
          </label>
          <input
            className="border rounded w-full px-2 py-1"
            placeholder="javascript, python"
            onChange={(e) => handleKnownLanguagesChange(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Target Language</label>
          <input
            className="border rounded w-full px-2 py-1"
            value={profile.targetLanguage}
            onChange={(e) => handleChange("targetLanguage", e.target.value)}
            placeholder="rust, go, python..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Learning Goal</label>
          <input
            className="border rounded w-full px-2 py-1"
            value={profile.learningGoal}
            onChange={(e) => handleChange("learningGoal", e.target.value)}
            placeholder="backend dev, fullstack, DSA..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Preferred Style</label>
          <select
            className="border rounded w-full px-2 py-1"
            value={profile.preferredStyle}
            onChange={(e) => handleChange("preferredStyle", e.target.value)}
          >
            <option value="project-based">Project-based</option>
            <option value="theory-first">Theory-first</option>
            <option value="examples-heavy">Examples-heavy</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Course"}
        </button>
      </form>

      {error && (
        <div className="text-red-600 text-sm border border-red-300 p-2 rounded">
          {error}
        </div>
      )}

      {course && (
        <div className="mt-6 border rounded-lg p-4 space-y-2">
          <h2 className="text-xl font-semibold">Your Course</h2>
          <p className="text-sm text-gray-600">{course.roadmap}</p>
          <div className="mt-4 space-y-3">
            {course.modules?.map((m: any, idx: number) => (
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
  );
}
