import React, { useState, useEffect } from "react";
import { 
  Leaf, 
  RefreshCw, 
  Cloud, 
  Shield, 
  Check, 
  Sparkles, 
  Info, 
  Award, 
  Flame, 
  TrendingDown, 
  Activity,
  Trees,
  CheckCircle2,
  Trash2,
  HelpCircle,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PortfolioData, UserSettings } from "../../types";

interface CarbonSaverProps {
  data: PortfolioData;
  onUpdate: (updatedData: Partial<PortfolioData>) => void;
  settings: UserSettings;
}

interface GreenAction {
  id: string;
  title: string;
  category: "Coding" | "Salesforce" | "Lifestyle" | "Hardware";
  co2SavedKg: number;
  xpPoints: number;
  completed: boolean;
  tooltip: string;
}

export default function CarbonSaver({ data, onUpdate, settings }: CarbonSaverProps) {
  const [arcadeStats, setArcadeStats] = useState({ ...data.arcadeStats });
  
  // High-impact green sustainability actions
  const [actions, setActions] = useState<GreenAction[]>([
    {
      id: "a1",
      title: "Optimize LWC Rendering Lifecycle",
      category: "Salesforce",
      co2SavedKg: 0.8,
      xpPoints: 1200,
      completed: false,
      tooltip: "Refined conditional rendering blocks (lwc:if) and optimized wire adapters to minimize remote Salesforce server rendering cycles, saving real network power grid overhead."
    },
    {
      id: "a2",
      title: "Bulkify Apex SOQL & DML Limits",
      category: "Coding",
      co2SavedKg: 2.3,
      xpPoints: 2400,
      completed: false,
      tooltip: "Reauthored legacy non-bulkified loops with robust collection maps. Cut down transactions limits utilization from 85 limits queries count to 3, dramatically dropping database thread overhead."
    },
    {
      id: "a3",
      title: "Shutdown Idle Developer Sandbox",
      category: "Salesforce",
      co2SavedKg: 1.5,
      xpPoints: 1000,
      completed: true,
      tooltip: "Deprovisioned stale Salesforce scratch orgs and paused metadata integrations left running over the weekend. Reduced continuous cloud container compute uptime."
    },
    {
      id: "a4",
      title: "Eco-Friendly Dark Theme Enforcement",
      category: "Lifestyle",
      co2SavedKg: 0.4,
      xpPoints: 500,
      completed: true,
      tooltip: "Activated full application dark layouts on high-brightness OLED displays, decreasing real desktop hardware power consumption with average savings of 30 watts/hour."
    },
    {
      id: "a5",
      title: "Configure Automatic Data Purging Flow",
      category: "Coding",
      co2SavedKg: 1.2,
      xpPoints: 1500,
      completed: false,
      tooltip: "Designed a lightweight Salesforce Scheduled Flow to auto-soft-delete sandbox telemetry logs and attachments older than 14 days, reducing database file store energy consumption."
    },
    {
      id: "a6",
      title: "Commuted to Work via Eco-Transit",
      category: "Lifestyle",
      co2SavedKg: 4.6,
      xpPoints: 2000,
      completed: false,
      tooltip: "Chose public rail transit or shared electric vehicles instead of single-passenger internal combustion vehicles to the Hyderabad Salesforce Hub."
    }
  ]);

  // Custom added tasks by the user
  const [customTitle, setCustomTitle] = useState("");
  const [customCO2, setCustomCO2] = useState("1.0");
  const [customXP, setCustomXP] = useState("800");
  const [customCategory, setCustomCategory] = useState<"Coding" | "Salesforce" | "Lifestyle" | "Hardware">("Salesforce");

  // Local calculation variables
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [growthMilestone, setGrowthMilestone] = useState(1); // 1 = Sprout, 2 = Growing, 3 = OakTree Tree, 4 = Forest Guardian

  // Play click feedback from app settings
  const triggerAudioEffect = (freq: number = 720, type: OscillatorType = "sine") => {
    if (!settings.useAudioEffects) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {}
  };

  // Toggle checklist activity
  const handleToggleAction = (id: string) => {
    triggerAudioEffect(650, "sine");
    setActions(prev => prev.map(a => {
      if (a.id === id) {
        const nextState = !a.completed;
        const ptsChange = nextState ? a.xpPoints : -a.xpPoints;
        const co2Change = nextState ? a.co2SavedKg : -a.co2SavedKg;
        
        // Push a quick visual feedback
        setToastMessage(nextState 
          ? `Checked "${a.title}"! Save in action: +${a.co2SavedKg}kg CO₂!` 
          : `Removed action calculation`
        );
        setTimeout(() => setToastMessage(null), 3500);

        return { ...a, completed: nextState };
      }
      return a;
    }));
  };

  // Handle adding custom items in list
  const handleAddCustomAction = () => {
    if (!customTitle.trim()) return;
    const co2Parsed = parseFloat(customCO2) || 1.0;
    const xpParsed = parseInt(customXP) || 800;

    const newAction: GreenAction = {
      id: "custom_" + Date.now(),
      title: customTitle.trim(),
      category: customCategory,
      co2SavedKg: co2Parsed,
      xpPoints: xpParsed,
      completed: false,
      tooltip: "User customized local carbon tracking target, logged live in portfolio calculator."
    };

    setActions(prev => [newAction, ...prev]);
    setCustomTitle("");
    triggerAudioEffect(800, "triangle");
    
    setToastMessage(`Challenge "${newAction.title}" added to list!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Remove a custom action
  const handleRemoveAction = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActions(prev => prev.filter(a => a.id !== id));
    triggerAudioEffect(350, "sine");
  };

  // Calculate current totals
  const totalCO2Saved = actions.reduce((sum, a) => sum + (a.completed ? a.co2SavedKg : 0), 0);
  const totalXpPending = actions.reduce((sum, a) => sum + (a.completed ? a.xpPoints : 0), 0);
  const completedCount = actions.filter(a => a.completed).length;

  // Determine Sustainability Oak Tree Growth state
  useEffect(() => {
    if (totalCO2Saved < 2.0) {
      setGrowthMilestone(1); // Seedling level
    } else if (totalCO2Saved < 4.5) {
      setGrowthMilestone(2); // Bushy Sprout
    } else if (totalCO2Saved < 8.0) {
      setGrowthMilestone(3); // Young Oak tree
    } else {
      setGrowthMilestone(4); // Giant Salesforce Cloud Oak!
    }
  }, [totalCO2Saved]);

  // Sync back state change updates to parent profile context if claimed
  const handleClaimPointsAndCert = () => {
    if (totalXpPending <= 0) {
      triggerAudioEffect(250, "sawtooth");
      setToastMessage("Please check at least one completed habit to claim rewards!");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    // Play high-pitch achievement trumpet
    triggerAudioEffect(900, "sine");
    setTimeout(() => triggerAudioEffect(1100, "sine"), 80);
    setTimeout(() => triggerAudioEffect(1300, "sine"), 160);

    // Calculate updated points
    const additionalPoints = totalXpPending;
    let newPoints = (arcadeStats.points || 532725) + additionalPoints;
    let oldLevel = arcadeStats.level;
    
    // Scale levels by every 20,000 points logged over 500,000 baseline
    let newLevel = Math.floor(newPoints / 40000);
    if (newLevel < 13) newLevel = 13; // clamp to base level of user request

    // Awards user a dynamic bonus badges increment
    const gainedBadges = Math.max(1, Math.floor(additionalPoints / 1800));
    const newBadges = (arcadeStats.badges || 1338) + gainedBadges;
    const newSuperBadges = (arcadeStats.superBadges || 55) + (totalCO2Saved >= 5.0 ? 1 : 0);

    const updated = {
      ...arcadeStats,
      level: newLevel,
      xpPoints: newPoints,
      points: newPoints,
      badges: newBadges,
      superBadges: newSuperBadges,
      streakDays: arcadeStats.streakDays + 1,
      rank: newLevel >= 15 ? "Eco-Champion Trailblazer Ranger" : "13-Star Ranger Trailblazer"
    };

    setArcadeStats(updated);
    onUpdate({ arcadeStats: updated });

    // Mark current checked items as processed (or clear checks to let them log anew)
    setActions(prev => prev.map(a => a.completed ? { ...a, completed: false } : a));

    setToastMessage(`Eco-Points claimed! Gained +${additionalPoints.toLocaleString()} Points and +${gainedBadges} Trailhead Badge(s)!`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Aesthetic color variations
  const textAccent = settings.theme === "slate-light" ? "text-slate-800" : "text-[#5fc69e]";
  const cardBg = settings.theme === "slate-light" ? "bg-white border-slate-200 shadow-sm" : "bg-slate-900/60 backdrop-blur-md border-white/5";
  const innerCard = settings.theme === "slate-light" ? "bg-slate-50 border-slate-200" : "bg-black/25 border-slate-800";
  const progressTrack = settings.theme === "slate-light" ? "bg-slate-200" : "bg-slate-800";

  return (
    <div className="space-y-6">
      {/* SECTION TITLE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-inherit gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
            <Leaf className="w-6 h-6 text-emerald-400 animate-bounce" />
            <span>Daily Carbon Saver Challenge</span>
          </h2>
          <p className="text-sm opacity-60 mt-1">
            Empowering green sustainable Salesforce software development. Track daily carbon savings, check code optimizations, and level up your Trailblazer stats!
          </p>
        </div>

        {/* Claim interactive widget */}
        <button
          id="claim-eco-points"
          onClick={handleClaimPointsAndCert}
          disabled={totalXpPending === 0}
          className={`flex items-center gap-2 p-2.5 px-4 rounded-xl transition duration-150 shrink-0 text-xs shadow-md ${
            totalXpPending > 0
              ? "bg-[#0176d3] text-white hover:bg-[#0164b3] hover:scale-105"
              : "bg-slate-700/20 text-slate-400 cursor-not-allowed"
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span className="font-bold">Claim +{totalXpPending.toLocaleString()} Points</span>
        </button>
      </div>

      {/* FLOATING ACTION NOTIFICATION TOAST */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            className="p-3.5 px-5 bg-emerald-500 text-black font-semibold rounded-xl text-xs flex items-center justify-between shadow-lg gap-4 z-50 relative border border-emerald-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-950 flex-shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-[10px] font-mono text-emerald-950 opacity-60 hover:opacity-100">
              [Dismiss]
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERVIEW STATS BENTO ROW */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* FOREST PROGRESS BOARD */}
        <div className={`md:col-span-4 p-5 rounded-2xl border ${cardBg} flex flex-col justify-between space-y-4`}>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#0176d3] flex items-center gap-1.5 mb-3">
              <Trees className="w-4 h-4 text-emerald-500" />
              <span>Sustainability Tree</span>
            </h3>

            {/* GROWING STAGE VISUAL */}
            <div className={`p-4 rounded-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[160px] ${innerCard}`}>
              
              {/* Radial ambiance behind tree depending on milestone */}
              <div className={`absolute w-24 h-24 rounded-full blur-2xl opacity-20 ${
                growthMilestone === 1 ? "bg-[#c084fc]" :
                growthMilestone === 2 ? "bg-amber-400" :
                growthMilestone === 3 ? "bg-sky-400" : "bg-emerald-500"
              }`} />

              <motion.div
                key={growthMilestone}
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-center z-10 flex flex-col items-center"
              >
                {/* SVG dynamic tree states based on current claimed milestone */}
                {growthMilestone === 1 && (
                  <div className="text-5xl">🌱</div>
                )}
                {growthMilestone === 2 && (
                  <div className="text-5xl animate-bounce">🌿</div>
                )}
                {growthMilestone === 3 && (
                  <div className="text-5xl">🌳</div>
                )}
                {growthMilestone === 4 && (
                  <div className="text-6xl drop-shadow-[0_4px_10px_rgba(16,185,129,0.4)] animate-pulse">🌲☁️</div>
                )}

                <span className="text-xs font-bold mt-2 font-mono text-[#0176d3]">
                  {growthMilestone === 1 ? "Seedling Sprout" :
                   growthMilestone === 2 ? "Healthy Sapling" :
                   growthMilestone === 3 ? "Salesforce Oak" : "Forest Guardian Eco-God"}
                </span>

                <p className="text-[10px] opacity-50 px-2 mt-1 text-center">
                  {growthMilestone === 1 ? "Check habits below to unlock nutrition!" :
                   growthMilestone === 2 ? "Keep saving carbon! Leaves are budding!" :
                   growthMilestone === 3 ? "Your custom Apex code helped raise a real tree!" : "Amazing! The cloud ecosystem is completely neutral!"}
                </p>
              </motion.div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="opacity-60">Today's CO₂ Avoided:</span>
              <span className="font-extrabold text-emerald-400">{totalCO2Saved.toFixed(1)} kg CO₂</span>
            </div>
            
            {/* PROGRESS TO NEXT STAGE */}
            <div className="space-y-1">
              <div className="w-full h-2 rounded-full overflow-hidden relative bg-black/20">
                <div 
                  className={`h-full bg-gradient-to-r ${
                    growthMilestone === 4 ? "from-emerald-500 to-sky-400" : "from-emerald-400 to-emerald-500"
                  } duration-350`}
                  style={{ width: `${Math.min(100, (totalCO2Saved / 8.0) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[8px] font-mono opacity-50">
                <span>0.0 kg Offset</span>
                <span>8.0 kg (Oak Tree level)</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARBON CALCULATOR SCOREBOARD */}
        <div className={`md:col-span-8 p-5 rounded-2xl border ${cardBg} flex flex-col justify-between space-y-4`}>
          <div>
            <div className="flex items-center justify-between border-b pb-2.5 border-inherit">
              <h3 className="text-sm font-extrabold flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span>Salesforce Sustainability Cloud Telemetry</span>
              </h3>
              <span className="text-[10px] font-mono opacity-50 bg-[#0176d3]/10 text-[#0176d3] px-2 py-0.5 rounded-lg border border-[#0176d3]/15">
                LIVE METRICS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div className={`p-3 rounded-xl border flex flex-col items-center text-center ${innerCard}`}>
                <Leaf className="w-5 h-5 text-emerald-400 mb-1" />
                <span className="text-[9px] font-mono opacity-50 uppercase font-semibold">Active Tasks</span>
                <span className="text-base font-black">{completedCount} / {actions.length}</span>
              </div>

              <div className={`p-3 rounded-xl border flex flex-col items-center text-center ${innerCard}`}>
                <TrendingDown className="w-5 h-5 text-sky-400 mb-1" />
                <span className="text-[9px] font-mono opacity-50 uppercase font-semibold">CO₂ Offset</span>
                <span className="text-base font-black text-emerald-400">{totalCO2Saved.toFixed(1)} kg</span>
              </div>

              <div className={`p-3 rounded-xl border flex flex-col items-center text-center ${innerCard}`}>
                <Sparkles className="w-5 h-5 text-amber-500 mb-1 animate-pulse" />
                <span className="text-[9px] font-mono opacity-50 uppercase font-semibold">Claimable XP</span>
                <span className="text-base font-black text-amber-500">+{totalXpPending.toLocaleString()} pts</span>
              </div>

              <div className={`p-3 rounded-xl border flex flex-col items-center text-center ${innerCard}`}>
                <Flame className="w-5 h-5 text-red-500 mb-1" />
                <span className="text-[9px] font-mono opacity-50 uppercase font-semibold">Eco Streak</span>
                <span className="text-base font-black text-red-500">🔥 {arcadeStats.streakDays} Days</span>
              </div>
            </div>
          </div>

          {/* Quick Informational block */}
          <div className={`p-3 rounded-xl border flex gap-2.5 items-start text-xs leading-relaxed ${innerCard}`}>
            <Info className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-[11px]">Carbon Offset Calculations in IT:</p>
              <p className="opacity-50 text-[10px]">
                Every SOQL query bulkified reduces CPU compute time on Salesforce Multi-tenant pods by roughly 12 milliseconds. Scaling this down across millions of daily batch integrations prevents significant datacentre cooling energy wastes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CHALLENGES TASK CHECKLIST */}
      <div className={`p-5 rounded-2xl border ${cardBg} space-y-4`}>
        <div className="flex items-center justify-between border-b pb-3 border-inherit">
          <h3 className="font-extrabold text-sm flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Today's Eco Checklist</span>
          </h3>
          <span className="text-[10px] font-mono opacity-60">
            Check active tasks to compile savings progress
          </span>
        </div>

        <div className="space-y-2.5">
          {actions.map((action) => (
            <div
              id={`action-item-${action.id}`}
              key={action.id}
              onClick={() => handleToggleAction(action.id)}
              className={`p-3 rounded-xl border cursor-pointer select-none transition duration-150 flex items-start gap-3 justify-between ${
                action.completed
                  ? "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400"
                  : `${innerCard} hover:border-slate-700`
              }`}
            >
              <div className="flex items-start gap-2.5">
                {/* CHECKBOX */}
                <span className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  action.completed
                    ? "bg-emerald-500 border-emerald-500 text-black"
                    : "border-slate-600 bg-black/10"
                }`}>
                  {action.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </span>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-bold leading-none ${action.completed ? "text-emerald-400" : ""}`}>
                      {action.title}
                    </span>
                    <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-black/30 border border-white/5 opacity-80">
                      {action.category}
                    </span>
                  </div>
                  <p className="text-[10.5px] opacity-50 font-sans leading-normal max-w-2xl">
                    {action.tooltip}
                  </p>
                </div>
              </div>

              {/* ACTION REWARDS */}
              <div className="flex flex-col items-end flex-shrink-0 justify-between self-stretch text-right sm:pl-3">
                <span className="text-xs font-black font-mono text-emerald-400">
                  -{action.co2SavedKg} kg CO₂
                </span>
                <span className="text-[10px] font-mono text-amber-500 font-semibold">
                  +{action.xpPoints} Trailhead Pts
                </span>

                {/* Let user delete custom addition elements */}
                {action.id.startsWith("custom_") && (
                  <button
                    id={`remove-${action.id}`}
                    onClick={(e) => handleRemoveAction(action.id, e)}
                    className="p-1 text-slate-500 hover:text-red-400 duration-100"
                    title="Remove custom habit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK FORM TO ADD CUSTOM CHALLENGE */}
      <div className={`p-5 rounded-2xl border ${cardBg} space-y-4`}>
        <h3 className="font-extrabold text-sm flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-emerald-500" />
          <span>Add Custom Carbon Challenge Goal</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-[10px] font-mono opacity-50 uppercase font-bold" htmlFor="custom-title">
              Habit / Challenge Title
            </label>
            <input
              id="custom-title"
              type="text"
              placeholder="e.g. Unplug local desktop test setup after work"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-black/25 border border-slate-700/80 focus:outline-none focus:border-emerald-500/80"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[10px] font-mono opacity-50 uppercase font-bold" htmlFor="custom-co2">
              CO₂ Saved (kg)
            </label>
            <input
              id="custom-co2"
              type="number"
              step="0.1"
              value={customCO2}
              onChange={(e) => setCustomCO2(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-black/25 border border-slate-700/80 focus:outline-none focus:border-emerald-500/80"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[10px] font-mono opacity-50 uppercase font-bold" htmlFor="custom-xp">
              Trailhead Points
            </label>
            <input
              id="custom-xp"
              type="number"
              step="50"
              value={customXP}
              onChange={(e) => setCustomXP(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-black/25 border border-slate-700/80 focus:outline-none focus:border-emerald-500/80"
            />
          </div>

          <div className="md:col-span-1.5 space-y-1.5 flex-1">
            <label className="text-[10px] font-mono opacity-50 uppercase font-bold" htmlFor="custom-cat">
              Category
            </label>
            <select
              id="custom-cat"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded-xl bg-black/25 border border-slate-700/80 focus:outline-none focus:border-emerald-500/80 text-white"
            >
              <option value="Salesforce" className="bg-slate-950">Salesforce</option>
              <option value="Coding" className="bg-slate-950">Coding</option>
              <option value="Lifestyle" className="bg-slate-950">Lifestyle</option>
              <option value="Hardware" className="bg-slate-950">Hardware</option>
            </select>
          </div>

          <button
            id="add-custom-habit-btn"
            onClick={handleAddCustomAction}
            className={`w-full py-2.5 rounded-xl transition font-bold text-xs flex items-center justify-center gap-1.5 ${
              customTitle.trim()
                ? "bg-emerald-500 text-black hover:bg-emerald-400 cursor-pointer"
                : "bg-slate-700/20 text-slate-500 cursor-not-allowed"
            } md:col-span-1.5`}
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
