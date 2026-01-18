
{"title": Display the title in bold | color: blue 600
  "description": display the description of the course,
  "roadmap": {
    "duration": " bold | color: black",
    "dailyPlan": [A list of daily study topics without any list formatting inside a colored box ]
  },
  "modules": [ Display wthin a section with each module card having a border and slight shadow and route to complete module page on click
    {
      "moduleTitle": ""display heading in bold | color: black",
      "summary": "" display summary text",
      "learningOutcomes": [], display a list of learning outcomes
      "lessons": [ Show each lesson as a collapsible card with lesson title as heading
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
      "ImportantPoints": [""] Display inside a box with light yellow background and border
    }
  ],
  "projects": { Display project details inside a section with each project in a bordered box with padding
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
  "weeklyQuizzes": [ Show each week's quiz inside a collapsible section
        {
          "week": 1,
          quizzes:[
            "question": "",
            "options": [""],
            "correctAnswer": ""
            ]
        }
  ],
  "studyGuide": contained within a bordered box with a light gray background and padding and margin. 
}