# DAKHLA FIT — Modern Athletic E-Commerce Storefront

A high-performance, single-page athletic e-commerce storefront for **DAKHLA FIT**, combining a cyberpunk neon wireframe 3D interactive hero, reactive cursor particles, floating fitness badges, and a curated sports equipment catalog (Swimming, Running, and Fitness) with direct WhatsApp ordering in Moroccan Dirhams (MAD).

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX choices have been confirmed during the interview phase and are locked into the build plan:

- **Confirmed Currency & Pricing**: Moroccan Dirham (`MAD` / `DH`), tailored to Morocco's premier coastal fitness, kitesurfing, and endurance hub in Dakhla.
- **Confirmed Checkout Flow**: Instant single-product WhatsApp ordering. Each product card and quick-view modal features a prominent 1-click "Order via WhatsApp" button generating an encoded, formatted WhatsApp message (`https://wa.me/<phone>?text=...`) containing the exact product title, discounted price in MAD, item SKU, and delivery notes.
- **Confirmed 3D Hero Interaction**: Cyberpunk neon wireframe 3D typography for **"DAKHLA FIT"** rendered via Three.js with dynamic glowing neon vertices/edges, reactive ambient cursor particles that disperse and follow mouse movement, and interactive floating fitness badges that tilt and respond magnetically to cursor velocity.
- **Category Taxonomy**: Three focused athletic disciplines:
  1. **Swimming Equipment** (Open water goggles, silicone training fins, neoprene thermal caps, pull buoys, waterproof drybags).
  2. **Running Equipment** (Hydration vests, carbon-plate trail gaiters, LED night running armbands, aerodynamic sunglasses, GPS armbands).
  3. **Fitness & Gym Equipment** (Hex dumbbells, heavy resistance bands, high-speed jump ropes, grip chalk balls, weighted vests).

---

## 1. Overview & Core Concept

