const data = {
  roadmap: {
    duration: "30 days",
    dailyPlan: [
      "Days 1-7: Rust Fundamentals(Ownership & Borrowing)",
      "Days 8-14 : Advanced Structures, Enums, and Error Handling.",
      "Days 15-21 : Backend with Axum, SQLx, and Database integration.",
      "Days 22-30 : Frontend with Leptos / Yew and Final Capstone Project.",
    ],
  },  

  modules: [
    {
      moduleTitle: "Module 1: The Rust Mindset(Safety & Ownership)",
      summary:
        "Transitioning from the garbage- collected world of Python / JS to Rust's memory safety model without a garbage collector.",
      learningOutcomes: [
        "Understand Variable Shadowing",
        "Master the 3 rules of Ownership",
        "Differentiate between Stack and Heap",
      ],
      lessons: [
        {
          lessonTitle: "Variables and Mutability",
          explanation:
            "In Rust, variables are immutable by default. This contrasts with JS 'let' and Python, where you can reassign freely. You must use 'mut' to allow change.",
          analogy:
            "Think of JS 'let' as a whiteboard you can erase. Rust variables are like stone tablets by default; if you want a whiteboard, you must explicitly label it as 'mut'.",
          examples:
            "let x = 5; // Error if you try x = 6; | let mut y = 5; y = 6; // OK",
          practiceTasks: [
            "Declare an immutable integer and try to change it to see the compiler error.",
            "Use 'mut' to fix the error.",
          ],
          miniQuiz: [
            "Are variables in Rust mutable by default? (No)",
            "What keyword makes a variable changeable? (mut)",
          ],
        },
        {
          lessonTitle: "The Borrow Checker",
          explanation:
            "Rust ensures memory safety through Ownership. A piece of data has one owner. When the owner goes out of scope, data is dropped. You can 'borrow' data using references (&).",
          analogy:
            "Python/JS are like public libraries where a robot (Garbage Collector) cleans up books left on tables. Rust is like a high-security archive: you either own the book, or you sign it out (borrow it), but you must return it before the next person can have it.",
          examples:
            "let s1 = String::from('hello'); let s2 = s1; // s1 is now invalid (Moved). let s3 = &s2; // s3 borrows s2 (Reference).",
          practiceTasks: [
            "Create a String, pass it to a function, and try to print it in main after the function call.",
            "Fix the move error by passing a reference (&String) instead.",
          ],
          miniQuiz: [
            "Can you have two mutable references to the same data at once? (No)",
            "What happens to a variable when it is 'moved'? (The original variable becomes invalid)",
          ],
        },
      ],
    },
    {
      moduleTitle: "Module 2: Structs, Enums, and Pattern Matching",
      summary:
        "Building custom types and handling data flow using Rust's powerful type system.",
      learningOutcomes: [
        "Model data using Structs",
        "Handle null - safety with the Option enum",
        "Use Match statements for control flow",
      ],
      lessons: [
        {
          lessonTitle: "Structs and Enums",
          explanation:
            "Structs are like JS Objects or Python Classes(without methods inside).Enums in Rust are 'Sum Types', meaning they can hold data, unlike JS enums.",
          analogy:
            "A Struct is a form with specific fields.An Enum is like a 'Choose your own adventure' path—you can only be on one path at a time, and each path has different gear.",
          examples:
            "struct User { name: String } | enum WebEvent { Click { x: i32, y: i32 }, Keys(String) }",
          practiceTasks: [
            "Define a Rectangle struct with width and height.",
            "Create an enum called 'Status' with variants 'Active', 'Inactive', and 'Suspended(String)'.",
          ],
          miniQuiz: [
            "Which construct is used to group related data fields ? (Struct)",
            "Can a Rust Enum variant hold additional data ? (Yes)",
          ],
        },
      ],
    },
    {
      moduleTitle: "Module 3: FullStack Backend with Axum",
      summary:
        "Building high - performance REST APIs using the Axum framework and SQLx for databases.",
      learningOutcomes: [
        "Setup an async web server",
        "Create JSON endpoints",
        "Perform CRUD operations with PostgreSQL",
      ],
      lessons: [
        {
          lessonTitle: "Routing and Handlers",
          explanation:
            "Axum uses an async / await model similar to Express.js(JS) or FastAPI(Python).We use 'Extractors' to get data from requests.",
          analogy:
            "If Express.js is a flexible food truck, Axum is a high - speed automated kitchen where every ingredient's type is checked before the stove even turns on.",
          examples:
            "async fn handler() -> &'static str { 'Hello World' } | Router:: new ().route('/', get(handler))",
          practiceTasks: [
            "Create a route that returns a JSON greeting.",
            "Implement a POST route that accepts a User struct as JSON.",
          ],
          miniQuiz: [
            "Which macro is used for async functions in Rust ? (#[tokio::main]) ",
            "What is the default library for async runtimes in Rust ? (Tokio)",
          ],
        },
      ],
    },
  ],
  projects: {
    miniProjects: [
      "Command Line Todo List: Practice Ownership and CLI I / O.",
      "In - memory KV Store: Practice HashMaps and Mutability.",
      "Currency Converter API: Build a basic Axum server that fetches exchange rates.",
    ],
    finalProject: {
      title: "Rusty - Flow: Fullstack Kanban Board",
      description:
        "A high - performance productivity tool with a Rust(Axum) backend, PostgreSQL database(SQLx), and a Rust - WASM(Leptos) frontend.",
      keyFeatures: [
        "JWT Authentication",
        "Real - time updates via WebSockets",
        "Type - safe API sharing between Frontend and Backend",
      ],
    },
  },
  weeklyQuizzes: [
    "Week 1: Ownership, Borrowing, and Basic Syntax.",
    "Week 2: Structs, Enums, Traits, and Error Handling(Result / Option).",
    "Week 3: Iterators, Closures, and Async / Await fundamentals.",
    "Week 4: Deployment, WASM, and Database Migrations.",
  ],
  studyGuide:
    "Focus on the compiler errors; they are your mentor.Do not try to fight the borrow checker—learn why it is complaining.Use 'cargo check' frequently to validate types without full builds.Supplement this course with 'The Rust Programming Language' book(The Book).",
};
