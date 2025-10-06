// Comprehensive Interview Questions Database - 200+ Real Interview Questions
const interviewQuestions = {
  technical: {
    easy: [
      {
        id: 1,
        question: "What is the difference between let, const, and var in JavaScript?",
        category: "JavaScript Fundamentals",
        expectedAnswer: "var is function-scoped, let and const are block-scoped. const cannot be reassigned.",
        tips: [
          "Start with scope differences",
          "Mention hoisting behavior",
          "Give practical examples",
          "Discuss when to use each"
        ],
        followUp: ["Can you give an example of hoisting with var?", "What happens if you try to reassign a const?"],
        difficulty: "easy",
        timeLimit: 3
      },
      {
        id: 2,
        question: "Explain what a closure is in JavaScript with an example.",
        category: "JavaScript Advanced",
        expectedAnswer: "A closure is when an inner function has access to outer function's variables even after outer function returns.",
        tips: [
          "Define closure clearly",
          "Provide a simple code example",
          "Explain lexical scoping",
          "Mention practical use cases"
        ],
        followUp: ["What are some practical uses of closures?", "How do closures relate to memory management?"],
        difficulty: "easy",
        timeLimit: 4
      },
      {
        id: 3,
        question: "What is the difference between == and === in JavaScript?",
        category: "JavaScript Fundamentals",
        expectedAnswer: "== performs type coercion, === checks both value and type without coercion.",
        tips: [
          "Explain type coercion clearly",
          "Give examples with different types",
          "Mention best practices",
          "Discuss performance implications"
        ],
        followUp: ["Can you give an example where == gives unexpected results?"],
        difficulty: "easy",
        timeLimit: 2
      },
      {
        id: 4,
        question: "What is a Promise in JavaScript and how do you use it?",
        category: "Asynchronous JavaScript",
        expectedAnswer: "A Promise represents eventual completion of an asynchronous operation and its resulting value.",
        tips: [
          "Define Promise states (pending, fulfilled, rejected)",
          "Show basic syntax with .then() and .catch()",
          "Mention async/await as modern alternative",
          "Discuss error handling"
        ],
        followUp: ["How would you handle multiple promises simultaneously?", "What's the difference between Promise.all() and Promise.race()?"],
        difficulty: "easy",
        timeLimit: 5
      },
      {
        id: 5,
        question: "Explain the concept of event bubbling in DOM.",
        category: "DOM Manipulation",
        expectedAnswer: "Event bubbling is when an event starts from the target element and bubbles up to parent elements.",
        tips: [
          "Draw or describe the DOM tree",
          "Explain the bubbling phase",
          "Mention event.stopPropagation()",
          "Give practical example"
        ],
        followUp: ["How can you prevent event bubbling?", "What's the difference between bubbling and capturing?"],
        difficulty: "easy",
        timeLimit: 4
      },
      {
        id: 'tech_easy_6',
        question: "What is the difference between null and undefined in JavaScript?",
        category: "JavaScript Fundamentals",
        expectedAnswer: "null is an intentional absence of value, undefined means a variable has been declared but not assigned a value.",
        tips: [
          "Explain that null is intentional",
          "undefined is default for uninitialized variables",
          "Both are falsy values",
          "typeof null returns 'object' (historical bug)"
        ],
        followUp: ["How do you check for null vs undefined?", "What does typeof null return and why?"],
        difficulty: "easy",
        timeLimit: 3
      },
      {
        id: 'tech_easy_7',
        question: "How do you handle errors in JavaScript?",
        category: "Error Handling",
        expectedAnswer: "Use try-catch blocks for synchronous code, .catch() for promises, and error event handlers for async operations.",
        tips: [
          "Show try-catch syntax",
          "Mention finally block",
          "Discuss promise error handling",
          "Talk about global error handlers"
        ],
        followUp: ["How do you handle errors in async/await?", "What's the difference between Error and custom error types?"],
        difficulty: "easy",
        timeLimit: 4
      },
      {
        id: 'tech_easy_8',
        question: "What are arrow functions and how are they different from regular functions?",
        category: "JavaScript ES6",
        expectedAnswer: "Arrow functions are a shorter syntax for functions, don't have their own 'this', and can't be used as constructors.",
        tips: [
          "Show syntax differences",
          "Explain 'this' binding differences",
          "Mention they can't be constructors",
          "Discuss when to use each"
        ],
        followUp: ["When would you not use an arrow function?", "How does 'this' behave in arrow functions?"],
        difficulty: "easy",
        timeLimit: 4
      },
      {
        id: 'tech_easy_9',
        question: "What is the difference between synchronous and asynchronous programming?",
        category: "Asynchronous JavaScript",
        expectedAnswer: "Synchronous code executes line by line, asynchronous code allows other operations while waiting for completion.",
        tips: [
          "Use real-world analogies",
          "Explain blocking vs non-blocking",
          "Give examples of async operations",
          "Mention callbacks, promises, async/await"
        ],
        followUp: ["What are some examples of asynchronous operations?", "How does JavaScript handle asynchronous code?"],
        difficulty: "easy",
        timeLimit: 4
      },
      {
        id: 'tech_easy_10',
        question: "How do you select elements in the DOM?",
        category: "DOM Manipulation",
        expectedAnswer: "Use methods like getElementById, getElementsByClassName, querySelector, querySelectorAll.",
        tips: [
          "List different selection methods",
          "Explain querySelector vs getElementById performance",
          "Show examples of CSS selectors",
          "Mention NodeList vs HTMLCollection"
        ],
        followUp: ["What's the difference between querySelector and getElementById?", "How do you select multiple elements?"],
        difficulty: "easy",
        timeLimit: 3
      }
    ],
    medium: [
      {
        id: 6,
        question: "Implement a debounce function in JavaScript.",
        category: "JavaScript Advanced",
        expectedAnswer: "A debounce function delays execution until after a specified time has passed since the last call.",
        tips: [
          "Explain the concept first",
          "Write clean, readable code",
          "Handle edge cases",
          "Mention real-world use cases"
        ],
        followUp: ["What's the difference between debounce and throttle?", "When would you use debounce in a real application?"],
        difficulty: "medium",
        timeLimit: 8
      },
      {
        id: 7,
        question: "Explain how prototypal inheritance works in JavaScript.",
        category: "JavaScript Advanced",
        expectedAnswer: "Objects can inherit properties and methods from other objects through the prototype chain.",
        tips: [
          "Start with prototype chain concept",
          "Show Object.create() example",
          "Explain __proto__ vs prototype",
          "Compare with classical inheritance"
        ],
        followUp: ["How does class syntax relate to prototypal inheritance?", "What are the performance implications?"],
        difficulty: "medium",
        timeLimit: 6
      },
      {
        id: 8,
        question: "Design a simple pub-sub (observer) pattern implementation.",
        category: "Design Patterns",
        expectedAnswer: "A pattern where objects subscribe to events and get notified when those events occur.",
        tips: [
          "Explain the pattern concept",
          "Implement subscribe/unsubscribe methods",
          "Handle multiple subscribers",
          "Consider memory leaks"
        ],
        followUp: ["How would you handle error propagation in this pattern?", "What are the advantages over direct method calls?"],
        difficulty: "medium",
        timeLimit: 10
      },
      {
        id: 9,
        question: "Explain the event loop in JavaScript and how it handles asynchronous operations.",
        category: "JavaScript Internals",
        expectedAnswer: "The event loop manages execution of code, collecting and processing events, and executing queued sub-tasks.",
        tips: [
          "Describe call stack, task queue, microtask queue",
          "Explain the execution order",
          "Give examples with setTimeout and Promises",
          "Mention browser vs Node.js differences"
        ],
        followUp: ["What's the difference between macrotasks and microtasks?", "How does this affect performance?"],
        difficulty: "medium",
        timeLimit: 7
      },
      {
        id: 10,
        question: "Implement a function to deep clone an object in JavaScript.",
        category: "JavaScript Advanced",
        expectedAnswer: "Create a new object with all nested properties copied recursively.",
        tips: [
          "Handle different data types",
          "Consider circular references",
          "Discuss JSON.parse/stringify limitations",
          "Write recursive solution"
        ],
        followUp: ["How would you handle circular references?", "What are the performance considerations?"],
        difficulty: "medium",
        timeLimit: 10
      },
      {
        id: 'tech_med_11',
        question: "What is the difference between call, apply, and bind in JavaScript?",
        category: "JavaScript Advanced",
        expectedAnswer: "All three methods are used to set the 'this' context. call takes arguments individually, apply takes an array, bind returns a new function.",
        tips: [
          "Explain 'this' context first",
          "Show syntax differences",
          "Give practical examples",
          "Mention when to use each"
        ],
        followUp: ["How would you implement your own bind function?", "What happens if you call bind multiple times?"],
        difficulty: "medium",
        timeLimit: 6
      },
      {
        id: 'tech_med_12',
        question: "Explain how React's useState hook works internally.",
        category: "React Hooks",
        expectedAnswer: "useState uses closures to maintain state between renders, returns current state and setter function.",
        tips: [
          "Explain the hook rules",
          "Discuss state updates and re-renders",
          "Mention functional updates",
          "Talk about state batching"
        ],
        followUp: ["Why can't you call hooks conditionally?", "How does React know which state belongs to which component?"],
        difficulty: "medium",
        timeLimit: 7
      },
      {
        id: 'tech_med_13',
        question: "What is memoization and how would you implement it?",
        category: "Performance Optimization",
        expectedAnswer: "Memoization caches function results to avoid expensive recalculations for the same inputs.",
        tips: [
          "Explain the caching concept",
          "Show a simple implementation",
          "Discuss when to use it",
          "Mention memory trade-offs"
        ],
        followUp: ["What are the trade-offs of memoization?", "How would you implement memoization for recursive functions?"],
        difficulty: "medium",
        timeLimit: 8
      },
      {
        id: 'tech_med_14',
        question: "How do you optimize the performance of a React application?",
        category: "React Performance",
        expectedAnswer: "Use React.memo, useMemo, useCallback, code splitting, lazy loading, and avoid unnecessary re-renders.",
        tips: [
          "List multiple optimization techniques",
          "Explain when to use each",
          "Mention profiling tools",
          "Discuss bundle optimization"
        ],
        followUp: ["How do you identify performance bottlenecks?", "What tools do you use for performance analysis?"],
        difficulty: "medium",
        timeLimit: 8
      },
      {
        id: 'tech_med_15',
        question: "Explain the concept of currying in JavaScript.",
        category: "Functional Programming",
        expectedAnswer: "Currying transforms a function with multiple arguments into a sequence of functions each taking a single argument.",
        tips: [
          "Show transformation example",
          "Explain partial application",
          "Give practical use cases",
          "Implement a curry function"
        ],
        followUp: ["What's the difference between currying and partial application?", "How would you implement a generic curry function?"],
        difficulty: "medium",
        timeLimit: 7
      },
      {
        id: 'tech_med_16',
        question: "What are Web Workers and when would you use them?",
        category: "Browser APIs",
        expectedAnswer: "Web Workers run JavaScript in background threads, useful for CPU-intensive tasks without blocking the main thread.",
        tips: [
          "Explain main thread blocking",
          "Show basic Web Worker syntax",
          "Discuss communication via postMessage",
          "Mention limitations and use cases"
        ],
        followUp: ["What are the limitations of Web Workers?", "How do you communicate between main thread and worker?"],
        difficulty: "medium",
        timeLimit: 6
      },
      {
        id: 'tech_med_17',
        question: "Implement a simple state management solution (like Redux) from scratch.",
        category: "State Management",
        expectedAnswer: "Create a store with state, reducers, and subscription mechanism for state changes.",
        tips: [
          "Start with basic store structure",
          "Implement dispatch and subscribe",
          "Handle state immutability",
          "Add middleware support"
        ],
        followUp: ["How would you add middleware support?", "How do you ensure state immutability?"],
        difficulty: "medium",
        timeLimit: 12
      },
      {
        id: 'tech_med_18',
        question: "What is the difference between server-side rendering and client-side rendering?",
        category: "Web Architecture",
        expectedAnswer: "SSR renders HTML on server before sending to client, CSR renders in browser using JavaScript.",
        tips: [
          "Explain the rendering process for each",
          "Discuss SEO implications",
          "Compare initial load times",
          "Mention hydration in SSR"
        ],
        followUp: ["What are the trade-offs of each approach?", "How does Next.js handle SSR?"],
        difficulty: "medium",
        timeLimit: 6
      },
      {
        id: 'tech_med_19',
        question: "How would you implement infinite scrolling?",
        category: "UI Implementation",
        expectedAnswer: "Use Intersection Observer API to detect when user reaches bottom, then load more content.",
        tips: [
          "Explain Intersection Observer",
          "Handle loading states",
          "Discuss performance considerations",
          "Mention virtualization for large lists"
        ],
        followUp: ["How would you handle errors during loading?", "What is virtual scrolling and when would you use it?"],
        difficulty: "medium",
        timeLimit: 8
      },
      {
        id: 'tech_med_20',
        question: "Explain how HTTPS works and why it's important.",
        category: "Web Security",
        expectedAnswer: "HTTPS uses TLS/SSL to encrypt data between client and server, ensuring data integrity and privacy.",
        tips: [
          "Explain the handshake process",
          "Discuss certificates and CAs",
          "Mention encryption algorithms",
          "Talk about security benefits"
        ],
        followUp: ["What happens during the TLS handshake?", "How do you handle mixed content issues?"],
        difficulty: "medium",
        timeLimit: 7
      }
    ],
    hard: [
      {
        id: 11,
        question: "Design and implement a virtual DOM diffing algorithm.",
        category: "React/Virtual DOM",
        expectedAnswer: "Compare two virtual DOM trees and determine minimal changes needed to update the real DOM.",
        tips: [
          "Explain virtual DOM concept",
          "Describe diffing strategy",
          "Handle different node types",
          "Optimize for performance"
        ],
        followUp: ["How would you handle key-based reconciliation?", "What are the time complexity considerations?"],
        difficulty: "hard",
        timeLimit: 15
      },
      {
        id: 12,
        question: "Implement a memory-efficient LRU (Least Recently Used) cache.",
        category: "Data Structures",
        expectedAnswer: "A cache that removes least recently used items when capacity is exceeded.",
        tips: [
          "Use doubly linked list + hash map",
          "Explain O(1) operations",
          "Handle edge cases",
          "Consider thread safety"
        ],
        followUp: ["How would you make this thread-safe?", "What are alternative cache eviction strategies?"],
        difficulty: "hard",
        timeLimit: 20
      },
      {
        id: 13,
        question: "Design a system to handle real-time collaborative editing (like Google Docs).",
        category: "System Design",
        expectedAnswer: "System that allows multiple users to edit the same document simultaneously with conflict resolution.",
        tips: [
          "Discuss operational transforms",
          "Handle network partitions",
          "Consider consistency models",
          "Design for scalability"
        ],
        followUp: ["How would you handle offline editing?", "What are the consistency guarantees?"],
        difficulty: "hard",
        timeLimit: 25
      },
      {
        id: 14,
        question: "Implement a custom React hook for managing complex state with undo/redo functionality.",
        category: "React Advanced",
        expectedAnswer: "A hook that manages state history and provides undo/redo operations.",
        tips: [
          "Use useReducer for complex state",
          "Implement command pattern",
          "Handle memory optimization",
          "Provide clean API"
        ],
        followUp: ["How would you optimize memory usage for large histories?", "How would you handle branching histories?"],
        difficulty: "hard",
        timeLimit: 18
      },
      {
        id: 15,
        question: "Design a rate limiting system that can handle millions of requests per second.",
        category: "System Design",
        expectedAnswer: "A distributed system that limits requests based on various criteria while maintaining high performance.",
        tips: [
          "Discuss different algorithms (token bucket, sliding window)",
          "Consider distributed challenges",
          "Handle edge cases",
          "Design for fault tolerance"
        ],
        followUp: ["How would you handle distributed consensus?", "What are the trade-offs between different algorithms?"],
        difficulty: "hard",
        timeLimit: 30
      },
      {
        id: 'tech_hard_16',
        question: "Design a distributed caching system like Redis Cluster.",
        category: "System Design",
        expectedAnswer: "A horizontally scalable caching system with data partitioning, replication, and consistency guarantees.",
        tips: [
          "Discuss consistent hashing",
          "Explain replication strategies",
          "Handle node failures",
          "Consider consistency models"
        ],
        followUp: ["How do you handle hot keys?", "What happens when a node fails?"],
        difficulty: "hard",
        timeLimit: 25
      },
      {
        id: 'tech_hard_17',
        question: "Implement a JavaScript engine's garbage collector.",
        category: "JavaScript Internals",
        expectedAnswer: "Design a mark-and-sweep or generational garbage collector that manages memory automatically.",
        tips: [
          "Explain different GC algorithms",
          "Discuss mark-and-sweep process",
          "Handle circular references",
          "Consider performance implications"
        ],
        followUp: ["How do you handle memory leaks?", "What are the trade-offs of different GC strategies?"],
        difficulty: "hard",
        timeLimit: 20
      },
      {
        id: 'tech_hard_18',
        question: "Design a real-time multiplayer game architecture.",
        category: "System Design",
        expectedAnswer: "A system handling real-time communication, state synchronization, and conflict resolution for multiple players.",
        tips: [
          "Discuss WebSocket communication",
          "Handle state synchronization",
          "Consider latency and lag compensation",
          "Design for scalability"
        ],
        followUp: ["How do you handle cheating prevention?", "What about players with different network conditions?"],
        difficulty: "hard",
        timeLimit: 30
      },
      {
        id: 'tech_hard_19',
        question: "Implement a compiler for a simple programming language.",
        category: "Computer Science",
        expectedAnswer: "Build lexer, parser, and code generator for a simple language with basic constructs.",
        tips: [
          "Explain compilation phases",
          "Design grammar and tokens",
          "Implement parsing algorithm",
          "Generate target code"
        ],
        followUp: ["How would you add optimization passes?", "How do you handle error reporting?"],
        difficulty: "hard",
        timeLimit: 35
      },
      {
        id: 'tech_hard_20',
        question: "Design a search engine like Google (simplified version).",
        category: "System Design",
        expectedAnswer: "A system for crawling, indexing, and ranking web pages with fast query processing.",
        tips: [
          "Discuss web crawling strategy",
          "Explain indexing and storage",
          "Design ranking algorithm",
          "Handle scale and performance"
        ],
        followUp: ["How do you handle duplicate content?", "What about real-time updates to the index?"],
        difficulty: "hard",
        timeLimit: 40
      },
      {
        id: 'tech_hard_21',
        question: "Implement a database transaction system with ACID properties.",
        category: "Database Systems",
        expectedAnswer: "Design a system ensuring Atomicity, Consistency, Isolation, and Durability for database operations.",
        tips: [
          "Explain each ACID property",
          "Discuss locking mechanisms",
          "Handle deadlock detection",
          "Implement rollback mechanisms"
        ],
        followUp: ["How do you handle distributed transactions?", "What are the trade-offs of different isolation levels?"],
        difficulty: "hard",
        timeLimit: 25
      },
      {
        id: 'tech_hard_22',
        question: "Design a content delivery network (CDN) from scratch.",
        category: "System Design",
        expectedAnswer: "A geographically distributed network of servers that cache and deliver content to users efficiently.",
        tips: [
          "Discuss edge server placement",
          "Explain caching strategies",
          "Handle cache invalidation",
          "Consider routing algorithms"
        ],
        followUp: ["How do you handle dynamic content?", "What about cache consistency across edge servers?"],
        difficulty: "hard",
        timeLimit: 30
      },
      {
        id: 'tech_hard_23',
        question: "Implement a distributed consensus algorithm (like Raft).",
        category: "Distributed Systems",
        expectedAnswer: "A protocol ensuring multiple nodes agree on a single value despite failures and network partitions.",
        tips: [
          "Explain leader election",
          "Discuss log replication",
          "Handle network partitions",
          "Ensure safety and liveness"
        ],
        followUp: ["How do you handle split-brain scenarios?", "What are the performance characteristics?"],
        difficulty: "hard",
        timeLimit: 35
      },
      {
        id: 'tech_hard_24',
        question: "Design a microservices architecture for an e-commerce platform.",
        category: "System Design",
        expectedAnswer: "Break down monolith into independent services with proper communication, data management, and deployment strategies.",
        tips: [
          "Identify service boundaries",
          "Design inter-service communication",
          "Handle data consistency",
          "Plan deployment and monitoring"
        ],
        followUp: ["How do you handle distributed transactions?", "What about service discovery and load balancing?"],
        difficulty: "hard",
        timeLimit: 35
      },
      {
        id: 'tech_hard_25',
        question: "Implement a time-series database optimized for IoT data.",
        category: "Database Systems",
        expectedAnswer: "A specialized database for storing and querying time-stamped data with high write throughput and compression.",
        tips: [
          "Discuss data model and schema",
          "Explain compression techniques",
          "Handle high write loads",
          "Design efficient queries"
        ],
        followUp: ["How do you handle data retention policies?", "What about real-time analytics on the data?"],
        difficulty: "hard",
        timeLimit: 30
      }
    ]
  },
  hr: {
    easy: [
      {
        id: 16,
        question: "Tell me about yourself.",
        category: "Introduction",
        expectedAnswer: "A concise professional summary highlighting relevant experience, skills, and career goals.",
        tips: [
          "Keep it under 2 minutes",
          "Focus on professional achievements",
          "Connect to the role you're applying for",
          "End with why you're interested in this position"
        ],
        followUp: ["What interests you most about this role?", "How does this position align with your career goals?"],
        difficulty: "easy",
        timeLimit: 3
      },
      {
        id: 17,
        question: "Why do you want to work here?",
        category: "Company Interest",
        expectedAnswer: "Demonstrate knowledge of the company and explain how your values and goals align.",
        tips: [
          "Research the company beforehand",
          "Mention specific company values or projects",
          "Connect your skills to their needs",
          "Show genuine enthusiasm"
        ],
        followUp: ["What do you know about our recent projects?", "How do you see yourself contributing to our team?"],
        difficulty: "easy",
        timeLimit: 3
      },
      {
        id: 18,
        question: "What are your greatest strengths?",
        category: "Self-Assessment",
        expectedAnswer: "Highlight 2-3 key strengths relevant to the role with specific examples.",
        tips: [
          "Choose strengths relevant to the job",
          "Provide specific examples",
          "Quantify achievements when possible",
          "Show how these strengths benefit the employer"
        ],
        followUp: ["Can you give me a specific example of when you used this strength?"],
        difficulty: "easy",
        timeLimit: 4
      },
      {
        id: 19,
        question: "Where do you see yourself in 5 years?",
        category: "Career Goals",
        expectedAnswer: "Show ambition while demonstrating commitment to growing within the company.",
        tips: [
          "Align with potential career paths at the company",
          "Show ambition but be realistic",
          "Mention skill development goals",
          "Express interest in taking on more responsibility"
        ],
        followUp: ["What skills do you want to develop to get there?", "How does this role fit into your long-term plans?"],
        difficulty: "easy",
        timeLimit: 3
      },
      {
        id: 20,
        question: "Why are you leaving your current job?",
        category: "Career Transition",
        expectedAnswer: "Focus on positive reasons for seeking new opportunities rather than negative aspects of current role.",
        tips: [
          "Stay positive about previous employers",
          "Focus on growth opportunities",
          "Mention seeking new challenges",
          "Avoid personal conflicts or complaints"
        ],
        followUp: ["What would make you want to stay at a company long-term?"],
        difficulty: "easy",
        timeLimit: 3
      },
      {
        id: 'hr_easy_21',
        question: "What motivates you at work?",
        category: "Motivation",
        expectedAnswer: "Discuss intrinsic motivators like learning, impact, autonomy, and how they align with the role.",
        tips: [
          "Focus on intrinsic motivators",
          "Connect to the specific role",
          "Mention growth and learning",
          "Show passion for the work"
        ],
        followUp: ["How do you stay motivated during challenging times?", "What demotivates you?"],
        difficulty: "easy",
        timeLimit: 3
      },
      {
        id: 'hr_easy_22',
        question: "How do you handle stress and pressure?",
        category: "Stress Management",
        expectedAnswer: "Describe healthy coping mechanisms and how you maintain performance under pressure.",
        tips: [
          "Give specific stress management techniques",
          "Show you can perform under pressure",
          "Mention prioritization skills",
          "Discuss work-life balance"
        ],
        followUp: ["Can you give an example of a high-pressure situation you handled well?"],
        difficulty: "easy",
        timeLimit: 4
      },
      {
        id: 'hr_easy_23',
        question: "What are your salary expectations?",
        category: "Compensation",
        expectedAnswer: "Provide a researched range based on market rates and emphasize value you bring.",
        tips: [
          "Research market rates beforehand",
          "Give a range, not a specific number",
          "Emphasize value you bring",
          "Be open to negotiation"
        ],
        followUp: ["What factors are most important to you in a compensation package?"],
        difficulty: "easy",
        timeLimit: 3
      },
      {
        id: 'hr_easy_24',
        question: "Do you have any questions for us?",
        category: "Questions for Interviewer",
        expectedAnswer: "Ask thoughtful questions about the role, team, company culture, and growth opportunities.",
        tips: [
          "Prepare 3-5 thoughtful questions",
          "Ask about team dynamics",
          "Inquire about growth opportunities",
          "Show genuine interest in the company"
        ],
        followUp: ["What would success look like in this role?", "What are the biggest challenges facing the team?"],
        difficulty: "easy",
        timeLimit: 5
      },
      {
        id: 'hr_easy_25',
        question: "How do you prefer to receive feedback?",
        category: "Communication",
        expectedAnswer: "Show openness to feedback and describe how you best process and act on it.",
        tips: [
          "Show you welcome feedback",
          "Describe your preferred feedback style",
          "Mention how you act on feedback",
          "Give examples of growth from feedback"
        ],
        followUp: ["Tell me about a time feedback helped you improve.", "How do you give feedback to others?"],
        difficulty: "easy",
        timeLimit: 3
      }
    ],
    medium: [
      {
        id: 21,
        question: "Describe a time when you had to work with a difficult team member.",
        category: "Teamwork",
        expectedAnswer: "Use STAR method to describe situation, task, action, and result of handling interpersonal challenges.",
        tips: [
          "Use the STAR method (Situation, Task, Action, Result)",
          "Focus on your actions and problem-solving",
          "Show emotional intelligence",
          "Demonstrate conflict resolution skills"
        ],
        followUp: ["How do you typically handle disagreements in a team?", "What did you learn from this experience?"],
        difficulty: "medium",
        timeLimit: 5
      },
      {
        id: 22,
        question: "Tell me about a time you failed and how you handled it.",
        category: "Problem Solving",
        expectedAnswer: "Demonstrate learning from failure, taking responsibility, and implementing improvements.",
        tips: [
          "Choose a real failure with learning outcomes",
          "Take full responsibility",
          "Explain what you learned",
          "Show how you applied the learning"
        ],
        followUp: ["How has this experience changed your approach to similar situations?", "What would you do differently now?"],
        difficulty: "medium",
        timeLimit: 5
      },
      {
        id: 23,
        question: "Describe a situation where you had to learn something completely new quickly.",
        category: "Adaptability",
        expectedAnswer: "Show ability to quickly acquire new skills and adapt to changing requirements.",
        tips: [
          "Choose a relevant technical or professional skill",
          "Explain your learning strategy",
          "Mention resources you used",
          "Quantify the timeline and results"
        ],
        followUp: ["How do you typically approach learning new technologies?", "What resources do you find most helpful?"],
        difficulty: "medium",
        timeLimit: 5
      },
      {
        id: 24,
        question: "Tell me about a time you had to make a decision with incomplete information.",
        category: "Decision Making",
        expectedAnswer: "Demonstrate analytical thinking, risk assessment, and decision-making under uncertainty.",
        tips: [
          "Explain your decision-making process",
          "Show how you gathered available information",
          "Discuss risk assessment",
          "Mention how you monitored results"
        ],
        followUp: ["How do you typically handle uncertainty in your work?", "What factors do you consider when making difficult decisions?"],
        difficulty: "medium",
        timeLimit: 6
      },
      {
        id: 25,
        question: "Describe a time when you had to give constructive feedback to a colleague.",
        category: "Communication",
        expectedAnswer: "Show ability to provide feedback diplomatically while maintaining relationships.",
        tips: [
          "Focus on behavior, not personality",
          "Explain your approach to giving feedback",
          "Show empathy and understanding",
          "Mention positive outcomes"
        ],
        followUp: ["How do you prepare for difficult conversations?", "How do you handle receiving feedback yourself?"],
        difficulty: "medium",
        timeLimit: 5
      },
      {
        id: 'hr_med_26',
        question: "Tell me about a time you disagreed with your manager's decision.",
        category: "Conflict Resolution",
        expectedAnswer: "Show ability to respectfully disagree while maintaining professional relationships and finding solutions.",
        tips: [
          "Show respect for authority",
          "Explain your reasoning clearly",
          "Demonstrate problem-solving",
          "Focus on positive outcomes"
        ],
        followUp: ["How do you handle situations where you still disagree after discussion?", "What did you learn from this experience?"],
        difficulty: "medium",
        timeLimit: 6
      },
      {
        id: 'hr_med_27',
        question: "Describe a time when you had to work with limited resources.",
        category: "Resourcefulness",
        expectedAnswer: "Demonstrate creativity, prioritization, and ability to deliver results despite constraints.",
        tips: [
          "Show creative problem-solving",
          "Explain prioritization process",
          "Demonstrate resourcefulness",
          "Quantify the impact"
        ],
        followUp: ["How do you prioritize when everything seems important?", "What creative solutions did you come up with?"],
        difficulty: "medium",
        timeLimit: 5
      },
      {
        id: 'hr_med_28',
        question: "Tell me about a time you had to adapt to a significant change at work.",
        category: "Adaptability",
        expectedAnswer: "Show flexibility, positive attitude toward change, and ability to help others through transitions.",
        tips: [
          "Show positive attitude toward change",
          "Explain adaptation strategies",
          "Mention helping others adapt",
          "Focus on successful outcomes"
        ],
        followUp: ["How do you help others who struggle with change?", "What strategies do you use to adapt quickly?"],
        difficulty: "medium",
        timeLimit: 5
      },
      {
        id: 'hr_med_29',
        question: "Describe a situation where you had to meet a tight deadline.",
        category: "Time Management",
        expectedAnswer: "Demonstrate planning, prioritization, and execution skills under time pressure.",
        tips: [
          "Explain your planning process",
          "Show prioritization skills",
          "Mention stakeholder communication",
          "Discuss lessons learned"
        ],
        followUp: ["How do you prevent last-minute rushes?", "What tools do you use for time management?"],
        difficulty: "medium",
        timeLimit: 5
      },
      {
        id: 'hr_med_30',
        question: "Tell me about a time you had to convince someone to see things your way.",
        category: "Persuasion",
        expectedAnswer: "Show ability to influence others through logic, empathy, and understanding their perspective.",
        tips: [
          "Understand their perspective first",
          "Use data and logic",
          "Show empathy and respect",
          "Focus on win-win outcomes"
        ],
        followUp: ["What techniques do you use to build consensus?", "How do you handle strong resistance to your ideas?"],
        difficulty: "medium",
        timeLimit: 6
      },
      {
        id: 'hr_med_31',
        question: "Describe a time when you took initiative on a project.",
        category: "Initiative",
        expectedAnswer: "Show proactive behavior, leadership qualities, and ability to drive results without being asked.",
        tips: [
          "Show proactive thinking",
          "Explain the impact of your initiative",
          "Demonstrate leadership qualities",
          "Mention stakeholder buy-in"
        ],
        followUp: ["How do you identify opportunities for improvement?", "What motivates you to take initiative?"],
        difficulty: "medium",
        timeLimit: 5
      },
      {
        id: 'hr_med_32',
        question: "Tell me about a time you had to work with someone whose communication style was very different from yours.",
        category: "Communication",
        expectedAnswer: "Show adaptability in communication and ability to work effectively with diverse personalities.",
        tips: [
          "Show awareness of different communication styles",
          "Explain adaptation strategies",
          "Demonstrate empathy and patience",
          "Focus on successful collaboration"
        ],
        followUp: ["How do you identify someone's communication style?", "What strategies do you use to adapt your communication?"],
        difficulty: "medium",
        timeLimit: 5
      },
      {
        id: 'hr_med_33',
        question: "Describe a time when you had to deliver bad news to a client or stakeholder.",
        category: "Communication",
        expectedAnswer: "Show ability to communicate difficult information clearly, empathetically, and with solutions.",
        tips: [
          "Be direct but empathetic",
          "Prepare solutions or alternatives",
          "Take responsibility when appropriate",
          "Focus on maintaining relationships"
        ],
        followUp: ["How do you prepare for difficult conversations?", "What do you do to maintain trust after delivering bad news?"],
        difficulty: "medium",
        timeLimit: 6
      },
      {
        id: 'hr_med_34',
        question: "Tell me about a time you had to learn from a mistake.",
        category: "Learning",
        expectedAnswer: "Show ability to take responsibility, learn from errors, and implement improvements.",
        tips: [
          "Take full responsibility",
          "Explain what you learned",
          "Show how you applied the learning",
          "Demonstrate growth mindset"
        ],
        followUp: ["How do you prevent similar mistakes in the future?", "What systems do you have for continuous learning?"],
        difficulty: "medium",
        timeLimit: 5
      },
      {
        id: 'hr_med_35',
        question: "Describe a time when you had to balance multiple competing priorities.",
        category: "Prioritization",
        expectedAnswer: "Show systematic approach to prioritization and ability to manage multiple stakeholders' expectations.",
        tips: [
          "Explain your prioritization framework",
          "Show stakeholder communication",
          "Demonstrate time management",
          "Mention tools or methods used"
        ],
        followUp: ["How do you decide what's most important?", "How do you communicate priority changes to stakeholders?"],
        difficulty: "medium",
        timeLimit: 6
      }
    ],
    hard: [
      {
        id: 26,
        question: "Tell me about a time you had to influence someone without having authority over them.",
        category: "Leadership",
        expectedAnswer: "Demonstrate leadership skills, persuasion abilities, and stakeholder management.",
        tips: [
          "Show understanding of different stakeholder motivations",
          "Explain your influence strategy",
          "Demonstrate emotional intelligence",
          "Focus on win-win outcomes"
        ],
        followUp: ["What strategies do you use to build consensus?", "How do you handle resistance to your ideas?"],
        difficulty: "hard",
        timeLimit: 7
      },
      {
        id: 27,
        question: "Describe a situation where you had to make an unpopular decision.",
        category: "Leadership",
        expectedAnswer: "Show courage in decision-making, communication skills, and ability to handle criticism.",
        tips: [
          "Explain the reasoning behind the decision",
          "Show how you communicated it to stakeholders",
          "Demonstrate empathy for those affected",
          "Focus on long-term benefits"
        ],
        followUp: ["How do you build support for difficult decisions?", "How do you handle criticism of your decisions?"],
        difficulty: "hard",
        timeLimit: 7
      },
      {
        id: 28,
        question: "Tell me about a time you had to manage competing priorities with tight deadlines.",
        category: "Time Management",
        expectedAnswer: "Demonstrate prioritization skills, stakeholder management, and ability to work under pressure.",
        tips: [
          "Explain your prioritization framework",
          "Show stakeholder communication",
          "Demonstrate time management skills",
          "Mention tools or methods used"
        ],
        followUp: ["How do you typically prioritize your work?", "How do you communicate delays or changes to stakeholders?"],
        difficulty: "hard",
        timeLimit: 6
      },
      {
        id: 29,
        question: "Describe a time when you had to turn around a failing project.",
        category: "Problem Solving",
        expectedAnswer: "Show problem diagnosis, strategic thinking, team leadership, and execution skills.",
        tips: [
          "Explain how you diagnosed the problems",
          "Show your turnaround strategy",
          "Demonstrate team leadership",
          "Quantify the results"
        ],
        followUp: ["What early warning signs do you look for in projects?", "How do you maintain team morale during difficult times?"],
        difficulty: "hard",
        timeLimit: 8
      },
      {
        id: 30,
        question: "Tell me about a time you had to deal with an ethical dilemma at work.",
        category: "Ethics",
        expectedAnswer: "Demonstrate strong ethical principles, decision-making process, and courage to do the right thing.",
        tips: [
          "Explain the ethical considerations",
          "Show your decision-making process",
          "Demonstrate courage and integrity",
          "Mention any policies or guidelines you followed"
        ],
        followUp: ["How do you handle situations where company interests conflict with ethical considerations?"],
        difficulty: "hard",
        timeLimit: 6
      },
      {
        id: 'hr_hard_31',
        question: "Tell me about a time you had to fire or let someone go.",
        category: "Leadership",
        expectedAnswer: "Show ability to make difficult personnel decisions while maintaining dignity and following proper procedures.",
        tips: [
          "Explain the decision-making process",
          "Show empathy and respect for the person",
          "Mention documentation and procedures",
          "Discuss team impact and communication"
        ],
        followUp: ["How do you support the remaining team after a termination?", "What steps do you take before making such decisions?"],
        difficulty: "hard",
        timeLimit: 8
      },
      {
        id: 'hr_hard_32',
        question: "Describe a time when you had to challenge the status quo or company policy.",
        category: "Innovation",
        expectedAnswer: "Show courage to question existing practices while being constructive and solution-oriented.",
        tips: [
          "Explain your reasoning clearly",
          "Show respect for existing processes",
          "Propose concrete alternatives",
          "Demonstrate persistence and diplomacy"
        ],
        followUp: ["How do you build support for controversial changes?", "What do you do when your challenges are rejected?"],
        difficulty: "hard",
        timeLimit: 7
      },
      {
        id: 'hr_hard_33',
        question: "Tell me about a time you had to manage a crisis or emergency situation.",
        category: "Crisis Management",
        expectedAnswer: "Show ability to stay calm, make quick decisions, communicate effectively, and coordinate response efforts.",
        tips: [
          "Describe your immediate response",
          "Show calm decision-making",
          "Explain communication strategy",
          "Discuss lessons learned"
        ],
        followUp: ["How do you prepare for potential crises?", "What role does communication play in crisis management?"],
        difficulty: "hard",
        timeLimit: 8
      },
      {
        id: 'hr_hard_34',
        question: "Describe a situation where you had to build a team from scratch.",
        category: "Team Building",
        expectedAnswer: "Show ability to recruit, onboard, and develop a high-performing team with clear vision and culture.",
        tips: [
          "Explain your hiring strategy",
          "Discuss team culture development",
          "Show onboarding and development plans",
          "Measure team performance"
        ],
        followUp: ["How do you ensure cultural fit when hiring?", "What metrics do you use to measure team success?"],
        difficulty: "hard",
        timeLimit: 8
      },
      {
        id: 'hr_hard_35',
        question: "Tell me about a time you had to negotiate a complex deal or agreement.",
        category: "Negotiation",
        expectedAnswer: "Show strategic thinking, preparation, understanding of all parties' interests, and win-win outcomes.",
        tips: [
          "Explain your preparation process",
          "Show understanding of all parties' needs",
          "Demonstrate strategic thinking",
          "Focus on win-win outcomes"
        ],
        followUp: ["What's your approach to preparing for negotiations?", "How do you handle deadlocks in negotiations?"],
        difficulty: "hard",
        timeLimit: 7
      },
      {
        id: 'hr_hard_36',
        question: "Describe a time when you had to lead through a major organizational change.",
        category: "Change Management",
        expectedAnswer: "Show ability to communicate vision, manage resistance, and guide teams through uncertainty.",
        tips: [
          "Explain the change and its impact",
          "Show communication strategy",
          "Discuss resistance management",
          "Measure change success"
        ],
        followUp: ["How do you help people who struggle with change?", "What role does communication play in change management?"],
        difficulty: "hard",
        timeLimit: 8
      },
      {
        id: 'hr_hard_37',
        question: "Tell me about a time you had to make a decision that was unpopular with your team.",
        category: "Leadership",
        expectedAnswer: "Show courage in decision-making while maintaining team relationships and explaining rationale clearly.",
        tips: [
          "Explain the decision rationale",
          "Show how you communicated it",
          "Discuss team reaction management",
          "Focus on long-term benefits"
        ],
        followUp: ["How do you maintain team morale after unpopular decisions?", "What do you do when team members openly disagree?"],
        difficulty: "hard",
        timeLimit: 7
      },
      {
        id: 'hr_hard_38',
        question: "Describe a situation where you had to work with a completely dysfunctional team.",
        category: "Team Management",
        expectedAnswer: "Show ability to diagnose team issues, implement solutions, and transform team dynamics.",
        tips: [
          "Diagnose the root problems",
          "Explain intervention strategies",
          "Show patience and persistence",
          "Measure improvement over time"
        ],
        followUp: ["What are the signs of a dysfunctional team?", "How do you prevent teams from becoming dysfunctional?"],
        difficulty: "hard",
        timeLimit: 8
      },
      {
        id: 'hr_hard_39',
        question: "Tell me about a time you had to deliver results with a team you didn't directly manage.",
        category: "Influence",
        expectedAnswer: "Show ability to influence without authority, build relationships, and coordinate across organizational boundaries.",
        tips: [
          "Explain relationship building strategies",
          "Show influence without authority",
          "Demonstrate project coordination",
          "Focus on collaborative outcomes"
        ],
        followUp: ["What strategies do you use to influence without authority?", "How do you handle conflicts with peer teams?"],
        difficulty: "hard",
        timeLimit: 7
      },
      {
        id: 'hr_hard_40',
        question: "Describe a time when you had to take responsibility for someone else's mistake.",
        category: "Accountability",
        expectedAnswer: "Show leadership accountability, team protection, and ability to turn mistakes into learning opportunities.",
        tips: [
          "Show leadership accountability",
          "Explain how you protected your team",
          "Discuss learning and improvement",
          "Demonstrate integrity"
        ],
        followUp: ["How do you balance accountability with team development?", "When is it appropriate to take blame for others?"],
        difficulty: "hard",
        timeLimit: 6
      }
    ]
  }
};

