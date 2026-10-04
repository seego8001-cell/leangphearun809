import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  Maximize2, 
  Sparkles, 
  Shield, 
  Calendar, 
  Clock, 
  Share2, 
  Eye, 
  Info,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { GeneratedImage } from '../types.ts';

interface ImageSpotlightProps {
  image: GeneratedImage | null;
  lang: 'km' | 'en';
  onInspect: (image: GeneratedImage) => void;
  isLoading: boolean;
  loadingStepText: string;
}

export const ImageSpotlight: React.FC<ImageSpotlightProps> = ({
  image,
  lang,
  onInspect,
  isLoading,
  loadingStepText,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleCopyPrompt = () => {
    if (!image) return;
    navigator.clipboard.writeText(image.prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleDownload = () => {
    if (!image) return;
    const a = document.createElement('a');
    a.href = image.url;
    a.download = `Cambodia_Police_MOI_${image.imageSize}_${image.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (isLoading) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 lg:p-8 flex flex-col items-center justify-center min-h-[440px] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-blue-500/5 animate-pulse" />
        
        {/* Animated Police Beacon / Spinner Motif */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-10 h-10 text-amber-400 animate-bounce" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-2">
          {lang === 'km' ? 'កំពុងបង្កើតរូបភាពនគរបាលជាតិកម្ពុជា...' : 'Synthesizing Cambodian Police Masterpiece...'}
        </h3>
        <p className="text-sm text-amber-300 font-mono max-w-md">
          {loadingStepText || 'Calling gemini-3-pro-image-preview on server...'}
        </p>

        <div className="mt-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>High-Resolution Neural Rendering Active</span>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 lg:p-8 flex flex-col items-center justify-center min-h-[440px] text-center">
        <Shield className="w-16 h-16 text-slate-700 mb-4" />
        <h3 className="text-base font-semibold text-slate-300">
          {lang === 'km' ? 'មិនទាន់មានរូបភាពជ្រើសរើស' : 'No Image Selected'}
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          {lang === 'km'
            ? 'សូមជ្រើសរើសសេណារីយ៉ូ ឬចុចប៊ូតុងបង្កើតរូបភាពដើម្បីចាប់ផ្តើម'
            : 'Select a preset scenario or click Generate to create a new high-quality image'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-5 lg:p-6">
      {/* Top Header Information */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {image.imageSize} Resolution
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300">
              {image.aspectRatio}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-400/90 font-mono">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {image.model}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1.5 line-clamp-1">
            {lang === 'km' ? image.khmerTitle : image.title}
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onInspect(image)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
            title="Inspect in full resolution"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'km' ? 'ពង្រីក' : 'Inspect'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer shadow-md shadow-amber-500/10"
            title="Download high-resolution image"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'km' ? 'ទាញយក' : 'Download'}</span>
          </button>
        </div>
      </div>

      {/* Main Image Display Frame */}
      <div 
        onClick={() => onInspect(image)}
        className="group relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer shadow-inner flex items-center justify-center max-h-[520px]"
      >
        <img
          src={image.url}
          alt={image.prompt}
          referrerPolicy="no-referrer"
          className="w-full h-auto max-h-[520px] object-contain transition duration-300 group-hover:scale-[1.01]"
        />

        {/* Overlay Hover Prompt & Zoom Hint */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
          <div className="flex items-center justify-between w-full text-white text-xs">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Eye className="w-4 h-4" />
              {lang === 'km' ? 'ចុចដើម្បីមើលទំហំពេញ' : 'Click to inspect full resolution'}
            </span>
            <span className="font-mono text-slate-400">{image.imageSize} • {image.aspectRatio}</span>
          </div>
        </div>
      </div>

      {/* Image Metadata & Prompt Details */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {lang === 'km' ? 'ការពិពណ៌នាពីមន្ត្រីនគរបាល & ក្រសួងមហាផ្ទៃ' : 'Context & Prompt Details'}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {image.prompt}
            </p>
          </div>
          <button
            onClick={handleCopyPrompt}
            className="shrink-0 p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="Copy prompt"
          >
            {copiedPrompt ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="pt-2 border-t border-slate-850 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>{image.unit}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 font-mono">
            <Clock className="w-3 h-3" />
            <span>{new Date(image.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
