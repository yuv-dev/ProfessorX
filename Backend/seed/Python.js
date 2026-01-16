const data = {
  title: "Python for JavaScript Developers: From Syntax to Full-Stack",
  description:
    "A comprehensive 30-day course designed to teach Python to developers with a background in JavaScript. This course leverages your existing JS knowledge to accelerate learning Python syntax, data structures, OOP, and backend development using Flask and FastAPI.",
  roadmap: {
    duration: "30 days",
    dailyPlan: [
      "Day 1: Python basics vs JavaScript—variables, types, REPL, environment setup",
      "Day 2: Control flow (if/else, loops) with JS-to-Python mapping",
      "Day 3: Functions, arguments, return values, scopes",
      "Day 4: Data structures (list, tuple, dict, set)",
      "Day 5: Comprehensions & lambda functions",
      "Day 6: Modules, packages, virtual environments",
      "Day 7: File handling & JSON",
      "Day 8: Error handling & debugging",
      "Day 9: Object-Oriented Programming (Classes, methods, inheritance)",
      "Day 10: Advanced OOP & Pythonic patterns (dunder methods)",
      "Day 11: Working with external APIs using requests",
      "Day 12: Intro to Flask",
      "Day 13: Flask routing, templates, forms",
      "Day 14: Flask database integration with SQLAlchemy",
      "Day 15: CRUD app in Flask",
      "Day 16: Authentication & sessions",
      "Day 17: Flask REST API development",
      "Day 18: Testing in Python (pytest) + API tests",
      "Day 19: Deploying Flask apps",
      "Day 20: Intro to FastAPI for async APIs",
      "Day 21: FastAPI CRUD operations",
      "Day 22: FastAPI authentication & middleware",
      "Day 23: Building a Python backend for a JS frontend",
      "Day 24: Full-stack integration using Fetch/Axios",
      "Day 25: Real-world patterns: caching, pagination, file uploads",
      "Day 26: Mini-project sprint",
      "Day 27: Final capstone architecture planning",
      "Day 28: Build day",
      "Day 29: Testing + polish",
      "Day 30: Deployment + documentation",
    ],
  },

  modules: [
    {
      moduleTitle: "Python Foundations through JavaScript Analogies",
      summary:
        "Covers Python fundamentals, mapping everything to JavaScript to accelerate comprehension.",
      learningOutcomes: [
        "Understand Python syntax using JS knowledge",
        "Write basic Python programs",
        "Use variables, loops, functions, and data structures confidently",
      ],
      lessons: [
        {
          lessonTitle: "Python Basics & Syntax Mapping from JavaScript",
          explanation:
            "Python removes semicolons, braces, and relies on indentation. Everything is an object. Compared to JS, Python is more readable and has fewer quirks.",
          analogy:
            "Think of Python as JavaScript with enforced clean code rules. Where JS gives freedom, Python gives structure.",
          examples: {
            js: "let x = 10;",
            py: "x = 10",
          },
          practiceTasks: [
            "Convert 5 JavaScript variable declarations into Python",
            "Write a Python script that prints your name 3 times",
          ],
          miniQuiz: [
            "True/False: Python requires semicolons",
            "What is the Python equivalent of `let x = 5`?",
          ],
        },
        {
          lessonTitle: "Control Flow & Loops",
          explanation:
            "if/else and loops behave like JS but with indentation. Python has `for item in list` instead of C-style loops.",
          analogy: "Python loops = JavaScript enhanced loops (`for…of`).",
          examples: {
            js: "for (let i=0; i<5; i++){ console.log(i); }",
            py: "for i in range(5):\n    print(i)",
          },
          practiceTasks: [
            "Write a loop printing even numbers from 0–20",
            "Rewrite a JS while loop in Python",
          ],
          miniQuiz: [
            "What does `range(5)` return?",
            "How do you write an else-if in Python?",
          ],
        },
        {
          lessonTitle: "Functions & Pythonic Patterns",
          explanation:
            "Functions are similar to JS but use `def`. Python defaults and keyword arguments simplify usage.",
          analogy:
            "`def` in Python is like `function` in JS but with cleaner argument handling.",
          examples: {
            js: "function add(a,b){ return a+b; }",
            py: "def add(a, b):\n    return a + b",
          },
          practiceTasks: [
            "Convert a JS function with default params into Python",
            "Create a Python function that returns multiple values",
          ],
          miniQuiz: [
            "What keyword defines a function?",
            "Can Python return multiple values?",
          ],
        },
      ],
    },

    {
      moduleTitle: "Data Structures & File Operations",
      summary:
        "Master Python's built-in containers, comprehensions, and file/JSON operations.",
      learningOutcomes: [
        "Use lists, sets, tuples, and dicts fluently",
        "Load and save JSON files",
        "Apply comprehension shortcuts",
      ],
      lessons: [
        {
          lessonTitle: "Lists, Dictionaries, Tuples, and Sets",
          explanation:
            "These map well to JS arrays/objects but with more built-in methods.",
          analogy: "Python dict = JavaScript object; Python list = JS array.",
          examples: {
            js: "const user = {name:'A',age:20}",
            py: "user = {'name':'A', 'age':20}",
          },
          practiceTasks: [
            "Convert a JS object to a Python dict",
            "Create a list of squares using a loop and then a comprehension",
          ],
          miniQuiz: [
            "Which structure is immutable: list or tuple?",
            "How do you access dict values?",
          ],
        },
        {
          lessonTitle: "File Handling & JSON",
          explanation:
            "Python provides intuitive methods to read/write files. JSON uses `json` module.",
          analogy: "Like Node's fs but easier and synchronous by default.",
          examples: {
            read: "with open('data.txt') as f:\n    print(f.read())",
          },
          practiceTasks: [
            "Read a file and count words",
            "Convert a Python dict to JSON and save it",
          ],
          miniQuiz: [
            "Which keyword auto-closes files?",
            "What module loads JSON?",
          ],
        },
      ],
    },

    {
      moduleTitle: "OOP & API Foundations",
      summary:
        "Learn classes, inheritance, and interacting with external APIs.",
      learningOutcomes: [
        "Create and use classes",
        "Understand dunder methods",
        "Call REST APIs using Python",
      ],
      lessons: [
        {
          lessonTitle: "Object-Oriented Python",
          explanation:
            "Classes in Python act similarly to JS classes but methods require `self`.",
          analogy: "`self` in Python = `this` in JS, but explicit.",
          examples: {
            py: "class User:\n    def __init__(self, name):\n        self.name = name",
          },
          practiceTasks: [
            "Create a Car class with start() and stop() methods",
            "Extend a base class into two subclasses",
          ],
          miniQuiz: [
            "What is `self`?",
            "Where do you define instance variables?",
          ],
        },
        {
          lessonTitle: "Working with APIs",
          explanation:
            "`requests` makes HTTP simple—similar to Axios but synchronous.",
          analogy: "Requests = Axios but without promises.",
          examples: {
            py: "import requests\nres = requests.get('https://api.github.com')",
          },
          practiceTasks: [
            "Call a public API and print a key",
            "Handle errors using try/except",
          ],
          miniQuiz: ["Which library performs HTTP?", "How do you parse JSON?"],
        },
      ],
    },

    {
      moduleTitle: "Flask & FastAPI for Full-Stack Development",
      summary:
        "Build backend services, templates, authentication, and REST APIs.",
      learningOutcomes: [
        "Create Flask web apps",
        "Build REST APIs with FastAPI",
        "Implement DBs, sessions, auth, and validation",
      ],
      lessons: [
        {
          lessonTitle: "Flask Basics",
          explanation:
            "Flask is minimal and flexible. Perfect for JS devs learning Python backend.",
          analogy: "Flask = Express.js but synchronous and simpler.",
          examples: {
            py: "from flask import Flask\napp = Flask(__name__)\n@app.route('/')\ndef home(): return 'Hello'",
          },
          practiceTasks: [
            "Create a route returning JSON",
            "Build a template-based page",
          ],
          miniQuiz: [
            "What object initializes Flask?",
            "How do you define a route?",
          ],
        },
        {
          lessonTitle: "FastAPI for Async REST APIs",
          explanation:
            "FastAPI is modern, typed, async, and extremely fast—similar to NestJS.",
          analogy: "FastAPI = Express + TypeScript + async-first.",
          examples: {
            py: "from fastapi import FastAPI\napp = FastAPI()\n@app.get('/')\ndef home(): return {'msg':'ok'}",
          },
          practiceTasks: [
            "Create CRUD routes for a Todo model",
            "Implement validation with Pydantic",
          ],
          miniQuiz: [
            "What decorator defines a GET route?",
            "What library powers FastAPI validation?",
          ],
        },
      ],
    },
  ],

  projects: {
    miniProjects: [
      {
        title: "CLI Expense Tracker",
        description:
          "Use Python dicts, files, and loops to track expenses with CRUD operations.",
      },
      {
        title: "API Data Dashboard",
        description:
          "Fetch any public API and render a summary in console or HTML (Flask).",
      },
      {
        title: "Todo REST API",
        description: "FastAPI CRUD API with validation and persistence.",
      },
    ],
    finalProject: {
      title: "Full-Stack Task Manager",
      spec: {
        backend:
          "FastAPI with JWT auth, PostgreSQL, CRUD tasks, pagination, file uploads",
        frontend: "JavaScript (React or vanilla). Integrates via REST API",
        features: [
          "Register/login",
          "Create/update/delete tasks",
          "Upload attachments",
          "User-specific dashboards",
          "Deployed on Render/Vercel",
        ],
        stretchGoals: [
          "WebSockets for live updates",
          "AI suggestions using external API",
        ],
      },
    },
  },

  weeklyQuizzes: [
    {
      week: 1,
      questions: [
        "What does indentation represent in Python?",
        "Which type is immutable: list or tuple?",
        "Rewrite a JS function in Python.",
      ],
    },
    {
      week: 2,
      questions: [
        "Explain the difference between list and set.",
        "How do you open and read a file?",
        "What is a class constructor called?",
      ],
    },
    {
      week: 3,
      questions: [
        "What are Flask blueprints?",
        "What are FastAPI models?",
        "How do you validate incoming data?",
      ],
    },
    {
      week: 4,
      questions: [
        "Explain the request-response cycle in a REST API.",
        "How does JWT authentication work?",
        "What is the purpose of async in FastAPI?",
      ],
    },
  ],

  studyGuide:
    "Study 1–2 hours daily. Practice by rewriting familiar JavaScript code in Python. Build projects incrementally. Debug often. Revisit concepts using official docs. Push yourself to complete the final project before Day 30. Hands-on coding is the priority.",
};

module.exports = data;
