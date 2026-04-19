/**
 * Single source of truth for site imagery.
 *
 * - `portfolio` → real Aquaholic install photos in /Images/portfolio/ (use for
 *   hero, gallery, about, services surfaces). Each entry carries alt text so
 *   every consumer uses the same SEO-friendly description.
 * - `shop` / `learn` / `brands` → species and product photos under /Images/demo/.
 *   These are legitimate species-labeled or manufacturer product shots and are
 *   intentionally kept: replacing a specific coral/fish SKU photo with an
 *   unrelated install photo would be misleading.
 */

const DEMO = '/Images/demo'
const PORTFOLIO = '/Images/portfolio'

export const portfolioPhotos = {
  barReefBarstools: {
    src: `${PORTFOLIO}/install-bar-reef-barstools.jpg`,
    alt: 'Luxury reef aquarium built into a home bar with barstools, custom installation by Aquaholic Aquarium Services in Palm Beach County',
  },
  officeRedSeaReef: {
    src: `${PORTFOLIO}/install-office-red-sea-reef.jpg`,
    alt: 'Large Red Sea reef aquarium with full coral and fish installed in a Palm Beach County law office by Aquaholic Aquarium Services',
  },
  greenOrangeReefBlue: {
    src: `${PORTFOLIO}/install-green-orange-reef-blue.jpg`,
    alt: 'Vibrant green and orange coral reef aquascape under blue LED lighting with reef art backdrop — custom build by Aquaholic Aquarium Services',
  },
  colorfulReefFish: {
    src: `${PORTFOLIO}/install-colorful-reef-fish.jpg`,
    alt: 'Established saltwater reef aquarium with dense coral and colorful fish — mature reef build maintained by Aquaholic Aquarium Services',
  },
  restaurantBambooLionfish: {
    src: `${PORTFOLIO}/install-restaurant-bamboo-lionfish.jpg`,
    alt: 'Commercial restaurant reef aquarium built into a wall bench with bamboo stalks and lionfish — custom commercial install by Aquaholic Aquarium Services',
  },
  commercialFishColumn: {
    src: `${PORTFOLIO}/install-commercial-fish-column.jpg`,
    alt: 'Tall commercial column reef aquarium with rock structure and colorful saltwater fish installed in a Palm Beach County restaurant by Aquaholic Aquarium Services',
  },
  coralCloseupBlastomussa: {
    src: `${PORTFOLIO}/coral-closeup-blastomussa-orange.jpg`,
    alt: 'Orange Blastomussa coral macro close-up — livestock cared for by Aquaholic Aquarium Services',
  },
  reefMixedAcropora: {
    src: `${PORTFOLIO}/reef-mixed-acropora-colorful.jpg`,
    alt: 'Mixed saltwater reef aquascape with acropora, mushrooms, and diverse corals — built by Aquaholic Aquarium Services',
  },
  reefCubeNanoColorful: {
    src: `${PORTFOLIO}/reef-cube-nano-colorful.jpg`,
    alt: 'Colorful nano cube reef aquarium — small tank build by Aquaholic Aquarium Services in Palm Beach County',
  },
  cubeModernLivingRoom: {
    src: `${PORTFOLIO}/install-cube-modern-living-room.jpg`,
    alt: 'Modern cube reef aquarium with pendant light in open-plan Palm Beach County home — minimalist install by Aquaholic Aquarium Services',
  },
  redSeaPendantLights: {
    src: `${PORTFOLIO}/install-red-sea-pendant-lights.jpg`,
    alt: 'New Red Sea reef aquarium installation with three black pendant lights, white cabinet, and early-stage coral — Aquaholic Aquarium Services',
  },
  oakCabinetClassic: {
    src: `${PORTFOLIO}/install-oak-cabinet-classic.jpg`,
    alt: 'Classic large saltwater aquarium with oak cabinet — traditional build by Aquaholic Aquarium Services in Palm Beach County',
  },
  outdoorKoiPond: {
    src: `${PORTFOLIO}/install-outdoor-koi-pond.jpg`,
    alt: 'Outdoor koi pond with stone surround and bench — custom pond build by Aquaholic Aquarium Services in Palm Beach County',
  },
} as const

export type PortfolioPhotoKey = keyof typeof portfolioPhotos

export const siteImages = {
  // ── Homepage hero ───────────────────────────────────────────────────────────
  // Original hero — colorful tropical fish on a dark background (restored by
  // user request). Portfolio install photos appear throughout the rest of the
  // homepage (BeforeAfterGallery, CommercialSection) and on services pages.
  hero: {
    src: `${DEMO}/goldfish.jpg`,
    alt: 'Colorful saltwater tropical fish against a dark reef background — Aquaholic Aquarium Services, West Palm Beach',
  },

  // ── Blog / Learn articles ───────────────────────────────────────────────────
  learn: {
    'cycle-saltwater-tank': `${DEMO}/44gal-saltwater.jpg`,
    'beginner-corals': `${DEMO}/aquascape.jpg`,
    'water-parameters-guide': `${DEMO}/refugium.jpg`,
    'mandarin-dragonet-care': `${DEMO}/mandarin-dragonet.jpg`,
    'reef-tank-problems': `${DEMO}/live-rock.jpg`,
    'best-reef-led-2024': `${DEMO}/2ft-aquarium.jpg`,
  },

  // ── Shop products (species-specific photos) ────────────────────────────────
  shop: {
    'acropora-millepora-green-tip': `${DEMO}/acropora.jpg`,
    'mandarin-dragonet': `${DEMO}/mandarin-dragonet.jpg`,
    'hammer-coral-gold': `${DEMO}/hammer-coral.jpg`,
    'peppermint-shrimp-3pack': `${DEMO}/peppermint-shrimp.jpg`,
    'orange-storm-clownfish-pair': `${DEMO}/clownfish-pair.jpg`,
    'duncan-coral-10head': `${DEMO}/duncan-coral.jpg`,
    'tuxedo-urchin': `${DEMO}/tuxedo-urchin.jpg`,
    'ai-prime-16hd': `${DEMO}/reef-tank-corals.jpg`,
    'blastomussa-rainbow': `${DEMO}/blastomussa.jpg`,
    'tailspot-blenny': `${DEMO}/tailspot-blenny.jpg`,
    'hammer-coral-branching-purple': `${DEMO}/hammer-coral.jpg`,
    'bta-red': `${DEMO}/bubble-tip-anemone.jpg`,
  },

  // ── Brand partner cards ─────────────────────────────────────────────────────
  // Real manufacturer product photos, downloaded locally from official CDNs
  // (BRS, EcoTech, CoralVue — all dealer-legitimate sources).
  brands: {
    'red-sea': `${DEMO}/brands/red-sea.webp`,             // REEFER MAX 200 G2
    'ecotech-marine': `${DEMO}/brands/ecotech-marine.webp`, // Radion G6 Blue Pro
    'neptune-systems': `${DEMO}/brands/neptune-systems.webp`, // Apex + Energy Bar 2
    'octo': `${DEMO}/brands/octo.webp`,                   // Classic 150-INT skimmer
    'abyzz': `${DEMO}/brands/abyzz.webp`,                 // A100 pump + controller
    'innovative-marine': `${DEMO}/brands/innovative-marine.webp`, // NUVO Peninsula Pro
  },
} as const

export type LearnSlug = keyof typeof siteImages.learn
export type ShopSlug = keyof typeof siteImages.shop
export type BrandSlug = keyof typeof siteImages.brands
