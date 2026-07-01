import React, { useState } from "react";
import { 
  Sparkles, 
  Flame, 
  Gamepad2, 
  Crown, 
  Swords, 
  BookMarked, 
  Dices, 
  Heart, 
  CheckSquare, 
  Plus, 
  Trash2, 
  Check, 
  Zap,
  Volume2,
  Shield,
  Cloud
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PortfolioData, UserSettings, SkillCategory } from "../../types";

interface OthersProps {
  data: PortfolioData;
  onUpdate: (updatedData: Partial<PortfolioData>) => void;
  settings: UserSettings;
}

export default function Others({ data, onUpdate, settings }: OthersProps) {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([...data.skillCategories]);
  const [arcadeStats, setArcadeStats] = useState({ ...data.arcadeStats });
  const [hobbies, setHobbies] = useState(["Salesforce Community Tech Session Hosting", "Apex Open Source Utilities", "Continuous Trailhead Questing", "Tech Release Note Dissections", "Workflow & Process Automations"]);
  const [newHobbyText, setNewHobbyText] = useState("");
  const [showLevelUpAlert, setShowLevelUpAlert] = useState(false);

  // Daily interactive quests mimicking the reference site arcadepoints design
  const [questsList, setQuestsList] = useState([
    { id: "q1", title: "Complete Advanced Salesforce Flow Automation superbadge", xp: 1500, completed: false },
    { id: "q2", title: "Implement Apex Trigger Handler Framework bulk validation", xp: 1200, completed: false },
    { id: "q3", title: "Deploy LWC custom lightning pages aligning with SLDS", xp: 1800, completed: false },
    { id: "q4", title: "Optimize complex SOQL bulk queries and relationship filters", xp: 1000, completed: true },
  ]);

  const handleClaimQuest = (id: string, xpPoints: number) => {
    // Mark quest as completed
    setQuestsList(prev => prev.map(q => {
      if (q.id === id) return { ...q, completed: true };
      return q;
    }));

    // Calculate new XP
    let currentXp = arcadeStats.xpPoints + xpPoints;
    let currentLvl = arcadeStats.level;
    let nextLvlThreshold = arcadeStats.nextLevelXp;
    let leveledUp = false;

    if (currentXp >= nextLvlThreshold) {
      currentXp = currentXp - nextLvlThreshold;
      currentLvl += 1;
      nextLvlThreshold = Math.floor(nextLvlThreshold * 1.25);
      leveledUp = true;
    }

    const updatedStats = {
      ...arcadeStats,
      level: currentLvl,
      xpPoints: currentXp,
      points: currentXp,
      nextLevelXp: nextLvlThreshold,
      questsCompleted: arcadeStats.questsCompleted + 1,
      badges: (arcadeStats.badges || 1338) + 1,
      achievementsUnlocked: (arcadeStats.achievementsUnlocked || 1338) + 1
    };

    setArcadeStats(updatedStats);
    onUpdate({ arcadeStats: updatedStats });

    if (leveledUp) {
      setShowLevelUpAlert(true);
      setTimeout(() => setShowLevelUpAlert(false), 5000);
    }
  };

  const handleAddHobby = () => {
    if (newHobbyText.trim()) {
      const updated = [...hobbies, newHobbyText.trim()];
      setHobbies(updated);
      setNewHobbyText("");
    }
  };

  const handleRemoveHobby = (hobby: string) => {
    setHobbies(hobbies.filter(h => h !== hobby));
  };

  // Theme styling helpers
  const getThemeTextAccent = () => {
    switch (settings.theme) {
      case "cyberpunk": return "text-[#fbbf24]";
      case "emerald": return "text-emerald-400";
      case "retro-crt": return "text-amber-500 font-mono";
      case "neon-violet": return "text-fuchsia-400";
      case "slate-light": return "text-slate-800";
      default: return "text-[#38bdf8]";
    }
  };

  const getThemeCardBg = () => {
    return settings.theme === "slate-light" 
      ? "bg-white border-slate-200/85 shadow-sm" 
      : "bg-slate-900/60 backdrop-blur-md border-white/5";
  };

  const getThemeButton = () => {
    switch (settings.theme) {
      case "cyberpunk": return "bg-[#fbbf24] text-black hover:bg-[#fbbf24]/90 font-semibold";
      case "emerald": return "bg-emerald-500 text-black hover:bg-emerald-400 font-semibold";
      case "retro-crt": return "bg-amber-500 text-black hover:bg-amber-400 font-mono font-semibold";
      case "neon-violet": return "bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white hover:opacity-90";
      case "slate-light": return "bg-slate-900 text-white hover:bg-slate-800";
      default: return "bg-[#38bdf8] text-black hover:bg-[#38bdf8]/90 font-semibold";
    }
  };

  const textAccent = getThemeTextAccent();
  const cardBg = getThemeCardBg();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-4 border-b border-inherit">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
            <Sparkles className={`w-6 h-6 ${textAccent}`} />
            <span>Others & Skills Matrix</span>
          </h2>
          <p className="text-sm opacity-60 mt-1">Inter-disciplinary tools, language checkpoints, hobbies, and gamified arcade quests.</p>
        </div>
      </div>

      {/* RENDER DYNAMIC LEVEL UP SYSTEM ALERT BANNER */}
      <AnimatePresence>
        {showLevelUpAlert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="p-5 rounded-2xl bg-gradient-to-r from-yellow-500 via-amber-600 to-fuchsia-600 text-black shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center z-40"
          >
            {/* sparkles loops */}
            <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <Crown className="w-10 h-10 text-white animate-bounce" />
            <h3 className="text-xl font-black tracking-tight text-white mt-2">DOCK LEVEL UP COMPLETED!</h3>
            <p className="text-xs text-white/95 mt-1 font-mono tracking-wide">
              Shaik Mullasadik graduated to **Level {arcadeStats.level}** — Rank: {arcadeStats.rank}!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THREE LAYOUT COLUM BENTO ELEMENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* GAMIFIED ARCADE POINTS CENTER */}
        {settings.showArcadeWidgets && (
          <div id="arcade-points-center" className={`lg:col-span-12 p-6 rounded-2xl border ${cardBg} space-y-6`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-inherit pb-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#0176d3]/10 text-[#0176d3] border border-[#0176d3]/20 rounded-xl">
                  <Cloud className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base tracking-tight flex items-center gap-2">
                    <span>Trailhead Trailblazer Activity Deck</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-500 font-semibold border border-amber-500/20">🔥 {arcadeStats.streakDays} Day Streaks</span>
                  </h3>
                  <p className="text-xs opacity-50 font-mono mt-0.5">Continuous professional learning tracking ledger</p>
                </div>
              </div>

              {/* Total Developer Points Banner */}
              <div className="flex flex-wrap gap-2 md:gap-3 shrink-0 items-center justify-start lg:justify-end">
                <div className="p-2 sm:p-2.5 px-4 bg-gradient-to-r from-amber-500/5 to-amber-600/10 border border-amber-500/20 rounded-xl text-center">
                  <span className="text-[9px] font-mono tracking-wider opacity-60 uppercase font-semibold block">Total Points</span>
                  <p className="text-sm font-extrabold text-amber-500">{(arcadeStats.points || 532725).toLocaleString()}</p>
                </div>
                <div className="p-2 sm:p-2.5 px-4 bg-gradient-to-r from-sky-500/5 to-sky-600/10 border border-sky-500/20 rounded-xl text-center">
                  <span className="text-[9px] font-mono tracking-wider opacity-60 uppercase font-semibold block">Badges Unlocked</span>
                  <p className="text-sm font-extrabold text-sky-400">{(arcadeStats.badges || 1338).toLocaleString()}</p>
                </div>
                <div className="p-2 sm:p-2.5 px-4 bg-gradient-to-r from-teal-500/5 to-emerald-600/10 border border-emerald-500/20 rounded-xl text-center">
                  <span className="text-[9px] font-mono tracking-wider opacity-60 uppercase font-semibold block">Super Badges</span>
                  <p className="text-sm font-extrabold text-[#5fc69e] flex items-center gap-1 justify-center">
                    <Shield className="w-3.5 h-3.5 inline text-[#2e8e64]" /> {arcadeStats.superBadges || 55}
                  </p>
                </div>
              </div>
            </div>

            {/* Quests ledger */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase font-mono tracking-wider opacity-50 flex items-center gap-1.5">
                  <Swords className="w-4 h-4 text-violet-500" /> Active Quests Guild
                </h4>
                <p className="text-[11px] font-mono opacity-50">Earn direct XP points to trigger a profile level up</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questsList.map((quest) => (
                  <div
                    key={quest.id}
                    id={`quest-card-${quest.id}`}
                    className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all duration-150 ${
                      quest.completed 
                        ? "bg-slate-900/25 border-emerald-500/15 opacity-60" 
                        : "bg-black/10 border-inherit hover:border-violet-500/20 hover:bg-black/15"
                    }`}
                  >
                    <div className="space-y-1.5 min-w-0">
                      <p className={`text-xs font-black truncate ${quest.completed ? "line-through text-slate-500" : ""}`}>
                        {quest.title}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-mono select-none">
                        <span className="text-amber-500 font-bold">💎 +{quest.xp} XP Points</span>
                        <span className="opacity-40">•</span>
                        <span className={quest.completed ? "text-green-500" : "text-amber-500"}>
                          {quest.completed ? "Completed" : "Active Claim"}
                        </span>
                      </div>
                    </div>

                    {!quest.completed ? (
                      <button
                        id={`quest-claim-btn-${quest.id}`}
                        onClick={() => handleClaimQuest(quest.id, quest.xp)}
                        className={`p-1.5 px-3 rounded-lg text-[10px] font-bold uppercase transition-all shrink-0 cursor-pointer ${getThemeButton()}`}
                      >
                        Claim
                      </button>
                    ) : (
                      <span className="p-1 px-2.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold tracking-wide">
                        CLAIMED
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SKILLS MATRICES SUB-CARDS (Languages, Tools, Platforms) */}
        <div id="skills-catalog-panel" className={`lg:col-span-7 space-y-6 flex flex-col justify-between`}>
          {skillCategories.map((category, idx) => (
            <div key={idx} className={`p-5 rounded-2xl border ${cardBg}`}>
              <h3 className="font-bold text-sm uppercase tracking-wider text-violet-500 font-mono mb-4 flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-violet-400" /> {category.name}
              </h3>

              <div className="space-y-3.5">
                {category.skills.map((s, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold">{s.name}</span>
                      <span className="font-mono text-[10px] font-bold opacity-60">{s.level}% Mastery</span>
                    </div>

                    <div className="w-full h-1.5 dark:bg-slate-800 bg-slate-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-fuchsia-500 rounded-full"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* HOBBIES INTERESTS & EXTRA FLUID CURVE MATRIX */}
        <div id="interests-hobbies-panel" className={`lg:col-span-5 p-6 rounded-2xl border ${cardBg} flex flex-col justify-between h-full`}>
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Heart className={`w-5 h-5 ${textAccent}`} />
              <h3 className="font-bold text-base">Leisure Interests & Hobbies</h3>
            </div>

            {/* Quick hobby additions */}
            <div className="flex gap-2.5">
              <input
                id="hobby-entry-input"
                type="text"
                placeholder="Insert new interest..."
                value={newHobbyText}
                onChange={(e) => setNewHobbyText(e.target.value)}
                className="flex-1 text-xs p-2 rounded-lg bg-black/20 border border-slate-700 focus:ring-1 focus:ring-violet-500"
              />
              <button
                id="add-hobby-btn"
                onClick={handleAddHobby}
                className="p-2.5 bg-violet-600 rounded-lg text-white hover:bg-violet-700 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Active listing visual tags */}
            <div className="flex flex-wrap gap-2">
              {hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="p-2 px-3 bg-black/15 hover:bg-black/25 rounded-xl border border-inherit/45 text-xs flex items-center gap-1.5 duration-100 font-medium"
                >
                  <span>{hobby}</span>
                  <button
                    id={`remove-hobby-${index}`}
                    onClick={() => handleRemoveHobby(hobby)}
                    className="text-red-500 hover:text-red-400 font-mono p-0.5"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Languages visual rating */}
          <div className="mt-6 pt-6 border-t border-inherit/45">
            <h4 className="text-[10px] font-mono uppercase opacity-40 font-bold mb-3 tracking-wider">Dialect Coordinates</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span>English (Professional Spoken & Written)</span>
                <span className="font-semibold text-emerald-500">Professional Fluency</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Telugu (Native Spoken & Written)</span>
                <span className="font-semibold text-emerald-500">Native</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Hindi (Conversational Spoken)</span>
                <span className="font-semibold text-emerald-500">Conversational</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
