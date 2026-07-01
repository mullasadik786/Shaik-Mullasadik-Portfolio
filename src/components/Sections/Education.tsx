import React, { useState } from "react";
import { GraduationCap, Calendar, Plus, Trash2, Edit3, Check, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Education, PortfolioData, UserSettings } from "../../types";

interface EducationProps {
  data: PortfolioData;
  onUpdate: (updatedData: Partial<PortfolioData>) => void;
  settings: UserSettings;
}

export default function EducationPanel({ data, onUpdate, settings }: EducationProps) {
  const [educationList, setEducationList] = useState<Education[]>([...data.education]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditingId, setIsEditingId] = useState<string | null>(null);

  // Form states for new/edited education
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");
  const [achievementsText, setAchievementsText] = useState("");

  const handleAdd = () => {
    if (!institution || !degree || !fieldOfStudy) return;

    const newEdu: Education = {
      id: `edu_${Date.now()}`,
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      description,
      achievements: achievementsText ? achievementsText.split("\n").filter(a => a.trim() !== "") : []
    };

    const updated = [newEdu, ...educationList];
    setEducationList(updated);
    onUpdate({ education: updated });
    resetForm();
  };

  const handleEditStart = (edu: Education) => {
    setIsEditingId(edu.id);
    setInstitution(edu.institution);
    setDegree(edu.degree);
    setFieldOfStudy(edu.fieldOfStudy);
    setStartDate(edu.startDate);
    setEndDate(edu.endDate);
    setGrade(edu.grade || "");
    setDescription(edu.description || "");
    setAchievementsText(edu.achievements ? edu.achievements.join("\n") : "");
  };

  const handleEditSave = (id: string) => {
    const updated = educationList.map(edu => {
      if (edu.id === id) {
        return {
          ...edu,
          institution,
          degree,
          fieldOfStudy,
          startDate,
          endDate,
          grade,
          description,
          achievements: achievementsText ? achievementsText.split("\n").filter(a => a.trim() !== "") : []
        };
      }
      return edu;
    });

    setEducationList(updated);
    onUpdate({ education: updated });
    setIsEditingId(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    const updated = educationList.filter(edu => edu.id !== id);
    setEducationList(updated);
    onUpdate({ education: updated });
  };

  const resetForm = () => {
    setIsAdding(false);
    setIsEditingId(null);
    setInstitution("");
    setDegree("");
    setFieldOfStudy("");
    setStartDate("");
    setEndDate("");
    setGrade("");
    setDescription("");
    setAchievementsText("");
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
            <GraduationCap className={`w-6 h-6 ${textAccent}`} />
            <span>Academic Registry (Education)</span>
          </h2>
          <p className="text-sm opacity-60 mt-1">Verified degrees, high school coordinates, and scholastic medals.</p>
        </div>

        {/* Add school button */}
        {!isAdding && !isEditingId && (
          <button
            id="add-school-btn"
            onClick={() => setIsAdding(true)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${getThemeButton()}`}
          >
            <Plus className="w-3.5 h-3.5" /> Add Milestone
          </button>
        )}
      </div>

      {/* DYNAMICS FORM BLOCK - ADD / EDIT */}
      <AnimatePresence>
        {(isAdding || isEditingId) && (
          <motion.div
            id="education-form-container"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className={`p-5 rounded-2xl border ${cardBg} space-y-4`}
          >
            <h3 className="font-bold text-sm tracking-tight border-b border-inherit/45 pb-2">
              {isAdding ? "Add Academic Milestone" : "Edit Academic Milestone"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold opacity-70">Institution Name</label>
                <input
                  id="edu-form-institution"
                  type="text"
                  placeholder="e.g. Stanford University"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 focus:ring-1 focus:ring-violet-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold opacity-70">Degree / Honor</label>
                <input
                  id="edu-form-degree"
                  type="text"
                  placeholder="e.g. Bachelor of Technology"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 focus:ring-1 focus:ring-violet-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold opacity-70">Field of Study</label>
                <input
                  id="edu-form-field"
                  type="text"
                  placeholder="e.g. Computer Science"
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 focus:ring-1 focus:ring-violet-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold opacity-70">Start Year</label>
                <input
                  id="edu-form-start"
                  type="text"
                  placeholder="e.g. 2021"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 focus:ring-1 focus:ring-violet-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold opacity-70">End Year (or Expected)</label>
                <input
                  id="edu-form-end"
                  type="text"
                  placeholder="e.g. 2025"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 focus:ring-1 focus:ring-violet-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold opacity-70">Grade / GPA / Highlights</label>
                <input
                  id="edu-form-grade"
                  type="text"
                  placeholder="e.g. GPA 9.0/10.0"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 focus:ring-1 focus:ring-violet-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold opacity-70">General Description</label>
              <textarea
                id="edu-form-description"
                placeholder="Brief curriculum details or focus areas..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 focus:ring-1 focus:ring-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold opacity-70">Achievements (one per line)</label>
              <textarea
                id="edu-form-achievements"
                placeholder="Add scholastic medals, club roles, publications..."
                value={achievementsText}
                onChange={(e) => setAchievementsText(e.target.value)}
                rows={3}
                className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 focus:ring-1 focus:ring-violet-500"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                id="edu-form-cancel"
                onClick={resetForm}
                className="px-3.5 py-1.5 rounded-lg border border-red-500/20 text-red-500 text-xs font-semibold hover:bg-red-500/10"
              >
                Cancel
              </button>
              <button
                id="edu-form-save"
                onClick={() => {
                  if (isAdding) handleAdd();
                  else if (isEditingId) handleEditSave(isEditingId);
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1`}
              >
                <Check className="w-3.5 h-3.5" /> Save milestone
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROADMAP TIMELINE */}
      <div id="education-timeline" className="relative pl-6 md:pl-8 border-l border-violet-500/20 py-2 space-y-10">
        
        {educationList.map((edu, index) => (
          <div key={edu.id} className="relative group/timeline">
            
            {/* Timeline bullet node */}
            <div 
              className={`absolute -left-[35px] md:-left-[43px] top-1 w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${
                settings.theme === "slate-light" 
                  ? "bg-white border-slate-200 text-slate-800 shadow" 
                  : "bg-slate-900 border-violet-500/30 text-violet-400 group-hover/timeline:border-violet-400 group-hover/timeline:shadow-[0_0_12px_rgba(139,92,246,0.3)]"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
            </div>

            {/* Timestretch panel */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${cardBg} hover:shadow-lg`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg leading-tight">{edu.institution}</h3>
                    {edu.grade && (
                      <span className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-sm font-semibold opacity-80 mt-1 capitalize ${textAccent}`}>
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>

                  <p className="text-xs opacity-50 flex items-center gap-1.5 mt-2.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.startDate && edu.startDate !== edu.endDate ? `${edu.startDate} — ${edu.endDate}` : edu.endDate}</span>
                  </p>
                </div>

                {/* Edit Actions */}
                <div className="flex items-center gap-2">
                  <button
                    id={`edit-edu-btn-${edu.id}`}
                    onClick={() => handleEditStart(edu)}
                    className="p-1.5 rounded-lg border border-inherit hover:bg-white/5 opacity-0 group-hover/timeline:opacity-100 duration-150 text-xs text-slate-400 hover:text-white"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    id={`delete-edu-btn-${edu.id}`}
                    onClick={() => handleDelete(edu.id)}
                    className="p-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10 opacity-0 group-hover/timeline:opacity-100 duration-150 text-xs text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sub curriculum scope */}
              {edu.description && (
                <p className="text-xs opacity-75 leading-relaxed mt-4 pt-4 border-t border-inherit/45">
                  {edu.description}
                </p>
              )}

              {/* Achievements blocks */}
              {edu.achievements && edu.achievements.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-xs font-semibold tracking-wider font-mono opacity-40 uppercase">Scholastic Achievements</h4>
                  <ul className="space-y-2">
                    {edu.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs opacity-85">
                        <Award className="w-3.5 h-3.5 text-yellow-500/80 flex-shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}
