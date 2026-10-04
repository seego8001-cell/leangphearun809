import React from 'react';
import { Shield, Sparkles, Info, Globe, Building2 } from 'lucide-react';

interface HeaderProps {
  lang: 'km' | 'en';
  setLang: (lang: 'km' | 'en') => void;
  onOpenInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang, onOpenInfo }) => {
  return (
    <header className="border-b border-amber-900/30 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Logo and Titles */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-[10px] bg-slate-950/90 flex items-center justify-center border border-amber-400/40">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="text-amber-400">ក្រសួងមហាផ្ទៃ</span>
                <span className="text-slate-500 hidden sm:inline">•</span>
                <span className="text-slate-300 text-sm sm:text-base font-medium hidden sm:inline">Ministry of Interior</span>
              </h1>
            </div>
            <p className="text-xs text-amber-400/90 font-medium">
              {lang === 'km' 
                ? 'ស្ទូឌីយោបង្កើតរូបភាពនគរបាលជាតិកម្ពុជា • កម្រិតខ្ពស់ 1K | 2K | 4K'
                : 'Cambodian National Police AI Image Studio • High Quality 1K | 2K | 4K'}
            </p>
          </div>
        </div>

        {/* Model Badge & Actions */}
        <div className="flex items-center gap-3">
          {/* Model indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>gemini-3-pro-image-preview</span>
          </div>

          {/* Ministry Info Button */}
          <button
            onClick={onOpenInfo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 text-slate-300 hover:text-amber-300 text-xs transition cursor-pointer"
            title="About Ministry of Interior & Cambodian Police"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{lang === 'km' ? 'អំពីក្រសួង' : 'About MOI'}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'km' ? 'en' : 'km')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs transition cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">{lang === 'km' ? 'EN' : 'ខ្មែរ'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
