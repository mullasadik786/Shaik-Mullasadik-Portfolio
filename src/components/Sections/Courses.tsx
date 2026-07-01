import React, { useState } from "react";
import { BookOpen, Award, CheckCircle2, Circle, Clock, Plus, Trash2, ArrowUpRight, Percent } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Course, PortfolioData, UserSettings } from "../../types";

interface CoursesProps {
  data: PortfolioData;
  onUpdate: (updatedData: Partial<PortfolioData>) => void;
  settings: UserSettings;
}

export default function CoursesPanel({ data, onUpdate, settings }: CoursesProps) {
  const [coursesList, setCoursesList] = useState<Course[]>([...data.courses]);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [provider, setProvider] = useState("");
  const [duration, setDuration] = useState("");
  const [progress, setProgress] = useState(100);
  const [status, setStatus] = useState<"Completed" | "In Progress" | "Planned">("Completed");
  const [skillsText, setSkillsText] = useState("");

  const handleAdd = () => {
    if (!title || !provider) return;

    const newCourse: Course = {
      id: `course_${Date.now()}`,
      title,
      provider,
      duration: duration || "Self-Paced",
      progress: status === "Completed" ? 100 : progress,
      status,
      skillsAcquired: skillsText ? skillsText.split(",").map(s => s.trim()).filter(Boolean) : []
    };

    const updated = [...coursesList, newCourse];
    setCoursesList(updated);
    onUpdate({ courses: updated });
    setIsAdding(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    const updated = coursesList.filter(c => c.id !== id);
    setCoursesList(updated);
    onUpdate({ courses: updated });
  };

  const handleProgressChange = (id: string, newProgress: number) => {
    const updated = coursesList.map(c => {
      if (c.id === id) {
        const val = Math.max(0, Math.min(100, newProgress));
        return {
          ...c,
          progress: val,
          status: val === 100 ? "Completed" as const : "In Progress" as const,
          completionDate: val === 100 ? "Present" : undefined
        };
      }
      return c;
    });
    setCoursesList(updated);
    onUpdate({ courses: updated });
  };

  const resetForm = () => {
    setTitle("");
    setProvider("");
    setDuration("");
    setProgress(100);
    setStatus("Completed");
    setSkillsText("");
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
            <BookOpen className={`w-6 h-6 ${textAccent}`} />
            <span>Courses & Masterclasses</span>
          </h2>
          <p className="text-sm opacity-60 mt-1 font-sans">Active study plans, completed university classes, and technology workshops.</p>
        </div>

        {!isAdding && (
          <button
            id="add-course-btn"
            onClick={() => setIsAdding(true)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${getThemeButton()}`}
          >
            <Plus className="w-3.5 h-3.5" /> Course Entry
          </button>
        )}
      </div>

      {/* RENDER ADD COURSE FORM */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            id="add-course-form-container"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-5 rounded-2xl border ${cardBg} space-y-4`}
          >
            <h3 className="font-bold text-sm">Add Academic or Professional Course</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                id="course-form-title"
                type="text"
                placeholder="Course Title (e.g. Master Class Redis)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
              />
              <input
                id="course-form-provider"
                type="text"
                placeholder="Syllabus Provider (e.g. Coursera, MIT)"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                id="course-form-duration"
                type="text"
                placeholder="Duration (e.g. 30 hours, 3 units)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
              />
              <select
                id="course-form-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="text-xs p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Planned">Planned</option>
              </select>

              {status !== "Completed" && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono opacity-50 font-medium">Progress %:</span>
                  <input
                    id="course-form-progress"
                    type="number"
                    min="1"
                    max="99"
                    value={progress}
                    onChange={(e) => setProgress(parseInt(e.target.value) || 50)}
                    className="flex-1 text-center text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
                  />
                </div>
              )}
            </div>

            <input
              id="course-form-skills"
              type="text"
              placeholder="Skills acquired (comma-separated, e.g. SQL, Performance Tracking)"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
            />

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                id="course-form-cancel"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 rounded-lg border border-red-500/20 text-red-500 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                id="course-form-save"
                onClick={handleAdd}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold"
              >
                Save Course
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDER COURSES CARDS LIST */}
      <div id="courses-grid-list" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coursesList.map((course) => {
          const isCompleted = course.status === "Completed" || course.progress === 100;
          return (
            <div
              key={course.id}
              className={`p-6 rounded-2xl border group/course duration-200 flex flex-col justify-between ${cardBg} hover:shadow-lg`}
            >
              <div>
                {/* Header card metrics */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base tracking-tight leading-tight group-hover/course:text-violet-400">
                      {course.title}
                    </h3>
                    <p className={`text-xs font-bold ${textAccent}`}>{course.provider}</p>
                  </div>

                  {/* Status Badges */}
                  {isCompleted ? (
                    <span className="p-1 px-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono font-bold flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> COMPLETED
                    </span>
                  ) : (
                    <span className="p-1 px-2 text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-500 font-mono font-bold shrink-0 flex items-center gap-1 uppercase">
                      <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} /> {course.status}
                    </span>
                  )}
                </div>

                {/* Duration Coordinate */}
                <p className="text-xs opacity-50 flex items-center gap-1 mt-3 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Duration: {course.duration}</span>
                </p>

                {/* Progress Indicators and adjuster sliders */}
                <div className="mt-4 pt-4 border-t border-inherit/45 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="opacity-40">Class Progress Rate</span>
                    <span className="font-mono font-bold">{course.progress}%</span>
                  </div>

                  <div className="w-full h-1.5 dark:bg-slate-800 bg-slate-300 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full duration-300 ${
                        isCompleted 
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500" 
                          : "bg-gradient-to-r from-violet-500 to-indigo-500"
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  {/* Quick adjuster sliders for interactive demo */}
                  {!isCompleted && (
                    <div className="flex items-center justify-between gap-4 pt-1 opacity-0 group-hover/course:opacity-100 duration-200">
                      <span className="text-[10px] italic opacity-50">Tune slider to complete:</span>
                      <input
                        id={`progress-slider-${course.id}`}
                        type="range"
                        min="0"
                        max="100"
                        value={course.progress}
                        onChange={(e) => handleProgressChange(course.id, parseInt(e.target.value))}
                        className="w-24 accent-violet-500 cursor-pointer h-1 rounded"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Skills acquired block tags */}
              {course.skillsAcquired && course.skillsAcquired.length > 0 && (
                <div className="mt-4 pt-4 border-t border-inherit/45">
                  <p className="text-[10px] font-mono uppercase opacity-40 font-bold mb-1.5 tracking-wider">Skills Acquired</p>
                  <div className="flex flex-wrap gap-1">
                    {course.skillsAcquired.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-800/20 dark:bg-slate-900 border border-slate-700/40 text-[9px] font-mono px-2 py-0.5 rounded capitalize"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Delete action */}
              <div className="mt-4 flex justify-end">
                <button
                  id={`delete-course-btn-${course.id}`}
                  onClick={() => handleDelete(course.id)}
                  className="p-1 px-2 rounded hover:bg-red-500/10 text-red-500 text-[10px] font-mono uppercase tracking-wider opacity-0 group-hover/course:opacity-100 duration-150 cursor-pointer"
                >
                  Remove Course
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
