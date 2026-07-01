import React, { useState, useMemo } from "react";
import { 
  Award, 
  Briefcase, 
  Search, 
  Tag, 
  Star, 
  GitFork, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Copy, 
  Compass, 
  Filter, 
  ShieldCheck, 
  FolderGit2,
  X,
  Code,
  Upload,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project, Certification, PortfolioData, UserSettings } from "../../types";

interface CertificationsAndProjectsProps {
  data: PortfolioData;
  onUpdate: (updatedData: Partial<PortfolioData>) => void;
  settings: UserSettings;
}

export default function CertificationsAndProjects({ 
  data, 
  onUpdate, 
  settings 
}: CertificationsAndProjectsProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "certifications">("projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  
  // Modals / Creators
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isAddingCert, setIsAddingCert] = useState(false);

  // Form states for project
  const [pTitle, setPTitle] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pLongDesc, setPLongDesc] = useState("");
  const [pRole, setPRole] = useState("");
  const [pTechsText, setPTechsText] = useState("");
  const [pImageUrl, setPImageUrl] = useState("");
  const [pGithubUrl, setPGithubUrl] = useState("");
  const [pPreviewUrl, setPPreviewUrl] = useState("");
  const [pDate, setPDate] = useState("");

  // Form states for cert
  const [cTitle, setCTitle] = useState("");
  const [cIssuer, setCIssuer] = useState("");
  const [cIssueDate, setCIssueDate] = useState("");
  const [cExpiryDate, setCExpiryDate] = useState("");
  const [cCredId, setCCredId] = useState("");
  const [cCredUrl, setCCredUrl] = useState("");
  const [cIcon, setCIcon] = useState("default");

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // File upload and custom preview states
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string; dataUrl: string } | null>(null);
  const [viewingCert, setViewingCert] = useState<Certification | null>(null);

  // Core technology filter options
  const allTechesCluster = useMemo(() => {
    const list = new Set<string>();
    data.projects.forEach(p => p.technologies.forEach(t => list.add(t)));
    return Array.from(list);
  }, [data.projects]);

  // Project Filter Logic
  const filteredProjects = useMemo(() => {
    return data.projects.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchTech = !selectedTech || p.technologies.includes(selectedTech);
      return matchSearch && matchTech;
    });
  }, [data.projects, searchQuery, selectedTech]);

  // Certifications Filter Logic
  const filteredCerts = useMemo(() => {
    return data.certifications.filter(c => {
      return c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             c.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [data.certifications, searchQuery]);

  // Actions
  const handleAddProject = () => {
    if (!pTitle || !pDesc) return;
    const newP: Project = {
      id: `proj_${Date.now()}`,
      title: pTitle,
      description: pDesc,
      longDescription: pLongDesc,
      role: pRole || "Developer",
      technologies: pTechsText ? pTechsText.split(",").map(t => t.trim()).filter(Boolean) : ["React"],
      imageUrl: pImageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
      githubUrl: pGithubUrl,
      previewUrl: pPreviewUrl,
      completedDate: pDate || "Present",
      featured: false,
      stats: { stars: 0, forks: 0 }
    };

    const updated = [...data.projects, newP];
    onUpdate({ projects: updated });
    resetProjectForm();
  };

  const handleAddCert = () => {
    if (!cTitle || !cIssuer) return;
    const newC: Certification = {
      id: `cert_${Date.now()}`,
      title: cTitle,
      issuer: cIssuer,
      issueDate: cIssueDate || "Present",
      expiryDate: cExpiryDate,
      credentialId: cCredId,
      credentialUrl: cCredUrl,
      iconType: cIcon
    };

    const updated = [...data.certifications, newC];
    onUpdate({ certifications: updated });
    resetCertForm();
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = data.projects.filter(p => p.id !== id);
    onUpdate({ projects: updated });
  };

  const handleDeleteCert = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = data.certifications.filter(c => c.id !== id);
    onUpdate({ certifications: updated });
  };

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetProjectForm = () => {
    setIsAddingProject(false);
    setPTitle("");
    setPDesc("");
    setPLongDesc("");
    setPRole("");
    setPTechsText("");
    setPImageUrl("");
    setPGithubUrl("");
    setPPreviewUrl("");
    setPDate("");
  };

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

  const parseCertificateFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string || "";
      
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
        : `${(file.size / 1024).toFixed(1)} KB`;

      setUploadedFile({
        name: file.name,
        size: sizeStr,
        type: file.type,
        dataUrl: dataUrl
      });

      setCCredUrl(dataUrl);

      let cleanName = file.name;
      cleanName = cleanName.substring(0, cleanName.lastIndexOf('.')) || cleanName;
      cleanName = cleanName.replace(/[-_.]/g, " ");
      cleanName = cleanName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      
      setCTitle(cleanName);

      const lowerName = file.name.toLowerCase();
      let guessedIssuer = "";
      let guessedIcon = "default";

      if (lowerName.includes("salesforce") || lowerName.includes("lwc") || lowerName.includes("apex")) {
        guessedIssuer = "Salesforce";
        guessedIcon = "shield";
      } else if (lowerName.includes("aws") || lowerName.includes("amazon")) {
        guessedIssuer = "Amazon Web Services";
        guessedIcon = "cloud";
      } else if (lowerName.includes("google") || lowerName.includes("gcp") || lowerName.includes("firebase")) {
        guessedIssuer = "Google";
        guessedIcon = "cloud";
      } else if (lowerName.includes("meta") || lowerName.includes("facebook") || lowerName.includes("react")) {
        guessedIssuer = "Meta";
        guessedIcon = "react";
      } else if (lowerName.includes("azure") || lowerName.includes("microsoft")) {
        guessedIssuer = "Microsoft";
        guessedIcon = "cloud";
      } else if (lowerName.includes("mulesoft")) {
        guessedIssuer = "MuleSoft";
        guessedIcon = "shield";
      } else if (lowerName.includes("udemy")) {
        guessedIssuer = "Udemy";
        guessedIcon = "default";
      } else if (lowerName.includes("coursera")) {
        guessedIssuer = "Coursera";
        guessedIcon = "default";
      } else {
        guessedIssuer = "Self-Certified / Other";
        guessedIcon = "default";
      }

      setCIssuer(guessedIssuer);
      setCIcon(guessedIcon);

      const randomId = Math.floor(Math.random() * 10000000);
      setCCredId(`CRED-${randomId}`);
      
      const currentYear = new Date().getFullYear();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentMonth = monthNames[new Date().getMonth()];
      setCIssueDate(`${currentMonth} ${currentYear}`);
    };

    reader.readAsDataURL(file);
  };

  const resetCertForm = () => {
    setIsAddingCert(false);
    setCTitle("");
    setCIssuer("");
    setCIssueDate("");
    setCExpiryDate("");
    setCCredId("");
    setCCredUrl("");
    setCIcon("default");
    setUploadedFile(null);
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
      {/* HEADER CARACTERE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-inherit gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
            <Briefcase className={`w-6 h-6 ${textAccent}`} />
            <span>Certifications & Projects</span>
          </h2>
          <p className="text-sm opacity-60 mt-1">Deploy coordinates, source listings, and official credentials repository.</p>
        </div>

        {/* Dynamic add milestones */}
        <div className="flex items-center gap-2.5">
          {activeTab === "projects" && !isAddingProject && (
            <button
              id="add-project-btn"
              onClick={() => setIsAddingProject(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${getThemeButton()}`}
            >
              <Plus className="w-3.5 h-3.5" /> Project Entry
            </button>
          )}
          {activeTab === "certifications" && !isAddingCert && (
            <div className="flex items-center gap-2">
              <button
                id="upload-cert-header-btn"
                onClick={() => {
                  setIsAddingCert(true);
                  triggerAudioEffect(600, "sine");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all`}
              >
                <Upload className="w-3.5 h-3.5" /> Upload File
              </button>
              <button
                id="add-cert-btn"
                onClick={() => {
                  setIsAddingCert(true);
                  triggerAudioEffect(650, "sine");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${getThemeButton()}`}
              >
                <Plus className="w-3.5 h-3.5" /> Cert Entry
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FILTER SEARCH SUB-BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* TAB SWITCHER */}
        <div className={`p-1 rounded-xl flex items-center border ${settings.theme === "slate-light" ? "bg-slate-100 border-slate-200" : "bg-slate-950 border-white/5"}`}>
          <button
            id="tab-projects-toggle"
            onClick={() => { setActiveTab("projects"); setSearchQuery(""); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "projects"
                ? settings.theme === "slate-light" 
                  ? "bg-white text-slate-900 shadow-sm"
                  : "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Projects Showcase ({data.projects.length})
          </button>
          <button
            id="tab-certs-toggle"
            onClick={() => { setActiveTab("certifications"); setSearchQuery(""); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "certifications"
                ? settings.theme === "slate-light" 
                  ? "bg-white text-slate-900 shadow-sm"
                  : "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Certifications ({data.certifications.length})
          </button>
        </div>

        {/* SEARCH BOX */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            id="projects-search-input"
            type="text"
            placeholder={activeTab === "projects" ? "Search projects or tag..." : "Search certs or issuer..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 rounded-xl bg-black/20 border border-slate-700/60 focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* DETAILED TECH TAGS (ONLY FOR PROJECTS) */}
      {activeTab === "projects" && (
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          <span className="text-xs opacity-50 flex items-center gap-1 mr-1 font-semibold">
            <Filter className="w-3 h-3" /> Tech:
          </span>
          <button
            id="tech-filter-all"
            onClick={() => setSelectedTech(null)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide font-semibold cursor-pointer ${
              !selectedTech 
                ? "bg-violet-600 text-white" 
                : "bg-slate-800/50 text-slate-400 hover:text-white"
            }`}
          >
            ALL CORES
          </button>
          {allTechesCluster.map(tech => (
            <button
              key={tech}
              id={`tech-filter-${tech}`}
              onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide font-semibold cursor-pointer ${
                selectedTech === tech 
                  ? "bg-violet-600 text-white" 
                  : "bg-slate-800/50 text-slate-400 hover:text-white"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      )}

      {/* DYNAMICS ADD PROJECTS CREATOR FORM */}
      <AnimatePresence>
        {isAddingProject && (
          <motion.div
            id="add-project-form-container"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-5 rounded-2xl border ${cardBg} space-y-4`}
          >
            <h3 className="font-bold text-sm">Add Project to Catalog</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider opacity-60">Project Title</label>
                <input
                  id="proj-form-title"
                  type="text"
                  placeholder="e.g. Distributed Crawler"
                  value={pTitle}
                  onChange={(e) => setPTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider opacity-60">Completed Date</label>
                <input
                  id="proj-form-date"
                  type="text"
                  placeholder="e.g. Feb 2026"
                  value={pDate}
                  onChange={(e) => setPDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider opacity-60">Role In Project</label>
                <input
                  id="proj-form-role"
                  type="text"
                  placeholder="e.g. Solo Developer, Team Lead"
                  value={pRole}
                  onChange={(e) => setPRole(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider opacity-60">Technologies (comma separated)</label>
                <input
                  id="proj-form-techs"
                  type="text"
                  placeholder="React, TypeScript, Redux, Docker"
                  value={pTechsText}
                  onChange={(e) => setPTechsText(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider opacity-60">Quick Description</label>
              <input
                id="proj-form-desc"
                type="text"
                placeholder="Brief summary of what the app does..."
                value={pDesc}
                onChange={(e) => setPDesc(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider opacity-60">Detailed Description (Markdown or Text)</label>
              <textarea
                id="proj-form-longdesc"
                placeholder="Architectural deep dive, challenges solved..."
                value={pLongDesc}
                onChange={(e) => setPLongDesc(e.target.value)}
                rows={3}
                className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                id="proj-form-image"
                type="text"
                placeholder="Card Image URL"
                value={pImageUrl}
                onChange={(e) => setPImageUrl(e.target.value)}
                className="text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
              />
              <input
                id="proj-form-github"
                type="text"
                placeholder="GitHub Repository URL"
                value={pGithubUrl}
                onChange={(e) => setPGithubUrl(e.target.value)}
                className="text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 opacity-90"
              />
              <input
                id="proj-form-preview"
                type="text"
                placeholder="Live App/Deploy URL"
                value={pPreviewUrl}
                onChange={(e) => setPPreviewUrl(e.target.value)}
                className="text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 opacity-90"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                id="proj-form-cancel"
                onClick={resetProjectForm}
                className="px-3 py-1.5 rounded-lg border border-red-500/20 text-red-500 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                id="proj-form-save"
                onClick={handleAddProject}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold`}
              >
                Save entry
              </button>
            </div>
          </motion.div>
        )}

        {/* DYNAMICS ADD CERTIFICATION FORM */}
        {isAddingCert && (
          <motion.div
            id="add-cert-form-container"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-5 rounded-2xl border ${cardBg} space-y-4`}
          >
            <h3 className="font-bold text-sm">Add Certificate to Locker</h3>
            
            {/* FILE UPLOAD DRAG-AND-DROP ZONE */}
            <div
              id="cert-dropzone"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const files = e.dataTransfer.files;
                if (files && files.length > 0) {
                  triggerAudioEffect(850, "triangle");
                  parseCertificateFile(files[0]);
                }
              }}
              onClick={() => {
                document.getElementById("cert-file-input")?.click();
              }}
              className={`p-6 rounded-xl border-2 border-dashed transition-all duration-200 text-center cursor-pointer flex flex-col items-center justify-center gap-2.5 ${
                isDragging
                  ? "border-emerald-500 bg-emerald-500/5"
                  : uploadedFile
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-slate-700/60 bg-black/10 hover:border-slate-500 hover:bg-black/20"
              }`}
            >
              <input
                id="cert-file-input"
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    triggerAudioEffect(850, "triangle");
                    parseCertificateFile(files[0]);
                  }
                }}
              />

              {uploadedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2.5">
                    {uploadedFile.type.startsWith("image/") ? (
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-700 flex-shrink-0 bg-slate-950">
                        <img 
                          src={uploadedFile.dataUrl} 
                          alt="preview" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ) : (
                      <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                        <FileText className="w-6 h-6" />
                      </div>
                    )}
                    <div className="text-left space-y-0.5">
                      <p className="text-xs font-bold truncate max-w-[250px] text-emerald-400">
                        {uploadedFile.name}
                      </p>
                      <p className="text-[10px] opacity-50">
                        {uploadedFile.size} • {uploadedFile.type || "Document File"}
                      </p>
                    </div>
                  </div>
                  
                  <span className="text-[10px] font-mono bg-emerald-500 text-black font-extrabold px-2 py-0.5 rounded uppercase tracking-wider mt-1.5 animate-pulse">
                    ✨ Auto-filled & Parsed Successfully!
                  </span>
                </div>
              ) : (
                <>
                  <div className={`p-2.5 rounded-full ${isDragging ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800/50 text-slate-400"}`}>
                    <Upload className="w-5 h-5 animate-bounce" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold">
                      {isDragging ? "Drop your certificate here..." : "Drag & drop your certificate file, or click to browse"}
                    </p>
                    <p className="text-[10px] opacity-50">
                      Supports PNG, JPG, JPEG, or PDF files. Filename will be auto-parsed.
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                id="cert-form-title"
                type="text"
                placeholder="Certificate Title"
                value={cTitle}
                onChange={(e) => setCTitle(e.target.value)}
                className="text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
              />
              <input
                id="cert-form-issuer"
                type="text"
                placeholder="Issuer (e.g. AWS, Meta)"
                value={cIssuer}
                onChange={(e) => setCIssuer(e.target.value)}
                className="text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                id="cert-form-issued"
                type="text"
                placeholder="Issue Date (e.g. Jan 2025)"
                value={cIssueDate}
                onChange={(e) => setCIssueDate(e.target.value)}
                className="text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
              />
              <input
                id="cert-form-expiry"
                type="text"
                placeholder="Expiry Date (or Lifetime)"
                value={cExpiryDate}
                onChange={(e) => setCExpiryDate(e.target.value)}
                className="text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
              />
              <select
                id="cert-form-icon"
                value={cIcon}
                onChange={(e) => setCIcon(e.target.value)}
                className="text-xs p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
              >
                <option value="default">Badge Icon</option>
                <option value="cloud">Cloud / AWS</option>
                <option value="react">React / Code</option>
                <option value="shield">Shield / Sec</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                id="cert-form-credid"
                type="text"
                placeholder="Credential ID Number"
                value={cCredId}
                onChange={(e) => setCCredId(e.target.value)}
                className="text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
              />
              <input
                id="cert-form-credurl"
                type="text"
                placeholder="Verification Url (https://...)"
                value={cCredUrl}
                onChange={(e) => setCCredUrl(e.target.value)}
                className="text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                id="cert-form-cancel"
                onClick={resetCertForm}
                className="px-3 py-1.5 rounded-lg border border-red-500/20 text-red-500 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                id="cert-form-save"
                onClick={handleAddCert}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold`}
              >
                Save Certificate
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDER PROJECTS TAB GRID */}
      {activeTab === "projects" && (
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 border border-dashed border-slate-700/60 rounded-2xl"
            >
              <Compass className="w-12 h-12 text-slate-500 mx-auto mb-3 animate-pulse" />
              <p className="text-sm font-bold">No projects matched these filters.</p>
              <p className="text-xs opacity-50 mt-1">Try resetting the keyword search or tag filters.</p>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredProjects.map((p) => (
                <motion.div
                  key={p.id}
                  layoutId={`project-card-${p.id}`}
                  onClick={() => setSelectedProject(p)}
                  className={`rounded-2xl border overflow-hidden flex flex-col justify-between group/card transition-all duration-300 cursor-pointer ${cardBg} hover:shadow-xl hover:border-violet-500/30`}
                >
                  <div>
                    {/* Project Picture Banner */}
                    <div className="h-44 w-full bg-slate-950 overflow-hidden relative">
                      <img 
                        src={p.imageUrl} 
                        alt={p.title} 
                        className="w-full h-full object-cover group-hover/card:scale-105 duration-300 opacity-90"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider text-fuchsia-400 font-bold border border-white/5">
                        {p.completedDate}
                      </div>

                      {p.stats && (
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-1 px-2.5 rounded-full text-[9px] font-mono flex items-center gap-2 border border-white/5">
                          <span className="flex items-center gap-0.5 text-yellow-500">
                            <Star className="w-3 h-3 fill-yellow-500" /> {p.stats.stars || 0}
                          </span>
                          <span className="flex items-center gap-0.5 text-blue-400">
                            <GitFork className="w-3 h-3" /> {p.stats.forks || 0}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content text */}
                    <div className="p-5 space-y-2">
                      <h3 className="font-extrabold text-base tracking-tight truncate group-hover/card:text-violet-400 duration-150">
                        {p.title}
                      </h3>
                      <p className="text-xs opacity-50 font-mono font-semibold uppercase tracking-wide">
                        {p.role}
                      </p>
                      <p className="text-xs opacity-80 leading-relaxed line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  {/* Core Tags bottom segment */}
                  <div className="p-5 pt-0">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {p.technologies.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="bg-slate-800/10 dark:bg-white/5 text-[9px] font-mono font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
                          {t}
                        </span>
                      ))}
                      {p.technologies.length > 3 && (
                        <span className="text-[9px] font-mono font-bold opacity-50 self-center">
                          +{p.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="pt-3 border-t border-inherit flex items-center justify-between text-xs font-semibold">
                      <span className="opacity-40">View Specs</span>
                      <div className="flex items-center gap-2">
                        <button
                          id={`delete-proj-btn-${p.id}`}
                          onClick={(e) => handleDeleteProject(p.id, e)}
                          className="p-1 px-1.5 rounded hover:bg-red-500/10 text-red-500 cursor-pointer text-[10px] uppercase font-bold tracking-wider"
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* RENDER CERTIFICATIONS TAB LOCKER */}
      {activeTab === "certifications" && (
        <AnimatePresence mode="popLayout">
          {filteredCerts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 border border-dashed border-slate-700/60 rounded-2xl"
            >
              <Award className="w-12 h-12 text-slate-500 mx-auto mb-3 animate-pulse" />
              <p className="text-sm font-bold">No certifications cataloged.</p>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredCerts.map((c) => (
                <motion.div
                  key={c.id}
                  layout
                  className={`p-5 rounded-2xl border relative flex flex-col justify-between group/cert cursor-default transition-all duration-300 ${cardBg} hover:shadow-lg`}
                >
                  <div className="flex items-start gap-4">
                    {/* Badge issuer icon */}
                    <div className="p-3 rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/20 group-hover:scale-105 duration-200">
                      <Award className="w-6 h-6" />
                    </div>

                    {/* Details and coordinates */}
                    <div className="space-y-1 overflow-hidden">
                      <h3 className="font-extrabold text-base tracking-tight leading-snug group-hover:text-violet-400">
                        {c.title}
                      </h3>
                      <p className={`text-xs font-bold ${textAccent}`}>
                        {c.issuer}
                      </p>
                      <p className="text-[10px] opacity-60">
                        Issued: {c.issueDate} {c.expiryDate ? `• Expires: ${c.expiryDate}` : ""}
                      </p>
                    </div>
                  </div>

                  {/* Id information Copy Bar */}
                  {c.credentialId && (
                    <div 
                      id={`copy-cert-id-${c.id}`}
                      onClick={(e) => handleCopyId(c.credentialId || "", e)}
                      className="mt-5 p-2 bg-black/10 hover:bg-black/15 duration-100 rounded-xl flex items-center justify-between text-[11px] font-mono cursor-pointer border border-inherit/45"
                    >
                      <span className="opacity-50 truncate max-w-[200px]">ID: {c.credentialId}</span>
                      <span className="flex items-center gap-1 opacity-80 shrink-0 font-semibold uppercase text-[10px]">
                        {copiedId === c.credentialId ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                        {copiedId === c.credentialId ? "copied" : "id"}
                      </span>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-inherit flex items-center justify-between">
                    {c.credentialUrl ? (
                      c.credentialUrl.startsWith("data:") ? (
                        <button
                          id={`view-uploaded-cert-${c.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingCert(c);
                            triggerAudioEffect(700, "sine");
                          }}
                          className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1.5 hover:underline cursor-pointer bg-transparent border-none p-0"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> View Certificate
                        </button>
                      ) : (
                        <a
                          href={c.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 hover:underline"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Verify Credential <ExternalLink className="w-3 h-3" />
                        </a>
                      )
                    ) : (
                      <span className="text-[10px] opacity-40 font-mono">STABILITY VERIFIED</span>
                    )}

                    <button
                      id={`delete-cert-${c.id}`}
                      onClick={(e) => handleDeleteCert(c.id, e)}
                      className="p-1 px-1.5 text-[9px] uppercase font-mono tracking-wider text-red-400 opacity-0 group-hover/cert:opacity-100 duration-150 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* SPECIFIC SINGLE PROJECT DISPLAY ACCORDION/MODAL BOX */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              layoutId={`project-card-${selectedProject.id}`}
              className={`w-full max-w-2xl rounded-3xl border overflow-hidden p-6 relative flex flex-col justify-between max-h-[85vh] ${cardBg}`}
            >
              <button
                id="close-modal-btn"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-black/20 hover:bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto space-y-6 pr-1">
                <div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-violet-600/10 text-violet-400 border border-violet-500/20 font-bold uppercase tracking-wider">
                    {selectedProject.completedDate}
                  </span>
                  <h2 className="text-2xl font-extrabold tracking-tight mt-3 text-white">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xs opacity-50 font-mono tracking-widest mt-1 uppercase font-semibold">
                    ROLE: {selectedProject.role}
                  </p>
                </div>

                <div className="h-52 w-full rounded-2xl overflow-hidden bg-slate-950">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase font-mono opacity-40 mb-1.5">Project Scope</h4>
                    <p className="text-sm opacity-90 leading-relaxed">
                      {selectedProject.longDescription || selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase font-mono opacity-40 mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((t, idx) => (
                        <span key={idx} className="bg-slate-800 border border-white/5 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase text-indigo-300 font-bold tracking-wide">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <span className="text-xs opacity-40 font-mono">SPECIFICATIONS READY</span>
                <div className="flex gap-3">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5"
                    >
                      <Code className="w-3.5 h-3.5" /> Source Code
                    </a>
                  )}
                  {selectedProject.previewUrl && (
                    <a
                      href={selectedProject.previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${getThemeButton()}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CERTIFICATE FULL PREVIEW LIGHTBOX MODAL */}
      <AnimatePresence>
        {viewingCert && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-3xl rounded-3xl border overflow-hidden p-6 relative flex flex-col justify-between max-h-[90vh] ${cardBg}`}
            >
              <button
                id="close-cert-modal-btn"
                onClick={() => setViewingCert(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-black/20 hover:bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto space-y-4 pr-1">
                <div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                    Certificate Locker Secure
                  </span>
                  <h2 className="text-xl font-extrabold tracking-tight mt-3 text-white">
                    {viewingCert.title}
                  </h2>
                  <p className="text-xs opacity-60 font-mono tracking-widest mt-1 uppercase font-semibold">
                    ISSUER: {viewingCert.issuer} {viewingCert.credentialId ? `| ID: ${viewingCert.credentialId}` : ""}
                  </p>
                </div>

                <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800 p-4 min-h-[300px]">
                  {viewingCert.credentialUrl?.startsWith("data:") ? (
                    viewingCert.credentialUrl.includes("application/pdf") ? (
                      <div className="flex flex-col items-center justify-center text-center p-12 gap-3">
                        <FileText className="w-16 h-16 text-emerald-400 animate-pulse" />
                        <span className="font-mono text-sm font-bold text-white">PDF Certificate Document</span>
                        <p className="text-xs opacity-50 max-w-md">Secure PDF storage container integrated directly into your sandbox portfolio cache storage.</p>
                        <a 
                          href={viewingCert.credentialUrl} 
                          download={`${viewingCert.title.replace(/\s+/g, "_")}.pdf`}
                          className="px-4 py-2 bg-emerald-500 text-black font-bold text-xs rounded-xl hover:bg-emerald-400 transition"
                        >
                          Download PDF File
                        </a>
                      </div>
                    ) : (
                      <img 
                        src={viewingCert.credentialUrl} 
                        alt={viewingCert.title} 
                        className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                        referrerPolicy="no-referrer"
                      />
                    )
                  ) : (
                    <div className="text-center p-8">No uploaded file preview available.</div>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs opacity-50 font-mono pt-2">
                  <span>Issued: {viewingCert.issueDate}</span>
                  {viewingCert.expiryDate && <span>Expires: {viewingCert.expiryDate}</span>}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
