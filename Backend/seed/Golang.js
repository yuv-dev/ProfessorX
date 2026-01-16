const data = {
  title:
    "Go-Accelerated: FullStack Engineering for Python and JavaScript Developers",
  description:
    "A comprehensive 30-day transition program designed for intermediate developers moving from interpreted, dynamic languages (Python/JS) to the compiled, high-performance world of Golang. This course focuses on Go's unique concurrency model, strict typing, and efficient backend patterns for full-stack applications.",
  roadmap: {
    duration: "30 Days",
    dailyPlan: [
      "Day 1: Environment Setup & Hello World",
      "Day 2: Variables, Types, and Zero Values",
      "Day 3: Control Flow (For, If, Switch)",
      "Day 4: Functions & Multiple Return Values",
      "Day 5: Pointers: Understanding Memory Addresses",
      "Day 6: Arrays and Slices (Deep Dive)",
      "Day 7: Weekly Review & Mini-Project: CLI Calculator",
      "Day 8: Maps (Dictionaries/Objects)",
      "Day 9: Structs: Go's Version of Classes",
      "Day 10: Methods and Receiver Functions",
      "Day 11: Interfaces Part 1: Polymorphism",
      "Day 12: Interfaces Part 2: Composition over Inheritance",
      "Day 13: Error Handling: The 'if err != nil' Pattern",
      "Day 14: Weekly Review & Mini-Project: Student Management System",
      "Day 15: Goroutines: Lightweight Threading",
      "Day 16: Channels: Communicating Between Goroutines",
      "Day 17: Select Statement & Timeouts",
      "Day 18: Mutexes and WaitGroups (Sync Package)",
      "Day 19: Go Modules and Dependency Management",
      "Day 20: Unit Testing and Table-Driven Tests",
      "Day 21: Weekly Review & Mini-Project: Concurrent Web Scraper",
      "Day 22: Net/HTTP: Building a Basic REST API",
      "Day 23: Middlewares and Routing (Using Chi or Gin)",
      "Day 24: JSON Handling & Marshalling",
      "Day 25: Database Integration (SQL with GORM or pgx)",
      "Day 26: Authentication (JWT Implementation)",
      "Day 27: WebSockets for Real-time Communication",
      "Day 28: Final Project Prep: Architecture and Design",
      "Day 29: Final Project Implementation: Core Logic",
      "Day 30: Final Project: Deployment & Optimization",
    ],
  },
  modules: [
    {
      moduleTitle: "Module 1: Foundations & Syntax Mapping",

      summary:
        "Bridging the gap between dynamic scripting and static compilation.",
      learningOutcomes: [
        "Understand the Go compiler and build process",

        "Map Python/JS types to Go's static types",

        "Master Go's unique loop and pointer system",
      ],

      lessons: [
        {
          lessonTitle: "Variables and Zero Values",

          explanation:
            "In JS/Python, variables are dynamic. In Go, every variable has a fixed type and a 'zero value'—a default state if not initialized",
          detailedDescription:
            "Unlike 'undefined' in JS or 'None' in Python, Go initializes variables to 0, false, or ''. This prevents runtime null pointer exceptions common in other languages.",

          analogy:
            "Python variables are like labels you stick on different boxes. Go variables are the boxes themselves; you can't put a shoe in a box labeled for hats.",

          examples:
            "var x int = 10; y := 20 // Short declaration (like 'let' but typed)",

          practiceTasks: [
            "Declare variables for a user profile (name, age, isMember) using various declaration styles.",
          ],

          miniQuiz: ["What is the zero value of a boolean in Go?"],
        },

        {
          lessonTitle: "Pointers without the Pain",

          explanation:
            "Pointers store the memory address of a value instead of the value itself.",

          detailedDescription:
            "Coming from JS, you use pointers implicitly (objects are passed by reference). In Go, you are explicit. Use * to see the value and & to get the address.",

          analogy:
            "A variable is a house. A pointer is the GPS coordinate of that house. Passing the coordinate is faster than moving the whole house.",

          examples: "func updateName(n *string) { *n = 'Gopher' }",

          practiceTasks: [
            "Write a function that swaps two integers using pointers.",
          ],

          miniQuiz: ["Which operator is used to 'dereference' a pointer?"],
        },
      ],

      ImportantPoints: [
        "Go is compiled, meaning it catches type errors before your code runs.",

        "Unused variables result in a compilation error.",
      ],
    },

    {
      moduleTitle: "Module 2: Data Structures & Interfaces",

      summary:
        "How Go handles complex data and abstraction without traditional Classes.",

      learningOutcomes: [
        "Manipulate Slices (Dynamic Arrays)",

        "Model data using Structs",

        "Implement Interfaces for decoupled code",
      ],

      lessons: [
        {
          lessonTitle: "Slices vs. Arrays",

          explanation:
            "Arrays are fixed size. Slices are dynamic windows into arrays.",

          detailedDescription:
            "Go Slices are similar to Python Lists or JS Arrays. They grow dynamically using the append() function.",

          analogy:
            "An array is a fixed pizza box. A slice is the actual pizza inside; you can cut it, share it, or add more toppings (capacity permitting).",

          examples: "mySlice := []int{1, 2, 3}; mySlice = append(mySlice, 4)",

          practiceTasks: [
            "Create a slice of strings, remove the middle element, and print the result.",
          ],

          miniQuiz: [
            "What happens to the underlying array when a slice exceeds its capacity?",
          ],
        },

        {
          lessonTitle: "Interfaces and Structs",
          explanation:
            "Go uses composition instead of inheritance. Interfaces are satisfied implicitly.",
          detailedDescription:
            "In Python, you inherit from a class. In Go, if a Struct implements the methods defined in an Interface, it 'is' that interface. No 'implements' keyword needed.",
          analogy:
            "If it quacks like a duck and walks like a duck, it's a duck. If a struct has a 'Speak()' method, it satisfies the 'Speaker' interface.",
          examples:
            "type Speaker interface { Speak() string }; type Dog struct {}; func (d Dog) Speak() string { return 'Woof!' }",
          practiceTasks: [
            "Define a Shape interface with an Area() method. Implement it for Circle and Rectangle structs.",
          ],
          miniQuiz: [
            "Do you need to explicitly state a struct implements an interface?",
          ],
        },
      ],
      ImportantPoints: [
        "Methods are defined outside of structs.",
        "Favor composition over inheritance to keep code flexible.",
      ],
    },
    {
      moduleTitle: "Module 3: Concurrency & The Modern Backend",
      summary:
        "Mastering Go's greatest strength: handling thousands of tasks simultaneously.",
      learningOutcomes: [
        "Launch Goroutines",
        "Sync data via Channels",
        "Build a RESTful JSON API",
      ],
      lessons: [
        {
          lessonTitle: "Goroutines: The 'go' Keyword",
          explanation:
            "A goroutine is a lightweight thread managed by the Go runtime.",
          detailedDescription:
            "In JS, you have an Event Loop. In Python, you have Asyncio. In Go, you simply prefix a function call with 'go' and it runs concurrently.",
          analogy:
            "Standard execution is one chef cooking one dish at a time. Goroutines are hiring 100 chefs who share the same kitchen but work on different dishes.",
          examples: "go doWork() // Runs in background",
          practiceTasks: [
            "Run 5 functions concurrently that print 'Hello' with a random delay.",
          ],
          miniQuiz: [
            "How much memory (approx) does a goroutine stack start with?",
          ],
        },
        {
          lessonTitle: "Channels: Safe Communication",
          explanation: "Channels are the pipes that connect goroutines.",
          detailedDescription:
            "Instead of sharing memory (which leads to race conditions), Go encourages 'sharing by communicating'. You send and receive data through channels.",
          analogy:
            "Passing a baton in a relay race. The runner (goroutine) gives the baton (data) to the next person through a handoff point (channel).",
          examples: "ch := make(chan string); ch <- 'data'; val := <-ch",
          practiceTasks: [
            "Create a producer-consumer setup where one goroutine sends numbers and another squares them.",
          ],
          miniQuiz: [
            "What happens if you send data to a channel but no one is receiving?",
          ],
        },
      ],
      ImportantPoints: [
        "Don't communicate by sharing memory; share memory by communicating.",
        "Always handle your errors immediately; don't use try/catch.",
      ],
    },
  ],
  projects: {
    miniProjects: [
      {
        projectTitle: "Concurrency-Safe URL Checker",
        description:
          "A CLI tool that checks the status of multiple websites simultaneously.",
        requirements: [
          "Accept a list of URLs",
          "Use Goroutines to fetch statuses",
          "Use Channels to collect results",
          "Implement a timeout for slow sites",
        ],
        steps: [
          "Define a result struct",
          "Write the fetch function",
          "Loop through URLs and trigger 'go fetch'",
          "Print results as they arrive",
        ],
      },
      {
        projectTitle: "JSON Book API",
        description: "A basic CRUD API for a library system.",
        requirements: [
          "Endpoints for GET, POST, DELETE",
          "In-memory storage with Mutex protection",
          "JSON Request/Response",
        ],
        steps: [
          "Setup Net/HTTP server",
          "Define Book struct",
          "Implement Handlers",
          "Test with Postman/Curl",
        ],
      },
    ],
    finalProject: {
      projectTitle: "GopherSync: Real-time Collaborative Task Board",
      description:
        "A FullStack application featuring a Go backend and a React frontend. It allows multiple users to manage tasks in real-time.",
      features: [
        "JWT-based Authentication",
        "PostgreSQL persistence",
        "WebSocket updates for live task movement",
        "Concurrent background workers for email notifications",
      ],
      stretchGoals: [
        "Dockerize the entire stack",
        "Implement Redis for session caching",
        "Unit testing coverage > 80%",
      ],
      requirements: ["Go 1.21+", "PostgreSQL", "React/Next.js for Frontend"],
      steps: [
        "Initialize Go modules and folder structure",
        "Design the Database schema and migrate using GORM",
        "Build the REST API for CRUD operations",
        "Implement Gorilla WebSocket for real-time broadcast",
        "Connect the React frontend with Hooks for state management",
        "Add Middleware for logging and Auth",
      ],
    },
  },
  weeklyQuizzes: [
    {
      week: 1,
      quizzes: [
        {
          question: "How do you declare a constant in Go?",
          options: [
            "let x = 10",
            "const x = 10",
            "var const x = 10",
            "define x 10",
          ],
          correctAnswer: "const x = 10",
        },
        {
          question:
            "What is the result of 'fmt.Println(5 / 2)' if both are integers?",
          options: ["2.5", "2", "3", "Error"],
          correctAnswer: "2",
        },
      ],
    },
    {
      week: 2,
      quizzes: [
        {
          question:
            "Which keyword is used to provide a cleanup action before a function returns?",
          options: ["finally", "cleanup", "defer", "exit"],
          correctAnswer: "defer",
        },
      ],
    },
  ],
  studyGuide:
    "Go is all about simplicity and explicitness. 1. Read the 'Effective Go' documentation. 2. Practice 'The Go Blog' examples. 3. Stop looking for Classes; embrace Structs and Interfaces. 4. Use 'go fmt' religiously to keep code standard. 5. Always check for errors immediately (if err != nil); it's not boilerplate, it's safety.",
};

module.exports = data;
