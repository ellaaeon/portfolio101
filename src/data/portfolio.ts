export const siteConfig = {
  name: "Danniela Adizas",
  title: "Full-Stack Developer",
  tagline:
    "Building scalable web & mobile applications with modern technologies and AI integration.",
  email: "adizasdanniela@gmail.com",
  phone: "+63 966 887 4229",
  location: "Barugo, Leyte, Philippines",
  github: "https://github.com/villagonz",
  linkedin: "https://linkedin.com/in/danniela-adizas",
  portfolio: "https://adizasportfolio.vercel.app",
};

export const orbitTech = [
  "React",
  "TypeScript",
  ".NET",
  "Next.js",
  "Laravel",
  "Flutter",
  "Firebase",
  "Python",
];

export const about = {
  intro: [
    "I'm a Computer Science graduate from ACLC College of Tacloban with a passion for building innovative digital solutions. My expertise spans full-stack development, mobile applications, cloud technologies, and AI-powered tools.",
    "I'm driven by solving complex problems and creating seamless user experiences. Whether it's architecting backend APIs, integrating AI services, or designing intuitive interfaces, I bring a holistic approach to every project.",
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    school: "ACLC College of Tacloban",
    location: "Leyte, Philippines",
    period: "Sep 2022 – Jun 2026",
  },
  stats: [
    { value: 5, suffix: "+", label: "Projects" },
    { value: 25, suffix: "+", label: "Technologies" },
    { value: 3, suffix: "+", label: "Years Learning" },
    { value: 1, suffix: "", label: "Industry Experience" },
  ],
};

export const dashboardStats = [
  { label: "Projects Completed", value: 5, icon: "🚀" },
  { label: "Repositories", value: 12, icon: "📦" },
  { label: "Technologies Mastered", value: 25, icon: "⚡" },
  { label: "Years Coding", value: 3, icon: "⌨️" },
  { label: "Coffee Consumed", value: 847, icon: "☕" },
  { label: "Coding Hours", value: 4200, icon: "🌙" },
];

export const experience = [
  {
    role: "IT Intern",
    company:
      "Governor Benjamin T. Romualdez General Hospital and Schistosomiasis Center",
    period: "Dec 2025 – May 2026",
    description:
      "Contributed to a Laravel and PHP-based hospital information system in a data-sensitive healthcare environment, leading deployment and providing hands-on technical support.",
    highlights: [
      "Developed responsive UIs using Blade templating, Tailwind CSS, Bootstrap, HTML, CSS, and JavaScript",
      "Led system deployment and configuration across multiple departmental workstations",
      "Provided technical support, diagnosing and resolving hardware and software issues for staff",
      "Collaborated with cross-functional teams on MySQL database interactions and workflow optimization",
      "Demonstrated adaptability across departments with varying technical requirements",
    ],
  },
];

export type Project = {
  title: string;
  category: string;
  period?: string;
  description: string;
  highlights: string[];
  technologies: string[];
  url?: string;
  featured?: boolean;
  gradient?: string;
  secret?: boolean;
};

