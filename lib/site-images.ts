/**
 * Single source of truth for demo/placeholder imagery.
 *
 * All photos live locally under Public/Images/demo/ and are sourced from
 * Wikipedia Commons (CC-licensed, species-labeled). Every path below is
 * unique to one surface — no photo is reused across hero / learn / shop /
 * brands. The one intentional overlap is the mandarin dragonet photo, which
 * appears in both the shop product and the learn article about that species
 * (because it IS that species).
 */

const DEMO = '/Images/demo'

export const siteImages = {
  // ── Homepage hero ───────────────────────────────────────────────────────────
  hero: `${DEMO}/goldfish.jpg`,

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
