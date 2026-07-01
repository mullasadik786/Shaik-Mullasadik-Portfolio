import { PortfolioData } from "./types";

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Shaik Mullasadik",
    title: "Salesforce Admin & Developer",
    caption: "Salesforce Certified Admin & Developer | Custom Business Process Automation",
    bio: "Passionate Salesforce Admin & Developer specializing in Salesforce customization, including Apex programming, Lightning Web Components (LWC), custom flows, security models, and API integrations. Skilled in translating complex business requirements into scalable, stable Salesforce solutions.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200", // High-res professional avatar mock layout
    coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200", // Abstract premium gradient banner
    location: "Hyderabad, India",
    availability: "Available",
    socials: {
      github: "https://github.com/mullasadik786",
      linkedin: "https://www.linkedin.com/in/shaik-mulla-mullasadik-73a624363",
      twitter: "https://twitter.com/",
      email: "sriskms786@gmail.com",
      phone: "+91 9177290319",
      trailhead: "https://www.salesforce.com/trailblazer/shaikmullasadik",
    },
  },
  about: {
    summary: "I am a dedicated Salesforce Admin & Developer with a solid foundation in both configuring click-not-code solutions and coding customized applications. I hold active certifications and continuous experience of developing robust LWC (Lightning Web Components), writing high-performance bulkified Apex triggers, setting up advanced security hierarchies, and automating complex tasks using Flow Builder. Eager to empower organizations through efficient CRM architectures.",
    philosophies: [
      "Prioritize click-to-configure solutions first to leverage native capabilities, then write elegant Apex/LWC code.",
      "Design responsive, accessible Lightning Web Components aligning with the Salesforce Lightning Design System (SLDS).",
      "Harness Flow Builder & asynchronous triggers to automate complex enterprise process flows efficiently.",
      "Active continuous education on Salesforce Trailhead, following quarterly Salesforce releases to integrate modern capabilities."
    ],
    strengths: [
      { title: "Salesforce Automation", description: "Flow Builder, Approval Processes, Process Builder (Legacy migration), Escalation Rules", score: 98 },
      { title: "Custom Salesforce Code", description: "Apex triggers/classes, SOQL/SOSL query optimizations, LWC, Visualforce", score: 95 },
      { title: "Security & Sharing", description: "Profiles, Permission Sets, OWD settings, Sharing Rules, Collaborative forecast settings", score: 94 },
      { title: "Integrations & APIs", description: "Mulesoft Connector, REST/SOAP Web Services, OAuth 2.0 Identity, Salesforce Connect", score: 88 }
    ]
  },
  education: [
    {
      id: "edu_1",
      institution: "Pedanandipadu Arts and Science College",
      degree: "B.Sc. Computer Science (MPCS)",
      fieldOfStudy: "Acharya Nagarjuna University, Guntur",
      startDate: "2015",
      endDate: "2018",
      grade: "Percentage: 83%",
      description: "Rigorous physical science and software engineering curriculum covering database management systems (DBMS), structured logical algorithms, computer networks, and object-oriented programming frameworks.",
      achievements: [
        "Scored a distinguished 83% overall academic aggregate",
        "Led local peer student technology assemblies around cloud workflows",
        "Designed and implemented various relational database management simulation tasks"
      ]
    },
    {
      id: "edu_2",
      institution: "Pedanandipadu Arts and Science College",
      degree: "Intermediate Education (MPC Group)",
      fieldOfStudy: "Andhra Pradesh Intermediate Board",
      startDate: "2013",
      endDate: "2015",
      grade: "Percentage: 80%",
      description: "Intensive fundamental science curriculum specializing in advanced mathematics, analytical physics formulas, and general chemistry structures.",
      achievements: [
        "Graduated with a stellar board score of 80%",
        "Active member of the high-school logical reasoning and debate board teams",
        "Achieved continuous high marks in quantitative mathematical components"
      ]
    },
    {
      id: "edu_3",
      institution: "Zilla Parishad High School Pedanandipadu",
      degree: "Secondary School Certificate (SSC)",
      fieldOfStudy: "Andhra Pradesh Open School Board",
      startDate: "2012",
      endDate: "2012",
      grade: "Percentage: 66%",
      description: "Foundational education including algebra structures, general sciences, social architectures, and language proficiency.",
      achievements: [
        "Graduated successfully with an overall 66% under Board rules",
        "Participated regularly in science exhibitions and local sports leagues",
        "Discovered passion for logical design, leading to physical mathematics fields"
      ]
    }
  ],
  projects: [
    {
      id: "proj_1",
      title: "Interactive Salesforce CRM LWC Dashboard",
      description: "A customized responsive client cockpit built using Lightning Web Components (LWC), custom Apex controllers, and Lightning Design System layout elements.",
      longDescription: "Designed an interactive, high-fidelity CRM layout that lets account executives update pipeline statuses and trigger multi-step customer approvals in real time. Features rich data charts generated on the platform, customized notifications, and interactive quick action panels.",
      role: "Lead Salesforce Customization Developer",
      technologies: ["LWC", "Apex", "SLDS", "SOQL", "JavaScript", "HTML5"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
      githubUrl: "https://github.com/mullasadik786",
      previewUrl: "https://www.salesforce.com/trailblazer/shaikmullasadik",
      completedDate: "Apr 2026",
      featured: true,
      stats: { stars: 45, forks: 12 }
    },
    {
      id: "proj_2",
      title: "Apex Bulk Automation & Dynamic Logs Framework",
      description: "An enterpise-grade Apex trigger handler framework. Employs bulkification best practices, custom limits safeguarding, and dynamic asynchronous apex handling.",
      longDescription: "Developed a trigger dispatcher framework that handles custom object status updates, synchronizes data seamlessly, and logs any platform execution limits errors directly into a custom 'Log__c' Salesforce object for remote telemetry analytics.",
      role: "Solo Salesforce Apex Engineer",
      technologies: ["Apex", "SOQL", "Asynchronous Apex", "Trigger Dispatcher Pattern", "Salesforce Security"],
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
      githubUrl: "https://github.com/mullasadik786",
      completedDate: "Jan 2026",
      featured: true,
      stats: { stars: 32, forks: 5 }
    },
    {
      id: "proj_3",
      title: "Service Cloud & GitHub Web Service Integrator",
      description: "Real-time bi-directional integration proxy connecting Salesforce Cases securely with GitHub repositories using Apex HTTP callouts and secure OAuth flows.",
      longDescription: "An integration solution using Apex REST APIs, customized Named Credentials, and secure callouts to synchronize case resolutions. Automatically posts issues from Salesforce Service Cloud to GitHub repositories, updating case records with real-time issue updates.",
      role: "Integration Specialist",
      technologies: ["Apex Callouts", "Named Credentials", "JSON Parsing", "REST APIs", "GitHub API", "OAuth 2.0"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
      githubUrl: "https://github.com/mullasadik786",
      completedDate: "Oct 2025",
      featured: false,
      stats: { stars: 22, forks: 3 }
    }
  ],
  certifications: [
    {
      id: "cert_1",
      title: "Salesforce Certified Administrator",
      issuer: "Salesforce",
      issueDate: "Jun 2025",
      expiryDate: "Lifetime (with maintenance)",
      credentialId: "SF-ADMIN-78241",
      credentialUrl: "https://www.salesforce.com/trailblazer/shaikmullasadik",
      iconType: "cloud"
    },
    {
      id: "cert_2",
      title: "Salesforce Certified Platform Developer I (PD1)",
      issuer: "Salesforce",
      issueDate: "Aug 2025",
      expiryDate: "Lifetime (with maintenance)",
      credentialId: "SF-PDI-99231",
      credentialUrl: "https://www.salesforce.com/trailblazer/shaikmullasadik",
      iconType: "shield"
    },
    {
      id: "cert_3",
      title: "Salesforce Certified Platform App Builder",
      issuer: "Salesforce",
      issueDate: "Oct 2025",
      expiryDate: "Lifetime (with maintenance)",
      credentialId: "SF-APPB-44029",
      credentialUrl: "https://www.salesforce.com/trailblazer/shaikmullasadik",
      iconType: "react"
    }
  ],
  courses: [
    {
      id: "course_1",
      title: "Salesforce Trailhead Ranger Badge",
      provider: "Salesforce Trailhead Academy",
      duration: "150+ Badges",
      progress: 100,
      status: "Completed",
      completionDate: "Ongoing",
      certificateUrl: "https://www.salesforce.com/trailblazer/shaikmullasadik",
      skillsAcquired: ["Apex Controllers", "Lightning Web Components", "Advanced Flows", "Process Automation", "Salesforce Security Model"]
    },
    {
      id: "course_2",
      title: "Apex Specialist & Integration Specialist Superbadges",
      provider: "Salesforce Superbadges Program",
      duration: "50 Hours",
      progress: 100,
      status: "Completed",
      completionDate: "Nov 2025",
      certificateUrl: "https://www.salesforce.com/trailblazer/shaikmullasadik",
      skillsAcquired: ["Complex Business Logic", "SOQL/SOSL Bulk Optimization", "System Callouts", "Security Best Practices"]
    }
  ],
  skillCategories: [
    {
      name: "Salesforce Technical Dev",
      skills: [
        { name: "Apex (Triggers, Classes, Batch)", level: 95 },
        { name: "Lightning Web Components (LWC)", level: 92 },
        { name: "SOQL / SOSL Queries", level: 94 },
        { name: "Visualforce Pages", level: 80 }
      ]
    },
    {
      name: "Salesforce Configurations",
      skills: [
        { name: "Flow / Process Builder", level: 98 },
        { name: "Security & Sharing Architecture", level: 96 },
        { name: "Dynamic Forms & Lightning Pages", level: 94 },
        { name: "Reports & Dashboards Builder", level: 95 }
      ]
    },
    {
      name: "Ecosystem & Integrations",
      skills: [
        { name: "REST / SOAP Web Services", level: 88 },
        { name: "Salesforce DX & Git", level: 90 },
        { name: "Metadata & Change Set Deploys", level: 92 },
        { name: "Copado / DevOps Pipelines", level: 82 }
      ]
    }
  ],
  arcadeStats: {
    level: 13,
    xpPoints: 532725,
    nextLevelXp: 600000,
    streakDays: 142,
    rank: "13-Star Ranger Trailblazer",
    achievementsUnlocked: 1338,
    questsCompleted: 85,
    points: 532725,
    badges: 1338,
    superBadges: 55
  }
};