export const projects: Project[] = [
  {
    title: "ResumeLens",
    category: "AI / Full-Stack",
    period: "Jun 2026 – Present",
    description:
      "AI-powered resume analyzer that scores ATS compatibility and matches resumes to job descriptions with actionable optimization insights.",
    highlights: [
      "Resume upload and analysis pipeline with ATS scoring",
      "Job-match insights powered by Gemini AI",
      "AI-assisted resume optimization recommendations",
      "Automated feedback emails via Vercel and Railway deployment",
    ],
    technologies: [".NET 8", "Next.js", "Gemini AI", "Vercel", "Railway"],
    url: "https://resumelens.co",
    featured: true,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
  {
    title: "RentMyPlace – Rental Management System",
    category: "Full-Stack",
    period: "Apr 2025 – Dec 2025",
    description:
      "Thesis project — a web platform for listing and managing rental properties with role-based access for landlords, tenants, and admins.",
    highlights: [
      "Dynamic search and filtering for rental listings",
      "Role-based access control for landlords and tenants",
      "Property listing management and booking requests",
      "Admin dashboard for platform oversight",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Firebase Auth",
      "JavaScript",
      "Tailwind CSS",
    ],
    featured: true,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    title: "B-Cool Services Website",
    category: "Full-Stack",
    description:
      "Interactive business landing page with integrated chatbot booking system for HVAC and refrigeration services.",
    highlights: [
      "Responsive business landing page with mobile-first design",
      "Interactive chat-based booking system with rule-based chatbot",
      "Dynamic message generation from user inputs",
      "WhatsApp integration with pre-filled booking details",
    ],
    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Netlify",
      "WhatsApp API",
    ],
    url: "https://b-coolservices.netlify.app/",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
  },
  {
    title: "Online Hotel Booking System",
    category: "Mobile",
    description:
      "Cross-platform mobile application for seamless hotel discovery and booking with real-time availability updates.",
    highlights: [
      "Hotel search and filtering by availability",
      "Real-time room booking system",
      "Hotel owner management dashboard",
      "Secure authentication with Firebase",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "FireAuth"],
    gradient: "from-emerald-500 via-green-500 to-lime-500",
  },
  {
    title: "Nexus: Online Ticketing Website",
    category: "Full-Stack",
    description:
      "Event ticketing platform connecting attendees with events and enabling organizers to manage ticket sales efficiently.",
    highlights: [
      "Real-time event browsing and availability tracking",
      "Secure ticket booking with transaction management",
      "Event organizer dashboard for sales monitoring",
      "Responsive design for mobile and desktop",
    ],
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    gradient: "from-rose-500 via-pink-500 to-red-500",
  },
  {
    title: "Pixel Quest — Secret Project",
    category: "Easter Egg",
    description:
      "A retro-inspired mini game prototype built as a fun side experiment. You found it by exploring every corner of this portfolio.",
    highlights: [
      "Canvas-based 2D platformer mechanics",
      "Procedural level generation",
      "Chiptune audio synthesis",
      "High-score persistence with localStorage",
    ],
    technologies: ["TypeScript", "Canvas API", "Web Audio"],
    secret: true,
    gradient: "from-indigo-500 via-violet-500 to-purple-600",
  },
];

export type SkillDetail = {
  name: string;
  years: number;
  level: number;
  projects: string[];
  category: string;
};

export const skillDetails: SkillDetail[] = [
  { name: "JavaScript", years: 3, level: 90, projects: ["ResumeLens", "RentMyPlace", "B-Cool"], category: "Languages" },
  { name: "TypeScript", years: 2, level: 85, projects: ["ResumeLens", "RentMyPlace"], category: "Languages" },
  { name: "React", years: 2, level: 88, projects: ["ResumeLens", "RentMyPlace", "B-Cool"], category: "Frontend" },
  { name: "Next.js", years: 1, level: 82, projects: ["ResumeLens"], category: "Frontend" },
  { name: "PHP", years: 2, level: 80, projects: ["Nexus", "Hospital System"], category: "Languages" },
  { name: "Laravel", years: 1, level: 78, projects: ["Hospital System"], category: "Backend" },
  { name: ".NET 8", years: 1, level: 75, projects: ["ResumeLens"], category: "Backend" },
  { name: "Python", years: 2, level: 72, projects: ["Grading System"], category: "Languages" },
  { name: "Flutter", years: 2, level: 80, projects: ["Hotel Booking"], category: "Frontend" },
  { name: "Firebase", years: 2, level: 78, projects: ["RentMyPlace", "Hotel Booking"], category: "Backend" },
  { name: "MySQL", years: 2, level: 75, projects: ["Nexus", "Hospital System"], category: "Backend" },
  { name: "Tailwind CSS", years: 2, level: 88, projects: ["ResumeLens", "RentMyPlace", "B-Cool"], category: "Frontend" },
  { name: "Gemini AI", years: 1, level: 70, projects: ["ResumeLens"], category: "AI" },
  { name: "Git", years: 3, level: 85, projects: ["All Projects"], category: "Tools" },
  { name: "Docker", years: 1, level: 60, projects: ["ResumeLens"], category: "Tools" },
  { name: "C#", years: 1, level: 72, projects: ["ResumeLens"], category: "Languages" },
];

export const achievements = [
  { id: "explorer", title: "Explorer", description: "Visited every section", icon: "🧭", color: "from-sky-400 to-blue-500" },
  { id: "lights", title: "Light Keeper", description: "Toggled the light bulb", icon: "💡", color: "from-amber-400 to-orange-500" },
  { id: "konami", title: "Developer Mode", description: "Entered the Konami code", icon: "🎮", color: "from-violet-400 to-purple-500" },
  { id: "hello", title: "Friendly Visitor", description: "Said hello", icon: "👋", color: "from-pink-400 to-rose-500" },
  { id: "logo", title: "Logo Hunter", description: "Clicked the logo 5 times", icon: "🎯", color: "from-emerald-400 to-green-500" },
  { id: "projects", title: "Project Inspector", description: "Opened a project modal", icon: "🔍", color: "from-cyan-400 to-teal-500" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
