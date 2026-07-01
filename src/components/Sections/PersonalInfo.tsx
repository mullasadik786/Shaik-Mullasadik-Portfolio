import React, { useState } from "react";
import { 
  Contact, 
  Mail, 
  Phone, 
  MapPin, 
  Info, 
  Github, 
  Linkedin, 
  Twitter, 
  Globe, 
  Check, 
  Edit3, 
  QrCode,
  ShieldAlert,
  Download,
  Flame,
  CheckCircle2,
  AlertCircle,
  Award,
  Cloud
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Profile, PortfolioData, UserSettings } from "../../types";

interface PersonalInfoProps {
  data: PortfolioData;
  onUpdate: (updatedData: Partial<PortfolioData>) => void;
  settings: UserSettings;
}

export default function PersonalInfo({ data, onUpdate, settings }: PersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Profile>({ ...data.profile });
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleSave = () => {
    onUpdate({ profile: editedProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...data.profile });
    setIsEditing(false);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2000);
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
            <Contact className={`w-6 h-6 ${textAccent}`} />
            <span>Personal Information</span>
          </h2>
          <p className="text-sm opacity-60 mt-1">Identity coordinates, contact links, and business card hub.</p>
        </div>

        {/* Edit Button */}
        <AnimatePresence mode="wait">
          {!isEditing ? (
            <motion.button
              id="edit-profile-btn"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-inherit text-xs font-semibold hover:bg-white/5 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile
            </motion.button>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex items-center gap-2"
            >
              <button
                id="cancel-profile-btn"
                onClick={handleCancel}
                className="px-3 py-1.5 rounded-lg border border-red-500/35 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="save-profile-btn"
                onClick={handleSave}
                className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 cursor-pointer ${getThemeButton()}`}
              >
                <Check className="w-3.5 h-3.5" /> Save Profile
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BODY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Contact Parameters */}
        <div id="contact-credentials-panel" className={`lg:col-span-7 p-6 rounded-2xl border ${cardBg} space-y-6`}>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-violet-500 font-mono mb-4">Coordinates</h3>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold opacity-70">Full Name</label>
                    <input
                      id="edit-name"
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold opacity-70">Professional Title</label>
                    <input
                      id="edit-title"
                      type="text"
                      value={editedProfile.title}
                      onChange={(e) => setEditedProfile({ ...editedProfile, title: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold opacity-70">Email Address</label>
                    <input
                      id="edit-email"
                      type="text"
                      value={editedProfile.socials.email}
                      onChange={(e) => setEditedProfile({ 
                        ...editedProfile, 
                        socials: { ...editedProfile.socials, email: e.target.value } 
                      })}
                      className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold opacity-70">Phone Number</label>
                    <input
                      id="edit-phone"
                      type="text"
                      value={editedProfile.socials.phone}
                      onChange={(e) => setEditedProfile({ 
                        ...editedProfile, 
                        socials: { ...editedProfile.socials, phone: e.target.value } 
                      })}
                      className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold opacity-70">Location</label>
                    <input
                      id="edit-location"
                      type="text"
                      value={editedProfile.location}
                      onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold opacity-70">Availability Status</label>
                    <select
                      id="edit-availability"
                      value={editedProfile.availability}
                      onChange={(e) => setEditedProfile({ ...editedProfile, availability: e.target.value as any })}
                      className="w-full text-xs p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    >
                      <option value="Available">Available</option>
                      <option value="Busy">Busy</option>
                      <option value="Open to Work">Open to Work</option>
                      <option value="Freelancing">Freelancing</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold opacity-70">Short Caption</label>
                  <input
                    id="edit-caption"
                    type="text"
                    value={editedProfile.caption}
                    onChange={(e) => setEditedProfile({ ...editedProfile, caption: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg bg-black/20 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email Display */}
                <div 
                  className={`p-3 rounded-xl border border-inherit bg-black/5 hover:bg-black/10 duration-200 cursor-pointer flex justify-between items-center`}
                  onClick={() => copyToClipboard(editedProfile.socials.email || "", "email")}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono opacity-50 uppercase font-semibold">EMAIL</p>
                      <p className="text-xs font-bold truncate max-w-[170px]">{editedProfile.socials.email}</p>
                    </div>
                  </div>
                  <button id="copy-email-btn" className="text-xs font-mono font-semibold opacity-60">
                    {copiedLink === "email" ? "Copied" : "Copy"}
                  </button>
                </div>

                {/* Phone Display */}
                <div 
                  className="p-3 rounded-xl border border-inherit bg-black/5 hover:bg-black/10 duration-200 cursor-pointer flex justify-between items-center"
                  onClick={() => copyToClipboard(editedProfile.socials.phone || "", "phone")}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono opacity-50 uppercase font-semibold">PHONE</p>
                      <p className="text-xs font-bold">{editedProfile.socials.phone}</p>
                    </div>
                  </div>
                  <button id="copy-phone-btn" className="text-xs font-mono font-semibold opacity-60">
                    {copiedLink === "phone" ? "Copied" : "Copy"}
                  </button>
                </div>

                {/* Location Display */}
                <div className="p-3 rounded-xl border border-inherit bg-black/5 flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono opacity-50 uppercase font-semibold">HQ LOCATION</p>
                    <p className="text-xs font-bold">{editedProfile.location}</p>
                  </div>
                </div>

                {/* Availability Display */}
                <div className="p-3 rounded-xl border border-inherit bg-black/5 flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono opacity-50 uppercase font-semibold">STATUS</p>
                    <p className="text-xs font-bold inline-flex items-center gap-1">
                      {editedProfile.availability}
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Social Matrices */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-violet-500 font-mono mb-4">Core Handles</h3>
            
            {isEditing ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 flex-shrink-0" />
                  <input
                    id="edit-social-github"
                    type="text"
                    placeholder="GitHub URL"
                    value={editedProfile.socials.github}
                    onChange={(e) => setEditedProfile({
                      ...editedProfile,
                      socials: { ...editedProfile.socials, github: e.target.value }
                    })}
                    className="flex-1 text-xs p-2 rounded bg-black/20 border border-slate-700"
                  />
                </div>
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 flex-shrink-0" />
                  <input
                    id="edit-social-linkedin"
                    type="text"
                    placeholder="LinkedIn URL"
                    value={editedProfile.socials.linkedin}
                    onChange={(e) => setEditedProfile({
                      ...editedProfile,
                      socials: { ...editedProfile.socials, linkedin: e.target.value }
                    })}
                    className="flex-1 text-xs p-2 rounded bg-black/20 border border-slate-700"
                  />
                </div>
                <div className="flex items-center gap-2.5">
                  <Twitter className="w-4 h-4 flex-shrink-0" />
                  <input
                    id="edit-social-twitter"
                    type="text"
                    placeholder="Twitter URL"
                    value={editedProfile.socials.twitter}
                    onChange={(e) => setEditedProfile({
                      ...editedProfile,
                      socials: { ...editedProfile.socials, twitter: e.target.value }
                    })}
                    className="flex-1 text-xs p-2 rounded bg-black/20 border border-slate-700"
                  />
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <input
                    id="edit-social-website"
                    type="text"
                    placeholder="Website URL"
                    value={editedProfile.socials.website || ""}
                    onChange={(e) => setEditedProfile({
                      ...editedProfile,
                      socials: { ...editedProfile.socials, website: e.target.value }
                    })}
                    className="flex-1 text-xs p-2 rounded bg-black/20 border border-slate-700 font-sans"
                  />
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 flex-shrink-0 text-sky-400" />
                  <input
                    id="edit-social-trailhead"
                    type="text"
                    placeholder="Salesforce Trailhead URL"
                    value={editedProfile.socials.trailhead || ""}
                    onChange={(e) => setEditedProfile({
                      ...editedProfile,
                      socials: { ...editedProfile.socials, trailhead: e.target.value }
                    })}
                    className="flex-1 text-xs p-2 rounded bg-black/20 border border-slate-700 font-sans"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {editedProfile.socials.github && (
                  <a
                    id="social-link-github"
                    href={editedProfile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl border border-inherit bg-black/5 hover:bg-black/10 duration-150 flex flex-col items-center justify-center text-center gap-1.5"
                  >
                    <Github className="w-5 h-5 opacity-80" />
                    <span className="text-xs font-semibold">GitHub</span>
                  </a>
                )}
                {editedProfile.socials.linkedin && (
                  <a
                    id="social-link-linkedin"
                    href={editedProfile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl border border-inherit bg-black/5 hover:bg-black/10 duration-150 flex flex-col items-center justify-center text-center gap-1.5"
                  >
                    <Linkedin className="w-5 h-5 text-[#0077b5]" />
                    <span className="text-xs font-semibold">LinkedIn</span>
                  </a>
                )}
                {editedProfile.socials.trailhead && (
                  <a
                    id="social-link-trailhead"
                    href={editedProfile.socials.trailhead}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl border border-[#0176d3]/30 bg-[#0176d3]/5 hover:bg-[#0176d3]/15 duration-150 flex flex-col items-center justify-center text-center gap-1.5 border-dashed"
                  >
                    <Cloud className="w-5 h-5 text-[#0176d3]" />
                    <span className="text-xs font-semibold text-[#0176d3]">Trailhead</span>
                  </a>
                )}
                {editedProfile.socials.twitter && (
                  <a
                    id="social-link-twitter"
                    href={editedProfile.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl border border-inherit bg-black/5 hover:bg-black/10 duration-150 flex flex-col items-center justify-center text-center gap-1.5"
                  >
                    <Twitter className="w-5 h-5 text-[#1da1f2]" />
                    <span className="text-xs font-semibold">Twitter</span>
                  </a>
                )}
                {editedProfile.socials.website && (
                  <a
                    id="social-link-website"
                    href={editedProfile.socials.website}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl border border-inherit bg-black/5 hover:bg-black/10 duration-150 flex flex-col items-center justify-center text-center gap-1.5"
                  >
                    <Globe className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs font-semibold">Website</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Professional Wallet Badge */}
        <div id="badge-wallet-panel" className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div 
            className="p-6 rounded-2xl border bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden flex flex-col justify-between h-[340px] shadow-xl ring-1 ring-white/10"
          >
            {/* Ambient glows */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-fuchsia-600/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#38bdf8]/15 rounded-full blur-2xl"></div>

            {/* Logo area */}
            <div className="flex justify-between items-start z-10">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-[#38bdf8] uppercase font-bold">DIGITAL IDENTITY DECK</span>
                <h4 className="font-extrabold text-white text-base tracking-tight leading-none mt-1">Shaik Mullasadik</h4>
              </div>
              <div className="p-1 px-2.5 border border-white/20 rounded-full bg-white/5 flex items-center gap-1 font-mono text-[9px] text-fuchsia-400">
                <Flame className="w-3 h-3 text-fuchsia-500 fill-fuchsia-500" />
                <span>SECURE ID</span>
              </div>
            </div>

            {/* Middle qr area */}
            <div className="flex items-center gap-4 z-10 my-4">
              <div className="p-2.5 bg-white rounded-xl flex items-center justify-center ring-4 ring-indigo-500/25">
                <QrCode className="w-14 h-14 text-indigo-950" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-mono font-medium text-slate-300">USER PARAMS</p>
                <p className="text-sm font-bold tracking-tight text-white">{editedProfile.title}</p>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-indigo-300">
                  <MapPin className="w-3 h-3" />
                  <span>{editedProfile.location}</span>
                </div>
              </div>
            </div>

            {/* Card footer details */}
            <div className="flex items-end justify-between z-10 pt-4 border-t border-white/10">
              <div className="text-left font-mono">
                <p className="text-[8px] opacity-40">ACCIDENTS PREVENTED</p>
                <p className="text-xs text-[#38bdf8] font-semibold">100% SECURE</p>
              </div>
              <div className="text-right font-mono">
                <p className="text-[8px] opacity-40">SYSTEM AUTHORITY</p>
                <p className="text-[10px] font-semibold tracking-wider">LEVEL 12 ARCHITECT</p>
              </div>
            </div>
          </div>

          {/* Quick instructions panel */}
          <div className={`p-4 rounded-xl border ${cardBg} flex items-start gap-3`}>
            <Info className={`w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5`} />
            <div className="text-xs space-y-1 opacity-80">
              <p className="font-bold">Did you know?</p>
              <p>You can adjust the availability status above. Changing state fields update the metadata dynamically across other pages of this dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
