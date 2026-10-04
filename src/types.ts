export type ImageSize = '1K' | '2K' | '4K';

export type AspectRatio = '16:9' | '4:3' | '1:1' | '3:4' | '9:16' | '1:4' | '1:8' | '4:1' | '8:1';

export interface GeneratedImage {
  id: string;
  title: string;
  khmerTitle: string;
  prompt: string;
  url: string;
  aspectRatio: string;
  imageSize: ImageSize;
  unit: string;
  timestamp: string;
  model: string;
  description?: string;
}

export interface PresetScene {
  id: string;
  name: string;
  khmerName: string;
  icon: string;
  prompt: string;
  unit: string;
  recommendedRatio: AspectRatio;
  recommendedSize: ImageSize;
}
