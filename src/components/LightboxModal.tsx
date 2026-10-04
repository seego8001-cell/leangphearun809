import React, { useState } from 'react';
import { GeneratedImage } from '../types.ts';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Shield, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  ExternalLink
} from 'lucide-react';

interface LightboxModalProps {
  image: GeneratedImage | null;
  onClose: () => void;
  lang: 'km' | 'en';
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  image,
  onClose,
  lang,
}) => {
  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!image) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = image.url;
    a.download = `Cambodia_Police_MOI_${image.imageSize}_${image.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(image.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-4 sm:p-6 overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-white">
                {lang === 'km' ? image.khmerTitle : image.title}
              </h3>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {image.imageSize}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300">
                {image.aspectRatio}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Model: {image.model} • {image.unit}
            </p>
          </div>
        </div>

        {/* Toolbar controls */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-slate-300">
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
              className="p-1 hover:text-white transition cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] px-1 font-mono">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
              className="p-1 hover:text-white transition cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1 hover:text-white transition cursor-pointer"
              title="Reset zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleCopyPrompt}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="Copy prompt"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer shadow-md"
            title="Download image"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{lang === 'km' ? 'ទាញយក' : 'Download'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-2 rounded-xl bg-slate-950/80 border border-slate-900">
        <div 
          className="transition-transform duration-150 ease-out origin-center"
          style={{ transform: `scale(${zoom})` }}
        >
          <img
            src={image.url}
            alt={image.prompt}
            referrerPolicy="no-referrer"
            className="max-h-[75vh] max-w-full rounded-lg shadow-2xl object-contain border border-slate-800/80"
          />
        </div>
      </div>

      {/* Prompt footer */}
      <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-4 text-xs text-slate-300">
        <div className="truncate">
          <span className="text-amber-400 font-semibold mr-2">{lang === 'km' ? 'ការពិពណ៌នា៖' : 'Prompt:'}</span>
          <span className="text-slate-300">{image.prompt}</span>
        </div>
        <span className="shrink-0 text-slate-500 font-mono text-[11px]">
          {new Date(image.timestamp).toLocaleString()}
        </span>
      </div>
    </div>
  );
};
