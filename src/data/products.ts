import { Product, CategoryType } from '../types';
export type { CategoryType };

export const PRODUCTS: Product[] = [
  // ================= SWIMMING EQUIPMENT =================
  {
    id: 'swim-hydropro-goggles',
    name: 'HydroPro Carbon Mirrored Goggles',
    category: 'swimming',
    tagline: 'Competition-grade hydrodynamic wide-vision racing goggles',
    originalPrice: 499,
    discountedPrice: 349,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 142,
    image: '/src/assets/images/swimming_gear_showcase_1794059493816.jpg',
    badge: 'BESTSELLER',
    isTopPick: true,
    shortDescription: 'Anti-fog mirrored curved lenses with UV400 defense and leakproof Japanese silicone seal.',
    fullDescription: 'Designed specifically for open-water lagoon swimming and competitive pool training. The HydroPro Carbon Mirrored Goggles minimize drag through a low-profile hydro-lens profile while providing panoramic 180° peripheral sight. Polarized mirror coating cuts Atlantic glare and reflection without distorting underwater contrast.',
    features: [
      'Advanced ClearVision™ nano anti-fog inner coating',
      'Polarized mirror finish reduces water reflection glare by 99.4%',
      'Ultra-soft Japanese liquid silicone gasket for zero eye-socket pressure',
      '4 interchangeable nose bridge sizes (XS, S, M, L) included',
      'Dual-strap micro-ratchet tensioner for zero slipping during ocean dives'
    ],
    specs: [
      { label: 'Lens Material', value: 'Polycarbonate with Anti-Scratch & UV400' },
      { label: 'Gasket & Strap', value: '100% Medical-Grade Liquid Silicone' },
      { label: 'Field of View', value: '180° Curved Panoramic' },
      { label: 'Best For', value: 'Open Water, Lagoon Triathlon & Pool' },
      { label: 'Origin Cert', value: 'FINA Approved Competition Geometry' }
    ],
    inStock: true,
    stockCount: 18
  },
  {
    id: 'swim-thermal-neoprene-cap',
    name: 'LagoonShield Thermal Neoprene Swim Cap 3mm',
    category: 'swimming',
    tagline: 'Thermal barrier engineered for cold Atlantic swells & lagoon winds',
    originalPrice: 320,
    discountedPrice: 229,
    discountPercent: 28,
    rating: 4.8,
    reviewsCount: 86,
    image: '/src/assets/images/swimming_gear_showcase_1794059493816.jpg',
    badge: 'COLD WATER SPEC',
    isTopPick: false,
    shortDescription: 'Glued & blind-stitched Yamamoto 39 neoprene with chin strap for heavy chop.',
    fullDescription: 'Essential head protection when training in Dakhla’s Atlantic swells where water temperature drops and high winds increase windchill. Features an ergonomic chin strap to prevent displacement during vigorous flip turns and wave breaking.',
    features: [
      '3mm premium Yamamoto limestone neoprene',
      'Smoothskin exterior sheds wind and reduces evaporative cooling',
      'Adjustable soft chin buckle with no neck chafing',
      'High-visibility neon green top decal for open water safety'
    ],
    specs: [
      { label: 'Thickness', value: '3.0 mm Yamamoto Neoprene' },
      { label: 'Seam Construction', value: 'Glued and Blind-Stitched (GBS)' },
      { label: 'Visibility', value: 'High-Vis Safety Neon Green Crest' },
      { label: 'Water Temp', value: '12°C - 19°C Optimum' }
    ],
    inStock: true,
    stockCount: 24
  },
  {
    id: 'swim-dual-density-fins',
    name: 'AeroFin Dual-Density Silicone Training Blades',
    category: 'swimming',
    tagline: 'Short-blade propulsive fins for cadence and ankle power',
    originalPrice: 580,
    discountedPrice: 399,
    discountPercent: 31,
    rating: 4.9,
    reviewsCount: 97,
    image: '/src/assets/images/swimming_gear_showcase_1794059493816.jpg',
    badge: 'PRO TRAINING',
    isTopPick: true,
    shortDescription: 'Short angled silicone blade reinforces flutter kick tempo without cramping.',
    fullDescription: 'Engineered for swim teams and triathletes aiming to build calf power and perfect hip drive. The 100% natural silicone blade eliminates the blisters and cramps typical of stiff plastic fins.',
    features: [
      'Dual-durometer silicone: firm spine with soft foot pocket',
      'Open heel cradle allows full plantar flexion',
      'Tread grip on sole prevents deck slippage',
      'Non-chafing hydrodynamic side rails'
    ],
    specs: [
      { label: 'Material', value: '100% High-Grade Silicone (Latex-Free)' },
      { label: 'Blade Angle', value: '15° Forward Propulsion' },
      { label: 'Weight', value: '620g / pair (Size M)' },
      { label: 'Colors', value: 'Matte Obsidian with Neon Green Rails' }
    ],
    inStock: true,
    stockCount: 14
  },
  {
    id: 'swim-drybag-towfloat',
    name: 'Atlantic Storm 30L Waterproof DryBag & Tow Float',
    category: 'swimming',
    tagline: 'Dual-chamber high-buoyancy drypack & safety swim buoy',
    originalPrice: 390,
    discountedPrice: 269,
    discountPercent: 31,
    rating: 4.7,
    reviewsCount: 64,
    image: '/src/assets/images/swimming_gear_showcase_1794059493816.jpg',
    badge: 'SAFETY ESSENTIAL',
    isTopPick: false,
    shortDescription: 'Keep phone, keys, and towel dry while floating as an ultra-visible beacon in ocean waters.',
    fullDescription: 'The ultimate companion for wild coastal swims. The separate internal dry bag keeps your phone and car keys bone-dry, while dual inflatable air bladders provide over 120kg of buoyant support in emergencies.',
    features: [
      'Dual independent inflation valves with quick-deflate nozzle',
      'Ripstop 500D PVC Tarpaulin with welded RF seams',
      'Adjustable waist belt fits 26" to 50" waists',
      'Integrated emergency survival whistle in the buckle'
    ],
    specs: [
      { label: 'Capacity', value: '30 Liters Dry Storage' },
      { label: 'Waterproof Rating', value: 'IPX8 Submersible Roll-Top' },
      { label: 'Buoyancy Force', value: '> 180 Newtons' },
      { label: 'Color', value: 'Fluorescent Safety Green / Carbon' }
    ],
    inStock: true,
    stockCount: 31
  },
  {
    id: 'swim-contour-pull-buoy',
    name: 'ContourHydro Ergonomic EVA Pull Buoy',
    category: 'swimming',
    tagline: 'Asymmetric flotation block for focused upper-body stroke power',
    originalPrice: 220,
    discountedPrice: 159,
    discountPercent: 28,
    rating: 4.8,
    reviewsCount: 52,
    image: '/src/assets/images/swimming_gear_showcase_1794059493816.jpg',
    badge: 'CORE FOCUS',
    isTopPick: false,
    shortDescription: 'High-density closed cell EVA foam isolates arms and locks streamline body position.',
    fullDescription: 'Isolates leg kicking to force the core and shoulders into pure propulsion. The contoured hourglass silhouette rests securely between thighs without skin chafing.',
    features: [
      'Anti-chafing contoured curved profile',
      'Closed-cell EVA foam absorbs zero water',
      'Textured micro-groove grip prevents slippage when wet',
      'Resistant to saltwater and pool chlorine'
    ],
    specs: [
      { label: 'Dimensions', value: '23cm x 12.5cm x 10cm' },
      { label: 'Material', value: 'Non-toxic Hypoallergenic EVA' },
      { label: 'Buoyancy', value: 'High Positive Displacement' }
    ],
    inStock: true,
    stockCount: 40
  },

  // ================= RUNNING EQUIPMENT =================
  {
    id: 'run-trailflow-vest',
    name: 'TrailFlow Carbon Ultra Hydration Vest (12L)',
    category: 'running',
    tagline: 'Zero-bounce endurance race pack with dual 500ml carbon soft flasks',
    originalPrice: 890,
    discountedPrice: 599,
    discountPercent: 33,
    rating: 5.0,
    reviewsCount: 215,
    image: '/src/assets/images/running_gear_showcase_1794059494553.jpg',
    badge: 'TOP SELLER',
    isTopPick: true,
    shortDescription: 'Breathable 3D aerodynamic mesh vest with 8 front pockets and rear trekking pole quiver.',
    fullDescription: 'Engineered for desert ultras and coastal trail endurance. Crafted with hyper-breathable honeycomb 3D mesh that prevents heat buildup across the back. The dual elastic chest straps adapt to heavy diaphragm expansion during steep ascents, eliminating bounce entirely.',
    features: [
      'Zero-Bounce Sensifit™ stretch harness with dual chest tensioners',
      'Includes 2x 500ml BPA-free Soft Flasks with high-flow silicone bite valves',
      '12L expandable rear compartment with waterproof zippered phone sleeve',
      'Quick-draw trekking pole attachment system',
      '360° neon reflective accents for night desert navigation'
    ],
    specs: [
      { label: 'Volume', value: '12 Liters Total Capacity' },
      { label: 'Weight (Dry)', value: '195 grams (Ultra-light)' },
      { label: 'Fabric', value: 'Ripstop 4-way Stretch + 3D Honeycomb AirMesh' },
      { label: 'Flask Compatibility', value: 'Front 2x 500ml + Rear 1.5L Bladder' },
      { label: 'Sizing', value: 'Adjustable S/M & L/XL fit range' }
    ],
    inStock: true,
    stockCount: 12
  },
  {
    id: 'run-duneshield-sunglasses',
    name: 'Dakhla DuneShield Aerodynamic Sunglasses',
    category: 'running',
    tagline: 'Ultralight frameless eyewear with anti-glare hydrophobic coating',
    originalPrice: 450,
    discountedPrice: 299,
    discountPercent: 34,
    rating: 4.9,
    reviewsCount: 118,
    image: '/src/assets/images/running_gear_showcase_1794059494553.jpg',
    badge: 'WIND & SAND PROOF',
    isTopPick: false,
    shortDescription: 'Wraparound cylindrical shield lens blocks 100% UV, desert sand spray, and harsh ocean glare.',
    fullDescription: 'Custom-built for the high winds and intense solar glare of Dakhla’s peninsula. Weighing only 26 grams, the TR90 memory nylon frame clings comfortably to your temples with hydrophilic rubber grips that get stickier as you sweat.',
    features: [
      'TR90 ultralight memory polymer frame',
      'Hydrophobic and oleophobic lens treatments repel sweat and water',
      'Anti-fog vent slits at brow level prevent lens steaming',
      'Includes hard zip case, microfiber bag, and interchangeable clear lens'
    ],
    specs: [
      { label: 'Weight', value: '26 grams' },
      { label: 'Lens Grade', value: 'Category 3 Polarized Polycarbonate' },
      { label: 'UV Protection', value: 'UV400 (100% UVA / UVB / UVC)' },
      { label: 'Nosepiece', value: '3-Position Adjustable Hydrophilic Rubber' }
    ],
    inStock: true,
    stockCount: 22
  },
  {
    id: 'run-nightpulse-led-armband',
    name: 'NightPulse High-Vis Neon LED Armband (Pair)',
    category: 'running',
    tagline: 'Rechargeable weatherproof glowing pulse band for night runs',
    originalPrice: 210,
    discountedPrice: 139,
    discountPercent: 34,
    rating: 4.8,
    reviewsCount: 78,
    image: '/src/assets/images/running_gear_showcase_1794059494553.jpg',
    badge: 'NIGHT RUN SPEC',
    isTopPick: false,
    shortDescription: 'USB-C rechargeable high-intensity neon green LED band visible from 500 meters.',
    fullDescription: 'When training after sunset along unlit coastal roads or dunes, the NightPulse delivers 360-degree visibility. Dual flash modes (Continuous Glow, Rapid Pulse, Slow Beacon) with up to 10 hours of runtime per charge.',
    features: [
      'Visible from over 500m in complete darkness',
      'USB-C rapid charging (fully charged in 45 minutes)',
      'IPX6 sweatproof and rainproof ultrasonic sealing',
      'Elastic velcro strap fits biceps, wrists, or ankles'
    ],
    specs: [
      { label: 'Battery Life', value: '8-10 Hours Continuous' },
      { label: 'Charging', value: 'USB-C Fast Port (Cable Included)' },
      { label: 'Modes', value: 'Solid Glow / Fast Strobe / Breathing Pulse' },
      { label: 'Quantity', value: '2 Armbands per Pack' }
    ],
    inStock: true,
    stockCount: 35
  },
  {
    id: 'run-trail-gaiters',
    name: 'AeroGrip Anti-Blister Trail Running Gaiters',
    category: 'running',
    tagline: 'Protective ankle shield against sand, scree, and desert debris',
    originalPrice: 260,
    discountedPrice: 179,
    discountPercent: 31,
    rating: 4.7,
    reviewsCount: 54,
    image: '/src/assets/images/running_gear_showcase_1794059494553.jpg',
    badge: 'DESERT READY',
    isTopPick: false,
    shortDescription: 'Durable stretch cordura gaiters seal running shoes from sand invasion and rocks.',
    fullDescription: 'Running on sand trails without gaiters is an invitation to blistering. The AeroGrip wraps tightly around standard trail running shoes, preventing sand grains and small gravel from entering the collar.',
    features: [
      'Hypalon reinforced underfoot strap with Kevlar stitching',
      'Front lace hook locks into shoe lacing',
      '4-way stretch breathable lycra collar',
      'Reflective rear logo for low-light road stretches'
    ],
    specs: [
      { label: 'Material', value: 'Nylon Cordura + Stretch Spandex' },
      { label: 'Underfoot Strap', value: 'Replaceable Hypalon Rubber' },
      { label: 'Closure', value: 'Rear Velcro Quick-Entry' }
    ],
    inStock: true,
    stockCount: 19
  },
  {
    id: 'run-carbon-soft-flask',
    name: 'SpeedFlow 500ml Carbon Soft Flask with Valve',
    category: 'running',
    tagline: 'Collapsible TPU hydration flask that compresses as you drink',
    originalPrice: 180,
    discountedPrice: 119,
    discountPercent: 34,
    rating: 4.9,
    reviewsCount: 89,
    image: '/src/assets/images/running_gear_showcase_1794059494553.jpg',
    badge: 'ESSENTIAL',
    isTopPick: false,
    shortDescription: 'Zero liquid sloshing, 42mm wide-mouth cap for ice cubes & electrolyte powders.',
    fullDescription: 'Food-grade TPU soft flask designed to fit any standard running vest pocket. As fluid empties, the flask shrinks to minimize air bounce and splashing.',
    features: [
      '100% BPA and PVC free taste-free TPU material',
      'High-flow silicone bite valve with auto-shutoff seal',
      'Wide 42mm screw cap for rapid refilling at aid stations',
      'Dishwasher safe (top rack)'
    ],
    specs: [
      { label: 'Capacity', value: '500 ml' },
      { label: 'Weight', value: '38 grams' },
      { label: 'Temperature Range', value: '-10°C to 60°C' }
    ],
    inStock: true,
    stockCount: 45
  },

  // ================= FITNESS & GYM EQUIPMENT =================
  {
    id: 'fit-hexcore-dumbbells',
    name: 'HexCore Knurled Cast Iron Dumbbell Set (Pair)',
    category: 'fitness',
    tagline: 'Commercial-grade anti-roll rubber hex dumbbells with deep knurling',
    originalPrice: 950,
    discountedPrice: 689,
    discountPercent: 27,
    rating: 5.0,
    reviewsCount: 167,
    image: '/src/assets/images/fitness_gear_showcase_1794059494749.jpg',
    badge: 'GYM ESSENTIAL',
    isTopPick: true,
    shortDescription: 'Virgin rubber encasing protects home gym floors; ergonomic chrome handles with diamond knurling.',
    fullDescription: 'Built to withstand brutal daily drops. The solid cast iron heads are welded via frictionless pin to the solid steel handle and encased in heavy virgin rubber that deadens sound and shields tile and hardwood floors from impact damage.',
    features: [
      'Solid cast-iron core with bonded virgin rubber hexagonal heads',
      'Anti-roll hex geometry keeps dumbbells stationary between sets',
      'Ergonomic hardened chrome handle with precision diamond knurl pattern',
      'Embossed weight markings in kilograms and pounds that never rub off',
      'Available pairs: 5kg, 7.5kg, 10kg, 12.5kg, 15kg, 20kg'
    ],
    specs: [
      { label: 'Core Material', value: 'Solid Cast Iron + Steel Handle' },
      { label: 'Coating', value: 'High-Density Virgin Odorless Rubber' },
      { label: 'Grip Diameter', value: '28mm Ergonomic Contour' },
      { label: 'Finish', value: 'Matte Obsidian with Neon Accent Logo' },
      { label: 'Warranty', value: 'Lifetime Structural Guarantee' }
    ],
    inStock: true,
    stockCount: 16
  },
  {
    id: 'fit-powerflex-bands',
    name: 'PowerFlex 5-Level Heavy Loop Resistance Bands',
    category: 'fitness',
    tagline: '100% natural Malaysian latex continuous loop resistance pack',
    originalPrice: 420,
    discountedPrice: 289,
    discountPercent: 31,
    rating: 4.9,
    reviewsCount: 230,
    image: '/src/assets/images/fitness_gear_showcase_1794059494749.jpg',
    badge: 'BEST VALUE',
    isTopPick: true,
    shortDescription: '5 resistance levels from 5kg to 65kg with heavy-duty door anchor and travel pouch.',
    fullDescription: 'Replace a room full of heavy equipment with this modular training pack. Ideal for pull-up assistance, heavy barbell deloading, calisthenics, physical therapy, and intense hotel workouts.',
    features: [
      '100% eco-friendly natural Malaysian layered latex (snap-resistant)',
      '5 distinct color-coded tension bands (Green, Black, Purple, Blue, Red)',
      'Total resistance range from 10 lbs up to 150 lbs when combined',
      'Includes reinforced door anchor, carrying pouch, and exercise guide'
    ],
    specs: [
      { label: 'Material', value: 'Continuous Layered Latex (No Odor)' },
      { label: 'Band Length', value: '208 cm (41 inches loop)' },
      { label: 'Tension Range', value: 'Red (15-35lb) to Green (50-125lb)' },
      { label: 'Pack Contents', value: '5 Bands + Door Anchor + Carry Bag' }
    ],
    inStock: true,
    stockCount: 28
  },
  {
    id: 'fit-speedrope-pro',
    name: 'AeroSpeed High-RPM 360° Bearing Jump Rope',
    category: 'fitness',
    tagline: 'Competition double-under speed rope with aluminum knurled grips',
    originalPrice: 280,
    discountedPrice: 189,
    discountPercent: 33,
    rating: 4.9,
    reviewsCount: 144,
    image: '/src/assets/images/fitness_gear_showcase_1794059494749.jpg',
    badge: 'CROSS TRAINING',
    isTopPick: false,
    shortDescription: 'Dual ball-bearing swivel delivers 6+ revolutions per second for effortless double-unders.',
    fullDescription: 'Designed for CrossFit athletes, boxers, and cardio conditioning. The aircraft-grade aluminum handles incorporate twin frictionless stainless steel bearings that prevent cable binding or twisting at maximum RPM.',
    features: [
      'Twin high-precision ABEC-9 stainless steel swivel bearings',
      'Aircraft-grade lightweight knurled aluminum handle',
      'Braided stainless steel cable coated with wear-resistant polyurethane',
      'Tool-free thumb screw length adjustment for custom heights up to 2m'
    ],
    specs: [
      { label: 'Handle Material', value: 'Anodized Billet Aluminum' },
      { label: 'Cable Diameter', value: '2.5mm Coated High-Tensile Steel' },
      { label: 'Cable Length', value: '300 cm (Adjustable)' },
      { label: 'Weight', value: '165 grams' }
    ],
    inStock: true,
    stockCount: 38
  },
  {
    id: 'fit-titangrip-chalk',
    name: 'TitanGrip Pure Athletic Liquid Chalk (250ml)',
    category: 'fitness',
    tagline: 'Fast-drying magnesium carbonate with anti-bacterial resin formula',
    originalPrice: 150,
    discountedPrice: 99,
    discountPercent: 34,
    rating: 4.8,
    reviewsCount: 92,
    image: '/src/assets/images/fitness_gear_showcase_1794059494749.jpg',
    badge: 'ZERO DUST',
    isTopPick: false,
    shortDescription: 'Dries in 15 seconds to create a chalk armor that repels sweat during deadlifts & pull-ups.',
    fullDescription: 'Approved in commercial gyms that prohibit powdered chalk dust. A dime-sized squirt provides rock-solid friction across palms and fingers, lasting through complete heavy sets without messy reapplication.',
    features: [
      'Dries completely in 15-20 seconds with clean matte chalk finish',
      'Zero airborne dust—gym friendly and clean transport in gym bags',
      'Formulated with cosmetic-grade ethanol and pure magnesium carbonate',
      'Easy wash-off with warm water and soap after training'
    ],
    specs: [
      { label: 'Volume', value: '250 ml (Approx. 120 applications)' },
      { label: 'Active Ingredient', value: '100% Pure Magnesium Carbonate' },
      { label: 'Bottle Type', value: 'Leakproof Flip-Top Squeeze Dispenser' }
    ],
    inStock: true,
    stockCount: 50
  },
  {
    id: 'fit-tactical-vest',
    name: 'Tactical 10KG Modular Weight Vest with Plates',
    category: 'fitness',
    tagline: 'Military-grade 1000D Cordura vest for Murph workouts and calisthenics',
    originalPrice: 1100,
    discountedPrice: 799,
    discountPercent: 27,
    rating: 5.0,
    reviewsCount: 73,
    image: '/src/assets/images/fitness_gear_showcase_1794059494749.jpg',
    badge: 'HEAVY DUTY',
    isTopPick: false,
    shortDescription: 'Ergonomic contour hugs chest and shoulders; includes laser-cut steel weight plates.',
    fullDescription: 'Constructed from ballistic 1000D Cordura nylon with padded yoke shoulder straps that distribute plate weight evenly across traps. The elastic cummerbund and quick-release pull cord allow snug fit during running, pull-ups, and burpees.',
    features: [
      'Waterproof, abrasion-resistant 1000D Ballistic Cordura',
      'Padded aerospace mesh shoulder pads reduce clavicle pressure',
      'Includes pair of 4.5kg contoured laser-cut powder-coated steel plates',
      'Laser-cut MOLLE webbing front & back for hydration or gear clips'
    ],
    specs: [
      { label: 'Total Weight', value: '10 kg (Vest 1kg + Plates 9kg)' },
      { label: 'Fabric', value: '1000D Ballistic Nylon' },
      { label: 'Adjustability', value: 'One Size Fits All (Waist 30" - 46")' },
      { label: 'Color', value: 'Stealth Black with Neon Green Stitching' }
    ],
    inStock: true,
    stockCount: 8
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Equipment', count: PRODUCTS.length },
  { id: 'swimming', label: 'Swimming Equipment', count: PRODUCTS.filter(p => p.category === 'swimming').length },
  { id: 'running', label: 'Running Equipment', count: PRODUCTS.filter(p => p.category === 'running').length },
  { id: 'fitness', label: 'Fitness & Gym', count: PRODUCTS.filter(p => p.category === 'fitness').length }
] as const;
