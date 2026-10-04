import React from 'react';
import { 
  Sparkles, 
  Maximize2, 
  Layers, 
  RefreshCw, 
  Sliders, 
  Compass, 
  Check, 
  AlertCircle,
  HelpCircle,
  Shield,
  Landmark,
  Car,
  Zap,
  Moon,
  UserCheck
} from 'lucide-react';
import { ImageSize, AspectRatio, PresetScene } from '../types.ts';
import { PRESET_SCENES, STYLE_CHIPS } from '../data/presets.ts';

interface GeneratorControlsProps {
  lang: 'km' | 'en';
  prompt: string;
  setPrompt: (p: string) => void;
  imageSize: ImageSize;
  setImageSize: (s: ImageSize) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (r: AspectRatio) => void;
  selectedPreset: string | null;
  onSelectPreset: (preset: PresetScene) => void;
  onGenerate: () => void;
  isLoading: boolean;
  activeChip: string | null;
  onToggleChip: (chip: string) => void;
  loadingStepText: string;
}

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({
  lang,
  prompt,
  setPrompt,
  imageSize,
  setImageSize,
  aspectRatio,
  setAspectRatio,
  selectedPreset,
  onSelectPreset,
  onGenerate,
  isLoading,
  activeChip,
  onToggleChip,
  loadingStepText,
}) => {
  const SIZES: { size: ImageSize; label: string; descEn: string; descKm: string; badge?: string }[] = [
    {
      size: '1K',
      label: '1K (1024px)',
      descEn: 'Fast generation • Standard HD',
      descKm: 'ដំណើរការលឿន • កម្រិតស្តង់ដារ HD',
    },
    {
      size: '2K',
      label: '2K (2048px)',
      descEn: 'Balanced clarity • Crisp uniform fabric',
      descKm: 'តុល្យភាពច្បាស់ • លម្អិតសម្លៀកបំពាក់នគរបាល',
      badge: 'Balanced'
    },
    {
      size: '4K',
      label: '4K (4096px)',
      descEn: 'Ultra-Master detail • Spire & badge precision',
      descKm: 'គុណភាពកំពូលច្បាស់បំផុត • លម្អិតកំពូលវិមាន & ផ្លាកសញ្ញា',
      badge: 'Ultra Fidelity'
    }
  ];

  const RATIOS: { ratio: AspectRatio; label: string; iconClass: string }[] = [
    { ratio: '16:9', label: '16:9 (Landscape)', iconClass: 'w-6 h-3.5 border' },
    { ratio: '4:3', label: '4:3 (Standard)', iconClass: 'w-5 h-3.5 border' },
    { ratio: '1:1', label: '1:1 (Square)', iconClass: 'w-4 h-4 border' },
    { ratio: '3:4', label: '3:4 (Portrait)', iconClass: 'w-3.5 h-5 border' },
    { ratio: '9:16', label: '9:16 (Story)', iconClass: 'w-3.5 h-6 border' },
  ];

  const getPresetIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-4 h-4" />;
      case 'Landmark': return <Landmark className="w-4 h-4" />;
      case 'Car': return <Car className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Moon': return <Moon className="w-4 h-4" />;
      case 'UserCheck': return <UserCheck className="w-4 h-4" />;
      default: return <Compass className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 lg:p-6 shadow-xl space-y-6">
      {/* Title & Model Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <span>
              {lang === 'km' ? 'ផ្ទាំងបញ្ជាបង្កើតរូបភាព AI' : 'Image Generation Studio'}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'km' 
              ? 'ម៉ូដែល gemini-3-pro-image-preview ជាមួយជម្រើសទំហំរូបភាព (1K, 2K, 4K)'
              : 'Powered by gemini-3-pro-image-preview with 1K, 2K, and 4K resolution controls'}
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>gemini-3-pro-image-preview</span>
        </div>
      </div>

      {/* Prompts Presets / Scenarios for Cambodian Police at MOI */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'km' ? 'សេណារីយ៉ូគំរូនៅក្រសួងមហាផ្ទៃ' : 'Curated MOI Police Scenarios'}</span>
          </label>
          <span className="text-[11px] text-amber-400/80">
            {lang === 'km' ? 'ចុចដើម្បីបំពេញ' : 'Click to auto-populate'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PRESET_SCENES.slice(0, 6).map((preset) => {
            const isSelected = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`flex items-start gap-2 p-2.5 rounded-xl border text-left transition text-xs cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400/60 text-amber-200 shadow-sm shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                  isSelected ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {getPresetIcon(preset.icon)}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold truncate">
                    {lang === 'km' ? preset.khmerName : preset.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {preset.recommendedSize} • {preset.recommendedRatio}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prompt Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <span>{lang === 'km' ? 'ការពិពណ៌នារូបភាព (Prompt)' : 'Detailed Prompt'}</span>
          </label>
          <button
            onClick={() => setPrompt('')}
            className="text-[11px] text-slate-500 hover:text-slate-300 transition cursor-pointer"
          >
            {lang === 'km' ? 'សម្អាត' : 'Clear'}
          </button>
        </div>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder={
              lang === 'km'
                ? 'ឧទាហរណ៍៖ នគរបាលជាតិកម្ពុជាឈរជាជួរកិត្តិយសនៅមុខវិមានទីស្តីការក្រសួងមហាផ្ទៃ...'
                : 'e.g. Cambodian National Police officers standing in professional uniform in front of the grand Ministry of Interior building (ក្រសួងមហាផ្ទៃ)...'
            }
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition resize-none"
          />
        </div>

        {/* Style Modifier Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {STYLE_CHIPS.map((chip) => {
            const isActive = activeChip === chip;
            return (
              <button
                key={chip}
                onClick={() => onToggleChip(chip)}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{chip}</span>
                {isActive && <Check className="w-3 h-3 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* CORE MANDATORY AFFORDANCE: Image Size Selection (1K, 2K, 4K) */}
      <div className="space-y-2.5 p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-amber-400" />
            <span>{lang === 'km' ? 'ទំហំរូបភាព (Image Size Affordance)' : 'Image Resolution (gemini-3-pro-image-preview)'}</span>
          </label>
          <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono font-medium">
            Active: {imageSize}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SIZES.map(({ size, label, descEn, descKm, badge }) => {
            const isSelected = imageSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => setImageSize(size)}
                className={`relative flex flex-col p-3 rounded-xl border text-left transition cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-500/20 to-amber-950/20 border-amber-400/80 text-white shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5 font-bold text-sm">
                    <span className={isSelected ? 'text-amber-400 font-extrabold' : 'text-slate-200'}>
                      {size}
                    </span>
                    <span className="text-xs text-slate-400 font-normal">
                      {size === '1K' ? '1024px' : size === '2K' ? '2048px' : '4096px'}
                    </span>
                  </div>
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-700" />
                  )}
                </div>

                <p className="text-[11px] text-slate-400 mt-1.5 leading-tight">
                  {lang === 'km' ? descKm : descEn}
                </p>

                {badge && (
                  <span className="mt-2 self-start text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/20">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Aspect Ratio Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === 'km' ? 'សមាមាត្ររូបភាព (Aspect Ratio)' : 'Aspect Ratio'}</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {RATIOS.map(({ ratio, label, iconClass }) => {
            const isSelected = aspectRatio === ratio;
            return (
              <button
                key={ratio}
                type="button"
                onClick={() => setAspectRatio(ratio)}
                className={`flex items-center gap-2 p-2 rounded-xl border text-xs transition cursor-pointer justify-center ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400/60 text-amber-200 font-semibold'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`rounded-sm ${iconClass} ${isSelected ? 'border-amber-400 bg-amber-400/20' : 'border-slate-600'}`} />
                <span>{ratio}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Generate Button */}
      <div className="pt-2">
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition flex items-center justify-center gap-2.5 shadow-lg cursor-pointer ${
            isLoading || !prompt.trim()
              ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 border border-amber-300/40 shadow-amber-500/20 hover:shadow-amber-500/30'
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              <span>{loadingStepText || (lang === 'km' ? 'កំពុងបង្កើតរូបភាព...' : 'Generating Image...')}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-slate-950 fill-current" />
              <span>
                {lang === 'km' 
                  ? `បង្កើតរូបភាព ${imageSize} ដោយ gemini-3-pro-image-preview`
                  : `Generate ${imageSize} Image with gemini-3-pro-image-preview`}
              </span>
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-slate-500 mt-2">
          {lang === 'km'
            ? 'ដំណើរការដោយ Google GenAI SDK នៅខាងម៉ាស៊ីនបម្រើ (Server-Side Architecture)'
            : 'Powered by Server-Side Google GenAI SDK (@google/genai)'}
        </p>
      </div>
    </div>
  );
};
