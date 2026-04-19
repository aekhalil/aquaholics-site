/**
 * Static seed data for 15 Palm Beach County service areas.
 * Used as fallback when Sanity isn't configured, and as seed data.
 */
export interface ServiceAreaData {
  slug: string
  name: string
  county: string
  population: number
  heroTagline: string
  intro: string
  neighborhoods: string[]
  mapEmbedUrl: string
  lat: number
  lng: number
  testimonials: Array<{
    name: string
    rating: number
    text: string
    neighborhood: string
  }>
}

export const SERVICE_AREAS: ServiceAreaData[] = [
  {
    slug: 'west-palm-beach',
    name: 'West Palm Beach',
    county: 'Palm Beach',
    population: 117000,
    heroTagline: 'Premier aquarium services in the heart of Palm Beach County',
    intro: 'Aquaholic Aquarium Services is based right here in West Palm Beach. From Northwood to SoSo, Palm Beach Lakes to downtown, our technicians know every neighborhood and can typically reach you within the hour. Whether you need a custom saltwater installation in a high-rise condo or weekly maintenance on a freshwater planted display, we are your local experts.',
    neighborhoods: ['Downtown WPB', 'Northwood', 'SoSo', 'Flamingo Park', 'El Cid', 'Palm Beach Lakes', 'Grandview Heights', 'Pleasant City'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.0534!3d26.7153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d8d3e22aa6cb57%3A0x2cff6a4b5f2b6c6!2sWest%20Palm%20Beach%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.7153, lng: -80.0534,
    testimonials: [
      { name: 'James M.', rating: 5, text: 'Best aquarium service in WPB. Period. They have kept my 200g reef running perfectly for two years.', neighborhood: 'El Cid' },
      { name: 'Lisa P.', rating: 5, text: 'Quick response time and incredibly knowledgeable. My downtown condo reef has never looked better.', neighborhood: 'Downtown WPB' },
    ],
  },
  {
    slug: 'palm-beach-gardens',
    name: 'Palm Beach Gardens',
    county: 'Palm Beach',
    population: 61000,
    heroTagline: 'Custom aquariums for Palm Beach Gardens homes and businesses',
    intro: 'Palm Beach Gardens is home to some of the most impressive custom aquarium installations in South Florida. From sprawling estates in the Acreage to contemporary homes near PGA Boulevard, Aquaholic builds and maintains stunning reef and freshwater systems throughout the Gardens. Our team services hundreds of tanks across the Mirasol, BallenIsles, and Frenchman\'s Reserve communities.',
    neighborhoods: ['PGA Boulevard', 'Mirasol', 'BallenIsles', 'Frenchman\'s Reserve', 'Northlake Blvd Corridor', 'Alton', 'Downtown at the Gardens'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.1357!3d26.8235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df27a7f3f3f3f3!2sPalm%20Beach%20Gardens%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.8235, lng: -80.1357,
    testimonials: [
      { name: 'Robert A.', rating: 5, text: 'Aquaholic maintains three tanks in our BallenIsles home. Professional, reliable, and the fish are always thriving.', neighborhood: 'BallenIsles' },
      { name: 'Karen T.', rating: 5, text: 'They designed our office lobby aquarium from scratch. Clients constantly comment on how stunning it looks.', neighborhood: 'PGA Boulevard' },
    ],
  },
  {
    slug: 'jupiter',
    name: 'Jupiter',
    county: 'Palm Beach',
    population: 70000,
    heroTagline: 'Jupiter\'s trusted aquarium installation and maintenance specialists',
    intro: 'Jupiter\'s coastal lifestyle is the perfect backdrop for world-class reef tanks. Aquaholic services everything from Jupiter Farms estates to waterfront condos along the Intracoastal. With Jupiter being just 20 minutes north of our WPB base, our team can reach any address in Jupiter within an hour — including 24/7 emergency callouts.',
    neighborhoods: ['Jupiter Farms', 'Abacoa', 'Indiantown Corridor', 'Jupiter Island', 'Tequesta (unincorporated)', 'Limestone Creek', 'Jonathan\'s Landing'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.0942!3d26.9342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df27a7f3f3f3f3!2sJupiter%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.9342, lng: -80.0942,
    testimonials: [
      { name: 'Derek W.', rating: 5, text: 'Called at midnight on a Saturday when my return pump died. Tech was at my door in under an hour. Unbelievable service.', neighborhood: 'Abacoa' },
    ],
  },
  {
    slug: 'boca-raton',
    name: 'Boca Raton',
    county: 'Palm Beach',
    population: 99000,
    heroTagline: 'Boca Raton\'s premier saltwater reef and freshwater aquarium experts',
    intro: 'Boca Raton\'s affluent communities demand the finest in custom aquarium design. Aquaholic Aquarium Services brings the same level of precision and artistry to Boca installations as we do throughout Palm Beach County. From glass-walled reef tanks in Boca Hills estates to sleek modern builds in Mizner Park condos, we build systems that become the centerpiece of any room.',
    neighborhoods: ['Mizner Park', 'Boca Hills', 'Woodfield Hunt Club', 'Mission Bay', 'Boca West', 'Spanish River', 'Boca Harbour'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.1057!3d26.3683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df27a7f3f3f3f3!2sBoca%20Raton%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.3683, lng: -80.1057,
    testimonials: [
      { name: 'Michelle S.', rating: 5, text: 'Aquaholic designed a custom 300-gallon peninsula tank for our Boca West home. The craftsmanship is extraordinary.', neighborhood: 'Boca West' },
      { name: 'Alan G.', rating: 5, text: 'Finally a maintenance team that actually shows up on time, every single visit. Worth every dollar.', neighborhood: 'Woodfield Hunt Club' },
    ],
  },
  {
    slug: 'delray-beach',
    name: 'Delray Beach',
    county: 'Palm Beach',
    population: 70000,
    heroTagline: 'Aquarium installation and maintenance serving Delray Beach, FL',
    intro: 'Delray Beach is one of Palm Beach County\'s most vibrant communities, and our growing client base here reflects that. We maintain reef tanks in the beachfront condos along A1A, custom freshwater planted tanks in Pines of Delray, and everything in between. Delray businesses on Atlantic Avenue also trust us for eye-catching commercial aquarium displays.',
    neighborhoods: ['Downtown Delray', 'Lake Ida', 'Pines of Delray', 'Highland Beach (adjacent)', 'Boca Del Mar', 'Delray Beach Historic District'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.0728!3d26.4615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df27a7f3f3f3f3!2sDelray%20Beach%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.4615, lng: -80.0728,
    testimonials: [
      { name: 'Priya K.', rating: 5, text: 'Our Atlantic Avenue restaurant has a custom coral reef display that draws comments from every table. Aquaholic nailed the design.', neighborhood: 'Downtown Delray' },
    ],
  },
  {
    slug: 'boynton-beach',
    name: 'Boynton Beach',
    county: 'Palm Beach',
    population: 80000,
    heroTagline: 'Aquarium services for Boynton Beach homes and businesses',
    intro: 'Boynton Beach has been one of our fastest-growing service areas. From Quantum Lakes condos to single-family homes in Hunters Run, we\'ve built and maintained hundreds of tanks throughout Boynton. Our clients love the combination of expert technical service and genuine passion for the hobby that every Aquaholic technician brings to each visit.',
    neighborhoods: ['Downtown Boynton', 'Quantum Lakes', 'Hunters Run', 'Indian Spring', 'Canyon Lakes', 'Renaissance Commons'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.0906!3d26.5253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df27a7f3f3f3f3!2sBoynton%20Beach%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.5253, lng: -80.0906,
    testimonials: [
      { name: 'Craig M.', rating: 5, text: 'They converted my FOWLR into a full mixed reef. Absolute transformation. I\'ve already referred three neighbors.', neighborhood: 'Canyon Lakes' },
    ],
  },
  {
    slug: 'lake-worth',
    name: 'Lake Worth Beach',
    county: 'Palm Beach',
    population: 43000,
    heroTagline: 'Custom aquariums in Lake Worth Beach and surroundings',
    intro: 'Lake Worth Beach\'s eclectic, artistic community has always appreciated exceptional design — including aquarium design. Aquaholic\' installations in Lake Worth range from vibrant reef tanks in the historic cottage district to large commercial builds for local businesses. As a company based just miles away in West Palm Beach, Lake Worth is practically our backyard.',
    neighborhoods: ['Downtown Lake Worth', 'Palm Beach National', 'Lake Clarke Shores', 'South Palm Beach', 'Hypoluxo'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.0578!3d26.6178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df27a7f3f3f3f3!2sLake%20Worth%20Beach%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.6178, lng: -80.0578,
    testimonials: [
      { name: 'Denise A.', rating: 5, text: 'Aquaholic is literally 10 minutes from my house and they\'re the best I\'ve ever worked with. Fast, knowledgeable, fair prices.', neighborhood: 'Downtown Lake Worth' },
    ],
  },
  {
    slug: 'wellington',
    name: 'Wellington',
    county: 'Palm Beach',
    population: 65000,
    heroTagline: 'Custom aquarium builds and maintenance in Wellington, FL',
    intro: 'Wellington is known for equestrian estates and luxurious homes — and increasingly, for stunning custom aquariums. Aquaholic has built some of our most impressive installations in Wellington\'s equestrian communities, including floor-to-ceiling reef walls and multi-tank freshwater displays that complement these extraordinary properties.',
    neighborhoods: ['Wellington Trace', 'Palm Beach Polo', 'Olympia', 'Versailles', 'Binks Forest', 'Pinewood'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.2409!3d26.6593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df27a7f3f3f3f3!2sWellington%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.6593, lng: -80.2409,
    testimonials: [
      { name: 'Harper B.', rating: 5, text: 'They built a 400-gallon reef in our home. It\'s the first thing guests see when they walk in and the conversation piece of every gathering.', neighborhood: 'Palm Beach Polo' },
    ],
  },
  {
    slug: 'royal-palm-beach',
    name: 'Royal Palm Beach',
    county: 'Palm Beach',
    population: 42000,
    heroTagline: 'Aquarium services in Royal Palm Beach and The Acreage',
    intro: 'Royal Palm Beach and the adjacent Acreage are home to a growing community of aquarium enthusiasts. Aquaholic serves this area with the same attention to detail and expertise we bring to all our Palm Beach County clients. Whether you\'re starting your first reef or upgrading an existing system, our team is just a call away.',
    neighborhoods: ['Royal Palm Beach', 'The Acreage', 'Loxahatchee', 'Loxahatchee Groves', 'Golden Lakes'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.2262!3d26.7048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df27a7f3f3f3f3!2sRoyal%20Palm%20Beach%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.7048, lng: -80.2262,
    testimonials: [
      { name: 'Todd C.', rating: 5, text: 'I have a 5-acre property in the Acreage and they handle my 150g reef on a weekly basis. Incredibly reliable team.', neighborhood: 'The Acreage' },
    ],
  },
  {
    slug: 'greenacres',
    name: 'Greenacres',
    county: 'Palm Beach',
    population: 43000,
    heroTagline: 'Aquarium maintenance and installation in Greenacres, FL',
    intro: 'Greenacres sits conveniently between West Palm Beach and Wellington, making it an easy service area for our team. We have a loyal client base in Greenacres across both residential and commercial properties. Our efficient routes mean lower travel time and faster emergency response for Greenacres clients.',
    neighborhoods: ['Greenacres', 'Lake Worth Corridor', 'Palm Springs', 'Haverhill'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.1553!3d26.6276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df27a7f3f3f3f3!2sGreenacres%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.6276, lng: -80.1553,
    testimonials: [
      { name: 'Maria F.', rating: 5, text: 'Quick, professional, and genuinely passionate about reef keeping. My tank has never been healthier.', neighborhood: 'Greenacres' },
    ],
  },
  {
    slug: 'riviera-beach',
    name: 'Riviera Beach',
    county: 'Palm Beach',
    population: 35000,
    heroTagline: 'Aquarium services for Riviera Beach and Singer Island',
    intro: 'Riviera Beach and Singer Island offer some of the most spectacular waterfront properties in Palm Beach County — and spectacular waterfront properties deserve spectacular reef tanks. Aquaholic has designed and maintains numerous high-end installations on Singer Island and throughout Riviera Beach, including several stunning oceanfront condo builds.',
    neighborhoods: ['Singer Island', 'Blue Heron Blvd Corridor', 'Riviera Beach Marina', 'Palm Beach Shores'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.0600!3d26.7757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df27a7f3f3f3f3!2sRiviera%20Beach%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.7757, lng: -80.0600,
    testimonials: [
      { name: 'Thomas R.', rating: 5, text: 'My Singer Island condo looks like a luxury hotel thanks to the reef Aquaholic built. Guests always stop and stare.', neighborhood: 'Singer Island' },
    ],
  },
  {
    slug: 'north-palm-beach',
    name: 'North Palm Beach',
    county: 'Palm Beach',
    population: 13000,
    heroTagline: 'Custom aquariums for North Palm Beach\'s finest homes',
    intro: 'North Palm Beach is a tight-knit waterfront community where word travels fast — and so do our techs. We\'ve built and maintain some of our most iconic installations in North Palm Beach, from canal-front properties to the club communities along Prosperity Farms. Clients here appreciate our premium approach and the genuine care we bring to every visit.',
    neighborhoods: ['Prosperity Farms', 'North Palm Beach Country Club', 'Old Port Cove', 'Juno Isles'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.0615!3d26.8232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df27a7f3f3f3f3!2sNorth%20Palm%20Beach%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.8232, lng: -80.0615,
    testimonials: [
      { name: 'Anne W.', rating: 5, text: 'I can\'t recommend Aquaholic enough. My reef tank is the pride of our Old Port Cove home and they keep it magazine-perfect.', neighborhood: 'Old Port Cove' },
    ],
  },
  {
    slug: 'juno-beach',
    name: 'Juno Beach',
    county: 'Palm Beach',
    population: 4000,
    heroTagline: 'Aquarium services in Juno Beach, FL',
    intro: 'Small in size but rich in coastal character, Juno Beach is home to some of our most dedicated reef enthusiasts. The proximity to the ocean and the community\'s love of marine life makes Juno Beach a natural fit for the hobby. Aquaholic\' Juno Beach clients consistently tell us that their aquariums capture the essence of the Florida reef they love so much.',
    neighborhoods: ['Juno Beach', 'Juno Isles', 'Juno Ridge', 'Ocean Ridge'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.0524!3d26.8790!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df27a7f3f3f3f3!2sJuno%20Beach%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.8790, lng: -80.0524,
    testimonials: [
      { name: 'Sandy L.', rating: 5, text: 'Living right on the water, I wanted a reef tank that felt like it belonged here. Aquaholic created exactly that.', neighborhood: 'Juno Beach' },
    ],
  },
  {
    slug: 'palm-beach',
    name: 'Palm Beach',
    county: 'Palm Beach',
    population: 9000,
    heroTagline: 'Exclusive aquarium services for Palm Beach island estates',
    intro: 'Palm Beach island represents the pinnacle of luxury living in South Florida, and Aquaholic Aquarium Services is privileged to serve many of the island\'s most distinguished homes and estates. From Worth Avenue offices to historic landmark estates, we design, build, and maintain aquarium systems that meet the exacting standards of Palm Beach\'s discerning clientele.',
    neighborhoods: ['Worth Avenue', 'North End', 'Mid-Island', 'South End', 'Palm Beach Country Club'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.0364!3d26.7058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df27a7f3f3f3f3!2sPalm%20Beach%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.7058, lng: -80.0364,
    testimonials: [
      { name: 'C. Worthington', rating: 5, text: 'Aquaholic operates with the discretion and professionalism the Palm Beach community requires. Their work is truly exceptional.', neighborhood: 'North End' },
    ],
  },
  {
    slug: 'tequesta',
    name: 'Tequesta',
    county: 'Palm Beach',
    population: 6500,
    heroTagline: 'Aquarium installation and service in Tequesta and Jupiter Island',
    intro: 'Tequesta\'s serene waterway communities are a hidden gem of Palm Beach County, and so is its aquarium scene. Our Tequesta clients tend to be serious hobbyists who appreciate the nuanced expertise we bring to SPS-dominant reef systems and complex freshwater planted tanks. Whether you\'re on the Loxahatchee River or along the Intracoastal, Aquaholic is your local reef partner.',
    neighborhoods: ['Tequesta', 'Jupiter Inlet Colony', 'Jupiter Island', 'Loxahatchee River area', 'Old Martin Road Corridor'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57088.7!2d-80.1201!3d26.9712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df27a7f3f3f3f3!2sTequesta%2C%20FL!5e0!3m2!1sen!2sus!4v1',
    lat: 26.9712, lng: -80.1201,
    testimonials: [
      { name: 'Bruce N.', rating: 5, text: 'I have a challenging SPS-only system and these are the only guys I trust to maintain it. Deep knowledge, honest advice.', neighborhood: 'Tequesta' },
    ],
  },
]
