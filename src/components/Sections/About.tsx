import React, { useState } from "react";
import { User, MessageSquare, ListTodo, Star, Edit3, Check, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PortfolioData, UserSettings } from "../../types";

interface AboutProps {
  data: PortfolioData;
  onUpdate: (updatedData: Partial<PortfolioData>) => void;
  settings: UserSettings;
}

export default function About({ data, onUpdate, settings }: AboutProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [summary, setSummary] = useState(data.about.summary);
  const [philosophies, setPhilosophies] = useState([...data.about.philosophies]);
  const [newPhilosophicsText, setNewPhilosophicsText] = useState("");
  const [strengths, setStrengths] = useState([...data.about.strengths]);

  const handleSave = () => {
    onUpdate({
      about: {
        summary,
        philosophies,
        strengths,
      },
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSummary(data.about.summary);
    setPhilosophies([...data.about.philosophies]);
    setStrengths([...data.about.strengths]);
    setIsEditing(false);
  };

  const addPhilosophy = () => {
    if (newPhilosophicsText.trim()) {
      setPhilosophies([...philosophies, newPhilosophicsText.trim()]);
      setNewPhilosophicsText("");
    }
  };

  const removePhilosophy = (index: number) => {
    setPhilosophies(philosophies.filter((_, i) => i !== index));
  };

  const updateStrength = (index: number, score: number) => {
    const updated = [...strengths];
    updated[index].score = Math.max(0, Math.min(100, score));
    setStrengths(updated);
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
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between pb-4 border-b border-inherit">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
            <User className={`w-6 h-6 ${textAccent}`} />
            <span>About Shaik Mullasadik</span>
          </h2>
          <p className="text-sm opacity-60 mt-1">Professional background, values, and architectural strengths.</p>
        </div>

        {/* Edit controls if developer mode is enabled */}
        {(settings.isDeveloperMode || true) && (
          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.button
                id="edit-about-btn"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-inherit text-xs font-semibold hover:bg-white/5 transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit About
              </motion.button>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex items-center gap-2"
              >
                <button
                  id="cancel-about-btn"
                  onClick={handleCancel}
                  className="px-3 py-1.5 rounded-lg border border-red-500/35 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="save-about-btn"
                  onClick={handleSave}
                  className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 cursor-pointer ${getThemeButton()}`}
                >
                  <Check className="w-3.5 h-3.5" /> Save Changes
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* THREE INTERACTIVE COLUMN BENTO BUBBLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Core Summary */}
        <div id="about-summary-panel" className={`lg:col-span-7 p-6 rounded-2xl border ${cardBg} flex flex-col justify-between`}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className={`w-5 h-5 ${textAccent}`} />
              <h3 className="font-bold text-base">Professional Statement</h3>
            </div>

            {isEditing ? (
              <textarea
                id="about-summary-textarea"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={7}
                className="w-full text-sm p-3 rounded-xl bg-black/20 border border-slate-700/65 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              />
            ) : (
              <p className="text-sm leading-relaxed opacity-90 whitespace-pre-line">
                {data.about.summary}
              </p>
            )}
          </div>

          <div className="mt-6 pt-5 border-t border-inherit/40 flex items-center justify-between text-xs opacity-60">
            <span>Engineering principles tuned</span>
            <span>Est. 2021 - Present</span>
          </div>
        </div>

        {/* Development Philosophy */}
        <div id="about-philosophy-panel" className={`lg:col-span-5 p-6 rounded-2xl border ${cardBg}`}>
          <div className="flex items-center gap-2 mb-4">
            <ListTodo className={`w-5 h-5 ${textAccent}`} />
            <h3 className="font-bold text-base">Core Philosophies</h3>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  id="new-philosophy-input"
                  type="text"
                  placeholder="Add philosophy..."
                  value={newPhilosophicsText}
                  onChange={(e) => setNewPhilosophicsText(e.target.value)}
                  className="flex-1 text-xs p-2 rounded-lg bg-black/20 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
                <button
                  id="add-philosophy-btn"
                  onClick={addPhilosophy}
                  className="p-2 bg-violet-600 rounded-lg text-white hover:bg-violet-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                {philosophies.map((phil, i) => (
                  <div key={i} className="flex items-center justify-between bg-black/10 p-2 rounded text-xs gap-2">
                    <span className="truncate flex-1">{phil}</span>
                    <button
                      id={`delete-philosophy-${i}`}
                      onClick={() => removePhilosophy(i)}
                      className="text-red-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {data.about.philosophies.map((philosophy, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className={`w-1.5 h-1.5 rounded-full mt-2 bg-gradient-to-r from-violet-500 to-indigo-500 flex-shrink-0`}></span>
                  <span className="text-sm opacity-90">{philosophy}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tech Strengths & Metrics */}
        <div id="about-strengths-panel" className={`lg:col-span-12 p-6 rounded-2xl border ${cardBg}`}>
          <div className="flex items-center gap-2 mb-6">
            <Star className={`w-5 h-5 ${textAccent}`} />
            <h3 className="font-bold text-base">Key Mastery Categories</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strengths.map((str, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold">{str.title}</h4>
                    <span className="text-xs opacity-60">{str.description}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isEditing ? (
                      <input
                        id={`strength-score-input-${index}`}
                        type="number"
                        min="0"
                        max="100"
                        value={str.score}
                        onChange={(e) => updateStrength(index, parseInt(e.target.value) || 0)}
                        className="w-12 text-center p-1 text-xs rounded bg-black/20 border border-slate-700"
                      />
                    ) : (
                      <span className="text-sm font-mono font-bold">{str.score}%</span>
                    )}
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-700/20 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${isEditing ? str.score : data.about.strengths[index].score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-fuchsia-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
