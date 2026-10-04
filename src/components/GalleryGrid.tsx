import React, { useState } from 'react';
import { GeneratedImage, ImageSize } from '../types.ts';
import { Sparkles, Maximize2, Shield, Filter, Eye } from 'lucide-react';

interface GalleryGridProps {
  images: GeneratedImage[];
  selectedImageId: string | null;
  onSelectImage: (image: GeneratedImage) => void;
  onInspectImage: (image: GeneratedImage) => void;
  lang: 'km' | 'en';
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  images,
  selectedImageId,
  onSelectImage,
  onInspectImage,
  lang,
}) => {
  const [filterSize, setFilterSize] = useState<ImageSize | 'ALL'>('ALL');

  const filteredImages = filterSize === 'ALL'
    ? images
    : images.filter((img) => img.imageSize === filterSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <span>
              {lang === 'km' ? 'បណ្ណាល័យរូបភាពនគរបាលជាតិ & ក្រសួងមហាផ្ទៃ' : 'Cambodia Police & MOI Gallery'}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'km' 
              ? `បង្ហាញចំនួន ${filteredImages.length} ស្នាដៃ (1K, 2K, 4K)`
              : `Showing ${filteredImages.length} generated works across 1K, 2K, and 4K resolutions`}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            onClick={() => setFilterSize('ALL')}
            className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
              filterSize === 'ALL'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'km' ? 'ទាំងអស់' : 'All'}
          </button>
          {(['1K', '2K', '4K'] as ImageSize[]).map((size) => (
            <button
              key={size}
              onClick={() => setFilterSize(size)}
              className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                filterSize === size
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {filteredImages.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl">
          <p className="text-sm text-slate-400">
            {lang === 'km'
              ? 'ពុំទាន់មានរូបភាពតាមលក្ខខណ្ឌចម្រាញ់នេះនៅឡើយទេ'
              : 'No images found for this filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredImages.map((image) => {
            const isSelected = selectedImageId === image.id;
            return (
              <div
                key={image.id}
                onClick={() => onSelectImage(image)}
                className={`group relative rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer flex flex-col bg-slate-900/90 ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/30 shadow-lg shadow-amber-500/10'
                    : 'border-slate-800 hover:border-slate-700 hover:shadow-md'
                }`}
              >
                {/* Thumbnail container */}
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badges on image */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 backdrop-blur-sm text-amber-300 border border-amber-500/30">
                      {image.imageSize}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 backdrop-blur-sm text-slate-300 border border-slate-700">
                      {image.aspectRatio}
                    </span>
                  </div>

                  {/* Quick Inspect Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onInspectImage(image);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 backdrop-blur-sm text-slate-300 hover:text-white hover:bg-amber-500 hover:text-slate-950 border border-slate-700 transition cursor-pointer opacity-0 group-hover:opacity-100"
                    title="Quick inspect"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-white line-clamp-1 group-hover:text-amber-300 transition">
                      {lang === 'km' ? image.khmerTitle : image.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {image.prompt}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="truncate max-w-[150px]">{image.unit}</span>
                    <span className="font-mono text-amber-400/90">{image.model}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
