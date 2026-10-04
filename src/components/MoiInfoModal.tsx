import React from 'react';
import { X, Shield, Landmark, MapPin, Award, CheckCircle2, Building, Flag } from 'lucide-react';

interface MoiInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'km' | 'en';
}

export const MoiInfoModal: React.FC<MoiInfoModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {lang === 'km' ? 'ក្រសួងមហាផ្ទៃ • នគរបាលជាតិកម្ពុជា' : 'Ministry of Interior • Cambodian National Police'}
            </h3>
            <p className="text-xs text-amber-400 font-medium">
              {lang === 'km' 
                ? 'ព័ត៌មានប្រវត្តិ និងស្ថាបត្យកម្មវិមានទីស្តីការក្រសួងមហាផ្ទៃ' 
                : 'Architectural & Institutional Overview (Phnom Penh, Cambodia)'}
            </p>
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Section 1: Architecture */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2 text-sm">
              <Building className="w-4 h-4 text-amber-400" />
              <span>{lang === 'km' ? 'ស្ថាបត្យកម្មវិមានទីស្តីការក្រសួងមហាផ្ទៃ' : 'Headquarters Architecture'}</span>
            </h4>
            <p>
              {lang === 'km'
                ? 'វិមានទីស្តីការថ្មីនៃក្រសួងមហាផ្ទៃ មានទីតាំងស្ថិតនៅលើមហាវិថីព្រះនរោត្តម រាជធានីភ្នំពេញ។ អគារនេះត្រូវបានសាងសង់ឡើងតាមរចនាបថស្ថាបត្យកម្មខ្មែរទំនើប អមដោយដំបូលហោជាង និងកំពូលស្រួចពណ៌មាសដ៏ស្កឹមស្កៃ រួមបញ្ចូលគ្នានូវរចនាបថប្រាសាទបុរាណ និងអគាររដ្ឋបាលសម័យទំនើប។'
                : 'The grand national headquarters of the Ministry of Interior (ក្រសួងមហាផ្ទៃ) is located along Norodom Boulevard in Phnom Penh. It features magnificent Khmer tiered gable roofs crowned with ornate golden spires, synthesizing Angkorian heritage with state-of-the-art national administrative infrastructure.'}
            </p>
          </div>

          {/* Section 2: National Police */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>{lang === 'km' ? 'អគ្គស្នងការដ្ឋាននគរបាលជាតិ' : 'Cambodian National Police Force'}</span>
            </h4>
            <p>
              {lang === 'km'
                ? 'នគរបាលជាតិកម្ពុជា ស្ថិតក្រោមការគ្រប់គ្រងរបស់ក្រសួងមហាផ្ទៃ មានភារកិច្ចការពារសន្តិសុខជាតិ សណ្តាប់ធ្នាប់សាធារណៈ សុវត្ថិភាពសង្គម និងការអនុវត្តច្បាប់។ ឯកសណ្ឋានផ្លូវការរួមមានពណ៌ខៀវចាស់ (Navy Blue) និងពណ៌កាគី (Khaki) អមដោយផ្លាកសញ្ញាព្រះរាជក្រម និងមួកប៉ារ៉ែត ឬមួកសេវា។'
                : 'The Cambodian National Police (នគរបាលជាតិ), operating under the Ministry of Interior, oversees homeland security, municipal order, border management, and law enforcement. Official dress consists of navy blue and service khaki uniforms, distinguished service caps, and official emblems.'}
            </p>
          </div>

          {/* Key Facts Pills */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800">
              <span className="text-[11px] text-slate-500 uppercase font-semibold block">
                {lang === 'km' ? 'ទីតាំង' : 'Location'}
              </span>
              <span className="font-semibold text-slate-200 text-xs">
                {lang === 'km' ? 'មហាវិថីព្រះនរោត្តម, ភ្នំពេញ' : 'Norodom Blvd, Phnom Penh'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800">
              <span className="text-[11px] text-slate-500 uppercase font-semibold block">
                {lang === 'km' ? 'ម៉ូដែលបង្កើតរូបភាព' : 'AI Model'}
              </span>
              <span className="font-semibold text-amber-400 font-mono text-xs">
                gemini-3-pro-image-preview
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800">
              <span className="text-[11px] text-slate-500 uppercase font-semibold block">
                {lang === 'km' ? 'កម្រិតទំហំរូបភាព' : 'Resolution Options'}
              </span>
              <span className="font-semibold text-slate-200 text-xs">
                1K (1024px) • 2K (2048px) • 4K (4096px)
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800">
              <span className="text-[11px] text-slate-500 uppercase font-semibold block">
                {lang === 'km' ? 'សមាមាត្ររូបភាព' : 'Aspect Ratios'}
              </span>
              <span className="font-semibold text-slate-200 text-xs">
                16:9 • 4:3 • 1:1 • 3:4 • 9:16
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
          >
            {lang === 'km' ? 'យល់ព្រម' : 'Got it'}
          </button>
        </div>
      </div>
    </div>
  );
};
