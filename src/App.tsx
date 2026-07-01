import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import About from "./components/Sections/About";
import PersonalInfo from "./components/Sections/PersonalInfo";
import EducationPanel from "./components/Sections/Education";
import CertificationsAndProjects from "./components/Sections/CertificationsAndProjects";
import CoursesPanel from "./components/Sections/Courses";
import Others from "./components/Sections/Others";
import CarbonSaver from "./components/Sections/CarbonSaver";
import SettingsPanel from "./components/Sections/Settings";
import { PortfolioData, UserSettings } from "./types";
import { INITIAL_PORTFOLIO_DATA } from "./data";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, HelpCircle, AlertCircle, Gamepad2 } from "lucide-react";

export default function App() {
  // Load State
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem("shaik_portfolio_data");
      const data = saved ? JSON.parse(saved) : { ...INITIAL_PORTFOLIO_DATA };
      
      // Auto-upgrade legacy template placeholders to the user's actual contact information
      if (data?.profile) {
        if (!data.profile.name || data.profile.name === "Shaik Mullasadik Placeholder") {
          data.profile.name = "Shaik Mullasadik";
        }
        if (!data.profile.title || data.profile.title === "Full-Stack Software Engineer & Cloud Specialist") {
          data.profile.title = "Salesforce Admin & Developer";
          data.profile.caption = "Salesforce Certified Admin & Developer | Custom Business Process Automation";
          data.profile.bio = "Passionate Salesforce Admin & Developer specializing in Salesforce customization, including Apex programming, Lightning Web Components (LWC), custom flows, security models, and API integrations. Skilled in translating complex business requirements into scalable, stable Salesforce solutions.";
        }
        
        if (data.profile.socials) {
          if (!data.profile.socials.email || data.profile.socials.email === "shaikmullasadik@example.com") {
            data.profile.socials.email = "sriskms786@gmail.com";
          }
          if (!data.profile.socials.phone || data.profile.socials.phone === "+91 98765 43210") {
            data.profile.socials.phone = "+91 9177290319";
          }
          if (!data.profile.socials.trailhead) {
            data.profile.socials.trailhead = "https://www.salesforce.com/trailblazer/shaikmullasadik";
          }
          if (data.profile.socials.github === "https://github.com/") {
            data.profile.socials.github = "https://github.com/mullasadik786";
          }
          if (data.profile.socials.linkedin === "https://linkedin.com/") {
            data.profile.socials.linkedin = "https://www.linkedin.com/in/shaik-mulla-mullasadik-73a624363";
          }
        }
      }
      
      // Upgrade projects cache if they have the legacy non-Salesforce ones, outdated statistics, or outdated educational years
      if (!data.arcadeStats || !data.arcadeStats.badges || data.arcadeStats.level !== 13 || !data.education || data.education.length < 3 || data.education[0].degree !== "B.Sc. Computer Science (MPCS)" || data.education[0].startDate !== "2015" || (data?.projects && data.projects.length > 0 && data.projects[0].title === "Arcade Points Core")) {
        data.projects = INITIAL_PORTFOLIO_DATA.projects;
        data.certifications = INITIAL_PORTFOLIO_DATA.certifications;
        data.courses = INITIAL_PORTFOLIO_DATA.courses;
        data.skillCategories = INITIAL_PORTFOLIO_DATA.skillCategories;
        data.about = INITIAL_PORTFOLIO_DATA.about;
        data.education = INITIAL_PORTFOLIO_DATA.education;
        data.arcadeStats = INITIAL_PORTFOLIO_DATA.arcadeStats;
      }
      return data;
    } catch {
      return INITIAL_PORTFOLIO_DATA;
    }
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem("shaik_portfolio_settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.showWallpaper === undefined) {
          parsed.showWallpaper = true;
          parsed.wallpaperUrl = "/src/assets/images/tech_space_background_1782912496851.jpg";
        }
        return parsed;
      }
    } catch {}
    return {
      theme: "arcade-dark",
      useAudioEffects: true,
      showArcadeWidgets: true,
      isDeveloperMode: true,
      showWallpaper: true,
      wallpaperUrl: "/src/assets/images/tech_space_background_1782912496851.jpg"
    };
  });

  const [activeSection, setActiveSection] = useState<string>(() => {
    try {
      const hash = window.location.hash.replace("#", "");
      if (["about", "personal", "education", "projects", "courses", "others", "carbon", "settings"].includes(hash)) {
        return hash;
      }
    } catch {}
    return "about";
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("shaik_portfolio_data", JSON.stringify(portfolioData));
  }, [portfolioData]);

  useEffect(() => {
    localStorage.setItem("shaik_portfolio_settings", JSON.stringify(settings));
  }, [settings]);

  // Handle Hash/Route switches
  useEffect(() => {
    window.location.hash = activeSection;
    playClickAudio();
  }, [activeSection]);

  // Dynamic Audio click feedbacks
  const playClickAudio = () => {
    if (!settings.useAudioEffects) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(580, ctx.currentTime); // clear soft tick

      gain.gain.setValueAtTime(0.015, ctx.currentTime); // Low non-intrusive volume
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // Browsers block autoplay audio until user interact elements - fail silently
    }
  };

  const handleUpdatePortfolio = (updatedFields: Partial<PortfolioData>) => {
    setPortfolioData((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  const handleUpdateSettings = (newSettingsFields: Partial<UserSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettingsFields,
    }));
  };

  const handleResetToDefaults = () => {
    setPortfolioData(INITIAL_PORTFOLIO_DATA);
    localStorage.removeItem("shaik_portfolio_data");
    playClickAudio();
  };

  // Determine global color layouts of outer wrapper based on the active skin
  const getThemeBackgroundStyles = () => {
    switch (settings.theme) {
      case "cyberpunk":
        return {
          wrapper: "bg-[#16140f] text-[#f8fafc] font-sans selection:bg-[#fbbf24] selection:text-black",
          inner: "border-slate-800",
          topLine: "bg-[#fbbf24]"
        };
      case "emerald":
        return {
          wrapper: "bg-[#030d09] text-[#e0f2fe] font-sans selection:bg-emerald-500 selection:text-black",
          inner: "border-emerald-950/40",
          topLine: "bg-emerald-500"
        };
      case "slate-light":
        return {
          wrapper: "bg-[#f1f5f9] text-[#0f172a] font-sans selection:bg-slate-900 selection:text-white",
          inner: "border-slate-200",
          topLine: "bg-slate-900"
        };
      case "retro-crt":
        return {
          wrapper: "bg-[#0c0803] text-amber-500 font-mono select-none selection:bg-amber-500 selection:text-black",
          inner: "border-amber-950/20",
          topLine: "bg-amber-500 animate-pulse"
        };
      case "neon-violet":
        return {
          wrapper: "bg-[#090515] text-[#f5f3ff] font-sans selection:bg-fuchsia-600 selection:text-white",
          inner: "border-fuchsia-950/20",
          topLine: "bg-gradient-to-r from-fuchsia-500 to-indigo-500"
        };
      case "arcade-dark":
      default:
        return {
          wrapper: "bg-[#090d16] text-[#f1f5f9] font-sans selection:bg-[#38bdf8] selection:text-black",
          inner: "border-slate-950/30",
          topLine: "bg-[#38bdf8]"
        };
    }
  };

  const themeClasses = getThemeBackgroundStyles();

  // Render correct body elements matching selection
  const renderActiveSection = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalInfo 
            data={portfolioData} 
            onUpdate={handleUpdatePortfolio} 
            settings={settings}
          />
        );
      case "education":
        return (
          <EducationPanel 
            data={portfolioData} 
            onUpdate={handleUpdatePortfolio} 
            settings={settings} 
          />
        );
      case "projects":
        return (
          <CertificationsAndProjects 
            data={portfolioData} 
            onUpdate={handleUpdatePortfolio} 
            settings={settings} 
          />
        );
      case "courses":
        return (
          <CoursesPanel 
            data={portfolioData} 
            onUpdate={handleUpdatePortfolio} 
            settings={settings} 
          />
        );
      case "others":
        return (
          <Others 
            data={portfolioData} 
            onUpdate={handleUpdatePortfolio} 
            settings={settings} 
          />
        );
      case "carbon":
        return (
          <CarbonSaver 
            data={portfolioData} 
            onUpdate={handleUpdatePortfolio} 
            settings={settings} 
          />
        );
      case "settings":
        return (
          <SettingsPanel 
            settings={settings} 
            onUpdateSettings={handleUpdateSettings} 
            onResetData={handleResetToDefaults} 
          />
        );
      case "about":
      default:
        return (
          <About 
            data={portfolioData} 
            onUpdate={handleUpdatePortfolio} 
            settings={settings} 
          />
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${themeClasses.wrapper} transition-colors duration-300 relative overflow-hidden`}>
      {/* Dynamic Background Wallpaper overlay */}
      {settings.showWallpaper && settings.wallpaperUrl && (
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-all duration-700 bg-cover bg-center bg-no-repeat opacity-[0.11]"
          style={{ 
            backgroundImage: `url(${settings.wallpaperUrl})`,
            mixBlendMode: settings.theme === "slate-light" ? "multiply" : "screen"
          }}
        />
      )}
      
      {/* Decorative top pulse strip */}
      <div id="wrapper-top-bar" className={`h-1.5 w-full fixed top-0 left-0 right-0 z-50 ${themeClasses.topLine}`}></div>

      {/* Main Sidebar Node */}
      <Sidebar
        profile={portfolioData.profile}
        arcadeStats={portfolioData.arcadeStats}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        settings={settings}
      />

      {/* Primary Contents view container */}
      <main className="flex-1 overflow-x-hidden pt-1.5 pb-20 md:pb-6 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Banner header showcase for current section */}
        <div id="section-view-banner" className="pt-24 md:pt-10 pb-8 relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {renderActiveSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
