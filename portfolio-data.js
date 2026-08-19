/* ==========================================================================
   PORTFOLIO CONFIGURATION DATA
   Easily add, delete, or edit any skills, projects, summary, personal info, 
   education, or certifications here!
   ========================================================================== */

const defaultPortfolioData = {
    dataVersion: "2026.08.18-v5",
    personalInfo: {
        name: "Nani Sontyana",
        title: "Full-Stack & AI Systems Engineer",
        status: "Actively Seeking Software Engineering Roles",
        summary: "Full-Stack Software Engineer with hands-on expertise in building high-performance RESTful microservices, AI & RAG document intelligence engines, and scalable web apps using Java, Python, React.js, Node.js, and Spring Boot.",
        aboutTitle: "Engineered For Performance & Scale",
        aboutSubtitle: "A quick snapshot of my technical capabilities and practical software engineering footprint.",
        email: "nanisontyana47@gmail.com",
        phone: "+91 9618466575",
        linkedin: "https://linkedin.com/in/nani-sontyana",
        github: "https://github.com/NaniSontyana",
        cgpa: "8.14",
        apiSpeedup: "25%",
        mlAccuracy: "75%+",
        codeDupDrop: "30%",
        bgVideo: "custom-bg-video.mp4"
    },

    skills: [
        // Languages
        { id: "s1", name: "Java", category: "languages", level: 92, status: "Core OOP & DSA", tags: ["Spring Boot", "OOP", "Collections"], icon: "fa-brands fa-java", iconColor: "#f89820" },
        { id: "s2", name: "Python", category: "languages", level: 90, status: "Data & Microservices", tags: ["Flask", "Scikit-Learn", "LangChain"], icon: "fa-brands fa-python", iconColor: "#3776ab" },
        { id: "s3", name: "JavaScript (ES6+)", category: "languages", level: 95, status: "Full-Stack Logic", tags: ["Async/Await", "Promises", "DOM"], icon: "fa-brands fa-js", iconColor: "#f7df1e" },
        { id: "s4", name: "TypeScript & C++", category: "languages", level: 85, status: "Typed & Systems", tags: ["Type Safety", "Algorithms", "C++"], icon: "fa-solid fa-code", iconColor: "#3178c6" },

        // Frontend
        { id: "s5", name: "React.js & Redux", category: "frontend", level: 92, status: "UI State & Components", tags: ["Hooks", "Context API", "Vite"], icon: "fa-brands fa-react", iconColor: "#61dafb" },
        { id: "s6", name: "HTML5, CSS3 & Recharts", category: "frontend", level: 94, status: "Modern Visuals", tags: ["Flexbox/Grid", "Glassmorphism", "Recharts"], icon: "fa-brands fa-html5", iconColor: "#e34f26" },

        // Backend & APIs
        { id: "s7", name: "Node.js & Express.js", category: "backend", level: 94, status: "Scalable Backend APIs", tags: ["REST APIs", "JWT Auth", "Middleware"], icon: "fa-brands fa-node-js", iconColor: "#68a063" },
        { id: "s8", name: "Spring Boot & Flask", category: "backend", level: 88, status: "Microservices", tags: ["RBAC", "Dependency Injection", "REST"], icon: "fa-solid fa-leaf", iconColor: "#6db33f" },

        // Databases
        { id: "s9", name: "PostgreSQL & pgvector", category: "databases", level: 90, status: "Relational & Vector DB", tags: ["Semantic Search", "Embeddings", "SQL"], icon: "fa-solid fa-database", iconColor: "#336791" },
        { id: "s10", name: "MongoDB & MySQL", category: "databases", level: 92, status: "NoSQL & Storage", tags: ["Mongoose", "Aggregation", "Indexing"], icon: "fa-solid fa-envira", iconColor: "#47a248" },

        // AI & ML / RAG
        { id: "s11", name: "AI, ML & RAG Stack", category: "aiml", level: 88, status: "Intelligence Pipelines", tags: ["Scikit-Learn", "LangChain", "Transformers"], icon: "fa-solid fa-brain", iconColor: "#a855f7" },

        // DevOps & Tools
        { id: "s12", name: "Docker & DevOps Tools", category: "devops", level: 86, status: "Deployment & Versioning", tags: ["Git/GitHub", "Vercel/Render", "CI/CD"], icon: "fa-brands fa-docker", iconColor: "#2496ed" }
    ],

    projects: [
        {
            id: "documind",
            title: "DocuMind AI – RAG Document Intelligence",
            category: "ai fullstack",
            filterCat: "ai",
            badge: "Jul 2026",
            icon: "fa-solid fa-file-pdf",
            gradientClass: "bg-gradient-rag",
            coverImage: "https://res.cloudinary.com/duf3bsuur/image/upload/v1786175640/Screenshot_2026-08-08_122549_lnlcdv.png",
            githubUrl: "https://github.com/NaniSontyana/docmindAI",
            liveUrl: "https://docmind-ai-nine.vercel.app/",
            subtitle: "Enterprise Question Answering over PDF Documents with Vector Source Citation",
            type: "AI & RAG Platform",
            description: "Enterprise Retrieval-Augmented Generation (RAG) platform enabling accurate natural language question answering over uploaded PDF documents with exact source-cited snippet responses.",
            tech: ["React", "Node.js", "Python Flask", "PostgreSQL + pgvector", "LangChain", "JWT"],
            bullets: [
                "Built a full-stack RAG (Retrieval-Augmented Generation) microservices platform allowing users to upload complex PDF documents and ask natural language questions.",
                "Utilized PostgreSQL with pgvector extension to perform high-speed cosine vector similarity search over high-dimensional text embeddings generated via Sentence Transformers.",
                "Integrated LangChain pipeline orchestration in Python Flask microservice to stream source-cited context chunks back to the client interface.",
                "Secured microservice communications with JWT session token verification and role-based endpoint protection."
            ]
        },
        {
            id: "smarthr",
            title: "SmartHR – Retention & Analytics Engine",
            category: "ai fullstack",
            filterCat: "fullstack",
            badge: "Apr 2026",
            icon: "fa-solid fa-chart-line",
            gradientClass: "bg-gradient-hr",
            coverImage: "https://res.cloudinary.com/duf3bsuur/image/upload/v1786175967/Screenshot_2026-08-08_123930_b3cyoy.png",
            githubUrl: "https://github.com/NaniSontyana/smartHR-main",
            liveUrl: "https://smarthr-three.vercel.app/",
            subtitle: "Machine Learning Employee Attrition Risk Predictor & Management Dashboard",
            type: "ML & Enterprise Analytics",
            description: "Predictive HR analytics system integrating a Random Forest machine learning model achieving 75%+ employee attrition prediction accuracy with response latency under 2 seconds.",
            tech: ["React", "Vite", "Node.js", "Express", "MongoDB", "Python Flask", "Scikit-Learn"],
            bullets: [
                "Engineered an end-to-end employee retention web platform deploying a Random Forest Classifier trained on HR metrics to predict attrition risk with 75%+ accuracy.",
                "Optimized cross-service API communication between Node.js API gateway and Flask ML service, achieving sub-2-second prediction latency.",
                "Designed rich visual dashboards utilizing Recharts for real-time organizational risk heatmaps, tenure analysis, and salary distribution breakdown.",
                "Implemented MongoDB schema design with indexing for rapid employee document lookups and historical trend tracking."
            ]
        },
        {
            id: "subtracker",
            title: "Subscription Tracker System",
            category: "backend fullstack",
            filterCat: "backend",
            badge: "Dec 2025",
            icon: "fa-solid fa-bell",
            gradientClass: "bg-gradient-sub",
            coverImage: "https://res.cloudinary.com/duf3bsuur/image/upload/v1786176363/Screenshot_2026-08-08_133438_trwztq.png",
            githubUrl: "https://github.com/NaniSontyana/subscrption_tracker",
            liveUrl: "https://subscrption-tracker-2.onrender.com",
            subtitle: "Automated Recurring Billing Tracker & Event-Driven Notification Workflows",
            type: "Event-Driven Backend System",
            description: "Resilient backend subscription management platform featuring automated recurring tracking, scheduled background renewal alerts, and Arcjet rate-limiting security.",
            tech: ["Node.js", "Express", "MongoDB", "JWT", "Nodemailer", "Upstash QStash", "Arcjet"],
            bullets: [
                "Developed a scalable backend system managing user subscriptions, automated tracking, and scheduled renewal warnings using background job queues.",
                "Integrated Upstash QStash for reliable serverless cron scheduling and automated event-driven HTTP callbacks.",
                "Implemented Arcjet rate-limiting and bot detection security guards to protect authentication endpoints from abusive requests.",
                "Utilized Nodemailer with HTML email templates to dispatch automated reminder notifications prior to subscription expiry dates."
            ]
        },
        {
            id: "mentymaps",
            title: "Menty by Maps – Spatial Mentorship Engine",
            category: "ai fullstack",
            filterCat: "ai",
            badge: "Aug 2026",
            icon: "fa-solid fa-map-location-dot",
            gradientClass: "bg-gradient-rag",
            coverImage: "https://res.cloudinary.com/duf3bsuur/image/upload/v1786176781/Screenshot_2026-08-08_134241_txminv.png",
            githubUrl: "https://github.com/NaniSontyana/Mentiby-Maps",
            liveUrl: "https://mentiby-maps.vercel.app/login",
            subtitle: "Geospatial Mentorship Discovery & Real-Time Location-Based Navigation Engine",
            type: "Spatial GIS & AI System",
            description: "Interactive geospatial mentorship platform enabling real-time location-based mentor discovery, spatial density clustering, and low-latency route navigation for proximity-based networking.",
            tech: ["React", "Mapbox GL JS", "Node.js", "Python Flask", "PostgreSQL + PostGIS", "Redis", "JWT"],
            bullets: [
                "Engineered a full-stack spatial microservices platform integrating Mapbox GL JS and Leaflet to render real-time interactive mentor heatmaps and proximity-based user node clusters.",
                "Utilized PostgreSQL with PostGIS extension (ST_DWithin, ST_DistanceSphere, R-tree spatial indexing) to execute spatial radius searches and geo-fencing queries with sub-50ms query latency.",
                "Implemented an event-driven real-time communication engine in Node.js utilizing Socket.io and Redis Pub/Sub for location updates and instant mentor-mentee chat dispatch under 100ms.",
                "Built a Python Flask microservice leveraging Scikit-Learn (DBSCAN / K-Means spatial clustering) to dynamically aggregate high-density mentorship hubs and calculate optimal proximity matching routes.",
                "Secured microservice communications with JWT session token verification, spatial location obfuscation algorithms, and role-based endpoint protection (RBAC)."
            ]
        },
        {
            id: "aicodereview",
            title: "AI Code Reviewer Bot – Automated PR Security & Analysis",
            category: "ai fullstack",
            filterCat: "ai",
            badge: "Aug 2026",
            icon: "fa-solid fa-code-pull-request",
            gradientClass: "bg-gradient-rag",
            coverImage: "https://res.cloudinary.com/duf3bsuur/image/upload/v1786847909/Screenshot_2026-08-16_080706_lswr54.png",
            githubUrl: "https://github.com/NaniSontyana/AI-Code-review-bot",
            subtitle: "Automated Pull Request Code Analysis, OWASP Security Scanning & AST Refactoring Engine",
            type: "AI & Microservice Platform",
            description: "Automated AI-driven code review microservice integrating AST parsing and LLM reasoning to perform automated static analysis, security vulnerability detection, and inline GitHub PR review comments under 3 seconds.",
            tech: ["Node.js", "TypeScript", "Python Flask", "LLM APIs (Gemini/OpenAI)", "AST Parser", "GitHub Webhooks", "Docker", "Redis"],
            bullets: [
                "Architected an event-driven AI code review microservice that listens to GitHub Webhook events and dynamically analyzes incoming Pull Request diffs.",
                "Built AST (Abstract Syntax Tree) parsing and token chunking pipelines in Python Flask to isolate modified code blocks and eliminate unnecessary prompt context payload overhead.",
                "Integrated LLM code analysis models with custom zero-shot prompts to detect security vulnerabilities (OWASP Top 10), cyclomatic complexity anti-patterns, and memory leaks.",
                "Implemented Redis Pub/Sub queue for non-blocking asynchronous PR processing, delivering inline GitHub review comments and code diff suggestions under 3 seconds.",
                "Designed a full-stack React dashboard displaying repository code quality trends, PR review latency metrics, and automated refactoring suggestions."
            ]
        },
        {
            id: "ecommerce2",
            title: "NovaCart – Distributed Microservices E-Commerce Platform",
            category: "backend fullstack",
            filterCat: "fullstack",
            badge: "May 2026",
            icon: "fa-solid fa-cart-shopping",
            gradientClass: "bg-gradient-hr",
            coverImage: "https://images.unsplash.com/photo-1556742049-0a675440778b?auto=format&fit=crop&w=800&q=80",
            githubUrl: "https://github.com/NaniSontyana/NovaCart-Ecommerce",
            liveUrl: "https://novacart-store.vercel.app",
            subtitle: "Scalable E-Commerce Microservices Engine with Event-Driven Inventory & Stripe Workflows",
            type: "Distributed E-Commerce Engine",
            description: "High-performance distributed e-commerce web platform featuring real-time inventory synchronization, Stripe payment gateway integration, JWT role-based access control, and sub-50ms product catalog caching using Redis.",
            tech: ["React", "Redux Toolkit", "Node.js", "Express", "PostgreSQL", "Redis", "Stripe API", "JWT", "Docker"],
            bullets: [
                "Architected a modular e-commerce backend microservice architecture decoupling product catalog, user authentication, shopping cart state, and order fulfillment services.",
                "Integrated Stripe API payment gateway with webhook payment state verification and tokenized idempotency keys to prevent duplicate checkout transactions.",
                "Implemented Redis caching strategies for high-frequency product catalog queries, boosting response speed by 45% during surge traffic spikes.",
                "Designed transactional database locking algorithms ensuring real-time inventory updates and preventing overselling during concurrent user checkouts.",
                "Created an enterprise administration panel for real-time inventory management, order status tracking, and sales revenue analytics visualization."
            ]
        }
    ],

    education: [
        {
            id: "edu1",
            degree: "B.Tech in Computer Science",
            institution: "Baba Institute of Technology and Science",
            duration: "Nov 2022 – Apr 2026",
            gpa: "CGPA: 8.14 / 10.0",
            description: "Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Web Technologies, Operating Systems, Software Engineering."
        },
        {
            id: "edu2",
            degree: "Intermediate (MPC - Math, Physics, Chem)",
            institution: "Venkat Sai Junior College",
            duration: "2020 – 2022",
            gpa: "Score: 77.1%",
            description: "Strong foundation in higher mathematics, analytical reasoning, and foundational physics."
        }
    ],

    certifications: [
        {
            id: "cert1",
            title: "MERN Stack Web Development",
            issuer: "GeeksforGeeks",
            year: "Issued 2025",
            certUrl: "https://media.geeksforgeeks.org/courses/certificates/",
            description: "Comprehensive training covering MongoDB, Express.js, React.js, Node.js, REST API architecture, and state management."
        },
        {
            id: "cert2",
            title: "Full Stack Web Development",
            issuer: "BrainOvision Solutions Pvt. Ltd.",
            year: "Issued 2024",
            certUrl: "https://drive.google.com/file/d/1a3ecQTuDKSVKVMtz6Tw3Djgxd9Z0t4xU/view?usp=sharing",
            description: "Hands-on development program focusing on Spring Boot, Java backend architectures, and production application building."
        },
        {
            id: "cert3",
            title: "Java Full Stack Internship",
            issuer: "Council for Skills and Competencies (CSC India) & APSCHE",
            year: "Nov 2025 – Mar 2026",
            certUrl: "https://verify.cscindia.org.in/",
            certId: "CSCIndia-1h4afyr7",
            description: "Student Internship Program in Java Full Stack development conducted by CSC India & Talent Scope Technologies under APSCHE (Certificate ID: CSCIndia-1h4afyr7)."
        }
    ],

    experience: [
        {
            id: "exp1",
            company: "BrainOvision Solutions Pvt. Ltd.",
            role: "Full Stack Developer Intern",
            duration: "June 2024 – August 2024",
            location: "Remote",
            tech: ["Java", "Spring Boot", "REST APIs", "RBAC Security", "SQL", "Git / GitHub", "Agile Scrum"],
            bullets: [
                "Engineered robust Java Spring Boot applications featuring secure authentication, role-based access control (RBAC), and dynamic administration dashboards, cutting manual admin overhead by 40%.",
                "Architected and implemented 15+ RESTful API endpoints, streamlining data flow and reducing average client response time by 25%.",
                "Refactored backend service logic and optimized database queries, achieving a 30% reduction in code duplication and enhancing codebase maintainability.",
                "Actively code-reviewed 20+ pull requests, resolved high-priority production bugs, and delivered core features within a 5-member Agile sprint team."
            ]
        },
        {
            id: "exp2",
            company: "Council for Skills and Competencies (CSC India) & APSCHE",
            role: "Java Full Stack Developer Intern",
            duration: "Nov 2025 – Mar 2026",
            location: "Visakhapatnam, AP",
            tech: ["Java", "Spring Boot", "React.js", "RESTful APIs", "SQL", "Git", "Agile"],
            bullets: [
                "Completed an intensive Student Internship Initiative Program in Java Full Stack web development authorized by APSCHE & CSC India in partnership with Talent Scope Technologies.",
                "Engineered scalable RESTful API services and interactive user interfaces leveraging Java, Spring Boot, SQL databases, and modern web frameworks.",
                "Practiced Agile software development workflows, version control management, and clean object-oriented architecture patterns."
            ]
        }
    ]
};

// Global portfolioData object initialized directly
var portfolioData = defaultPortfolioData;

if (typeof window !== 'undefined') {
    window.portfolioData = portfolioData;
}

