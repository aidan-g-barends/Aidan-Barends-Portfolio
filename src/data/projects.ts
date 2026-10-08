import tours from "./tours.json";

export type Tour = {
  video: string;
  poster: string;
  duration: number;
};

export type ProjectStatus = "live" | "github-only" | "in-progress";

export type Project = {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  github?: string;
  githubFrontend?: string;
  githubBackend?: string;
  live?: string;
  liveIsProduction?: boolean;
  private?: boolean;
  image?: string;
  // Generated cover art rather than a real screenshot of the app
  imageIsIllustration?: boolean;
  // Full-page capture that scrolls on hover (height in px at 960px wide)
  preview?: { src: string; height: number };
  // Recorded walkthrough of an app behind a login (scripts/capture-tours.mjs)
  tour?: Tour;
  // Phone-sized screenshot of the live site
  mobileImage?: string;
  // Short "how I built it" story: problem, key decision, result
  buildNotes?: { problem: string; decision: string; result: string };
  // Extra figures shown as stat tiles on the project page
  stats?: { value: string; label: string }[];
  // Freelance work for a real client (listed on the Experience page)
  clientWork?: boolean;
  // Built as part of my CPUT Software Engineering diploma
  university?: boolean;
  status: ProjectStatus;
  featured: boolean;
  role?: string;
  problem?: string;
  features?: string[];
  challenges?: string;
  demoCredentials?: {
    email: string;
    password: string;
    note?: string;
  };
};

