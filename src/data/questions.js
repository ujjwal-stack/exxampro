// Sample exam questions data
export const sampleQuestions = [
    {
        id: 1,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: 1,
        difficulty: "intermediate",
        topic: "algorithms"
    },
    {
        id: 2,
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Undefined"],
        correctAnswer: 2,
        difficulty: "beginner",
        topic: "javascript"
    },
    {
        id: 3,
        question: "What does REST stand for in web development?",
        options: ["Representational State Transfer", "Remote State Transfer", "Relational State Transfer", "Reactive State Transfer"],
        correctAnswer: 0,
        difficulty: "intermediate",
        topic: "web-development"
    },
    {
        id: 4,
        question: "Which HTTP method is used to update existing data?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correctAnswer: 2,
        difficulty: "beginner",
        topic: "web-development"
    },
    {
        id: 5,
        question: "What is the purpose of JWT tokens?",
        options: ["Data encryption", "User authentication", "Database queries", "File compression"],
        correctAnswer: 1,
        difficulty: "intermediate",
        topic: "authentication"
    },
    {
        id: 6,
        question: "Which React hook is used for side effects?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: 1,
        difficulty: "intermediate",
        topic: "react"
    },
    {
        id: 7,
        question: "What is the default port for MongoDB?",
        options: ["3000", "5432", "27017", "8080"],
        correctAnswer: 2,
        difficulty: "beginner",
        topic: "database"
    },
    {
        id: 8,
        question: "Which CSS property is used for responsive design?",
        options: ["display", "position", "media-query", "flex"],
        correctAnswer: 2,
        difficulty: "intermediate",
        topic: "css"
    },
    {
        id: 9,
        question: "Which CSS property is used for responsive design?",
        options: ["display", "position", "media-query", "flex"],
        correctAnswer: 2,
        difficulty: "intermediate",
        topic: "css"
    }
];

