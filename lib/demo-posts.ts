import { siteImages } from './site-images'

export type DemoPost = {
  _id: string
  slug: { current: string }
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: number
  image: string
  body: string[]
}

export const DEMO_POSTS: DemoPost[] = [
  {
    _id: '1',
    slug: { current: 'cycle-saltwater-tank' },
    title: 'How to Cycle a Saltwater Tank in 30 Days',
    excerpt:
      "The nitrogen cycle is the foundation of every successful reef tank. Here's our proven 30-day method for establishing a stable, thriving biological filter.",
    category: 'Beginner Guides',
    publishedAt: '2024-11-01',
    readTime: 8,
    image: siteImages.learn['cycle-saltwater-tank'],
    body: [
      "Before a single fish enters your tank, an invisible team of bacteria needs to move in. These nitrifying bacteria convert toxic ammonia from fish waste into nitrite, then into less-harmful nitrate. Without them, even one fish will die within days.",
      "Start with live rock and a quality marine salt mix. Mix your saltwater to 1.025 specific gravity, let the tank run with a heater set to 78°F and a powerhead creating flow. On day one, add a small piece of raw shrimp or a few drops of pure ammonia to kick-start the cycle.",
      "Test ammonia, nitrite, and nitrate every three days with a liquid test kit — not strips. You'll see ammonia spike in the first week, nitrite rise in weeks two and three, and nitrate appear as the process completes. Your tank is cycled when ammonia and nitrite both read zero for three consecutive tests.",
      "Resist the urge to rush this process. Tanks stocked too early crash hard — and your fish pay the price. When cycled, add livestock gradually: one or two small fish the first week, then one every two weeks after that. Slow stocking gives your bacterial colony time to grow with your bioload.",
    ],
  },
  {
    _id: '2',
    slug: { current: 'beginner-corals' },
    title: 'Top 10 Corals for Beginner Reef Keepers',
    excerpt:
      "Starting your first reef? These 10 hardy, forgiving corals are the best place to begin. We've ranked them by ease of care and visual impact.",
    category: 'Coral Care',
    publishedAt: '2024-10-15',
    readTime: 6,
    image: siteImages.learn['beginner-corals'],
    body: [
      "Coral keeping has a reputation for being difficult, but the right species can thrive in even imperfect conditions. The trick is starting with soft corals and easy LPS before attempting SPS.",
      "Our top five soft corals for beginners: Green Star Polyps, Kenya Tree, Xenia, Leather Corals, and Zoanthids. All of these tolerate fluctuating parameters and moderate lighting — perfect while you're learning to dial in your tank.",
      "Once you're comfortable, graduate to easy LPS: Duncans, Frogspawn, Hammer Coral, Candy Cane, and Acan Lords. These corals bring bigger color pops and larger polyps but still forgive small parameter swings.",
      "The biggest mistake new reefers make is buying too much coral too fast. Stock slowly, give each piece space to grow, and let your tank mature for at least six months before attempting any SPS. Patience beats every piece of expensive equipment.",
    ],
  },
  {
    _id: '3',
    slug: { current: 'water-parameters-guide' },
    title: 'Understanding Water Parameters: The Complete Guide',
    excerpt:
      'Salinity, pH, alkalinity, calcium, magnesium — each parameter tells a story about your tank. Here\'s how to read them and keep everything in balance.',
    category: 'Water Chemistry',
    publishedAt: '2024-10-01',
    readTime: 12,
    image: siteImages.learn['water-parameters-guide'],
    body: [
      "Water chemistry is the single biggest factor separating thriving reef tanks from struggling ones. The good news: you only need to track six parameters consistently, and five of them rarely need intervention once your tank is stable.",
      "Salinity should sit at 1.025 specific gravity (35 ppt). Check it weekly with a refractometer — swing-arm hydrometers drift and lie to you. Temperature stays at 78°F, with no more than 2°F daily variation.",
      "Alkalinity is the parameter most reef keepers obsess over, and for good reason. It drives coral skeletal growth. Target 8-9 dKH and keep it stable — fluctuations of more than 1 dKH per day can cause tissue recession. Calcium should run 420-440 ppm, and magnesium 1280-1350 ppm.",
      "pH tends to follow alkalinity. If your alk is in range and stable, pH usually is too. Nitrate and phosphate are the nutrient pair to watch: aim for 2-5 ppm nitrate and 0.03-0.1 ppm phosphate. Zero is actually bad — corals need some nutrients to thrive.",
      "Test weekly during the first six months. Once you know how your tank behaves, you can drop to bi-weekly or monthly. Consistency matters more than perfection — a stable tank at slightly off numbers beats one yo-yoing through 'ideal' ranges.",
    ],
  },
  {
    _id: '4',
    slug: { current: 'mandarin-dragonet-care' },
    title: 'Mandarin Dragonet: Care Guide & Feeding Tips',
    excerpt:
      "The Mandarin Dragonet is one of the most stunning fish in the hobby — and one of the most challenging. Here's how to keep one successfully.",
    category: 'Fish Care',
    publishedAt: '2024-09-20',
    readTime: 7,
    image: siteImages.learn['mandarin-dragonet-care'],
    body: [
      "There are few fish more photogenic than the Mandarin Dragonet. Their psychedelic pattern and slow, hovering swim style make them aquarium superstars. Unfortunately, most mandarins sold in the hobby starve to death within three months — not because they're fragile, but because they eat almost nothing but live copepods.",
      "A mandarin needs a mature tank (at least one year old) with plenty of live rock and an established copepod population. Minimum recommended volume: 75 gallons. Smaller tanks simply cannot produce enough pods to feed an adult mandarin.",
      "Start seeding copepods weeks before the fish arrives. Bottles of tigriopus and tisbe biminiensis from Algaegen or Reef Nutrition work well — add one bottle every two weeks, and run a refugium with chaeto to give pods a safe place to breed.",
      "Some mandarins learn to eat frozen mysis or pellets, but don't count on it. Quarantine your mandarin in a refugium-style tank seeded with pods for four weeks before adding to your display. If it's still eating and gaining weight, it's a keeper.",
      "The reward for getting this right is a decade-plus of breathtaking fish. Mandarins live 10-15 years in well-kept tanks, and a mated pair will even spawn at dusk — a nightly ritual you'll never forget watching.",
    ],
  },
  {
    _id: '5',
    slug: { current: 'reef-tank-problems' },
    title: 'Common Reef Tank Problems & How to Fix Them',
    excerpt:
      "Cyano outbreaks, aiptasia, RTN, alk crashes — we've seen it all. This guide covers the 10 most common reef problems and exactly how to solve them.",
    category: 'Troubleshooting',
    publishedAt: '2024-09-05',
    readTime: 10,
    image: siteImages.learn['reef-tank-problems'],
    body: [
      "Every reef tank hits rough patches. The difference between a panicked tear-down and a quick fix is knowing what you're looking at and what to do next.",
      "Red slime (cyanobacteria) is usually the first crisis new reefers face. It thrives on excess nutrients and low flow. Fix it by increasing flow to any dead spots, reducing feeding, and running a refugium or carbon dosing. Chemi-Clean works as a last resort, but solve the root cause or it comes right back.",
      "Aiptasia anemones spread from hitchhiker frags. Kill them with Aiptasia-X or a dedicated peppermint shrimp before they take over. Never try to rip them out — broken pieces regenerate into dozens of new pests.",
      "Rapid Tissue Necrosis (RTN) on SPS corals almost always traces back to an alkalinity crash or swing. Test immediately, stabilize alk to 8 dKH, and frag the healthy tissue to save the colony. A two-part dosing pump prevents this from ever happening again.",
      "Algae blooms in new tanks are normal — they're called the 'ugly phase' and last about three months. Don't panic, don't chase low nutrients, and don't add more chemicals. A clean-up crew of snails, hermits, and a tuxedo urchin will work through it naturally.",
    ],
  },
  {
    _id: '6',
    slug: { current: 'best-reef-led-2024' },
    title: 'The Best LED Lights for Reef Tanks in 2024',
    excerpt:
      'LED technology has transformed reef keeping. We compare the top fixtures for every budget, from the AI Prime to the Radion XR30.',
    category: 'Equipment',
    publishedAt: '2024-08-20',
    readTime: 9,
    image: siteImages.learn['best-reef-led-2024'],
    body: [
      "Choosing reef lighting used to be simple — halides for SPS, T5s for everything else. LEDs have flipped that equation. Modern reef LEDs grow anything T5s can, with better spectrum control and a fraction of the electricity bill.",
      "For nano tanks under 40 gallons, the AI Prime 16HD is the undisputed champion. At around $350, it runs full SPS tanks, links wirelessly, and has a spectrum that makes corals pop visually without sacrificing growth.",
      "Mid-size tanks (40-90 gallons) should look at the Radion XR15 G6 or the Kessil A500X. Both provide serious SPS-capable PAR at the right spread for a standard 36–48 inch tank. The Radion has the better app; the Kessil has that famous shimmer.",
      "For large displays, nothing touches the Radion XR30 G6 Blue Pro — or a pair of them for tanks over 120 gallons. Pricey at $1,000+ per fixture, but these will grow any coral and last a decade. If budget is tight, the Nicrew Hyperreef and Reef-Brite XHO strips make a respectable combo.",
      "Whatever you pick, start your photoperiod gentle: 6-hour lights, 30% peak intensity, and ramp up over 8 weeks. Rushing acclimation bleaches more corals than weak lights ever will.",
    ],
  },
]

export function getDemoPost(slug: string): DemoPost | null {
  return DEMO_POSTS.find((p) => p.slug.current === slug) ?? null
}
