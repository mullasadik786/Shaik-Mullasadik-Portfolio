export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  phone?: string;
  website?: string;
  trailhead?: string;
}

export interface Profile {
  name: string;
  title: string;
  caption: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  location: string;
  availability: "Available" | "Busy" | "Open to Work" | "Freelancing";
  socials: SocialLinks;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade?: string;
  description?: string;
  achievements?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  role: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  previewUrl?: string;
  completedDate: string;
  featured: boolean;
  stats?: {
    stars?: number;
    forks?: number;
  };
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  iconType?: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  progress: number; // 0 to 100
  status: "Completed" | "In Progress" | "Planned";
  completionDate?: string;
  certificateUrl?: string;
  skillsAcquired?: string[];
}

export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    icon?: string;
  }[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export interface ArcadeStats {
  level: number;
  xpPoints: number;
  nextLevelXp: number;
  streakDays: number;
  rank: string;
  achievementsUnlocked: number;
  questsCompleted: number;
  points?: number;
  badges?: number;
  superBadges?: number;
}

export interface UserSettings {
  theme: "arcade-dark" | "cyberpunk" | "emerald" | "slate-light" | "retro-crt" | "neon-violet";
  useAudioEffects: boolean;
  showArcadeWidgets: boolean;
  isDeveloperMode: boolean;
  showWallpaper?: boolean;
  wallpaperUrl?: string;
}

export interface PortfolioData {
  profile: Profile;
  about: {
    summary: string;
    philosophies: string[];
    strengths: { title: string; description: string; score: number }[];
  };
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  courses: Course[];
  skillCategories: SkillCategory[];
  arcadeStats: ArcadeStats;
}
