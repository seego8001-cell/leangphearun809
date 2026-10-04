import { PresetScene } from '../types.ts';

export const PRESET_SCENES: PresetScene[] = [
  {
    id: 'ceremonial-guard',
    name: 'Honor Guard & Ceremony',
    khmerName: 'កងកិត្តិយស & ពិធីការផ្លូវការ',
    icon: 'Shield',
    unit: 'កងកិត្តិយស និងពិធីការ (Honor Guard)',
    recommendedRatio: '16:9',
    recommendedSize: '4K',
    prompt: 'Cambodian National Police officers standing in professional uniform in front of the grand Ministry of Interior building (ក្រសួងមហាផ្ទៃ) in Phnom Penh Cambodia. Crisp navy blue and khaki law enforcement uniforms with official Cambodian police badges and peaked caps, ornate Khmer architecture with golden spire rooflines in the background, daytime, photorealistic 8k, majestic and dignified.'
  },
  {
    id: 'building-architecture',
    name: 'Grand Ministry Headquarters',
    khmerName: 'វិមានទីស្តីការក្រសួងមហាផ្ទៃ',
    icon: 'Landmark',
    unit: 'វិមានទីស្នាក់ការកណ្តាល (Headquarters)',
    recommendedRatio: '16:9',
    recommendedSize: '4K',
    prompt: 'The grand national headquarters of the Ministry of Interior of Cambodia (ក្រសួងមហាផ្ទៃ) on Norodom Boulevard Phnom Penh. Magnificent modern Khmer architectural building with golden multi-tiered pitched roofs and traditional spires, landscaped entrance courtyard with Cambodian national flag, bright daylight, architectural photography.'
  },
  {
    id: 'patrol-cruiser',
    name: 'Mobile Patrol & Emergency Unit',
    khmerName: 'នគរបាលល្បាតចល័ត & រថយន្តស៊ីរ៉ែន',
    icon: 'Car',
    unit: 'នគរបាលល្បាតចល័ត (Patrol Division)',
    recommendedRatio: '4:3',
    recommendedSize: '2K',
    prompt: 'Cambodian police officers on patrol with modern police cruiser in front of the Ministry of Interior (ក្រសួងមហាផ្ទៃ) in Phnom Penh, formal service uniforms with gold insignias, clear blue sky, sharp focus, cinematic lighting, photorealistic 8k.'
  },
  {
    id: 'traffic-police',
    name: 'Metropolitan Traffic Division',
    khmerName: 'នគរបាលចរាចរណ៍រាជធានី',
    icon: 'Compass',
    unit: 'នគរបាលចរាចរណ៍ (Traffic Police)',
    recommendedRatio: '16:9',
    recommendedSize: '2K',
    prompt: 'Cambodian traffic police officers in distinctive high-visibility reflective vests and crisp uniforms directing protocol convoy near the Ministry of Interior (ក្រសួងមហាផ្ទៃ) entrance, Phnom Penh boulevard background, orderly and disciplined, daylight photorealistic.'
  },
  {
    id: 'tactical-intervention',
    name: 'Special Intervention Unit',
    khmerName: 'កងកម្លាំងពិសេសអន្តរាគមន៍រហ័ស',
    icon: 'Zap',
    unit: 'កងកម្លាំងអន្តរាគមន៍ពិសេស (Special Intervention Unit)',
    recommendedRatio: '16:9',
    recommendedSize: '4K',
    prompt: 'Cambodian Special Police intervention team in dark tactical law enforcement gear and protective equipment positioned respectfully at the perimeter of the Ministry of Interior (ក្រសួងមហាផ្ទៃ) complex, modern tactical gear, heroic stance, cinematic lighting.'
  },
  {
    id: 'night-illumination',
    name: 'Night Illumination of MOI',
    khmerName: 'ទេសភាពរាត្រីភ្លឺចែងចាំងនៅក្រសួងមហាផ្ទៃ',
    icon: 'Moon',
    unit: 'សន្តិសុខយាមល្បាតពេលរាត្រី (Night Security)',
    recommendedRatio: '16:9',
    recommendedSize: '4K',
    prompt: 'Nighttime architectural photograph of the Ministry of Interior of Cambodia (ក្រសួងមហាផ្ទៃ) in Phnom Penh, magnificent golden spire roofs dramatically illuminated with warm golden uplighting, Cambodian police officers on respectful guard duty at the illuminated entrance, reflection in water fountain, 8k resolution.'
  },
  {
    id: 'official-portrait',
    name: 'Senior Officer Official Portrait',
    khmerName: 'រូបថតផ្លូវការមន្ត្រីនគរបាលជាន់ខ្ពស់',
    icon: 'UserCheck',
    unit: 'ថ្នាក់ដឹកនាំនគរបាលជាតិ (Police Leadership)',
    recommendedRatio: '3:4',
    recommendedSize: '2K',
    prompt: 'Official portrait of a dignified Cambodian National Police officer in ceremonial dress uniform with gold bullion epaulets, medals of honor, and peaked officer cap, standing inside the grand wood-paneled hall of the Ministry of Interior (ក្រសួងមហាផ្ទៃ), soft studio lighting, ultra-sharp detail.'
  }
];

export const STYLE_CHIPS = [
  'Photorealistic 8K',
  'Cinematic Golden Hour',
  'Official State Documentary',
  'Architectural Masterpiece',
  'Dramatic Natural Lighting',
  'Hyper-detailed Uniform & Insignia',
  'National Ceremony Atmosphere',
  'Vintage 35mm Film Grain',
];
