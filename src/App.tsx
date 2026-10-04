/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { GeneratorControls } from './components/GeneratorControls.tsx';
import { ImageSpotlight } from './components/ImageSpotlight.tsx';
import { GalleryGrid } from './components/GalleryGrid.tsx';
import { LightboxModal } from './components/LightboxModal.tsx';
import { MoiInfoModal } from './components/MoiInfoModal.tsx';
import { GeneratedImage, ImageSize, AspectRatio, PresetScene } from './types.ts';
import { PRESET_SCENES } from './data/presets.ts';
import { AlertCircle, Sparkles, Shield, RefreshCw } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'km' | 'en'>('km');
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [activeImage, setActiveImage] = useState<GeneratedImage | null>(null);
  
  // Mandatory affordance: image size (1K, 2K, 4K)
  const [imageSize, setImageSize] = useState<ImageSize>('4K');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  
  // Prompt input pre-populated for Cambodian Police in Ministry of Interior (ក្រសួងមហាផ្ទៃ)
  const [prompt, setPrompt] = useState<string>(
    'Cambodian National Police officers standing in professional uniform in front of the grand Ministry of Interior building (ក្រសួងមហាផ្ទៃ) in Phnom Penh Cambodia. Crisp navy blue and khaki law enforcement uniforms with official Cambodian police badges and peaked caps, ornate Khmer architecture with golden spire rooflines in the background, daytime, photorealistic 8k, majestic and dignified.'
  );

  const [selectedPreset, setSelectedPreset] = useState<string | null>('ceremonial-guard');
  const [activeChip, setActiveChip] = useState<string | null>('Photorealistic 8K');
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const [inspectingImage, setInspectingImage] = useState<GeneratedImage | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Fetch initial showcase gallery on mount
  useEffect(() => {
    const fetchShowcase = async () => {
      try {
        const res = await fetch('/api/showcase');
        const data = await res.json();
        if (data.success && data.showcase && data.showcase.length > 0) {
          setImages(data.showcase);
          setActiveImage(data.showcase[0]);
        }
      } catch (err) {
        console.error('Failed to load initial showcase:', err);
      }
    };
    fetchShowcase();
  }, []);

  // Handle Preset Selection
  const handleSelectPreset = (preset: PresetScene) => {
    setSelectedPreset(preset.id);
    setPrompt(preset.prompt);
    setImageSize(preset.recommendedSize);
    setAspectRatio(preset.recommendedRatio);
  };

  // Toggle style chip
  const handleToggleChip = (chip: string) => {
    setActiveChip(prev => (prev === chip ? null : chip));
  };

  // Handle Image Generation via gemini-3-pro-image-preview
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    const stepsKm = [
      'កំពុងតភ្ជាប់ទៅកាន់ម៉ូដែល gemini-3-pro-image-preview...',
      'កំពុងសំយោគស្ថាបត្យកម្មវិមានទីស្តីការក្រសួងមហាផ្ទៃ...',
      'កំពុងរៀបចំឯកសណ្ឋាន និងផ្លាកសញ្ញានគរបាលជាតិកម្ពុជា...',
      `កំពុងបង្កើតកម្រិតគុណភាពច្បាស់ ${imageSize}...`,
      'កំពុងបញ្ចប់ការផលិតរូបភាព...',
    ];

    const stepsEn = [
      'Connecting to model gemini-3-pro-image-preview...',
      'Synthesizing Khmer architectural motifs of Ministry of Interior...',
      'Rendering Cambodian National Police uniforms and official insignia...',
      `Rendering at ultra-sharp ${imageSize} resolution...`,
      'Finalizing high-resolution output...',
    ];

    const steps = lang === 'km' ? stepsKm : stepsEn;
    setLoadingStepText(steps[0]);

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx = (stepIdx + 1) % steps.length;
      setLoadingStepText(steps[stepIdx]);
    }, 2500);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageSize,
          aspectRatio,
          stylePreset: activeChip,
          policeUnit: selectedPreset
            ? PRESET_SCENES.find((p) => p.id === selectedPreset)?.unit
            : 'នគរបាលជាតិកម្ពុជា (Cambodian National Police)',
        }),
      });

      const data = await response.json();
      clearInterval(interval);

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate image. Please try again.');
      }

      setImages((prev) => [data.image, ...prev]);
      setActiveImage(data.image);
    } catch (err: any) {
      clearInterval(interval);
      setError(err?.message || 'Error occurred while generating image.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Header
        lang={lang}
        setLang={setLang}
        onOpenInfo={() => setIsInfoOpen(true)}
      />

      {/* Main Studio Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Error notification banner if any */}
        {error && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/80 text-red-200 text-xs sm:text-sm flex items-start gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{lang === 'km' ? 'មានបញ្ហាក្នុងការបង្កើតរូបភាព' : 'Generation Notice'}</p>
              <p className="text-red-300 mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-200 text-xs font-bold px-2 py-1 rounded bg-red-900/50 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Dual Column Layout: Left Generator Controls, Right Active Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Controls Column (5 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-5">
            <GeneratorControls
              lang={lang}
              prompt={prompt}
              setPrompt={setPrompt}
              imageSize={imageSize}
              setImageSize={setImageSize}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              selectedPreset={selectedPreset}
              onSelectPreset={handleSelectPreset}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              activeChip={activeChip}
              onToggleChip={handleToggleChip}
              loadingStepText={loadingStepText}
            />
          </div>

          {/* Active Image Spotlight Column (7 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-7">
            <ImageSpotlight
              image={activeImage}
              lang={lang}
              onInspect={(img) => setInspectingImage(img)}
              isLoading={isLoading}
              loadingStepText={loadingStepText}
            />
          </div>
        </div>

        {/* Showcase Gallery Grid */}
        <div className="pt-4">
          <GalleryGrid
            images={images}
            selectedImageId={activeImage?.id || null}
            onSelectImage={(img) => setActiveImage(img)}
            onInspectImage={(img) => setInspectingImage(img)}
            lang={lang}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Shield className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-slate-300">
              {lang === 'km' ? 'ក្រសួងមហាផ្ទៃ • នគរបាលជាតិកម្ពុជា' : 'Ministry of Interior • Cambodian National Police'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Model: <code className="text-amber-400 font-mono">gemini-3-pro-image-preview</code> • Sizes: 1K, 2K, 4K
          </p>
        </div>
      </footer>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        image={inspectingImage}
        onClose={() => setInspectingImage(null)}
        lang={lang}
      />

      {/* Ministry of Interior Info Modal */}
      <MoiInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        lang={lang}
      />
    </div>
  );
}
