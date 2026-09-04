export type Project = {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  github?: string;
  githubFrontend?: string;
  githubBackend?: string;
  live?: string;
  featured: boolean;
  inProgress?: boolean;
  role?: string;
  problem?: string;
  features?: string[];
  challenges?: string;
};

export const projects: Project[] = [
  {
    slug: "task-flow-pro",
    name: "Task Flow Pro",
    description:
      "A full-stack task management platform developed as a university group project to help teams organise, assign, monitor, and complete work through one centralised system. The application was built with Laravel and MySQL, using a structured backend architecture with dedicated models, services, policies, and notification functionality.",
    tech: ["Laravel", "PHP", "MySQL"],
    github: "https://github.com/aidan-g-barends/Task-Flow-Pro",
    featured: true,
    inProgress: false,
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
    featured: true,
    inProgress: false,
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
    name: "JJS Business Solutions",
    description:
      "A professional business website developed for JJS Business Solutions to establish a modern digital presence and clearly communicate the organisation's training, consulting, and project-focused services. The website was designed to present the organisation in a credible and professional way while making important business information easy for prospective clients, partners, and visitors to discover.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    github: "https://github.com/aidan-g-barends/jjs-website",
    live: "https://jjs-website-omega.vercel.app/",
    featured: true,
    inProgress: false,
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
    name: "MediTicket 2",
    description:
      "A full-stack medical practice management platform focused on connecting patients, doctors, and staff through a centralised healthcare system. The backend is built with Spring Boot and Java and manages core workflows such as appointments, digital tickets, payments, and notifications. The project applies Domain-Driven Design and object-oriented design patterns to create a structured and maintainable codebase.",
    tech: ["Spring Boot", "Java", "JPA/Hibernate", "MySQL"],
    githubFrontend: "https://github.com/AidanBarends/MediTicketApp",
    githubBackend: "https://github.com/AidanBarends/MediTicket2",
    featured: true,
    inProgress: false,
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

    featured: false,
    inProgress: true,

    role:
      "Contributing as part of a university software development team, working primarily on the backend domain layer and collaborating with team members through a structured Git workflow. My contributions involve implementing and maintaining domain entities, applying object-oriented design principles, and working within the project's Spring Boot architecture.",

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
      "React and Vite frontend foundation",
    ],

    challenges:
      "Working on UniExchange as a group project required coordinating a large domain model across multiple developers while keeping the architecture and database relationships consistent. A major challenge has been establishing a structured backend foundation containing 22 domain entities and 13 enums, while ensuring the different parts of the system follow consistent object-oriented and JPA design patterns. The project also requires keeping frontend and backend development aligned as the platform progresses through its planned feature milestones.",
  },

  {
    slug: "practiceflow-crm",
    name: "PracticeFlow CRM",
    description:
      "A full-stack medical practice CRM designed to centralise patient management, appointment scheduling, clinical workflows, and staff administration within one modern application. The project combines a Next.js and React frontend with Supabase for authentication, database functionality, and backend services, and was developed collaboratively as part of a 6-person software engineering team.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    github: "https://github.com/aidan-g-barends/practiceflow-crm",
    live: "https://practiceflow-crm-iota.vercel.app/",
    featured: true,
    inProgress: false,
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
    featured: true,
    inProgress: false,
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
    name: "GoldenWay",
    description:
      "A digital public transport ticketing platform designed to modernise the way Golden Arrow Bus commuters purchase and manage bus tickets. The project moves the traditional in-person ticket purchasing experience into a digital platform, combining a React/Vite frontend with a Spring Boot backend and MySQL database.",
    tech: ["React", "Vite", "Spring Boot", "Java", "MySQL"],
    github: "https://github.com/AidanBarends/GoldenWay",
    featured: false,
    inProgress: true,
    role:
      "Working as a full-stack developer within a team, with a strong focus on the Spring Boot backend, REST API development, database layer, and integration between the backend and React frontend.",
    problem:
      "Golden Arrow Bus commuters traditionally have limited options for purchasing and managing their bus tickets digitally. This creates unnecessary friction for passengers who need a faster and more convenient way to access their transport tickets.",
    features: [
      "Digital bus ticket purchasing",
      "Passenger-facing React/Vite application",
      "Spring Boot REST API backend",
      "MySQL database integration",
      "Digital ticket management",
      "Passenger booking workflows",
      "Separation between frontend, backend, and database layers",
      "Team-based Git development workflow",
    ],
    challenges:
      "The project required the team to translate a real-world public transport problem into a practical software solution while developing the frontend and backend in parallel. One of the biggest challenges has been keeping the database structure, API contracts, and React application aligned as functionality continues to be developed.",
  },

  {
    slug: "the-hairbra",
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
    featured: true,
    inProgress: false,
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
    name: "2G Architecture Solutions",
    description:
      "A modern, editorial-style website concept developed for an established independent architectural practice with approximately 28 years of industry experience in Saldanha, Western Coast. Built with Next.js, TypeScript, and GSAP-powered animations, the site focuses on architectural storytelling, a curated project archive, and a refined visual identity designed to position the practice as a premium, trustworthy local studio.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "GSAP"],
    github: "https://github.com/aidan-g-barends/2G-Architecture",
    live: "https://2-g-architecture.vercel.app/",
    featured: false,
    inProgress: true,
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

   
];