// Sample exam configurations
export const examConfigs = {
    fullStack: {
        id: "full-stack",
        name: "Full Stack Development Assessment",
        description: "Test your knowledge of React, Node.js, and databases",
        duration: 30, // minutes
        difficulty: "intermediate",
        topics: ["javascript", "react", "web-development", "database"],
        questions: sampleQuestions
    },
    java: {
        id: "java",
        name: "Core Java Assessment",
        description: "Covers OOPs, Collections, Multithreading, and JDBC",
        duration: 15,
        difficulty: "beginner",
        topics: ["java", "oops", "collections", "jdbc"],
        questions: [
            {
                id: 1,
                question: "Which of the following is not a Java feature?",
                options: ["Object-oriented", "Use of pointers", "Portable", "Dynamic"],
                correctAnswer: 1,
                difficulty: "beginner",
                topic: "basics"
            },
            {
                id: 2,
                question: "Which of these is the parent class of all Java classes?",
                options: ["Object", "Class", "Superclass", "System"],
                correctAnswer: 1,
                difficulty: "beginner",
                topic: "oops"
            },
            {
                id: 3,
                question: "Which keyword is used to inherit a class in Java?",
                options: ["implement", "super", "extends", "inherits"],
                correctAnswer: 3,
                difficulty: "beginner",
                topic: "inheritance"
            },
            {
                id: 4,
                question: "Which method is the entry point of a Java program?",
                options: ["main()", "start()", "run()", "init()"],
                correctAnswer: 1,
                difficulty: "beginner",
                topic: "basics"
            },
            {
                id: 5,
                question: "Which of these is not a Java access modifier?",
                options: ["public", "private", "protected", "package"],
                correctAnswer: 4,
                difficulty: "intermediate",
                topic: "modifiers"
            },
            {
                id: 6,
                question: "Which interface does the ArrayList class implement?",
                options: ["Set", "Map", "List", "Queue"],
                correctAnswer: 3,
                difficulty: "beginner",
                topic: "collections"
            },
            {
                id: 7,
                question: "Which package contains the Random class?",
                options: ["java.util", "java.lang", "java.io", "java.sql"],
                correctAnswer: 1,
                difficulty: "beginner",
                topic: "packages"
            },
            {
                id: 8,
                question: "Which exception is thrown when dividing by zero in Java?",
                options: ["ArithmeticException", "NullPointerException", "NumberFormatException", "DivideByZeroException"],
                correctAnswer: 1,
                difficulty: "intermediate",
                topic: "exceptions"
            },
            {
                id: 9,
                question: "Which keyword is used to stop inheritance of a class?",
                options: ["stop", "final", "static", "constant"],
                correctAnswer: 2,
                difficulty: "intermediate",
                topic: "inheritance"
            },
            {
                id: 10,
                question: "Which collection class allows key-value pairs and does not allow duplicate keys?",
                options: ["List", "Set", "Map", "Queue"],
                correctAnswer: 3,
                difficulty: "intermediate",
                topic: "collections"
            }
        ]
    },
    dbms: {
        id: "dbms",
        name: "DBMS Assessment",
        description: "Covers keys, normalization, transactions, and SQL basics",
        duration: 15,
        difficulty: "beginner",
        topics: ["dbms", "sql", "normalization", "transactions"],
        questions: [
            {
                id: 1,
                question: "Which key uniquely identifies a record in a table?",
                options: ["Foreign Key", "Primary Key", "Candidate Key", "Super Key"],
                correctAnswer: 1,
                difficulty: "beginner",
                topic: "keys"
            },
            {
                id: 2,
                question: "Which normal form removes partial dependency?",
                options: ["1NF", "2NF", "3NF", "BCNF"],
                correctAnswer: 1,
                difficulty: "intermediate",
                topic: "normalization"
            },
            {
                id: 3,
                question: "Which of the following ensures atomicity, consistency, isolation, and durability?",
                options: ["Joins", "Views", "Transactions", "Triggers"],
                correctAnswer: 2,
                difficulty: "beginner",
                topic: "transactions"
            },
            {
                id: 4,
                question: "Which SQL command is used to remove a table permanently?",
                options: ["DELETE", "REMOVE", "DROP", "TRUNCATE"],
                correctAnswer: 2,
                difficulty: "beginner",
                topic: "sql"
            },
            {
                id: 5,
                question: "Which type of join returns all rows when there is a match in one of the tables?",
                options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
                correctAnswer: 3,
                difficulty: "intermediate",
                topic: "joins"
            }
        ]
    },
    c: {
        id: "c",
        name: "C Programming Assessment",
        description: "Covers basics, pointers, arrays, and functions",
        duration: 15,
        difficulty: "beginner",
        topics: ["c", "pointers", "arrays", "functions"],
        questions: [
            {
                id: 1,
                question: "Which header file is required for printf() function?",
                options: ["stdlib.h", "stdio.h", "string.h", "math.h"],
                correctAnswer: 1,
                difficulty: "beginner",
                topic: "basics"
            },
            {
                id: 2,
                question: "Which operator is used to access the value at an address?",
                options: ["&", "*", "->", "."],
                correctAnswer: 1,
                difficulty: "beginner",
                topic: "pointers"
            },
            {
                id: 3,
                question: "What is the default return type of functions in C if not specified?",
                options: ["void", "int", "float", "char"],
                correctAnswer: 1,
                difficulty: "beginner",
                topic: "functions"
            },
            {
                id: 4,
                question: "Which keyword is used to define a constant in C?",
                options: ["final", "const", "static", "#define"],
                correctAnswer: 3,
                difficulty: "intermediate",
                topic: "macros"
            },
            {
                id: 5,
                question: "Which storage class makes a variable retain its value across function calls?",
                options: ["auto", "register", "static", "extern"],
                correctAnswer: 2,
                difficulty: "intermediate",
                topic: "storage classes"
            }
        ]
    },
    cpp: {
        id: "cpp",
        name: "C++ Programming Assessment",
        description: "Covers OOPs, STL, inheritance, and polymorphism",
        duration: 20,
        difficulty: "advance",
        topics: ["cpp", "oops", "stl", "inheritance"],
        questions: [
            {
                id: 1,
                question: "Which of the following is not a C++ feature?",
                options: ["Encapsulation", "Polymorphism", "Garbage Collection", "Inheritance"],
                correctAnswer: 2,
                difficulty: "intermediate",
                topic: "basics"
            },
            {
                id: 2,
                question: "Which operator is overloaded for object comparison?",
                options: ["==", "=", "<", "++"],
                correctAnswer: 0,
                difficulty: "intermediate",
                topic: "operators"
            },
            {
                id: 3,
                question: "Which container in STL stores unique keys?",
                options: ["vector", "map", "set", "list"],
                correctAnswer: 2,
                difficulty: "beginner",
                topic: "stl"
            },
            {
                id: 4,
                question: "Which concept allows functions with same name but different parameters?",
                options: ["Inheritance", "Polymorphism", "Overloading", "Abstraction"],
                correctAnswer: 2,
                difficulty: "beginner",
                topic: "oops"
            },
            {
                id: 5,
                question: "Which keyword prevents class inheritance?",
                options: ["stop", "final", "sealed", "static"],
                correctAnswer: 1,
                difficulty: "intermediate",
                topic: "inheritance"
            },
            {
                id: 6,
                question: "Which is the base class of all STL containers?",
                options: ["Container", "Sequence", "Allocator", "None"],
                correctAnswer: 3,
                difficulty: "intermediate",
                topic: "stl"
            },
            {
                id: 7,
                question: "Which operator is used to allocate memory dynamically?",
                options: ["malloc", "alloc", "new", "create"],
                correctAnswer: 2,
                difficulty: "beginner",
                topic: "memory"
            },
            {
                id: 8,
                question: "Which function is called when object goes out of scope?",
                options: ["delete()", "finalize()", "destructor", "constructor"],
                correctAnswer: 2,
                difficulty: "beginner",
                topic: "oops"
            }
        ]
    }


};

// Sample exam history for dashboard
export const sampleExamHistory = [
    {
        id: 1,
        examId: "full-stack",
        name: "JavaScript Fundamentals",
        score: 85,
        date: "2024-01-15",
        status: "completed",
        timeSpent: 25 // minutes
    },
    {
        id: 2,
        examId: "full-stack",
        name: "React.js Advanced",
        score: 92,
        date: "2024-01-10",
        status: "completed",
        timeSpent: 28 // minutes
    },
    {
        id: 3,
        examId: "full-stack",
        name: "JAVA Backend",
        score: 78,
        date: "2024-01-05",
        status: "completed",
        timeSpent: 30 // minutes
    },
    {
        id: 4,
        examId: "full-stack",
        name: "Node.js Backend",
        score: 89,
        date: "2024-01-05",
        status: "completed",
        timeSpent: 30 // minutes
    }
];

// Performance statistics
export const performanceStats = {
    totalExams: 12,
    averageScore: 84.5,
    bestScore: 98,
    totalTimeSpent: 360, // minutes
    streakDays: 7,
    completionRate: 94.2
};