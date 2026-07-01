import React from "react";
import { Sliders, Paintbrush, Shield, Gamepad2, RotateCcw, Check, Sparkles, AlertTriangle } from "lucide-react";
import { UserSettings, PortfolioData } from "../../types";

interface SettingsProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onResetData: () => void;
}

export default function SettingsPanel({
  settings,
  onUpdateSettings,
  onResetData
}: SettingsProps) {
  
  const themesList = [
    { id: "arcade-dark", name: "Arcade Dark-Slinger", desc: "Original cosmic blue & deep space coordinates.", color: "bg-[#121620] border-[#38bdf8]" },
    { id: "cyberpunk", name: "Cyberpunk Sector", desc: "Vibrant yellow offsets & neon carbon panels.", color: "bg-[#1c1914] border-[#fbbf24]" },
    { id: "emerald", name: "Forest Jade", desc: "Restful deep greens & organic interface accents.", color: "bg-[#041a12] border-emerald-500" },
    { id: "slate-light", name: "Minimal Slate Light", desc: "Ultra-crisp hospital slate white and absolute focus.", color: "bg-white border-slate-900 shadow-sm" },
    { id: "retro-crt", name: "Amber CRT Console", desc: "High contrast glowing monoculture terminal.", color: "bg-[#141006] border-amber-500" },
    { id: "neon-violet", name: "Electric Violet Pulse", desc: "Fuchsia nebula clusters & cybernetic magenta waves.", color: "bg-[#120822] border-fuchsia-500" },
  ];

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
      ? "bg-white border-slate-200 shadow-sm" 
      : "bg-slate-900/60 backdrop-blur-md border-white/5";
  };

  const textAccent = getThemeTextAccent();
  const cardBg = getThemeCardBg();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-4 border-b border-inherit">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
            <Sliders className={`w-6 h-6 ${textAccent}`} />
            <span>Dashboard Deck Settings</span>
          </h2>
          <p className="text-sm opacity-60 mt-1">Adjust structural parameters, visual layout themes, and edit privileges.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* THEME CONTROL DECK */}
        <div id="settings-theme-deck" className={`lg:col-span-8 p-6 rounded-2xl border ${cardBg}`}>
          <div className="flex items-center gap-2 mb-6">
            <Paintbrush className={`w-5 h-5 ${textAccent}`} />
            <h3 className="font-extrabold text-base">Visual Skin Selectors</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {themesList.map((theme) => {
              const isSelected = settings.theme === theme.id;
              return (
                <div
                  key={theme.id}
                  id={`theme-card-${theme.id}`}
                  onClick={() => onUpdateSettings({ theme: theme.id as any })}
                  className={`p-4 rounded-xl border duration-150 cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected 
                      ? `${theme.color} border-2 shadow-lg ring-2 ring-violet-500/25` 
                      : "bg-[#0b0f19]/20 border-slate-700/40 hover:bg-[#0b0f19]/40"
                  }`}
                >
                  <div className="space-y-1">
                    <p className="text-xs font-black tracking-tight">{theme.name}</p>
                    <p className="text-[10.5px] opacity-60 leading-tight">{theme.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="p-1 rounded-full bg-violet-600 text-white shrink-0">
                      <Check className="w-3.5 h-3.5 font-extrabold" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Wallpaper Selection Deck */}
          <div className="mt-8 border-t border-slate-700/30 pt-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#38bdf8] mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#38bdf8]" /> Wallpaper & Background Settings
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div 
                id="wallpaper-tech-nebula"
                onClick={() => onUpdateSettings({ showWallpaper: true, wallpaperUrl: "/src/assets/images/tech_space_background_1782912496851.jpg" })}
                className={`p-3 rounded-xl border cursor-pointer duration-100 flex flex-col gap-2 ${
                  settings.showWallpaper && settings.wallpaperUrl === "/src/assets/images/tech_space_background_1782912496851.jpg"
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-slate-700/40 bg-black/20 hover:border-slate-500"
                }`}
              >
                <div className="h-12 rounded-lg overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('/src/assets/images/tech_space_background_1782912496851.jpg')` }} />
                <span className="text-[10px] font-bold text-center">Tech Nebula (Generated)</span>
              </div>

              <div 
                id="wallpaper-eco-blur"
                onClick={() => onUpdateSettings({ showWallpaper: true, wallpaperUrl: "https://picsum.photos/seed/sustainability/1920/1080?blur=3" })}
                className={`p-3 rounded-xl border cursor-pointer duration-100 flex flex-col gap-2 ${
                  settings.showWallpaper && settings.wallpaperUrl?.includes("sustainability")
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-slate-700/40 bg-black/20 hover:border-slate-500"
                }`}
              >
                <div className="h-12 rounded-lg overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/sustainability/1920/1080?blur=3')` }} />
                <span className="text-[10px] font-bold text-center">Eco-Sustainability Blur</span>
              </div>

              <div 
                id="wallpaper-none"
                onClick={() => onUpdateSettings({ showWallpaper: false })}
                className={`p-3 rounded-xl border cursor-pointer duration-100 flex flex-col gap-2 items-center justify-center ${
                  !settings.showWallpaper
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-slate-700/40 bg-black/20 hover:border-slate-500"
                }`}
              >
                <div className="h-12 w-full rounded-lg bg-black/40 border border-dashed border-slate-700 flex items-center justify-center text-xs opacity-50">
                  🚫
                </div>
                <span className="text-[10px] font-bold text-center">None (Flat Color)</span>
              </div>
            </div>

            {/* Custom URL Input */}
            <div className="mt-4 space-y-2">
              <label className="text-[10px] font-mono opacity-50 uppercase font-bold" htmlFor="custom-wallpaper-input">
                Custom Wallpaper Image URL
              </label>
              <input
                id="custom-wallpaper-input"
                type="text"
                placeholder="e.g. https://images.unsplash.com/photo-... or local path"
                value={settings.wallpaperUrl || ""}
                onChange={(e) => onUpdateSettings({ showWallpaper: true, wallpaperUrl: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl bg-black/25 border border-slate-700/80 focus:outline-none focus:border-emerald-500/80 text-white"
              />
              <p className="text-[10px] opacity-50 leading-tight">Paste any web image address or local asset path to display as your custom interactive background.</p>
            </div>
          </div>
        </div>

        {/* ECOSYSTEM TOGGLES */}
        <div id="settings-engine-toggles" className={`lg:col-span-4 space-y-6 flex flex-col justify-between`}>
          <div className={`p-6 rounded-2xl border ${cardBg} space-y-5 flex-1`}>
            <div className="flex items-center gap-2 mb-2">
              <Shield className={`w-5 h-5 ${textAccent}`} />
              <h3 className="font-extrabold text-base">Engine Settings</h3>
            </div>

            {/* Developer privilege mode */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-black">Developer Edit Sandbox</p>
                <p className="text-[10px] opacity-60 leading-tight">Enables on-screen addition tools and inline fields.</p>
              </div>
              <input
                id="toggle-developer-mode"
                type="checkbox"
                checked={settings.isDeveloperMode}
                onChange={(e) => onUpdateSettings({ isDeveloperMode: e.target.checked })}
                className="w-4 h-4 cursor-pointer accent-violet-500 mt-1"
              />
            </div>

            {/* Gamification widgets toggle */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-black">Arcade Points widgets</p>
                <p className="text-[10px] opacity-60 leading-tight">Shows levels and daily achievements quest trackers.</p>
              </div>
              <input
                id="toggle-arcade-widgets"
                type="checkbox"
                checked={settings.showArcadeWidgets}
                onChange={(e) => onUpdateSettings({ showArcadeWidgets: e.target.checked })}
                className="w-4 h-4 cursor-pointer accent-violet-500 mt-1"
              />
            </div>

            {/* Simulate audios toggle */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-black">Acoustic Audio FX</p>
                <p className="text-[10px] opacity-60 leading-tight">Triggers subtle synthesized tones on tab switch clicks.</p>
              </div>
              <input
                id="toggle-audio-effects"
                type="checkbox"
                checked={settings.useAudioEffects}
                onChange={(e) => onUpdateSettings({ useAudioEffects: e.target.checked })}
                className="w-4 h-4 cursor-pointer accent-violet-500 mt-1"
              />
            </div>
          </div>

          {/* DUST BIN DESTRUCTIVE ACTIONS */}
          <div className={`p-5 rounded-2xl border border-red-500/20 bg-red-500/5 space-y-3.5`}>
            <div className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <h4 className="font-extrabold text-sm tracking-tight">Recovery Console</h4>
            </div>
            
            <p className="text-[11px] opacity-75 leading-tight">
              Clears customized cache edits and restores Shaik Mullasadik's original professional registry defaults.
            </p>

            <button
              id="reset-portfolio-btn"
              onClick={() => {
                if(window.confirm("Are you sure you want to reset all portfolio customization to Shaik Mullasadik's professional defaults?")) {
                  onResetData();
                }
              }}
              className="w-full py-2.5 bg-red-500/15 hover:bg-red-500/25 duration-100 border border-red-500/30 text-red-400 font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Force Baseline Reset
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
