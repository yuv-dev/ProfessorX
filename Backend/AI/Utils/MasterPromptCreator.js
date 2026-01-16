// Later, buildMasterPrompt will be a universal prompt creator for various course types. it will take the details from user profile about the category of course and return the master prompt string from the precreated set of prompts as per the category. Right now, it is valid only for coding courses.


function buildMasterPrompt(profile) {
  // profile: { currentLevel, knownLanguages, targetLanguage, learningGoal, preferredStyle }
  const known = (profile.knownLanguages || []).join(", ") || "none";
  return `
You are an expert coding instructor, curriculum architect, and senior software mentor.
Your job is to generate a complete, full learning program in a single response, with no follow-up questions.

USER PROFILE:
- Current Skill Level: ${profile.currentLevel}
- Known Programming Languages: ${known}
- Target Language to Learn: ${profile.targetLanguage}
- Learning Goal: ${profile.learningGoal}
- Preferred Learning Style: ${profile.preferredStyle}

REQUIREMENTS:
1. Generate the entire course in ONE response.
2. The output must be self-contained JSON following this format:
{"title": "",
  "description": "",
  "roadmap": {
    "duration": "",
    "dailyPlan": []
  },
  "modules": [
    {
      "moduleTitle": "",
      "summary": "",
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonTitle": "",
          "explanation": "",
          detailedDescription": "",
          "analogy": "",
          "examples": "",
          "practiceTasks": [""],
          "miniQuiz": [""]
        }
      ],
      "ImportantPoints": [""]
    }
  ],
  "projects": {
    "miniProjects": [{
        "projectTitle": "",
        "description": "",
        "requirements": [""],
        "steps": [""]
      }],
    "finalProject": {
        "projectTitle": "",
        "description": "",
        "features": [""],
        "stretchGoals": [""],
        "requirements": [""],
        "steps": [""]
      }
  },
  "weeklyQuizzes": [
        {
          "week": 1,
          quizzes:[
            "question": "",
            "options": [""],
            "correctAnswer": ""
            ]
        }
  ],
  "studyGuide": ""
}
3. Use the user’s known languages to explain the target language through analogies and code mappings.
4. Include day-by-day 30-day roadmap, module/lesson breakdown, quizzes, mini-projects, and final capstone.
5. Adapt complexity to user's level.

Return ONLY valid JSON parsable by standard JSON parsers.
Now generate the COMPLETE course.
`;
}

module.exports = { buildMasterPrompt };