// Comprehensive Tips and Tricks for Interview Success
const interviewTips = {
  general: {
    preparation: [
      "Research the company thoroughly - mission, values, recent news, competitors, leadership team",
      "Study the job description and identify 3-5 key requirements you can address",
      "Prepare 8-10 STAR method examples covering different competencies",
      "Practice your 60-second elevator pitch until it's natural",
      "Prepare 5-7 thoughtful questions about the role, team, and company culture",
      "Research your interviewers on LinkedIn if names are provided",
      "Prepare your 'failure' and 'weakness' stories with learning outcomes",
      "Plan your route and have backup transportation options",
      "Prepare multiple copies of your resume and a portfolio if relevant"
    ],
    during: [
      "Arrive 10-15 minutes early, but not more (it can be awkward)",
      "Greet everyone professionally, including receptionists and assistants",
      "Maintain good eye contact (70% of the time) and open body language",
      "Listen actively and take notes if appropriate",
      "Use the interviewer's name occasionally during conversation",
      "Speak clearly and at an appropriate pace",
      "Use specific examples and quantify achievements with numbers",
      "Show enthusiasm through your tone and body language",
      "Ask for clarification if you don't understand a question",
      "End each answer by asking if they'd like more detail"
    ],
    after: [
      "Send personalized thank-you emails within 24 hours to each interviewer",
      "Reiterate your interest and 2-3 key qualifications",
      "Address any concerns or gaps that came up during the interview",
      "Include any additional information you forgot to mention",
      "Connect on LinkedIn with a personalized message",
      "Follow up appropriately based on their timeline",
      "Reflect on the interview and note areas for improvement"
    ],
    body_language: [
      "Firm handshake with good eye contact",
      "Sit up straight but relaxed",
      "Lean slightly forward to show engagement",
      "Use natural hand gestures when speaking",
      "Mirror the interviewer's energy level appropriately",
      "Smile genuinely when appropriate",
      "Avoid fidgeting, crossing arms, or looking at your phone"
    ],
    common_mistakes: [
      "Speaking negatively about current/former employers",
      "Not having specific examples ready",
      "Failing to research the company",
      "Not asking any questions",
      "Being too modest about achievements",
      "Arriving late or too early",
      "Not following up after the interview",
      "Lying or exaggerating experience"
    ]
  },
  technical: {
    preparation: [
      "Review fundamental concepts: data structures, algorithms, time/space complexity",
      "Practice coding problems daily on LeetCode, HackerRank, or CodeSignal",
      "Study system design patterns: load balancing, caching, databases, microservices",
      "Prepare detailed explanations of your past projects with technical challenges",
      "Practice coding on whiteboard or shared screen environments",
      "Review your resume projects and be ready to dive deep into technical details",
      "Study the company's tech stack and recent engineering blog posts",
      "Prepare questions about their technical challenges and architecture",
      "Practice explaining complex technical concepts in simple terms"
    ],
    during: [
      "Always think out loud - explain your thought process step by step",
      "Ask clarifying questions: input constraints, expected output, edge cases",
      "Start with a brute force solution, then optimize",
      "Write clean, readable code with meaningful variable names",
      "Test your code with examples, including edge cases",
      "Discuss time and space complexity of your solution",
      "Mention alternative approaches and trade-offs",
      "Be honest if you don't know something, but explain how you'd find out",
      "Show enthusiasm for technical challenges"
    ],
    coding_best_practices: [
      "Use meaningful variable and function names",
      "Write modular, reusable code",
      "Handle edge cases and error conditions",
      "Comment complex logic",
      "Consider performance implications",
      "Use appropriate data structures",
      "Follow language-specific conventions",
      "Test your solution thoroughly"
    ],
    system_design: [
      "Start by clarifying requirements and constraints",
      "Estimate scale: users, data, requests per second",
      "Design high-level architecture first",
      "Identify bottlenecks and single points of failure",
      "Discuss data storage and retrieval patterns",
      "Consider caching strategies",
      "Plan for scalability and reliability",
      "Discuss monitoring and alerting"
    ],
    common_mistakes: [
      "Jumping into coding without understanding the problem fully",
      "Not asking clarifying questions about requirements",
      "Writing code silently without explaining your approach",
      "Optimizing prematurely before having a working solution",
      "Not considering or testing edge cases",
      "Using poor variable names or writing messy code",
      "Not discussing time/space complexity",
      "Getting defensive when given hints or feedback",
      "Not showing enthusiasm for technical challenges"
    ],
    languages: {
      javascript: [
        "Understand closures, prototypal inheritance, and the event loop",
        "Know ES6+ features: arrow functions, destructuring, async/await",
        "Be familiar with common patterns: module pattern, observer pattern",
        "Understand 'this' binding in different contexts",
        "Know the difference between == and ===, null and undefined"
      ],
      python: [
        "Understand list comprehensions and generator expressions",
        "Know decorators and context managers",
        "Be familiar with common libraries: requests, pandas, numpy",
        "Understand GIL and its implications",
        "Know the difference between lists and tuples, sets and dictionaries"
      ],
      java: [
        "Understand OOP principles and design patterns",
        "Know collections framework and generics",
        "Be familiar with multithreading and concurrency",
        "Understand JVM, garbage collection, and memory management",
        "Know exception handling and best practices"
      ]
    }
  },
  behavioral: {
    star_method: {
      situation: "Set the context - where, when, who was involved (20% of answer)",
      task: "Explain what you needed to accomplish or your responsibility (20% of answer)",
      action: "Describe what you specifically did - this is the most important part (50% of answer)",
      result: "Share the outcome, impact, and what you learned (10% of answer)"
    },
    star_examples: {
      leadership: "Led a cross-functional team of 8 people to deliver a critical project 2 weeks ahead of schedule, resulting in $500K cost savings",
      problem_solving: "Identified root cause of 40% customer churn, implemented solution that reduced churn to 15% within 3 months",
      communication: "Presented complex technical solution to non-technical stakeholders, gained unanimous approval for $2M investment",
      teamwork: "Collaborated with design and product teams to resolve conflicting requirements, delivered feature that increased user engagement by 25%"
    },
    preparation_framework: [
      "Prepare 8-10 STAR stories covering different competencies",
      "Include stories from different time periods and roles",
      "Quantify results with specific numbers and percentages",
      "Practice telling each story in 2-3 minutes",
      "Prepare follow-up details for each story",
      "Include both successes and learning experiences",
      "Make sure stories are relevant to the target role"
    ],
    common_questions: {
      "Tell me about yourself": {
        structure: "Present (current role) → Past (relevant experience) → Future (why this role)",
        tips: ["Keep it under 2 minutes", "Focus on professional achievements", "End with enthusiasm for this opportunity"],
        avoid: ["Personal life details", "Entire career history", "Memorized script that sounds robotic"]
      },
      "Why do you want this job": {
        structure: "Company research → Role alignment → Career goals",
        tips: ["Show specific company knowledge", "Connect your skills to their needs", "Demonstrate long-term interest"],
        avoid: ["Generic answers", "Only talking about what you'll gain", "Criticizing current employer"]
      },
      "What's your greatest weakness": {
        structure: "Real weakness → Steps you're taking → Progress made",
        tips: ["Choose a real but not job-critical weakness", "Show self-awareness", "Demonstrate improvement efforts"],
        avoid: ["Fake weaknesses like 'perfectionist'", "Job-critical weaknesses", "Not showing improvement efforts"]
      },
      "Where do you see yourself in 5 years": {
        structure: "Career progression → Skill development → Value to company",
        tips: ["Show ambition but realistic expectations", "Align with company career paths", "Mention skill development goals"],
        avoid: ["Being too specific about titles", "Mentioning other companies", "Showing no ambition"]
      }
    },
    difficult_questions: {
      "Describe a conflict with a coworker": {
        approach: "Focus on resolution, not blame",
        structure: "Context → Your approach → Resolution → Learning",
        tips: ["Show emotional intelligence", "Demonstrate conflict resolution skills", "Focus on positive outcomes"],
        avoid: ["Blaming the other person", "Unresolved conflicts", "Personal attacks or gossip"]
      },
      "Tell me about a failure": {
        approach: "Take responsibility and show growth",
        structure: "What happened → Your role → What you learned → How you applied learning",
        tips: ["Choose a real failure with learning", "Take full responsibility", "Show concrete improvements"],
        avoid: ["Blaming others", "Failures with no learning", "Job-critical failures"]
      },
      "Why should we hire you": {
        approach: "Summarize your unique value proposition",
        structure: "Key strengths → Relevant experience → Specific value you'll bring",
        tips: ["Be confident but not arrogant", "Use specific examples", "Connect to their needs"],
        avoid: ["Generic answers", "Comparing negatively to other candidates", "Being too modest"]
      }
    },
    competency_areas: {
      leadership: ["Leading teams", "Mentoring others", "Making decisions", "Driving change"],
      communication: ["Presenting to stakeholders", "Difficult conversations", "Cross-functional collaboration"],
      problem_solving: ["Analytical thinking", "Creative solutions", "Root cause analysis", "Decision making"],
      adaptability: ["Learning new skills", "Handling change", "Working under pressure", "Flexibility"],
      teamwork: ["Collaboration", "Conflict resolution", "Supporting others", "Building relationships"],
      initiative: ["Proactive behavior", "Innovation", "Process improvement", "Taking ownership"]
    }
  },
  tricky_situations: {
    "I don't know the answer": {
      approach: "Honesty with problem-solving approach",
      responses: [
        "I don't have direct experience with that, but here's how I would approach it...",
        "That's not something I've encountered, but based on my understanding of [related concept]...",
        "I haven't worked with that specific technology, but I'd start by researching [specific resources]...",
        "I'm not familiar with that particular scenario, but I've handled similar situations by..."
      ],
      tips: [
        "Be honest about not knowing",
        "Show your problem-solving approach",
        "Relate to similar experiences you do have",
        "Demonstrate willingness and ability to learn quickly"
      ]
    },
    "Unexpected or weird question": {
      examples: ["How many golf balls fit in a school bus?", "If you were an animal, what would you be?"],
      approach: "Stay calm and think out loud",
      responses: [
        "That's an interesting question. Let me think through this step by step...",
        "I haven't thought about that before. Can I take a moment to consider it?",
        "That's creative! Here's how I would approach this problem..."
      ],
      tips: [
        "Take a moment to think - silence is okay",
        "Ask for clarification if the question is unclear",
        "Think out loud to show your reasoning process",
        "Use logical frameworks to structure your answer",
        "Stay positive and engaged"
      ]
    },
    "Aggressive or stress interviewer": {
      signs: ["Interrupting you", "Challenging every answer", "Hostile body language", "Rapid-fire questions"],
      approach: "Stay professional and confident",
      responses: [
        "I understand you want to test how I handle pressure. Let me address your concern directly...",
        "I appreciate the challenging question. Here's my perspective...",
        "That's a fair point. Let me explain my reasoning..."
      ],
      tips: [
        "Don't take it personally - it might be their interview style",
        "Stay calm and maintain professional demeanor",
        "Answer questions directly and confidently",
        "Don't get defensive or argumentative",
        "Show you can handle pressure gracefully"
      ]
    },
    "Technical question you're unsure about": {
      approach: "Show your thinking process",
      responses: [
        "I'm not immediately sure, but let me think through what I do know...",
        "I haven't implemented that specific solution, but here's how I would approach it...",
        "That's outside my direct experience, but based on similar problems I've solved..."
      ],
      tips: [
        "Think out loud to show your problem-solving approach",
        "Break down the problem into smaller parts",
        "Relate to concepts or technologies you do know",
        "Show how you would research and learn the solution",
        "Ask clarifying questions to better understand the problem"
      ]
    },
    "Salary negotiation": {
      preparation: [
        "Research market rates on Glassdoor, PayScale, levels.fyi",
        "Consider total compensation: base, bonus, equity, benefits",
        "Know your minimum acceptable offer",
        "Prepare justification for your ask"
      ],
      responses: [
        "Based on my research and experience, I'm looking for something in the range of $X to $Y",
        "I'm more interested in the total compensation package. What does that typically look like?",
        "I'm flexible on salary if the total package is competitive. Can you share the typical range?"
      ],
      tips: [
        "Give a range, not a specific number",
        "Let them make the first offer if possible",
        "Consider the entire package, not just base salary",
        "Be prepared to justify your ask with specific value you bring"
      ]
    },
    "Why are you leaving your current job": {
      good_reasons: [
        "Seeking new challenges and growth opportunities",
        "Want to work with new technologies or in a different industry",
        "Looking for more responsibility or leadership opportunities",
        "Company restructuring or role elimination",
        "Relocating for personal reasons"
      ],
      avoid: [
        "Complaining about current boss or colleagues",
        "Saying you're bored or unchallenged",
        "Mentioning salary as the only reason",
        "Criticizing company culture or policies"
      ],
      responses: [
        "I've learned a lot in my current role, but I'm ready for new challenges that this position offers",
        "I'm looking to grow my skills in [specific area] which aligns perfectly with this opportunity",
        "While I've enjoyed my current position, I'm excited about the possibility of [specific aspect of new role]"
      ]
    },
    "Gaps in employment": {
      approach: "Be honest and focus on what you learned or accomplished",
      responses: [
        "I took time off to [care for family/travel/education] and used that time to [learn new skills/volunteer/freelance]",
        "I was selective about my next opportunity and wanted to find the right fit, which is why I'm excited about this role",
        "I used that time for professional development, including [specific courses/certifications/projects]"
      ],
      tips: [
        "Be honest about the reason for the gap",
        "Focus on productive activities during the gap",
        "Show how the gap prepared you for this role",
        "Don't apologize excessively for the gap"
      ]
    },
    "Overqualified concerns": {
      approach: "Address concerns about commitment and salary expectations",
      responses: [
        "I'm genuinely excited about this role because [specific reasons related to the position]",
        "I'm looking for a role where I can make a meaningful impact, and I see that opportunity here",
        "I'm at a point in my career where [work-life balance/company mission/specific challenges] are more important than title"
      ],
      tips: [
        "Show genuine enthusiasm for the specific role",
        "Address concerns about staying long-term",
        "Explain what you're looking for beyond just advancement",
        "Demonstrate understanding of the role's requirements"
      ]
    }
  },
  
  company_specific: {
    startup: {
      culture: ["Fast-paced", "Wear multiple hats", "Limited resources", "High growth potential", "Equity compensation"],
      questions_to_ask: [
        "What's the runway and funding situation?",
        "How do you prioritize features with limited resources?",
        "What's the biggest challenge facing the company right now?",
        "How do you maintain work-life balance in a fast-paced environment?"
      ],
      what_they_want: ["Adaptability", "Self-direction", "Comfort with ambiguity", "Scrappy problem-solving"]
    },
    big_tech: {
      culture: ["Scale", "Process-oriented", "Innovation", "Competitive", "Strong benefits"],
      questions_to_ask: [
        "How do you maintain innovation at scale?",
        "What's the promotion and career development process?",
        "How do teams collaborate across different products?",
        "What's the biggest technical challenge you're facing?"
      ],
      what_they_want: ["Technical excellence", "Scalability mindset", "Collaboration", "Data-driven decisions"]
    },
    enterprise: {
      culture: ["Stability", "Process-heavy", "Risk-averse", "Compliance-focused", "Established practices"],
      questions_to_ask: [
        "How do you balance innovation with stability?",
        "What's the process for implementing new technologies?",
        "How do you handle regulatory compliance?",
        "What opportunities are there for process improvement?"
      ],
      what_they_want: ["Reliability", "Process adherence", "Risk management", "Stakeholder management"]
    }
  }
};

module.exports = { interviewQuestions, interviewTips };