- **What It Does**: Provides an electrifying, ultra-responsive athletic shopping experience where athletes and fitness enthusiasts can explore high-grade gear across swimming, running, and gym disciplines. Shoppers interact with a 3D kinetic cyberpunk typography canvas, seamlessly filter categories, inspect product specifications and savings in a quick-view modal, and order instantly over WhatsApp.
- **Target Audience / Persona**: Athletes, endurance runners, open-water swimmers, and gym enthusiasts in Morocco (and visitors training in Dakhla's windy lagoons and coastal trails) who demand durable gear and direct, hassle-free ordering.
- **Key Value**: Immediate gear discovery with zero friction—no clunky account creation or payment gateway drop-offs. High visual impact with smooth 60fps 3D visuals paired with direct WhatsApp sales conversion.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Arrival & Hero Immersion**:
   - The user arrives at an immersive deep black canvas (`#0a0a0a`) dominated by glowing neon green (`#00FF66`) and chrome typography.
   - Moving the pointer causes the 3D wireframe letterforms of "DAKHLA FIT" to subtly rotate in perspective, while thousands of reactive ambient neon particles drift and swerve away from the cursor.
   - Floating interactive badges for *Swimming*, *Running*, and *Fitness* orbit with gentle spring physics and magnetic hover highlights.
2. **Category Switching & Catalog Discovery**:
   - Directly integrated with the hero are sleek segmented category tabs (`All Gear`, `Swimming`, `Running`, `Fitness`).
   - Clicking a category smoothly filters the product grid with zero layout shift, displaying discount percentage badges (e.g., `-25%`, `-30%`), original struck-through prices, and vibrant neon green discounted prices in `MAD`.
3. **Quick-View Modal & WhatsApp Conversion**:
   - Clicking any product card triggers a modal dialog with high-definition product imagery, detailed technical specs (materials, dimensions, usage tips), stock status, and savings summary.
   - A high-visibility "Order via WhatsApp" button immediately launches WhatsApp (Web or Mobile App) with a pre-formatted message:
     ```
     Salam Dakhla Fit! I would like to order:
     • Product: HydroPro Carbon Goggles
     • Price: 349 MAD (Discounted from 499 MAD)
     • Category: Swimming Equipment
     Please confirm availability and delivery to my city.
     ```

### Visual Identity & Theme

- **Aesthetic Direction**: High-energy, athletic cyberpunk minimalism. Dark, technical, and precise—reminiscent of elite sports performance labs and nocturnal training sessions.
- **Color Palette & Discipline (60-30-10)**:
  - `60% Neutral Canvas`: `#0a0a0a` (Deep Obsidian Black) background with subtle dark carbon accents (`#121212`, `#181818`).
  - `30% Structural Surfaces`: Hairline borders (`rgba(255,255,255,0.08)` or `#222222`), muted text (`#8E8E93` / `#A1A1AA`), dark card surfaces (`#141416`).
  - `10% Accent Energy`: `#00FF66` (Electric Neon Green) strictly allocated to active filters, price callouts, discount tags, primary WhatsApp CTAs, and 3D glowing edges. Secondary accent: crisp pure white (`#FFFFFF`) for primary titles.
- **Typography**:
  - *Display / Headings*: `Outfit` / `Barlow Condensed` for punchy, athletic headline impact with strict headline containment and `text-wrap: balance`.
  - *Body & UI*: `Plus Jakarta Sans` for crystal-clear readability across product descriptions, specs, and modal copy.
  - *Prices & Metrics*: Monospace tabular numerals (`font-mono tabular-nums`) for clean price alignments and discount percentages.
- **Motion & Micro-interactions**:
  - Fluid 3D canvas rendering using a stable `useRef` container and software-WebGL safety guards.
  - Spring-damped hover state on cards (`transform: translateY(-4px)` with soft neon shadow glow).
  - Clean modal transitions under 200ms using motion and accessible backdrop click-dismiss.

---

## 3. Key Product Decisions & Trade-Offs

- **Three.js Cyberpunk 3D Wireframe vs. Heavy 3D Model Assets**:
  - *Decision*: Build procedural wireframe typography and geometric sport mesh badges directly in Three.js rather than loading large external `.gltf` or font JSON files.
  - *Rationale*: Zero asset 404 risk, instantaneous initial load time (<100ms), 60fps performance on all devices, and total control over neon glow, vertex displacement, and particle cursor physics.
- **Single-Product Instant WhatsApp Checkout vs Multi-Step Cart**:
  - *Decision*: Focus checkout on instant single-product WhatsApp ordering as chosen by the user, while providing a sticky quick-contact floating trigger for general inquiries.
  - *Rationale*: Matches Moroccan e-commerce consumer behavior where WhatsApp is the highest-converting direct sales channel, eliminating checkout drop-off.
- **Product Assets via Dedicated High-Fidelity Photography**:
  - *Decision*: Generate custom studio product photography for swimming, running, and gym gear on dark athletic pedestals using `generate_image`, paired with bulletproof SVG/CSS fallback placeholders.

---

## 4. Technical Architecture & Component Structure

```
┌────────────────────────────────────────────────────────────────────────┐
│                              App.tsx                                   │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Navbar (Brand Wordmark, Category Anchor Links, Direct WhatsApp)  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ HeroSection:                                                     │  │
│  │   • ThreeCanvas.tsx (3D Wireframe Title, Cursor Particles,       │  │
│  │     Interactive Orbiting Floating Sport Badges)                  │  │
│  │   • CategoryFilterBar (All Gear | Swimming | Running | Fitness)  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ FeaturedProductsGrid:                                            │  │
│  │   • ProductCard (Image, Discount Tag, MAD Price, Quick View CTA) │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ BrandStory & ValueProps (Dakhla Coastal Performance, Fast Ship)   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Footer (Contact, WhatsApp Direct Hotline, Hours, Copyright)      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ QuickViewModal (Full Spec Sheet, Feature List, WhatsApp Order)   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### State Management & Handlers

- `selectedCategory`: `'all' | 'swimming' | 'running' | 'fitness'` — drives immediate filtering of the product catalog.
- `activeProduct`: `Product | null` — drives the open/closed state of the quick-view modal dialog.
- `searchQuery`: string — allows instant keyword lookup across products.
- `generateWhatsAppLink(product, note)`: builds an encoded `https://wa.me/212600000000?text=...` URI.

---

## 5. Execution Steps (Post-Approval)

1. **Install Dependencies**: Install `three` and `@types/three` via `install_applet_package`.
2. **Generate Studio Product Imagery**: Parallel batch generation of athletic product photography (swimming gear, trail running pack, fitness kettlebell/bands) using `generate_image`.
3. **Build 3D Cyberpunk Typography & Particle Scene**: Develop `ThreeCanvas.tsx` featuring neon wireframe geometry, mouse velocity tracker, interactive particle vortex, and floating fitness symbols.
4. **Build Product Catalog & Filter State**: Construct comprehensive product data for Swimming, Running, and Fitness equipment with realistic MAD pricing, discounts, and technical specs.
5. **Implement Quick-View Modal & WhatsApp Generator**: Create interactive modal with rich details, variant options, and pre-filled WhatsApp ordering link.
6. **Polishing & Verification**: Verify responsive design, WCAG contrast, software WebGL safeguards, and run `compile_applet` + `lint_applet`.
