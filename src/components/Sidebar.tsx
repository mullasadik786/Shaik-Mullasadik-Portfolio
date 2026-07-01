import React from "react";
import { 
  User, 
  Contact, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Sliders, 
  Gamepad2, 
  Sparkles,
  Menu,
  ChevronLeft,
  ChevronRight,
  Award,
  Cloud,
  Shield,
  Leaf
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Profile, ArcadeStats, UserSettings } from "../types";

interface SidebarProps {
  profile: Profile;
  arcadeStats: ArcadeStats;
  activeSection: string;
  setActiveSection: (section: string) => void;
  settings: UserSettings;
}

export default function Sidebar({
  profile,
  arcadeStats,
  activeSection,
  setActiveSection,
  settings
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const navItems = [
    { id: "about", label: "About Me", icon: User },
    { id: "personal", label: "Personal Info", icon: Contact },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "projects", label: "Certifications & Projects", icon: Briefcase },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "others", label: "Others & Skills", icon: Sparkles },
    { id: "carbon", label: "Carbon Saver Tracker", icon: Leaf },
    { id: "settings", label: "Settings", icon: Sliders },
  ];

  // Map theme backgrounds & icons colors
  const getThemeStyles = () => {
    switch (settings.theme) {
      case "cyberpunk":
        return {
          bg: "bg-[#1e1c14] border-[#fbbf24]/30",
          textActive: "text-black bg-[#fbbf24]",
          textInactive: "text-slate-400 hover:text-[#fbbf24] hover:bg-[#fbbf24]/10",
          accentColor: "border-[#fbbf24]",
          banner: "bg-[#fbbf24]/10 border-[#fbbf24]/20 text-[#fbbf24]"
        };
      case "emerald":
        return {
          bg: "bg-[#061811] border-emerald-500/20",
          textActive: "text-black bg-emerald-500",
          textInactive: "text-emerald-100/60 hover:text-emerald-400 hover:bg-emerald-500/10",
          accentColor: "border-emerald-500",
          banner: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
        };
      case "slate-light":
        return {
          bg: "bg-white border-slate-200 shadow-sm",
          textActive: "text-white bg-slate-900 shadow-sm",
          textInactive: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
          accentColor: "border-slate-900",
          banner: "bg-slate-100 border-slate-200 text-slate-800"
        };
      case "retro-crt":
        return {
          bg: "bg-[#181109] border-amber-500/30",
          textActive: "text-[#181109] bg-amber-500 font-mono",
          textInactive: "text-amber-500/65 hover:text-amber-400 hover:bg-amber-500/10 font-mono",
          accentColor: "border-amber-500",
          banner: "bg-[#2c1d0c] border border-amber-500/20 text-amber-500 font-mono"
        };
      case "neon-violet":
        return {
          bg: "bg-[#130d22] border-fuchsia-500/20",
          textActive: "text-white bg-gradient-to-r from-fuchsia-600 to-indigo-600",
          textInactive: "text-indigo-200/60 hover:text-fuchsia-400 hover:bg-fuchsia-500/10",
          accentColor: "border-fuchsia-500",
          banner: "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400"
        };
      case "arcade-dark":
      default:
        return {
          bg: "bg-[#121620] border-[#38bdf8]/20",
          textActive: "text-black bg-[#38bdf8]",
          textInactive: "text-slate-400 hover:text-[#38bdf8] hover:bg-[#38bdf8]/10",
          accentColor: "border-[#38bdf8]",
          banner: "bg-[#38bdf8]/10 border-[#38bdf8]/20 text-[#38bdf8]"
        };
    }
  };

  const themeStyle = getThemeStyles();

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div 
        id="mobile-top-bar" 
        className={`md:hidden flex items-center justify-between p-4 sticky top-0 z-40 border-b ${themeStyle.bg}`}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={profile.avatarUrl} 
              alt={profile.name} 
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-violet-500/40"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">{profile.name}</h1>
            <span className="text-[10px] font-mono opacity-60">{arcadeStats.rank}</span>
          </div>
        </div>
        {settings.showArcadeWidgets && (
          <div className={`px-2 py-1 text-xs rounded-lg flex items-center gap-1.5 font-mono ${themeStyle.banner} border`}>
            <Cloud className="w-3.5 h-3.5 text-[#0176d3]" />
            <span>{(arcadeStats.points || 532725).toLocaleString()} Pts</span>
          </div>
        )}
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div 
        id="mobile-bottom-nav" 
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t flex justify-around p-1.5 shadow-2xl backdrop-blur-md ${themeStyle.bg}`}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`nav-mob-${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 min-h-[46px] min-w-[46px] ${
                isActive 
                  ? themeStyle.textActive 
                  : themeStyle.textInactive
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[9px] font-medium tracking-wide leading-none truncate max-w-[50px]">{item.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* DESKTOP SIDEBAR */}
      <motion.div
        id="desktop-sidebar"
        animate={{ width: isCollapsed ? "80px" : "280px" }}
        className={`hidden md:flex flex-col h-screen sticky top-0 border-r transition-colors duration-300 z-30 ${themeStyle.bg}`}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between border-b border-inherit min-h-[88px]">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <span className="text-xs font-semibold tracking-widest text-violet-500 uppercase font-mono">PORTFOLIO DECK</span>
                <span className="text-lg font-bold tracking-tight truncate max-w-[180px]">{profile.name}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            id="sidebar-collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg border border-inherit hover:opacity-80 transition-all ${
              settings.theme === "slate-light" ? "hover:bg-slate-100" : "hover:bg-white/5"
            }`}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Profile Card Summary */}
        <div className="p-4 border-b border-inherit">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-violet-500/40"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-inherit rounded-full"></span>
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="font-semibold text-sm truncate">{profile.name}</p>
                <span className="text-[11px] font-mono opacity-80 block truncate">{profile.title}</span>
                <span className="inline-flex items-center mt-1 text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 font-medium font-mono">
                  {profile.availability}
                </span>
              </div>
            )}
          </div>

          {/* Salesforce Trailhead Stats Widget */}
          {!isCollapsed && settings.showArcadeWidgets && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-3.5 rounded-xl border border-[#0176d3]/20 bg-gradient-to-b from-[#0176d3]/5 to-transparent ${
                settings.theme === "slate-light" ? "bg-slate-50 border-slate-200" : ""
              }`}
            >
              {/* Rank Header */}
              <div className="flex items-center gap-1.5 text-xs font-semibold mb-2.5 text-[#0176d3]">
                <Cloud className="w-4 h-4 flex-shrink-0 text-[#0176d3]" />
                <span className="font-mono tracking-wide truncate">{arcadeStats.rank}</span>
              </div>

              {/* Stats bento layout */}
              <div className="grid grid-cols-3 gap-1.5 text-center select-none mb-3">
                <div className="p-1 px-1 bg-black/10 rounded-lg border border-white/5 flex flex-col items-center">
                  <span className="text-[8px] font-mono opacity-50 uppercase font-semibold">Points</span>
                  <span className="text-[11px] font-black text-amber-500">
                    {arcadeStats.points ? arcadeStats.points.toLocaleString() : (532725).toLocaleString()}
                  </span>
                </div>
                <div className="p-1 px-1 bg-black/10 rounded-lg border border-white/5 flex flex-col items-center">
                  <span className="text-[8px] font-mono opacity-50 uppercase font-semibold">Badges</span>
                  <span className="text-[11px] font-black text-sky-400">
                    {arcadeStats.badges || 1338}
                  </span>
                </div>
                <div className="p-1 px-1 bg-black/10 rounded-lg border border-white/5 flex flex-col items-center">
                  <span className="text-[8px] font-mono opacity-50 uppercase font-semibold">Superb</span>
                  <span className="text-[11px] font-black text-[#5fc69e] flex items-center gap-0.5 justify-center">
                    <Shield className="w-2.5 h-2.5 inline-block text-[#2e8e64]" /> {arcadeStats.superBadges || 55}
                  </span>
                </div>
              </div>

              {/* Progress to next milestone */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono opacity-50">
                  <span>To Next Milestone</span>
                  <span>{((arcadeStats.points || 532725) / 600000 * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#0176d3] to-sky-400 rounded-full"
                    style={{ width: `${Math.min(100, ((arcadeStats.points || 532725) / 600000) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[8px] font-mono opacity-40">
                  <span>532.7k pts</span>
                  <span>600k pts</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3.5 p-3 rounded-xl transition-all duration-200 cursor-pointer text-left ${
                  isActive 
                    ? themeStyle.textActive 
                    : themeStyle.textInactive
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium text-sm tracking-wide">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        {!isCollapsed && (
          <div className="p-5 border-t border-inherit text-[11px] font-mono opacity-50 flex flex-col gap-1">
            <p>© {new Date().getFullYear()} Shaik Mullasadik</p>
            <p>Vite • React • Tailwind v4</p>
          </div>
        )}
      </motion.div>
    </>
  );
}
