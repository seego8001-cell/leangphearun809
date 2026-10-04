import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '50mb' }));

// Helper to initialize GoogleGenAI with mandatory User-Agent
const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in the environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Seed gallery images generated specifically for Cambodian Police in MOI
const INITIAL_SHOWCASE = [
  {
    id: 'moi-officers-entrance',
    title: 'National Police Guard at Ministry of Interior',
    khmerTitle: 'នគរបាលជាតិប្រចាំការនៅមុខក្រសួងមហាផ្ទៃ',
    prompt: 'Cambodian National Police officers standing in professional uniform in front of the grand Ministry of Interior building (ក្រសួងមហាផ្ទៃ) in Phnom Penh Cambodia. Crisp navy blue and khaki law enforcement uniforms with official Cambodian police badges and peaked caps, ornate Khmer architecture with golden spire rooflines in the background, daytime, photorealistic 8k, majestic and dignified.',
    url: '/src/assets/images/cambodia_police_moi_1791077639032.jpg',
    aspectRatio: '16:9',
    imageSize: '4K',
    unit: 'កងកិត្តិយស & ពិធីការ (Honor Guard & Protocol)',
    timestamp: '2026-10-03T18:34:00Z',
    model: 'gemini-3-pro-image-preview',
    description: 'Grand view of Cambodian National Police officers standing before the majestic golden spired facade of the Ministry of Interior in Phnom Penh.'
  },
  {
    id: 'moi-headquarters-facade',
    title: 'Ministry of Interior Headquarters Architecture',
    khmerTitle: 'វិមានទីស្ដីការក្រសួងមហាផ្ទៃ រាជធានីភ្នំពេញ',
    prompt: 'The grand national headquarters of the Ministry of Interior of Cambodia (ក្រសួងមហាផ្ទៃ) in Phnom Penh. Magnificent modern Khmer architectural building with golden multi-tiered pitched roofs and traditional spires, landscaped entrance courtyard with Cambodian national flag, bright daylight, architectural photography.',
    url: '/src/assets/images/moi_building_facade_1791077655234.jpg',
    aspectRatio: '16:9',
    imageSize: '4K',
    unit: 'វិមានទីស្នាក់ការកណ្តាល (Central Headquarters)',
    timestamp: '2026-10-03T18:34:10Z',
    model: 'gemini-3-pro-image-preview',
    description: 'The monumental headquarters of the Ministry of Interior along Norodom Boulevard, blending state-of-the-art administrative facilities with authentic Khmer architectural craftsmanship.'
  },
  {
    id: 'moi-patrol-unit',
    title: 'Police Mobile Patrol & Protection Unit',
    khmerTitle: 'កងកម្លាំងល្បាតចល័ត និងការពារសន្តិសុខ',
    prompt: 'Cambodian police officers on patrol with police cruiser in front of Ministry of Interior Phnom Penh, modern tactical and formal service uniforms, polite and professional demeanor, daylight, sharp focus, high detail photorealistic.',
    url: '/src/assets/images/police_patrol_cambodia_1791077666870.jpg',
    aspectRatio: '4:3',
    imageSize: '2K',
    unit: 'នគរបាលល្បាតចល័ត (Mobile Patrol Police)',
    timestamp: '2026-10-03T18:34:20Z',
    model: 'gemini-3-pro-image-preview',
    description: 'Cambodian National Police officers conducting daytime security patrol with emergency service vehicle at the Ministry of Interior complex perimeter.'
  }
];

// Endpoint: Get showcase gallery
app.get('/api/showcase', (_req: Request, res: Response) => {
  res.json({
    success: true,
    showcase: INITIAL_SHOWCASE,
  });
});