const projectList: Project[] = [
  {
    slug: "ask-aidan-ai-assistant",
    name: "AI Portfolio Assistant",
    description:
      "An AI chat assistant built into this portfolio that answers visitors' questions about my projects, experience, and availability. It runs on Google's Gemini API (free tier), streams answers word by word, and only answers from my resume and project data, so it doesn't make things up.",
    tech: ["Next.js", "TypeScript", "Gemini API", "Streaming", "Tailwind CSS"],
    // It lives on this site, so the demo jumps straight to the chat section
    live: "/#ask",
    image: "/projects/ask-aidan.webp",
    status: "live",
    featured: true,
    role:
      "Sole developer: designed the chat UI, wrote the Next.js route handler that calls the Gemini API, built the knowledge base from the site's own project data, and added the safeguards for a public endpoint.",
    problem:
      "Recruiters and potential clients often have one quick question, like what stack I use or whether I'm available, and won't read every page to find it.",
    features: [
      "Streaming answers rendered as they are generated",
      "Knowledge base generated from the same project data the site uses, so it stays in sync",
      "Instructions to answer only from that data and say so when something isn't covered",
      "Low thinking level and a small output limit for fast, short answers",
      "Input limits, short conversation history, and per-visitor rate limiting",
      "Suggested questions and a graceful fallback to WhatsApp if the assistant is unavailable",
    ],
    challenges:
      "A public AI endpoint can be spammed and the free tier has daily limits, so the main work was keeping it bounded: capped message length and history, a small output limit, low thinking level for short factual answers, per-visitor rate limiting, and a friendly fallback to WhatsApp when the limit is hit.",
  },
  {
    slug: "ledgersense",
    name: "LedgerSense",
    description:
      "A finance intelligence dashboard for small businesses, currently in development. The plan is to import bank statements, categorise spending automatically, and flag unusual activity such as duplicate charges, unexpected spikes, and creeping prices, with a plain-language explanation for each flag. It's built with a Spring Boot and PostgreSQL backend and a Next.js frontend.",
    tech: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Flyway",
      "Next.js",
      "TypeScript",
      "Docker",
    ],
    github: "https://github.com/aidan-g-barends/ledgersense",
    image: "/projects/cover-ledgersense.webp",
    imageIsIllustration: true,
    status: "in-progress",
    featured: false,
    role:
      "Sole developer, responsible for the architecture, backend, database design, frontend, and deployment. I'm recording the key design decisions as Architecture Decision Records in the repo as I go.",
    problem:
      "Small business owners often only look at their bank statements at month end, if at all, so duplicate charges, forgotten subscriptions, and suppliers quietly raising prices go unnoticed. LedgerSense aims to turn a raw statement into a categorised view of spending that points out what deserves a closer look and why.",
    features: [
      "Bank statement import (planned)",
      "Automatic transaction categorisation (planned)",
      "Monthly spending trends and comparisons (planned)",
      "Anomaly detection for duplicate charges, unusual spend, and price creep (planned)",
      "Plain-language explanations for every flagged transaction (planned)",
      "Modular monolith organised by business domain (ADR 0001)",
      "Non-guessable UUID primary keys generated by PostgreSQL (ADR 0002)",
      "Versioned database migrations with Flyway",
      "PostgreSQL in Docker Compose, configured through environment variables",
    ],
    challenges:
      "The first decisions were about structure. With one developer and modest data volumes, separate microservices would add deployment work without any benefit, so LedgerSense is one Spring Boot app split into packages by business domain (ingestion, categorisation, detection, and so on) rather than by technical layer. Each domain owns its own controllers, services, and repositories, which keeps feature changes local and leaves room to pull a module out later if that's ever needed. Because record IDs appear in API URLs, primary keys are random UUIDs instead of sequential integers, so IDs can't be guessed or used to estimate business volume. That is defence in depth: scoping every query to the user's organisation is still the main protection.",
  },
  {
    slug: "task-flow-pro",
    university: true,
    name: "Task Flow Pro",
    description:
      "A full-stack task management platform developed as a university group project to help teams organise, assign, monitor, and complete work through one centralised system. The application was built with Laravel and MySQL, using a structured backend architecture with dedicated models, services, policies, and notification functionality.",
    tech: ["Laravel", "PHP", "MySQL"],
    github: "https://github.com/aidan-g-barends/Task-Flow-Pro",
    image: "/projects/cover-task-flow-pro.webp",
    imageIsIllustration: true,
    status: "github-only",
    featured: false,
    role:
      "Collaborated as part of a university development team, contributing to backend functionality, business logic, database interactions, and the overall implementation of the application's task management workflow.",
    problem:
      "Teams often rely on scattered communication channels and documents to manage work, making it difficult to know who is responsible for a task, what its current status is, and what still needs to be completed. Task Flow Pro provides a structured platform for managing these workflows in one place.",
    features: [
      "Task creation, assignment, updating, and completion tracking",
      "Structured Laravel architecture using models, services, and policies",
      "Database-backed storage using MySQL",
      "Notification functionality to keep users informed about task changes",
      "Organised separation between application logic and data handling",
      "Collaborative Git workflow for multi-developer development",
    ],
    challenges:
      "A major challenge was maintaining a consistent codebase while multiple developers worked on the same Laravel application. This required coordinating changes, following a shared project structure, resolving Git conflicts, and keeping business logic organised rather than placing everything directly inside controllers.",
  },

  {
    slug: "die-strandloper",
    name: "Die Strandloper",
    description:
      "A responsive multi-page website developed for a real local restaurant to establish a professional online presence and make important business information easily accessible to customers. The website combines restaurant information, menu presentation, photography, and a working contact system into a simple customer-facing experience.",
    tech: ["HTML", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/aidan-g-barends/DieStrandloper",
    image: "/projects/cover-die-strandloper.webp",
    imageIsIllustration: true,
    status: "github-only",
    featured: false,
    role:
      "Designed and developed the website independently, handling the page structure, responsive layouts, styling, JavaScript functionality, and integration of the customer contact form.",
    problem:
      "The restaurant needed a professional website where customers could discover the business, view important information and the menu, see the restaurant through a gallery, and contact the owner directly without needing to use multiple platforms.",
    features: [
      "Home page introducing the restaurant and its offering",
      "About page providing information about the business",
      "Digital menu presentation for customers",
      "Gallery for showcasing the restaurant and experience",
      "Contact page with a working customer enquiry form",
      "Web3Forms integration for sending enquiries directly to email",
      "Responsive layouts for desktop, tablet, and mobile devices",
      "Tailwind CSS-based styling and reusable layout patterns",
    ],
    challenges:
      "This project was built while I was expanding my knowledge of Tailwind CSS and JavaScript. One of the biggest challenges was translating a real business requirement into a polished responsive website while learning how to structure the frontend, handle responsive layouts, and integrate a third-party service for the contact functionality.",
  },

  {
    slug: "jjs-business-solutions",
    mobileImage: "/projects/mobile/jjs.webp",
    name: "JJS Business Solutions",
    description:
      "A professional business website developed for JJS Business Solutions to establish a modern digital presence and clearly communicate the organisation's training, consulting, and project-focused services. The website was designed to present the organisation in a credible and professional way while making important business information easy for prospective clients, partners, and visitors to discover.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    github: "https://github.com/aidan-g-barends/jjs-website",
    private: true,
    live: "https://jjsbussol.co.za/",
    liveIsProduction: true,
    clientWork: true,
    image: "/projects/jjs.png",
    preview: { src: "/projects/previews/jjs.webp", height: 2972 },
    status: "live",
    featured: false,
    role:
      "Sole developer responsible for the website's frontend development, UI implementation, responsive layouts, reusable components, content presentation, deployment, and overall user experience.",
    problem:
      "JJS Business Solutions needed a professional online presence that could clearly communicate its services and establish a strong digital representation of the organisation. The website needed to make the business easy to understand while presenting its services and information through a polished, modern, and responsive experience.",
    features: [
      "Professional business-focused landing page",
      "Clear presentation of JJS Business Solutions' services",
      "Training, consulting, and project information",
      "Structured content sections for improved information discovery",
      "Modern responsive user interface",
      "Mobile, tablet, and desktop support",
      "Reusable frontend components",
      "Consistent visual hierarchy and design patterns",
      "Clear navigation between important sections",
      "Professional presentation of business information",
      "Production deployment using Vercel",
      "Live publicly accessible website",
    ],
    challenges:
      "The main challenge was translating an established organisation's services and business identity into a modern digital experience without making the website feel unnecessarily complicated. The project required balancing professional presentation, clear information architecture, responsive design, reusable components, and usability across different screen sizes. It also provided practical experience in taking a business-focused website from development through to a live production deployment.",
  },

  {
    slug: "mediticket-2",
    stats: [{ value: "7", label: "Developers on the team" }],
    university: true,
    name: "MediTicket 2",
    description:
      "A full-stack medical practice management platform focused on connecting patients, doctors, and staff through a centralised healthcare system. The backend is built with Spring Boot and Java and manages core workflows such as appointments, digital tickets, payments, and notifications. The project applies Domain-Driven Design and object-oriented design patterns to create a structured and maintainable codebase.",
    tech: ["Spring Boot", "Java", "JPA/Hibernate", "MySQL"],
    githubFrontend: "https://github.com/AidanBarends/MediTicketApp",
    githubBackend: "https://github.com/AidanBarends/MediTicket2",
    image: "/projects/cover-mediticket-2.webp",
    imageIsIllustration: true,
    status: "github-only",
    featured: false,
    role:
      "Contributing as part of a 7-member software development team, working primarily within the backend and implementing functionality within the project's Domain-Driven Design architecture.",
    problem:
      "Medical practices need to coordinate patients, doctors, staff, appointments, tickets, payments, and communication. Managing these processes separately can lead to duplicated information and inefficient workflows. MediTicket aims to provide a connected platform for managing these core processes.",
    features: [
      "Patient, doctor, and staff management",
      "Shared User domain hierarchy for different types of system users",
      "Appointment scheduling and management",
      "Digital ticket management for patient workflows",
      "Payment-related functionality",
      "Notification functionality for important system updates",
      "JPA/Hibernate persistence with MySQL",
      "Domain-Driven Design architecture",
      "Builder pattern and object-oriented design principles",
      "Spring Boot REST-based backend architecture",
    ],
    challenges:
      "Developing within a 7-person team required careful coordination around domain models, database relationships, API functionality, and coding standards. One of the biggest challenges was making sure different parts of the system followed the same architectural principles while several developers were implementing features simultaneously.",
  },

   {
    slug: "uni-exchange",
    buildNotes: {
      problem:
        "CPUT students buy and sell through informal platforms and social media, with no way to know who they're dealing with.",
      decision:
        "A domain-driven Spring Boot backend: 22 domain entities and 13 enums following the same object-oriented and JPA patterns, so a multi-developer team could build features in parallel without the model drifting.",
      result:
        "A finished, deployed marketplace for verified CPUT students and staff, with listings, chat, reviews, and a wallet that holds payment until the buyer confirms they have the item.",
    },
    mobileImage: "/projects/mobile/uniexchange.webp",
    stats: [{ value: "22", label: "Domain entities" }, { value: "13", label: "Enums" }],
    university: true,
    name: "UniExchange",
    description:
      "A campus marketplace platform developed as a university group project for students at the Cape Peninsula University of Technology (CPUT). The platform is designed to provide a centralised space where students can buy, sell, and exchange goods and services within the university community.",

    tech: [
      "Spring Boot",
      "Java",
      "Spring Data JPA",
      "Hibernate",
      "MySQL",
      "React",
      "Vite",
    ],

    github: "https://github.com/AidanBarends/UniExchange",
    live: "https://uniexchange-rust.vercel.app/",
    image: "/projects/uniexchange.webp",
    preview: { src: "/projects/previews/uniexchange.webp", height: 2560 },

    status: "live",
    featured: false,

    role:
      "Contributed as part of a university software development team, working primarily on the backend domain layer and collaborating with team members through a structured Git workflow. My contributions involved implementing and maintaining domain entities, applying object-oriented design principles, and working within the project's Spring Boot architecture.",

    problem:
      "University students often rely on informal platforms and social media to buy, sell, and exchange goods and services with other students. UniExchange aims to provide a dedicated campus marketplace where members of the university community can discover listings, communicate with other users, complete transactions, and build trust within a structured platform.",

    features: [
      "Campus-focused marketplace for students",
      "Buying, selling, and exchanging goods and services",
      "User and campus identity management",
      "Marketplace listings and categories",
      "Listing image support",
      "User-to-user conversations and messaging",
      "Notifications",
      "Reviews and seller trust system",
      "Vendor application and trusted seller functionality",
      "Transaction and payment management",
      "Digital wallet functionality",
      "Community bulletin posts",
      "Administrative audit logging",
      "Spring Boot REST API architecture",
      "Spring Data JPA and Hibernate persistence",
      "MySQL database integration",
      "Domain-driven backend structure",
      "JUnit and Spring Boot testing",
      "React and Vite frontend",
    ],

    challenges:
      "Working on UniExchange as a group project required coordinating a large domain model across multiple developers while keeping the architecture and database relationships consistent. A major challenge was establishing a structured backend foundation containing 22 domain entities and 13 enums, while ensuring the different parts of the system follow consistent object-oriented and JPA design patterns. The project also required keeping frontend and backend development aligned as the platform progressed through its planned feature milestones to a finished, deployed product.",
  },

  {
    slug: "practiceflow-crm",
    mobileImage: "/projects/mobile/practiceflow.webp",
    stats: [{ value: "6", label: "Developers on the team" }],
    university: true,
    name: "PracticeFlow CRM",
    description:
      "A full-stack medical practice CRM designed to centralise patient management, appointment scheduling, clinical workflows, and staff administration within one modern application. The project combines a Next.js and React frontend with Supabase for authentication, database functionality, and backend services, and was developed collaboratively as part of a 6-person software engineering team.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    github: "https://github.com/aidan-g-barends/practiceflow-crm",
    live: "https://practiceflow-crm-iota.vercel.app/",
    image: "/projects/practiceFlow.png",
    status: "live",
    featured: true,
    role:
      "Frontend Developer responsible for the appointment scheduling experience, including the calendar interface, booking workflow, appointment status presentation, and reusable frontend components.",
    problem:
      "Medical practices need to manage patients, appointments, healthcare providers, staff, and clinical information efficiently. Relying on disconnected tools can make these workflows difficult to coordinate. PracticeFlow CRM brings these areas together into one centralised system.",
    features: [
      "Patient registration and patient directory",
      "Patient profile viewing and editing",
      "Appointment scheduling and management",
      "Calendar-based appointment interface",
      "Appointment status tracking",
      "Daily appointment and scheduling views",
      "Clinical workspace with SOAP notes",
      "Medication tracking",
      "Staff and healthcare provider directory",
      "Supabase authentication and database integration",
      "Reusable React components",
      "Responsive interface using Tailwind CSS",
    ],
    challenges:
      "My main challenge was developing the appointment management experience while other team members worked on different areas of the system. The frontend needed to remain consistent with the database structure and backend functionality as both were evolving. This required communication within the team, reusable component design, and careful handling of appointment states and scheduling information.",
  },

  {
    slug: "task-manager-app",
    name: "Task Manager App",
    description:
      "A full-stack task management application built to explore the integration of a modern Angular single-page application with a Java Spring Boot REST API. The project demonstrates the separation of frontend and backend responsibilities while providing a practical environment for working with REST endpoints, TypeScript, Java, and application data.",
    tech: ["Angular", "Spring Boot", "Java", "TypeScript"],
    github: "https://github.com/aidan-g-barends/Task-Manager-App",
    image: "/projects/cover-task-manager-app.webp",
    imageIsIllustration: true,
    status: "github-only",
    featured: false,
    role:
      "Developing the Angular frontend and Spring Boot backend independently, including frontend components, REST API endpoints, application logic, and the communication between the two layers.",
    problem:
      "As the number of projects and responsibilities increases, managing tasks without a structured system can become difficult. The Task Manager App provides a centralised way to create, update, organise, and track tasks.",
    features: [
      "Task creation and management",
      "Updating existing task information",
      "Deleting tasks",
      "Retrieving task data through REST API endpoints",
      "Spring Boot backend for API and business logic",
      "Angular single-page application frontend",
      "TypeScript-based frontend development",
      "Separation between frontend presentation and backend services",
      "Frontend-to-backend API communication",
    ],
    challenges:
      "The main technical challenge was understanding and implementing the communication between an Angular frontend and Spring Boot backend. This involved structuring REST endpoints, handling requests and responses, connecting frontend components to backend services, and keeping the application layers properly separated.",
  },

  {
    slug: "golden-way",
    mobileImage: "/projects/mobile/golden.webp",
    university: true,
    name: "GoldenWay",
    description:
      "A digital public transport ticketing platform designed to modernise the way Golden Arrow Bus commuters purchase and manage bus tickets. The project moves the traditional in-person ticket purchasing experience into a digital platform, combining a React/Vite frontend with Supabase for authentication, the database, and backend services.",
    tech: ["React", "Vite", "Supabase", "PostgreSQL"],
    github: "https://github.com/aidan-g-barends/GoldenWayApp",
    live: "https://goldenwayapp.vercel.app/",
    image: "/projects/golden.png",
    status: "live",
    featured: false,
    role:
      "Working as a full-stack developer within a team, integrating a Supabase backend, authentication, database, and API, with the React frontend and building out the ticketing and admin workflows.",
    problem:
      "Golden Arrow Bus commuters traditionally have limited options for purchasing and managing their bus tickets digitally. This creates unnecessary friction for passengers who need a faster and more convenient way to access their transport tickets.",
    features: [
      "Digital bus ticket purchasing",
      "Passenger-facing React/Vite application",
      "Supabase authentication, database, and backend services",
      "PostgreSQL database integration",
      "Digital ticket management",
      "Passenger booking workflows",
      "Admin dashboard for managing tickets and passengers",
      "Team-based Git development workflow",
      "Production deployment on Vercel",
    ],
    challenges:
      "The project required the team to translate a real-world public transport problem into a practical software solution while developing the frontend and backend in parallel. One of the biggest challenges was keeping the database structure, Supabase integration, and React application aligned as functionality continued to be developed, including a mid-project switch from a planned Spring Boot backend to Supabase.",
    demoCredentials: {
      email: "admin@goldenway.demo",
      password: "GoldeWay!2026",
      note: "Demo admin account, log in to try the ticketing and admin dashboard.",
    },
  },

  {
    slug: "the-hairbra",
    mobileImage: "/projects/mobile/hairbra.webp",
    name: "The HairBra",
    description:
      "A modern barbershop platform currently in development that combines online appointment booking, secure digital payments, barber profiles, and an integrated e-commerce store into one customer-facing application. The goal is to provide local barbershops with a complete digital platform where customers can discover barbers, book appointments, pay online, and purchase grooming products from the same application.",
    tech: [
      "React",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Payment Integration",
    ],
    github: "https://github.com/aidan-g-barends/The_HairBra",
    live: "https://the-hair-bra.vercel.app/",
    image: "/projects/hairbra.png",
    preview: { src: "/projects/previews/hairbra.webp", height: 1872 },
    status: "live",
    featured: true,
    role:
      "Sole developer responsible for the application's architecture, frontend development, Supabase integration, database design, booking workflows, payment integration, and planned e-commerce functionality.",
    problem:
      "Many local barbershops still rely on WhatsApp messages, phone calls, social media, or walk-ins to manage appointments. Product sales are often handled separately as well. This can make bookings difficult to manage and creates a fragmented customer experience. The HairBra aims to bring bookings, payments, and product sales together into one platform.",
    features: [
      "Online appointment booking",
      "Barber profiles and barber selection",
      "Service selection and booking workflow",
      "Barber availability management",
      "Online payment integration for appointments",
      "Customer appointment management",
      "Integrated e-commerce store",
      "Hair, beard, and grooming product listings",
      "Online product purchasing",
      "Customer order management",
      "Supabase authentication",
      "Supabase database integration",
      "PostgreSQL data storage",
      "Responsive React customer interface",
      "Planned customer and business notifications",
      "Planned live deployment for real-world use",
    ],
    challenges:
      "The HairBra combines several different software systems into one product, including appointment scheduling, authentication, payments, database management, and e-commerce. A major technical challenge is designing the underlying data model so that customers, barbers, appointments, payments, products, and orders remain connected and consistent. The project also requires careful consideration of payment states and booking availability to prevent conflicting appointments or incomplete transactions.",
  },

    {
    slug: "2g-architecture-solutions",
    mobileImage: "/projects/mobile/2g.webp",
    name: "2G Architecture Solutions",
    description:
      "A modern, editorial-style website concept developed for an established independent architectural practice with approximately 28 years of industry experience in Saldanha, Western Coast. Built with Next.js, TypeScript, and GSAP-powered animations, the site focuses on architectural storytelling, a curated project archive, and a refined visual identity designed to position the practice as a premium, trustworthy local studio.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "GSAP"],
    github: "https://github.com/aidan-g-barends/2G-Architecture",
    private: true,
    live: "https://2-g-architecture.vercel.app/",
    image: "/projects/2G.png",
    preview: { src: "/projects/previews/2g.webp", height: 2210 },
    status: "live",
    featured: true,
    role:
      "Full-stack developer and UI/UX designer responsible for conceptualising the digital experience, designing the UI/UX, building reusable React/Next.js components, implementing responsive layouts and GSAP-driven animations, and structuring the site so real client content and photography can be dropped in without a redesign.",
    problem:
      "The architectural practice had a limited digital presence and no website capable of communicating its experience, services, and design capability. The project establishes a professional digital identity and portfolio platform that highlights nearly three decades of industry experience, presents work in a premium visual format, and gives prospective clients an easy way to get in touch.",
    features: [
      "Premium architectural/editorial visual design",
      "Responsive desktop, tablet, and mobile layouts",
      "Large typography-driven hero section",
      "'28 Years of Experience' feature section",
      "Selected Works / interactive project archive",
      "Individual project presentation pages with large-format galleries",
      "Services and design philosophy sections",
      "About the designer/studio section",
      "Architectural design process section",
      "West Coast / Saldanha location presence",
      "Contact / project enquiry section",
      "GSAP-powered scroll and typography animations",
      "Project hover interactions and smooth scrolling",
      "SEO-friendly, semantic, accessibility-conscious structure",
      "Reusable, data-driven component architecture for easy future updates",
    ],
    challenges:
      "The main challenge was establishing a strong, premium visual identity for a client with limited publicly available information, photography, and project documentation, without fabricating professional claims. The site was structured around placeholder content so real photographs and project details can later replace it without a redesign, while balancing editorial minimalism against the need to clearly communicate the practice's experience and services. Designing for a small independent practice also meant conveying 28 years of credibility without making the business feel artificially corporate.",
  },

    {
    slug: "bouplan-ontwerpers",
    buildNotes: {
      problem:
        "A practice running since 1987 had no proper website, and no real project photography or copy had been supplied yet.",
      decision:
        "Don't invent anything. I stripped out fabricated names, history, and statistics from early AI-generated concepts, and built a typed content layer with honest placeholder states so real photos and copy can drop in without touching a single component.",
      result:
        "A live multi-page site with a WCAG AA-tested palette, local SEO structured data, and a content layer the client can fill in without a rebuild.",
    },
    mobileImage: "/projects/mobile/bouplan.webp",
    name: "Bouplan Ontwerpers",
    description:
      "A premium website concept developed for an established architectural design practice operating in Langebaan, West Coast since 1987. Built with Next.js, TypeScript, and Tailwind CSS v4, the site translates the practice's existing brand identity into a modern digital experience, with a focus on accessibility, local SEO, and a typed content architecture that allows real project photography and client content to be dropped in without any component changes.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Vercel"],
    github: "https://github.com/aidan-g-barends/BouplanOntwerpers",
    private: true,
    live: "https://bouplan-ontwerpers.vercel.app/",
    image: "/projects/bouplan.png",
    preview: { src: "/projects/previews/bouplan.webp", height: 3917 },
    status: "live",
    featured: true,
    role:
      "Full-stack developer and UI/UX designer responsible for the design system, component architecture, page development, accessibility implementation, SEO structure, and deployment. Work included auditing the practice's existing branding, defining the typography and colour system, and structuring the content layer so the client can replace placeholder material without a rebuild.",
    problem:
      "Bouplan Ontwerpers has operated since 1987 but had no properly developed website, leaving a practice with nearly four decades of experience effectively invisible online. Prospective clients had no way to view their work, understand their services, or contact the right person. The project establishes a credible digital presence built around local search visibility in Langebaan and the wider Western Cape, while deliberately avoiding fabricated projects, statistics, or credentials.",
    features: [
      "Multi-page architecture: home, about, services, projects, project detail, team, contact, and legal pages",
      "Design system derived from the client's existing logo, with defined colour, typography, and spacing tokens",
      "WCAG AA contrast-tested colour palette with a separate accessible shade for orange button fills",
      "Filterable project gallery with categories derived from live data",
      "Dynamic project detail routes pre-rendered at build time",
      "Accessible image lightbox with keyboard navigation, swipe gestures, focus management, and scroll locking",
      "Contact form with client and server-side validation, honeypot spam protection, and a swappable email handler",
      "LocalBusiness structured data, generated sitemap, robots rules, and per-page metadata",
      "Open Graph tags for link previews on WhatsApp and social platforms",
      "Typed content layer separating all copy and data from component code",
      "Reduced-motion support across all animations and hover states",
      "Honest placeholder states for unsupplied photography and content",
      "Responsive layouts designed per breakpoint rather than scaled down from desktop",
      "Production deployment on Vercel",
    ],
    challenges:
      "The central challenge was building something that looks like an established practice's website without inventing anything to fill the gaps. Initial AI-generated design concepts included fabricated project names, invented company history, and false statistics, all of which had to be identified and stripped out. The site was instead structured around clearly marked placeholder states that look deliberate rather than broken and upgrade automatically once real content arrives. Accessibility required genuine attention rather than assumption, since the client's brand orange failed WCAG AA behind white text, so a deeper variant was introduced for button fills while the original colour was reserved for non-text accents. The project also involved decisions beyond code, including choosing an email-only contact architecture over an unnecessary database and documenting exactly which information still requires client confirmation before launch.",
  },

  {
    slug: "dfv-dental-booking",
    mobileImage: "/projects/mobile/dfv.webp",
    name: "DFV Dental Booking",
    description:
      "A practice website and online booking system built for Dr Frans Venter's dental practice. It gives patients a simple way to learn about the practice and request appointments online, instead of relying on phone calls to book a visit.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/aidan-g-barends/DFV",
    live: "https://dfv-mocha.vercel.app/",
    image: "/projects/dfv.png",
    preview: { src: "/projects/previews/dfv.webp", height: 2936 },
    private: true,
    status: "live",
    featured: false,
    role:
      "Sole developer responsible for the site structure, the patient-facing booking flow, and the overall design and build of the application.",
    problem:
      "The practice previously managed appointments over the phone, which was slower for both patients and staff and offered no way for patients to see availability or request a booking outside of office hours. This project delivers a practice website with an online booking flow to make scheduling easier for everyone involved.",
    features: [
      "Practice information and services overview",
      "Online appointment booking flow",
      "Patient-facing scheduling interface",
      "Responsive layouts for desktop and mobile",
      "Production deployment on Vercel",
    ],
    challenges:
      "The main challenge was designing a booking flow that actually fits how the practice schedules patients day to day, while keeping the interface simple enough for patients of any age to use without help.",
  },

  {
    slug: "beauty-spot",
    buildNotes: {
      problem:
        "The salon only took bookings by phone, which only works while someone is free to answer and the salon is open.",
      decision:
        "Model availability properly: 15-minute slots that account for each therapist, treatment length, Saturday trading hours, and staff time off, designed so the same therapist can never be booked twice for one slot. The staff diary sticks to a few clear actions so the team can use it between clients.",
      result:
        "Clients can book online any time and get a booking reference, and the team shares one diary with 'My day' and 'Whole salon' views. Live on Vercel.",
    },
    mobileImage: "/projects/mobile/beautyspot.webp",
    name: "Beauty Spot",
    description:
      "A website and online booking system for Beauty Spot Health & Skincare, a salon in Langebaan offering nails, pedicures, lashes, waxing, facials, and massage. Clients can browse services and prices, meet the therapists, and book a treatment online at any time, while the salon team manages the day's appointments from a private staff diary.",
    tech: ["React", "Vite", "React Router", "Tailwind CSS", "Supabase", "PostgreSQL"],
    github: "https://github.com/aidan-g-barends/BSSH",
    live: "https://beautyspot-eta.vercel.app/",
    image: "/projects/beautyspot.png",
    preview: { src: "/projects/previews/beautyspot.webp", height: 3958 },
    private: true,
    status: "live",
    featured: false,
    role:
      "Sole developer responsible for the design, the client-facing booking flow, the staff diary, the Supabase integration, and deployment.",
    problem:
      "The salon took bookings by phone, which only works while someone is free to answer and the salon is open. Clients needed a way to see services and prices and book outside of trading hours, and the team needed one shared diary to see who is booked with whom.",
    features: [
      "Services and prices, team, gallery, about, and contact pages",
      "Online booking flow with service, therapist, and time slot selection",
      "15-minute slot scheduling with booking reference numbers",
      "Staff sign-in backed by Supabase authentication",
      "Staff diary with 'My day' and 'Whole salon' views",
      "Appointment statuses: requested, confirmed, completed, no-show, and cancelled",
      "Walk-in bookings and time-off blocking for staff",
      "Live open/closed indicator based on trading hours",
      "WhatsApp, phone, and email contact options",
      "LocalBusiness (BeautySalon) structured data for local search",
      "Responsive layouts for desktop and mobile",
      "Production deployment on Vercel",
    ],
    challenges:
      "The hardest part was modelling availability correctly: several therapists, different treatment lengths, trading hours that change on Saturdays, and staff time off all affect which slots can be offered, and two clients must never be able to book the same therapist at the same time. The staff side also had to be simple enough for the team to use between clients, so the diary focuses on a few clear actions like confirming, marking arrivals, and recording no-shows.",
  },
];

// Walkthrough videos recorded by scripts/capture-tours.mjs, by project slug
const tourVideos: Record<string, Tour> = tours;

export const projects: Project[] = projectList.map((project) =>
  tourVideos[project.slug] ? { ...project, tour: tourVideos[project.slug] } : project
);