// Endpoint: Generate image with gemini-3-pro-image-preview and 1K / 2K / 4K size
app.post('/api/generate-image', async (req: Request, res: Response) => {
  try {
    const {
      prompt,
      imageSize = '1K',
      aspectRatio = '16:9',
      stylePreset,
      policeUnit,
    } = req.body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      res.status(400).json({ error: 'Prompt is required and must be a valid text string.' });
      return;
    }

    // Validate size - affordance for 1K, 2K, 4K
    const allowedSizes = ['1K', '2K', '4K'];
    const chosenSize = allowedSizes.includes(imageSize) ? imageSize : '1K';

    // Validate aspect ratio
    const allowedRatios = ['1:1', '3:4', '4:3', '9:16', '16:9', '1:4', '1:8', '4:1', '8:1'];
    const chosenRatio = allowedRatios.includes(aspectRatio) ? aspectRatio : '16:9';

    // Construct enriched prompt incorporating Cambodian police and MOI context if not already present
    let enrichedPrompt = prompt.trim();
    if (!enrichedPrompt.toLowerCase().includes('cambodia') && !enrichedPrompt.toLowerCase().includes('ក្រសួងមហាផ្ទៃ')) {
      enrichedPrompt = `${enrichedPrompt}, Cambodian National Police at Ministry of Interior (ក្រសួងមហាផ្ទៃ) in Phnom Penh`;
    }

    if (stylePreset && !enrichedPrompt.toLowerCase().includes(stylePreset.toLowerCase())) {
      enrichedPrompt = `${enrichedPrompt}, ${stylePreset}`;
    }

    console.log(`[ImageGen] Requesting gemini-3-pro-image-preview with size: ${chosenSize}, ratio: ${chosenRatio}`);

    const ai = getAI();

    // Call gemini-3-pro-image-preview as mandated
    let response;
    let usedModel = 'gemini-3-pro-image-preview';

    try {
      response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: enrichedPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: chosenRatio as any,
            imageSize: chosenSize as any,
          },
        },
      });
    } catch (primaryErr: any) {
      console.warn(`[ImageGen] Primary model gemini-3-pro-image-preview failed:`, primaryErr?.message);
      // Fallback to gemini-3-pro-image or gemini-3.1-flash-image if preview alias is not mapped
      try {
        usedModel = 'gemini-3-pro-image';
        response = await ai.models.generateContent({
          model: 'gemini-3-pro-image',
          contents: {
            parts: [{ text: enrichedPrompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: chosenRatio as any,
              imageSize: chosenSize as any,
            },
          },
        });
      } catch (secErr: any) {
        console.warn(`[ImageGen] Secondary model gemini-3-pro-image failed:`, secErr?.message);
        usedModel = 'gemini-3.1-flash-image';
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-image',
          contents: {
            parts: [{ text: enrichedPrompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: chosenRatio as any,
              imageSize: chosenSize as any,
            },
          },
        });
      }
    }

    // Extract image data from parts
    let imageUrl: string | null = null;
    let descriptionText: string | null = null;

    if (response?.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          imageUrl = `data:${mime};base64,${part.inlineData.data}`;
          break;
        } else if (part.text) {
          descriptionText = (descriptionText ? descriptionText + '\n' : '') + part.text;
        }
      }
    }

    if (!imageUrl) {
      res.status(502).json({
        error: 'The AI model generated content but did not return a valid image payload.',
        details: descriptionText || 'No image part found in candidates.',
      });
      return;
    }

    const generatedItem = {
      id: `gen-${Date.now()}`,
      title: 'Cambodian Police @ Ministry of Interior',
      khmerTitle: 'នគរបាលជាតិកម្ពុជា @ ក្រសួងមហាផ្ទៃ',
      prompt: enrichedPrompt,
      url: imageUrl,
      aspectRatio: chosenRatio,
      imageSize: chosenSize,
      unit: policeUnit || 'នគរបាលជាតិកម្ពុជា (Cambodian National Police)',
      timestamp: new Date().toISOString(),
      model: usedModel,
      description: descriptionText || 'Custom generated high-definition photograph of Cambodian Police at Ministry of Interior.',
    };

    res.json({
      success: true,
      image: generatedItem,
    });
  } catch (error: any) {
    console.error('[ImageGen] Fatal error in /api/generate-image:', error);
    res.status(500).json({
      error: error?.message || 'Internal server error while generating image.',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Cambodia Police MOI Studio running on port ${PORT}`);
  });
}

startServer();
