// lib/services-data.ts
// Single source of truth for all service data
// Imported by: app/services/page.tsx, app/services/[slug]/page.tsx, app/sitemap.ts

export const SERVICES = [
  {
    id: "hvac",
    anchor: "hvac",
    slug: "hvac",
    num: "01",
    eyebrow: "Climate Control",
    seoTitle:
      "Heating, Ventilation, and Air Conditioning (HVAC) Installation and Maintenance Services in Kenya",
    headline: "Precision Climate, Every Season",
    title: "Heating, Ventilation & Air Conditioning (HVAC)",
    metaTitle:
      "Heating, Ventilation & Air Conditioning (HVAC) Installation in Nairobi, Kenya | Élan Climat",
    metaDescription:
      "Expert Heating, Ventilation, and Air Conditioning (HVAC) installation, repair and maintenance across Nairobi, Mombasa, Kisumu, Eldoret & Nakuru. VRF systems, ducted AC, and preventive contracts. Request a quote.",
    description:
      "From split units to full VRF systems, Élan Climat & Énergie designs, installs, and services Heating, Ventilation, and Air Conditioning (HVAC) solutions for homes, offices, hotels, hospitals, and industrial facilities across Nairobi, Mombasa, Kisumu, Eldoret, and Nakuru. Every HVAC system is sized and commissioned for peak energy efficiency in Kenya's climate, and backed by a Nairobi-based engineering team that also delivers solar PV, cold room refrigeration, electrical, plumbing, and elevator works under one contractor.",
    features: [
      "Full system design & load calculations",
      "VRF / VRV multi-split systems",
      "Ducted central air systems",
      "Preventive maintenance contracts",
      "Air quality & filtration upgrades",
    ],
    contentSections: [
      {
        heading: "Design & Engineering",
        body: [
          "Every Heating, Ventilation, and Air Conditioning (HVAC) project at Élan Climat begins on paper, not on site. Before any equipment is specified, our engineers carry out a detailed cooling and heating load calculation using actual building data — orientation, glazing ratios, occupancy density, internal heat gains from equipment and lighting, and Kenya-specific weather profiles for the project's location. This is the single step most under-engineered installations skip, and it's the root cause of the two most common HVAC complaints we inherit from other contractors: systems that are too large and short-cycle constantly, or too small and never quite hold setpoint on a hot afternoon.",
          "For multi-zone commercial buildings, we model airflow and ductwork routing in CAD before fabrication begins, checking for clashes with structural beams, electrical containment, and ceiling void depth. This reduces on-site rework to a fraction of what's typical in the Kenyan market and means the HVAC installation programme we quote is the installation programme we deliver, whether the project is a single-storey retail fit-out in Nairobi or a multi-floor hotel tower on the coast.",
        ],
      },
      {
        heading: "Equipment & System Types",
        body: [
          "We design and install the full range of HVAC technologies suited to Kenya's building stock: wall-mounted and floor-ceiling split units for individual rooms; VRF/VRV multi-split systems that allow dozens of indoor units to run off a shared outdoor condenser with independent zone control; ducted central air systems for open-plan commercial floors and hospitality projects; and precision cooling units for server rooms and data centres where temperature and humidity tolerances are far tighter than in standard occupied space.",
          "Equipment is sourced exclusively through authorised distributors of brands including Daikin, Mitsubishi Electric, LG, Samsung, Carrier, and Trane — never grey-market imports — which protects warranty validity and ensures genuine spare parts remain available for the HVAC system's full service life.",
        ],
      },
      {
        heading: "Installation Process",
        body: [
          "Once a design is approved, installation follows a fixed sequence: structural mounting and vibration isolation for outdoor condensers, refrigerant pipe routing with correct fall and insulation thickness to prevent condensation damage, condensate drainage tied into the building's plumbing with appropriate trap and fall, and electrical connection through dedicated circuits sized to the equipment's actual draw — not a generic allowance. Refrigerant lines are pressure-tested and evacuated to remove moisture and air before charging, and every HVAC system is commissioned against manufacturer specification before handover, with readings logged and provided to the client.",
        ],
      },
      {
        heading: "Compliance & Standards",
        body: [
          "All electrical work associated with HVAC installation is carried out by EPRA-registered electricians, and refrigerant handling follows EPA-aligned recovery and charging practices to avoid uncontrolled release of refrigerant gases. For commercial and hospitality projects, we also account for Kenya's building code requirements around mechanical ventilation rates and fire-damper integration where ductwork penetrates compartment walls.",
        ],
      },
      {
        heading: "Maintenance & Aftercare",
        body: [
          "A Heating, Ventilation, and Air Conditioning (HVAC) system's efficiency degrades steadily from the day it's commissioned unless it's maintained on a schedule. Our preventive maintenance contracts cover filter cleaning or replacement, condenser and evaporator coil cleaning, refrigerant pressure and superheat checks, electrical connection tightening, and condensate drain clearing — the items that, left unaddressed, quietly push running costs up by 15–30% within two years. Contract clients also receive priority emergency response and discounted call-out rates outside the maintenance schedule.",
        ],
      },
      {
        heading: "Working With a Multi-Disciplinary Contractor",
        body: [
          "Because Élan Climat & Énergie also delivers solar PV and battery storage, electrical works, plumbing, cold room refrigeration, and elevator installation, our HVAC clients frequently combine projects — a hotel replacing its chiller plant while also adding solar offset, or a hospital pairing a new ducted system with a standby generator upgrade. Running these scopes through one engineering team, rather than coordinating separate specialist contractors, removes the interface risk that typically shows up at handover as blame-shifting between trades.",
        ],
      },
    ],
    useCases: [
      {
        sector: "Hospitality",
        description:
          "Guest comfort is non-negotiable for hotels and lodges. We design quiet, zoned HVAC systems that let each room or suite control its own setpoint without disturbing the building's overall energy profile, with particular attention to noise levels in sleeping areas.",
      },
      {
        sector: "Healthcare",
        description:
          "Hospitals and clinics require precise temperature and humidity control, particularly in theatres, wards, and pharmacy storage. We design HVAC systems with appropriate filtration and positive/negative pressure relationships where infection control requires it.",
      },
      {
        sector: "Data Centres & Server Rooms",
        description:
          "Precision cooling units maintain the tight temperature and humidity bands that IT equipment requires, with redundant configurations so a single unit failure doesn't risk an outage.",
      },
      {
        sector: "Residential",
        description:
          "From a single split unit in a Westlands apartment to whole-house ducted systems in a Karen villa, we right-size residential HVAC to the home's actual heat load rather than a rule-of-thumb estimate.",
      },
    ],
    faq: [
      {
        q: "How long does HVAC installation take for a commercial building in Nairobi?",
        a: "For a typical commercial fit-out in Nairobi, Heating, Ventilation, and Air Conditioning (HVAC) installation takes 2–6 weeks depending on system complexity. A simple split-unit installation for a small office can be completed in 1–2 days, while a full VRF system for a multi-floor building typically requires 3–5 weeks including ductwork, controls wiring, and commissioning.",
      },
      {
        q: "What HVAC systems work best in Nairobi's climate?",
        a: "Nairobi's moderate altitude (1,700m) and relatively stable temperatures make it well-suited to inverter-driven split systems and VRF/VRV multi-splits. For large commercial buildings, ducted central systems with energy recovery ventilation (ERV) offer the best balance of comfort and energy efficiency. Coastal locations like Mombasa require systems rated for high humidity and salt-air corrosion.",
      },
      {
        q: "Do you provide HVAC maintenance contracts in Kenya?",
        a: "Yes. We offer quarterly and annual preventive maintenance contracts covering filter cleaning, coil inspections, refrigerant top-up checks, electrical connection tightening, and full performance testing. Contract clients receive priority response times and discounted emergency call-out rates.",
      },
      {
        q: "Can you service HVAC systems installed by other companies?",
        a: "Absolutely. We service all major brands including Daikin, Mitsubishi Electric, LG, Samsung, Carrier, and Trane. Our technicians are trained across multiple platforms and can diagnose faults, source spare parts, and bring underperforming systems back to specification.",
      },
      {
        q: "What is the cost of HVAC installation in Kenya?",
        a: "HVAC installation costs in Kenya vary significantly based on system type, building size, and location. A single residential split unit starts from KES 60,000 installed, while a full VRF system for a commercial building can range from KES 800,000 to several million shillings. We provide detailed, itemised quotations after a free site survey.",
      },
      {
        q: "Do you size HVAC systems based on actual load calculations or rule-of-thumb estimates?",
        a: "We always perform a proper load calculation using site-specific data — orientation, glazing, occupancy, and equipment heat loads. Rule-of-thumb sizing is the leading cause of oversized systems that short-cycle and underperform, and we don't quote installations on that basis.",
      },
      {
        q: "How often should HVAC filters be cleaned or replaced in Kenya?",
        a: "In Nairobi's relatively dusty environment, we recommend filter inspection monthly and cleaning or replacement every 1–3 months for standard split and VRF systems, and more frequently for units near construction sites or unpaved roads. Maintenance contract clients have this scheduled automatically.",
      },
      {
        q: "Can you integrate HVAC controls with a building management system (BMS)?",
        a: "Yes. For commercial and hospitality projects, we integrate HVAC controllers with BMS platforms via BACnet or Modbus protocols, enabling centralised scheduling, demand-based control, and energy reporting across the entire building.",
      },
      {
        q: "Does Élan Climat only handle HVAC, or do you cover other building services too?",
        a: "HVAC is one of seven disciplines we deliver in-house. Élan Climat & Énergie is a multi-disciplinary engineering contractor also covering solar PV and battery storage, cold room refrigeration, electrical works, plumbing, elevator installation and maintenance, and standby generator supply — so a client can run an HVAC upgrade alongside a solar or electrical scope with a single point of accountability.",
      },
    ],
    whyPoints: [
      {
        title: "Certified Engineers",
        body: "Our team holds ASHRAE and manufacturer-level certifications with over 10 years of Kenya-specific installation experience.",
      },
      {
        title: "Energy-First Design",
        body: "Every system is load-calculated to avoid oversizing — the most common cause of poor efficiency and high running costs.",
      },
      {
        title: "Genuine Parts Only",
        body: "We source directly from authorised distributors, ensuring warranty validity and long-term parts availability.",
      },
      {
        title: "Nationwide Coverage",
        body: "Active project teams across Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, and Nyeri.",
      },
    ],
    heroImg: "/everett.jpg",
    heroAlt:
      "Heating, Ventilation, and Air Conditioning (HVAC) installation project in Nairobi Kenya",
    colA: "/sticky.png",
    colB: "/images/HVAC.jpg",
    colAlt: [
      "HVAC ducting installation Kenya",
      "Air conditioning system Nairobi",
    ],
    dark: false,
  },
  {
    id: "plumbing",
    anchor: "plumbing",
    slug: "plumbing",
    num: "02",
    eyebrow: "Water Systems",
    seoTitle:
      "Commercial and Residential Plumbing Installation, Repair and Maintenance Services in Kenya",
    headline: "Flows Built to Last",
    title: "Plumbing Services",
    metaTitle:
      "Commercial & Residential Plumbing Contractor in Nairobi, Kenya | Élan Climat & Énergie",
    metaDescription:
      "Full plumbing installations, repairs and emergency call-outs for commercial buildings, apartments, hospitals & hotels across Nairobi, Mombasa & Nyeri. Supply lines, riser systems, drainage, leak detection & 24/7 emergency repairs from a licensed Kenyan plumbing contractor.",
    description:
      "Élan Climat & Énergie delivers complete plumbing contracting services from underground supply lines to high-rise riser systems, sanitary installations, and hot-water design across Nairobi, Mombasa, and Nyeri. As a licensed Kenyan plumbing contractor, we handle new builds, tenant-improvement renovations, and emergency repairs for commercial buildings, apartments, hotels, hospitals, schools, and industrial facilities throughout Kenya, with every installation engineered rather than guessed at.",
    features: [
      "Domestic & commercial supply lines",
      "High-rise riser & stack systems",
      "Sanitary & drainage installations",
      "Hot-water system design",
      "Leak detection & remediation",
    ],
    contentSections: [
      {
        heading: "Design & Engineering",
        body: [
          "Plumbing failures in Kenyan commercial buildings are rarely caused by bad workmanship alone — far more often, they trace back to a design stage that was skipped entirely. Élan Climat's plumbing engineers work from approved architectural and structural drawings to size every pipe run correctly, calculate adequate water storage capacity for peak demand, and set drainage gradients that actually self-clear rather than relying on regular rodding to keep them flowing.",
          "For high-rise developments, this means modelling pressure zones across the building height, specifying booster pumps and pressure-reducing valves where needed, and coordinating riser shaft positions with the structural and architectural teams before concrete is poured — because retrofitting a riser into a finished shaft is one of the most expensive mistakes a project can make. We apply the same design discipline to smaller residential and commercial plumbing jobs, sizing cold and hot water branches to fixture unit demand rather than a flat assumption per bathroom.",
        ],
      },
      {
        heading: "Materials & System Types",
        body: [
          "We specify CPVC, PPR, or stainless steel for hot and cold water supply depending on pressure class and budget, and UPVC conforming to Kenya Bureau of Standards specifications for drainage and soil systems. For high-rise risers, we use stainless or heavy-duty PPR with proper expansion allowance, since thermal movement in tall buildings is a common cause of leaks at poorly detailed pipe penetrations.",
          "Hot water systems are designed around the building's actual usage profile — instantaneous, storage, or solar-thermal pre-heat feeding into a backup system — rather than a single default specification applied regardless of building type. Because our plumbing team works alongside our in-house solar division, we can also design solar water heating as the primary heat source, with electric or gas backup sized only for shortfall, which meaningfully cuts a hotel or apartment block's energy bill.",
        ],
      },
      {
        heading: "Installation Process",
        body: [
          "Installation follows the building programme floor by floor for multi-storey projects: first-fix pipework before walls and slabs close, pressure testing of every section before it's covered, second-fix fittings and sanitaryware once finishes are complete, and a full commissioning and flush of the system before handover. Underground supply mains are laid to correct depth and bedding to protect against ground movement and vehicle loading where they cross access roads.",
        ],
      },
      {
        heading: "Compliance & Standards",
        body: [
          "All installations conform to the Kenya Plumbing Code and KEBS material standards, with backflow prevention fitted wherever a system could otherwise contaminate the public supply — a requirement frequently missed on smaller commercial fit-outs but one we treat as non-negotiable. Where a project also involves electrical, HVAC, or elevator works, our plumbing scope is coordinated on the same drawing set to avoid the clashes that occur when trades are contracted separately and design in isolation.",
        ],
      },
      {
        heading: "Leak Detection & Remediation",
        body: [
          "Where a leak is suspected but its location isn't obvious, we use acoustic leak detection and thermal imaging to pinpoint the source within walls, slabs, or underground lines before any demolition begins. This typically saves clients from the unnecessary breaking-out that comes with guesswork-based leak chasing, and lets us repair precisely rather than broadly. For older buildings in Nairobi's established neighbourhoods, this approach is often the difference between a contained repair and weeks of disruptive, speculative excavation.",
        ],
      },
      {
        heading: "Maintenance & Emergency Response",
        body: [
          "Plumbing problems rarely wait for business hours. We provide same-day emergency response across Nairobi for burst pipes, severe leaks, and blocked drains, with maintenance contract holders receiving priority response within two hours. Scheduled maintenance covers drain jetting, water tank cleaning, valve servicing, and pump inspection for buildings with booster systems.",
        ],
      },
      {
        heading: "Water Storage, Booster Pumps & Pressure Management",
        body: [
          "Consistent water pressure from the ground floor to the top of a building is rarely automatic in Nairobi and Mombasa, where municipal supply pressure and reliability vary significantly by neighbourhood. We design storage tank capacity, booster pump duty-standby configurations, and pressure-reducing valve stations specifically for each site's supply conditions, rather than applying a generic sizing formula that leaves upper floors under-pressured or lower floors over-pressured and prone to fitting failure.",
        ],
      },
    ],
    useCases: [
      {
        sector: "Residential Developments",
        description:
          "Complete riser and distribution design for apartment blocks, coordinated with developers from slab stage through to handover, including individual unit metering where required.",
      },
      {
        sector: "Hotels & Hospitality",
        description:
          "High-demand hot water systems and guest bathroom fit-outs designed to handle peak simultaneous usage without pressure drop or temperature fluctuation.",
      },
      {
        sector: "Hospitals & Healthcare",
        description:
          "Medical-grade water systems with appropriate backflow protection and, where needed, dedicated supply for sterilisation and laboratory equipment.",
      },
      {
        sector: "Commercial & Office Buildings",
        description:
          "Sanitary core design and drainage systems engineered for high daytime occupancy turnover, minimising the blockages and odour issues common in poorly ventilated stacks.",
      },
      {
        sector: "Industrial Facilities",
        description:
          "Process and utility water plumbing for manufacturing and food-processing sites, including trade-waste drainage designed to local discharge requirements.",
      },
    ],
    faq: [
      {
        q: "Do you handle emergency plumbing repairs in Nairobi?",
        a: "Yes. We provide emergency plumbing response across Nairobi with same-day call-outs for burst pipes, severe leaks, blocked drains, and water system failures. Maintenance contract holders receive priority emergency response within 2 hours.",
      },
      {
        q: "Can you install plumbing for a new apartment block in Kenya?",
        a: "Yes. We handle complete plumbing installations for residential developments including riser stacks, cold and hot water distribution, sanitary fixtures, and drainage systems. We work directly with developers and contractors from slab stage through to handover.",
      },
      {
        q: "What pipe materials do you use for commercial installations?",
        a: "We specify CPVC, PPR, and stainless steel for hot and cold water supply depending on pressure requirements and budget. For drainage, we use UPVC conforming to Kenya Bureau of Standards specifications. All materials are sourced from certified suppliers.",
      },
      {
        q: "Do you provide leak detection services in Nairobi?",
        a: "Yes. We use acoustic leak detection and thermal imaging to locate hidden leaks within walls, slabs, and underground lines without unnecessary demolition. This service is available across Nairobi and Mombasa.",
      },
      {
        q: "How long does plumbing installation take for a commercial building?",
        a: "A standard commercial plumbing installation for a 5-storey building in Nairobi typically takes 4–8 weeks, working floor by floor alongside the civil works programme. We coordinate closely with the main contractor to minimise programme impact.",
      },
      {
        q: "Do you design water storage and booster pump systems for high-rise buildings?",
        a: "Yes. We calculate peak demand and design adequate storage tank capacity along with booster pump and pressure-reducing valve setups so that water pressure remains consistent from the ground floor to the top of the building.",
      },
      {
        q: "Can you retrofit plumbing in an occupied building without major disruption?",
        a: "Yes, though it requires more careful sequencing. We plan retrofit work in phases, isolating sections of the system rather than the whole building where possible, and schedule disruptive work outside peak occupancy hours wherever the client's operations allow it.",
      },
      {
        q: "Do you install backflow prevention devices in Kenya?",
        a: "Yes. Backflow prevention is fitted on any system with a cross-connection risk to the public water supply, including irrigation systems, boiler feeds, and certain commercial equipment connections, in line with the Kenya Plumbing Code.",
      },
      {
        q: "Can you combine a plumbing upgrade with solar water heating?",
        a: "Yes. Because plumbing and solar are both delivered in-house at Élan Climat, we regularly design solar water heating as the primary hot water source for hotels and apartment blocks, with electric or gas backup sized only to cover shortfall on low-sun days, reducing water heating costs significantly.",
      },
      {
        q: "Do you offer plumbing maintenance contracts, not just one-off repairs?",
        a: "Yes. Alongside emergency call-outs, we offer scheduled maintenance contracts covering drain jetting, water tank cleaning, pump servicing, and valve inspection, which reduces the frequency of emergency failures and extends the working life of the system.",
      },
    ],
    whyPoints: [
      {
        title: "Design-Led Installation",
        body: "We work from engineered drawings, not estimates — ensuring correct pipe sizing, pressure zoning, and drainage gradients from the start.",
      },
      {
        title: "High-Rise Specialists",
        body: "Experienced in riser systems, booster pumps, and pressure-reducing valves for buildings up to 20 storeys.",
      },
      {
        title: "Standards Compliant",
        body: "All installations conform to Kenya Plumbing Code and KEBS material standards.",
      },
      {
        title: "Emergency Response",
        body: "Same-day emergency plumbing response available across Nairobi and Mombasa.",
      },
    ],
    heroImg:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    heroAlt: "Commercial plumbing installation Kenya",
    colA: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=700&q=80",
    colB: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80",
    colAlt: ["Plumbing pipe installation Kenya", "Water supply system Nairobi"],
    dark: true,
  },
  {
    id: "solar",
    anchor: "solar",
    slug: "solar",
    num: "03",
    eyebrow: "Renewable Energy",
    seoTitle:
      "Grid-Tied, Off-Grid & Hybrid Solar Panel Installation and Battery Storage in Kenya",
    headline: "Harness Kenya's Sunshine",
    title: "Solar Installation",
    metaTitle:
      "Solar Panel Installation & Battery Storage in Kenya — Grid-Tied, Off-Grid & Hybrid | Élan Climat",
    metaDescription:
      "Professional solar PV installation across Nairobi, Mombasa, Kisumu & rural Kenya. Grid-tied, off-grid, and hybrid systems with lithium battery storage. KPLC net-metering liaison from a licensed solar contractor.",
    description:
      "Élan Climat & Énergie designs and installs grid-tied, off-grid, and hybrid solar PV systems engineered for maximum yield across Kenya. Our solar division handles site surveys, structural mounting, inverter sizing, lithium battery storage, and KPLC grid interconnection for homes, businesses, and farms in Nairobi, Mombasa, Kisumu, Nakuru, and rural Kenya, and frequently co-engineers solar systems alongside our HVAC, cold room, and electrical scopes on the same project.",
    features: [
      "Rooftop & ground-mount PV systems",
      "Battery energy storage (BESS)",
      "Hybrid grid-tied systems",
      "Net-metering & KPLC liaison",
      "Performance monitoring & O&M",
    ],
    contentSections: [
      {
        heading: "Design & Energy Audit",
        body: [
          "Kenya receives some of the highest solar irradiance in the world — averaging 4 to 6 peak sun hours daily across most of the country — but turning that natural advantage into real, bankable savings depends entirely on accurate system sizing. Every Élan Climat solar project starts with an energy audit of the client's actual consumption pattern, pulled from utility bills and, where useful, temporary load logging, rather than a generic per-square-metre estimate.",
          "We then carry out a shading analysis and structural assessment of the proposed mounting location, whether that's a rooftop, a ground-mount array, or a carport structure, to confirm the site can support the system without compromising the building's structural integrity or the array's expected output. For commercial and industrial clients, the energy audit also identifies which loads are best offset by solar directly versus which loads would benefit more from a battery-backed hybrid configuration.",
        ],
      },
      {
        heading: "Equipment Selection",
        body: [
          "We supply and install tier-1 solar panels and inverters exclusively — manufacturers with a proven bankability track record and long-term performance warranties, not the cheaper unverified imports that quietly underperform within a few years. Battery storage designs use LiFePO4 (lithium iron phosphate) chemistry, chosen specifically for its long cycle life and stable performance in Kenya's ambient temperature range, which is considerably kinder to battery chemistry than the high-heat conditions found in some other African markets.",
        ],
      },
      {
        heading: "Installation & Grid Interconnection",
        body: [
          "Installation covers structural mounting with appropriate wind and seismic loading allowances, DC wiring with correctly rated cable and fusing, AC wiring back to the distribution board, earthing, and surge protection. For grid-tied and hybrid systems, we handle the full KPLC interconnection process — system documentation, export meter installation, and interconnection agreement processing — so clients aren't left navigating utility paperwork themselves.",
        ],
      },
      {
        heading: "Hybrid & Battery Storage Configuration",
        body: [
          "Hybrid systems are configured to prioritise solar self-consumption first, battery charging second, and grid export or import last — the sequencing that delivers the strongest financial return under Kenya's current tariff structure. For off-grid sites, battery banks are sized to cover critical loads through extended cloudy periods, with a clear, documented basis for that sizing rather than a rounded-up guess.",
        ],
      },
      {
        heading: "Commissioning & Monitoring",
        body: [
          "Every system is commissioned with remote performance monitoring, giving the client visibility into daily generation, consumption offset, and any underperformance alerts without needing to climb onto the roof to check. This also gives our operations and maintenance team early warning of degrading panel strings or inverter faults, often before the client notices any change in their bill.",
        ],
      },
      {
        heading: "Costs, Payback Period & Financing Considerations",
        body: [
          "Solar payback periods in Kenya typically range from 3 to 6 years for commercial and industrial installations, depending on the client's existing tariff band and daytime consumption profile, and somewhat longer for residential systems where usage is more evening-weighted. During the proposal stage we model expected generation against the client's actual load profile to give a realistic payback estimate rather than an optimistic headline figure, and we advise on structuring projects to qualify for available financing or leasing arrangements where relevant.",
        ],
      },
      {
        heading: "Operations & Maintenance",
        body: [
          "Panel soiling from dust is a genuine yield loss factor in Kenya's dry seasons, particularly for sites near unpaved roads or agricultural land. Our operations and maintenance (O&M) contracts include scheduled panel cleaning, torque-checking of mounting hardware, inverter firmware updates, string-level performance verification against expected output, and battery health checks for hybrid and off-grid systems — the routine work that keeps a system performing at its commissioned yield for the full 25-year design life rather than degrading unnoticed.",
        ],
      },
    ],
    useCases: [
      {
        sector: "Residential Homes",
        description:
          "Rooftop systems sized to a household's real usage pattern, often paired with battery storage to ride through KPLC outages without disrupting daily life.",
      },
      {
        sector: "Commercial & Industrial",
        description:
          "Larger rooftop or ground-mount arrays designed to offset daytime industrial or commercial loads, with net-metering arrangements handled end-to-end.",
      },
      {
        sector: "Agriculture & Farms",
        description:
          "Off-grid and hybrid systems powering irrigation pumps, cold storage, and farm operations in areas with limited or unreliable grid access.",
      },
      {
        sector: "Integrated Solar-HVAC",
        description:
          "Solar systems co-engineered with HVAC loads, often combining a hybrid inverter with DC-inverter air conditioning for maximum efficiency and the strongest possible return on investment.",
      },
      {
        sector: "Schools & Institutions",
        description:
          "Grid-tied and hybrid solar for schools, colleges, and NGO facilities, frequently delivered as part of donor-funded or UNDP-linked energy access programmes.",
      },
    ],
    faq: [
      {
        q: "What is the cost of solar panel installation in Kenya?",
        a: "Solar installation costs in Kenya depend on system size and type. A 3kW residential system starts from approximately KES 350,000 installed, while a 50kW commercial rooftop system ranges from KES 4–6 million. We provide detailed proposals after a free site survey and energy audit.",
      },
      {
        q: "How does KPLC net-metering work in Kenya?",
        a: "KPLC's net-metering programme allows grid-tied solar customers to export surplus power to the grid and receive credit against their electricity bill. Élan Climat handles the full application process with KPLC, including system documentation, export meter installation, and interconnection agreement processing.",
      },
      {
        q: "How long do solar panels last in Kenya's climate?",
        a: "Tier-1 solar panels installed in Kenya typically deliver 25+ years of performance, with most manufacturers guaranteeing 80% output at 25 years. Kenya's climate is favourable for solar — UV exposure is high but temperatures are moderate, which is ideal for panel efficiency and longevity.",
      },
      {
        q: "Do you install solar systems in rural Kenya?",
        a: "Yes. We have experience deploying off-grid solar systems for farms, schools, health facilities, and community projects across rural Kenya including Western Kenya, the Rift Valley, and coastal regions. Off-grid systems are sized to cover critical loads with adequate battery backup.",
      },
      {
        q: "Can solar power run air conditioning in Kenya?",
        a: "Yes. A correctly sized solar system can power HVAC equipment, including air conditioning. We specialise in integrated solar-HVAC designs where the solar system is engineered around the HVAC load profile, often combining a hybrid inverter with a DC-inverter air conditioning unit for maximum efficiency.",
      },
      {
        q: "What battery chemistry do you use for solar storage in Kenya?",
        a: "We use LiFePO4 (lithium iron phosphate) batteries for their long cycle life, thermal stability, and strong performance in Kenya's moderate ambient temperatures, compared to older lead-acid or less stable lithium chemistries.",
      },
      {
        q: "How much roof space do I need for a solar installation?",
        a: "As a rough guide, 1kW of solar typically requires 6–8m² of unshaded roof area depending on panel wattage and orientation. We confirm exact requirements during the site survey, accounting for shading from trees, parapets, or neighbouring structures.",
      },
      {
        q: "What happens to my solar system during a power outage?",
        a: "For grid-tied systems without battery storage, the inverter shuts down during a grid outage as a safety requirement. Hybrid systems with battery storage can continue powering selected critical loads automatically during an outage, switching back to normal operation once grid power returns.",
      },
      {
        q: "What is the typical payback period for a commercial solar installation in Kenya?",
        a: "Most commercial and industrial solar installations in Kenya achieve payback within 3 to 6 years, depending on daytime consumption and existing tariff band. We model expected generation against your actual load profile during the proposal stage to give a realistic, site-specific payback estimate rather than a generic industry figure.",
      },
      {
        q: "Do you provide ongoing operations and maintenance (O&M) for solar systems?",
        a: "Yes. Our O&M contracts cover panel cleaning, mounting hardware inspection, inverter firmware updates, string-level performance checks, and battery health monitoring, keeping the system performing at its commissioned yield across its full design life.",
      },
    ],
    whyPoints: [
      {
        title: "Tier-1 Equipment Only",
        body: "We specify panels and inverters from bankable tier-1 manufacturers with proven performance in East African conditions.",
      },
      {
        title: "EPRA-Registered Installer",
        body: "Fully registered for KPLC grid-interconnection work, handling all paperwork and approvals on your behalf.",
      },
      {
        title: "Integrated Solar-HVAC Design",
        body: "Unique capability to co-engineer solar and HVAC systems together for maximum energy offset.",
      },
      {
        title: "Remote Monitoring",
        body: "Every system we install is commissioned with remote performance monitoring so you always know your system is working.",
      },
    ],
    heroImg:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
    heroAlt: "Solar panel installation Kenya",
    colA: "/muhammed.jpg",
    colB: "/newpowa.jpg",
    colAlt: ["Solar PV system installation Nairobi", "Off-grid solar Kenya"],
    dark: false,
  },
  {
    id: "cold-room",
    anchor: "cold-room",
    slug: "cold-room",
    num: "04",
    eyebrow: "Refrigeration",
    seoTitle:
      "Cold Room Installation, Walk-In Freezers and Refrigeration Services in Kenya",
    headline: "Cold Chain, Zero Compromise",
    title: "Cold Room Installation",
    metaTitle:
      "Cold Room & Refrigeration Contractor in Kenya | Élan Climat & Énergie",
    metaDescription:
      "Purpose-built cold rooms, walk-in freezers & blast chillers for food, pharma & floriculture across Nairobi, Mombasa, Eldoret & Nakuru. IoT monitoring, compressor servicing & WHO PIC/S-aligned pharmaceutical cold storage.",
    description:
      "Élan Climat & Énergie engineers purpose-built cold rooms, walk-in freezers, and blast chillers for food processing, hospitality, pharmaceuticals, and floriculture across Nairobi, Mombasa, Eldoret, and Nakuru. Our refrigeration division designs tight temperature tolerances, redundant compressors, and IoT-based remote monitoring for Kenya's cold chain industry, and can integrate a cold room's refrigeration load directly with an on-site solar or standby generator system where continuous uptime matters.",
    features: [
      "Walk-in cold rooms & blast freezers",
      "Modular panel system design",
      "Remote temperature monitoring",
      "Compressor & refrigerant servicing",
      "Food-safe hygienic finishes",
    ],
    contentSections: [
      {
        heading: "Design & Load Calculation",
        body: [
          "Kenya's horticulture, floriculture, and food processing industries lose significant product value every year to cold chain failures, and the majority of those failures trace back to a cold room that was undersized, poorly insulated, or fitted with a refrigeration plant that didn't match the actual heat load. Élan Climat calculates cooling load from first principles for every project — product type and quantity, door-opening frequency, ambient conditions, and insulation performance — rather than sizing off a generic per-cubic-metre rule.",
          "For multi-chamber facilities, such as a flower export site in Naivasha with separate pre-cooling, cold storage, and dispatch zones, we design each chamber's refrigeration plant independently so that one zone's door traffic or product load doesn't compromise temperature stability in another.",
        ],
      },
      {
        heading: "Construction & Materials",
        body: [
          "Our cold rooms use PIR (polyisocyanurate) insulated panels for maximum thermal efficiency per millimetre of panel thickness, with food-safe, hygienic interior finishes that meet the cleaning and inspection requirements of food safety audits. EC (electronically commutated) fan motors are specified as standard in evaporator units, reducing running costs compared to older AC motor designs while also running quieter — a meaningful factor in hospitality and retail settings where the cold room sits close to guest or customer areas.",
        ],
      },
      {
        heading: "Refrigeration Plant & Redundancy",
        body: [
          "Critical facilities — those where a refrigeration failure would mean significant product loss or, for pharmaceutical cold chains, a genuine compliance risk — receive duty-standby compressor configurations. This means a second compressor can take over automatically if the primary unit needs servicing or fails, so the product inside is never left exposed to a single point of failure.",
        ],
      },
      {
        heading: "Monitoring & Compliance",
        body: [
          "Every new installation includes IoT-connected temperature and door-alarm monitoring with SMS and email alerts, and we can retrofit this monitoring onto cold rooms installed by other companies. For pharmaceutical applications, cold rooms are designed to WHO PIC/S guidelines, with the data logging and reporting capability that compliance audits require.",
        ],
      },
      {
        heading: "Servicing & Compressor Maintenance",
        body: [
          "We service refrigeration systems regardless of who originally installed them. Common service work includes compressor overhaul, refrigerant recharge using EPA-compliant recovery equipment, door seal replacement — a frequently overlooked source of energy loss and frost buildup — controller calibration, and panel leak repair, which we locate using the same diagnostic rigour we apply to a new build.",
        ],
      },
      {
        heading: "Power Resilience for Cold Chain Facilities",
        body: [
          "A cold room is only as reliable as the power feeding it, and grid interruptions in parts of Kenya remain a real operational risk for food processors, pharmaceutical stores, and flower export sites. Because our electrical and solar divisions sit under the same roof as refrigeration, we design integrated backup solutions — automatic transfer to a standby generator, or a solar-plus-battery configuration sized specifically to keep compressors, controllers, and monitoring systems running through an outage without any manual intervention.",
        ],
      },
      {
        heading: "Site Types & Chamber Configurations",
        body: [
          "Beyond single-chamber walk-in units, we design multi-temperature facilities that combine chill, freezer, and blast-freezing zones behind a shared loading dock, staged pre-cooling rooms for horticultural exporters where product must shed field heat before entering long-term storage, and compact under-counter or reach-in refrigeration for smaller retail and hospitality kitchens where floor space is limited.",
        ],
      },
    ],
    useCases: [
      {
        sector: "Floriculture & Horticulture",
        description:
          "Pre-cooling and cold storage facilities for flower farms in Naivasha, Thika, and the Mt. Kenya region, with the precise humidity control that flower quality depends on alongside temperature.",
      },
      {
        sector: "Food Processing & Retail",
        description:
          "Walk-in chillers, blast freezers, and display cabinet refrigeration for supermarkets, butcheries, and food processing facilities, engineered for hygiene compliance and consistent product quality.",
      },
      {
        sector: "Pharmaceuticals",
        description:
          "Cold rooms designed to WHO PIC/S guidelines for vaccine and medicine storage, with monitoring and reporting suited to regulatory inspection requirements.",
      },
      {
        sector: "Hospitality",
        description:
          "Quiet-running walk-in chillers and freezers for hotel and restaurant kitchens, sized to peak kitchen demand without oversized running costs during quieter periods.",
      },
      {
        sector: "Logistics & Export",
        description:
          "Loading-dock cold storage and dispatch chambers for exporters and distributors, designed around truck-loading schedules to minimise temperature recovery time after each door cycle.",
      },
    ],
    faq: [
      {
        q: "How much does a cold room cost in Kenya?",
        a: "Cold room costs in Kenya depend on size, temperature range, and specification level. A small 10m² walk-in chiller starts from approximately KES 500,000 installed, while a larger multi-chamber facility for food processing or floriculture can cost KES 3–10 million. We provide itemised quotations after a site survey.",
      },
      {
        q: "What temperature ranges can your cold rooms achieve?",
        a: "We design cold rooms across the full commercial temperature spectrum: positive chill rooms (+2°C to +8°C) for fresh produce and dairy; medium-temperature rooms (-5°C to -18°C) for frozen food; and blast freezers down to -35°C for rapid product freezing. Pharmaceutical cold rooms are designed to WHO PIC/S guidelines.",
      },
      {
        q: "Do you install cold rooms for flower farms in Kenya?",
        a: "Yes. We have significant experience in Kenya's floriculture industry, designing pre-cooling and cold storage facilities for flower farms in Naivasha, Thika, and the Mt. Kenya region. Floriculture cold rooms require precise humidity control in addition to temperature, which we achieve through specialised evaporator coil design.",
      },
      {
        q: "Can you service an existing cold room installed by another company?",
        a: "Yes. We service all refrigeration systems regardless of original installer or brand. Common services include compressor overhaul, refrigerant recharge (using EPA-compliant recovery equipment), door seal replacement, controller calibration, and panel leak repairs.",
      },
      {
        q: "Do you provide remote temperature monitoring for cold rooms in Kenya?",
        a: "Yes. All new installations include IoT-connected temperature and door alarm monitoring with SMS and email alerts. We can also retrofit our monitoring system onto existing cold rooms, providing real-time data logging and compliance reporting for food safety audits.",
      },
      {
        q: "How long does it take to install a commercial cold room in Kenya?",
        a: "A standard single-chamber walk-in cold room typically takes 2–4 weeks from order to commissioning, including panel fabrication, refrigeration plant installation, and controls setup. Multi-chamber facilities for floriculture or food processing can take 6–10 weeks depending on scale.",
      },
      {
        q: "What insulation thickness do I need for a cold room in Kenya?",
        a: "Insulation thickness depends on the target temperature and ambient conditions. Chill rooms typically use 80–100mm PIR panels, while freezer rooms and blast freezers require 100–150mm or more to maintain efficiency and prevent condensation on external surfaces.",
      },
      {
        q: "Can you upgrade an old cold room to reduce energy costs?",
        a: "Yes. Common upgrades include replacing AC fan motors with EC motors, improving door seals, upgrading controllers for better defrost cycle management, and in some cases re-skinning panels where insulation has degraded — all of which can meaningfully reduce running costs without a full rebuild.",
      },
      {
        q: "Can a cold room keep running during a power outage?",
        a: "Yes, if it's designed with backup power in mind. We integrate cold rooms with automatic-transfer standby generators or solar-plus-battery systems so compressors, controllers, and alarm monitoring continue operating through a grid outage without manual switching, protecting product from spoilage.",
      },
      {
        q: "Do you design multi-chamber cold storage facilities with different temperature zones?",
        a: "Yes. For facilities handling multiple product types — such as a distributor storing both chilled dairy and frozen goods — we design independent refrigeration plant for each chamber so that door traffic or load changes in one zone don't affect temperature stability in another.",
      },
    ],
    whyPoints: [
      {
        title: "±0.5°C Temperature Tolerance",
        body: "Tight temperature control through precision-selected evaporator coils and EC fan technology.",
      },
      {
        title: "Redundant Compressor Designs",
        body: "Critical facilities receive duty-standby compressor configurations so product is never at risk during servicing.",
      },
      {
        title: "IoT Monitoring Standard",
        body: "Every installation includes real-time remote temperature monitoring with SMS alerts as standard.",
      },
      {
        title: "Floriculture Specialists",
        body: "Deep experience in Kenya's flower export industry, including pre-coolers and controlled humidity rooms.",
      },
    ],
    heroImg: "/images/coldroom.webp",
    heroAlt: "Cold room installation Kenya",
    colA: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=700&q=80",
    colB: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700&q=80",
    colAlt: [
      "Cold room refrigeration facility Kenya",
      "Walk-in freezer installation Nairobi",
    ],
    dark: true,
  },
  {
    id: "elevator",
    anchor: "elevator",
    slug: "elevator",
    num: "05",
    eyebrow: "Vertical Transport",
    seoTitle:
      "Residential, Commercial and Hospital Elevator and Lift Installation in Kenya",
    headline: "Moving People with Elegance",
    title: "Elevator Installation",
    metaTitle:
      "Elevator & Lift Installation Contractor in Nairobi, Kenya | Élan Climat & Énergie",
    metaDescription:
      "Passenger, goods & hospital elevator installation across Kenya. MRL traction & hydraulic lifts, KEBS-compliant inspections, 24/7 entrapment response. Modernisation and maintenance contracts from a licensed Kenyan lift contractor.",
    description:
      "Élan Climat & Énergie installs passenger, service, and goods lifts for residential apartments, commercial towers, and hospitals across Nairobi and Kenya. From machine-room-less (MRL) traction lifts to hydraulic systems, our elevator division delivers fully KEBS-compliant installations aligned with Kenya's building codes, backed by 24/7 maintenance and entrapment response, and coordinated with our electrical team where lift power supply and backup generation need to be engineered together.",
    features: [
      "MRL traction & hydraulic lifts",
      "Passenger, goods & hospital elevators",
      "Cab design & interior fit-out",
      "KEBS-compliant annual inspections",
      "24/7 entrapment emergency service",
    ],
    contentSections: [
      {
        heading: "Design & Shaft Engineering",
        body: [
          "Nairobi's skyline is growing fast, and every new high-rise needs a vertical transport solution that combines safety, reliability, and aesthetic quality from day one — retrofitting a lift shaft after the fact is rarely a viable option. Élan Climat works with architects and structural engineers from the early design stage to confirm shaft dimensions, pit depth, overhead clearance, and machine room requirements (or their absence, for MRL systems) before construction reaches that floor.",
          "We also carry out traffic analysis for commercial and residential towers, calculating expected passenger demand at peak periods to recommend the right number of lifts, car capacity, and speed — undersizing this is a common and costly mistake that shows up as queuing complaints only after the building is occupied.",
        ],
      },
      {
        heading: "Drive Technology & Equipment",
        body: [
          "We install machine-room-less (MRL) traction systems, which use a compact gearless machine mounted within the shaft itself, maximising usable floor space and reducing the building's structural footprint dedicated to the lift. For lower-rise residential buildings, hydraulic lifts remain a cost-effective and reliable option. We also install hospital and stretcher elevators with the larger car dimensions and reinforced floor loading that medical transport requires, and panoramic glass lifts where the architectural brief calls for a feature element.",
        ],
      },
      {
        heading: "Installation Process",
        body: [
          "Installation begins with guide rail alignment — the single factor with the greatest impact on ride smoothness and long-term mechanical wear — followed by machine assembly, car and counterweight installation, door operator fitting, and controls wiring. Cab interior fit-out, including wall panels, flooring, lighting, and door finishes, is completed to match the building's design brief before final commissioning and adjustment.",
        ],
      },
      {
        heading: "Compliance & Certification",
        body: [
          "All installations fully comply with KEBS-adopted EN 81-20 and EN 81-50 standards for lift safety. We prepare the technical documentation, coordinate the KEBS type examination, and obtain the installation certificate required before any lift is commissioned for public or resident use — a regulatory step that has real legal and insurance implications if skipped or shortcut.",
        ],
      },
      {
        heading: "Maintenance & Emergency Response",
        body: [
          "We offer monthly, quarterly, and annual maintenance contracts covering all mechanical, electrical, and safety components, including brake adjustment, rope and sheave inspection, door operator servicing, and safety circuit testing. Maintenance contract clients receive priority 24/7 emergency response for entrapment and fault call-outs anywhere in Nairobi — a service that matters considerably more in the moment than it does on a sales sheet.",
        ],
      },
      {
        heading: "Modernisation of Existing Lifts",
        body: [
          "Many buildings across Nairobi operate lifts installed a decade or more ago, where the mechanical shaft, rails, and car are still structurally sound but the controller, door operator, or safety devices no longer meet current standards or spare-parts availability. We assess these installations and, where feasible, modernise the electrical and control systems while retaining the existing shaft infrastructure, achieving current EN 81 compliance at a materially lower cost and shorter downtime than a full replacement.",
        ],
      },
      {
        heading: "Power Supply & Backup Integration for Elevators",
        body: [
          "A lift is only as dependable as the power feeding it. Working alongside our electrical division, we specify dedicated lift power supply circuits, automatic rescue devices (ARDs) that bring the car to the nearest floor and open the doors during a power failure, and integration with a building's standby generator or UPS system where continuous lift availability is operationally critical, such as in hospitals or high-occupancy residential towers.",
        ],
      },
    ],
    useCases: [
      {
        sector: "Residential Towers",
        description:
          "MRL traction lifts sized to building height and resident traffic patterns, balancing ride quality, energy efficiency, and usable floor space given up to the shaft.",
      },
      {
        sector: "Commercial Office Buildings",
        description:
          "Multi-lift banks with traffic analysis to minimise wait times at peak periods, often paired with destination dispatch controls for larger towers.",
      },
      {
        sector: "Hospitals & Healthcare",
        description:
          "Stretcher-capacity elevators with reinforced floors and wider door openings, designed around clinical workflow rather than retrofitted from a standard passenger lift.",
      },
      {
        sector: "Residential Villas",
        description:
          "Compact home lifts for multi-storey private residences, designed to integrate discreetly into the home's existing layout and finishes.",
      },
      {
        sector: "Retail & Mixed-Use Developments",
        description:
          "Goods lifts and passenger lifts specified together for shopping centres and mixed-use buildings, sequenced to handle both stock deliveries and customer traffic without conflict.",
      },
    ],
    faq: [
      {
        q: "What is the cost of elevator installation in Kenya?",
        a: "Elevator installation costs in Kenya vary by lift type, travel height, and specification. A basic hydraulic lift for a 3-storey residential building starts from approximately KES 2.5 million installed. MRL traction lifts for commercial buildings typically range from KES 3.5–8 million depending on floors, capacity, and cab finish. We provide detailed proposals after a shaft survey.",
      },
      {
        q: "Are your elevator installations KEBS compliant in Kenya?",
        a: "Yes. All our elevator installations fully comply with KEBS adopted EN 81-20 and EN 81-50 standards for the safety of lifts. We prepare all technical documentation, coordinate the KEBS type examination, and obtain the installation certificate required before commissioning.",
      },
      {
        q: "Do you provide elevator maintenance in Nairobi?",
        a: "Yes. We offer monthly, quarterly, and annual maintenance contracts covering all mechanical, electrical, and safety components. Maintenance contract clients receive priority 24/7 emergency response for entrapment and fault call-outs anywhere in Nairobi.",
      },
      {
        q: "What types of elevators do you install in Kenya?",
        a: "We install passenger lifts, service and goods lifts, hospital and stretcher lifts, home lifts for residential villas, and panoramic glass lifts. Drive technologies include MRL traction (gearless), geared traction, and hydraulic, selected based on building height, traffic analysis, and energy requirements.",
      },
      {
        q: "How long does elevator installation take in Kenya?",
        a: "A standard 6-floor MRL traction lift installation in Nairobi typically takes 6–10 weeks from shaft handover, including guide rail installation, machine assembly, cab fit-out, controls wiring, commissioning, and KEBS inspection. Timeline depends on shaft readiness and equipment lead time.",
      },
      {
        q: "How do you decide how many lifts a building needs?",
        a: "We carry out a traffic analysis based on the building's population, floor count, and expected peak-period demand, calculating waiting time and handling capacity for different lift quantity and speed combinations before recommending a configuration.",
      },
      {
        q: "What happens during a power outage — are your lifts fitted with backup systems?",
        a: "We can specify automatic rescue devices (ARDs) that bring the car safely to the nearest floor and open the doors during a power failure, and can integrate lift circuits with a building's generator or UPS system where continuous operation is a priority, such as in hospitals.",
      },
      {
        q: "Can you modernise an old elevator instead of replacing it fully?",
        a: "In many cases, yes. Modernisation can include replacing the controller, door operator, and safety devices while retaining the existing shaft, rails, and car — often at a significantly lower cost than full replacement, while still achieving current safety standard compliance.",
      },
      {
        q: "Do you install goods and service lifts, or only passenger elevators?",
        a: "We install the full range: passenger lifts, dedicated goods and service lifts for retail, hospitality, and industrial back-of-house use, and hospital stretcher lifts. Goods lift capacity and door configuration are specified around the client's actual load and pallet or trolley dimensions.",
      },
      {
        q: "Can Élan Climat handle both the lift and the electrical supply to it?",
        a: "Yes. Because elevator installation and electrical works are both delivered in-house, we design the dedicated power supply, backup generator or UPS integration, and automatic rescue device wiring as part of the same project, avoiding the coordination gaps that occur when a lift contractor and an independent electrician design their scopes separately.",
      },
    ],
    whyPoints: [
      {
        title: "KEBS EN 81 Certified",
        body: "Full compliance documentation prepared and submitted for every installation — no shortcuts on safety.",
      },
      {
        title: "24/7 Entrapment Response",
        body: "Round-the-clock emergency response for entrapments and critical faults across Nairobi.",
      },
      {
        title: "Custom Cab Design",
        body: "Interior design service for cab walls, flooring, lighting, and doors — matched to your building's aesthetic.",
      },
      {
        title: "Full-Spectrum Lifts",
        body: "From compact home lifts to 2000kg hospital stretcher elevators — all drive technologies installed.",
      },
    ],
    heroImg:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    heroAlt: "Elevator installation Nairobi Kenya",
    colA: "/images/elevator.jpg",
    colB: "/images/lift.jpg",
    colAlt: [
      "Elevator interior installation Kenya",
      "Lift installation Nairobi",
    ],
    dark: false,
  },
  {
    id: "electrical",
    anchor: "electrical",
    slug: "electrical",
    num: "06",
    eyebrow: "Power Systems",
    seoTitle:
      "Electrical Installation, Standby Generators and Engineering Services in Kenya",
    headline: "Power Engineered for Reliability",
    title: "Electrical",
    metaTitle:
      "Electrical Contractor & Standby Generator Installation in Kenya | Élan Climat & Énergie",
    metaDescription:
      "LV distribution, standby generators, earthing systems & building automation across Nairobi, Mombasa & Kenya. EPRA-compliant electrical engineering from a licensed Kenyan electrical contractor. Request a quote.",
    description:
      "Élan Climat & Énergie designs and installs low-voltage distribution, standby generators, earthing systems, and smart building automation across Nairobi, Mombasa, and Kenya. Our electrical division meets EPRA standards, protecting critical loads for hospitals, office parks, industrial facilities, and residential developments, and is fully integrated with our HVAC, solar, cold room, and elevator teams for projects that need more than one engineering discipline under a single contract.",
    features: [
      "LV panel boards & distribution",
      "Standby generator & ATS systems",
      "Earthing, bonding & lightning protection",
      "Building automation & smart controls",
      "Infrared thermographic surveys",
    ],
    contentSections: [
      {
        heading: "Design & Load Engineering",
        body: [
          "Power reliability is non-negotiable for Kenya's hospitals, data centres, hotels, and industrial facilities, and reliability starts with a properly engineered load schedule — not a panel board sized after the fact. Our electrical engineering team builds detailed load schedules for every project, accounting for diversity factors, future expansion capacity, and the specific characteristics of motor loads, IT equipment, and HVAC plant that each draw power differently from simple resistive loads.",
          "Where harmonics are a concern — common in buildings with significant variable-speed drive or IT load — we design in harmonic mitigation at the distribution level rather than treating it as an afterthought once equipment starts tripping breakers or overheating neutral conductors.",
        ],
      },
      {
        heading: "LV Distribution & Protection",
        body: [
          "We design and install low-voltage distribution boards, sub-distribution panels, and final circuit wiring with selective coordination of protection devices — meaning a fault on one circuit trips only the breaker protecting that circuit, not the entire floor or building. This is a detail that's frequently overlooked in budget installations and one that turns a minor fault into a major outage when it's missing.",
        ],
      },
      {
        heading: "Standby Power & Generators",
        body: [
          "We supply and install diesel standby generators from 20kVA to 2000kVA, complete with automatic transfer switches (ATS) that detect a grid failure and bring the generator online within seconds, acoustic enclosures for noise-sensitive sites, properly sized fuel tanks, and compliant exhaust systems. Generator earthing is designed to EPRA requirements, and we provide maintenance contracts covering fuel polishing, load bank testing, and annual engine overhauls — the upkeep that determines whether a generator actually starts when it's needed.",
        ],
      },
      {
        heading: "Earthing, Bonding & Lightning Protection",
        body: [
          "Proper earthing and bonding protects both people and equipment, and lightning protection is a genuine consideration for buildings across much of Kenya's highland regions. We design earthing systems to achieve target resistance values appropriate to the building's risk profile, with bonding carried through to all extraneous conductive parts, and lightning protection systems sized to the structure's height and exposure.",
        ],
      },
      {
        heading: "Building Automation & Energy Management",
        body: [
          "For commercial and institutional clients, we install building automation and smart control systems that reduce energy waste through demand-based lighting and HVAC control, scheduling, and centralised monitoring. These systems integrate with solar-electrical hybrid setups where present, optimising automatically between grid, solar, and battery sources for maximum cost savings rather than requiring manual switching.",
        ],
      },
      {
        heading: "Preventive Surveys & Compliance",
        body: [
          "We offer infrared thermographic surveys that scan electrical panels, busbars, and connections for hot spots caused by loose connections, overloaded circuits, or failing components — the most cost-effective way we know of to prevent electrical fires and unplanned outages before they happen. All design and installation work is carried out by EPRA-registered engineers, in compliance with EPRA requirements and Kenya's adoption of IEC 60364.",
        ],
      },
      {
        heading: "Power Factor Correction & Industrial Loads",
        body: [
          "Industrial and manufacturing clients running significant motor and inductive loads often face utility power-factor penalty charges that go unaddressed for years simply because nobody has reviewed the site's electrical bill line by line. We assess power factor at the incoming supply and specify correction capacitor banks sized to bring the site back within KPLC's penalty-free band, which typically pays for itself well inside two years through reduced utility charges alone.",
        ],
      },
      {
        heading: "Coordinated Electrical Scope Across Disciplines",
        body: [
          "A significant share of our electrical projects are delivered alongside another Élan Climat discipline on the same site — power supply and controls for a new HVAC chiller plant, dedicated circuits and earthing for a cold room's refrigeration compressors, backup generator integration for an elevator installation, or the AC-side wiring and switchgear for a solar hybrid system. Running these scopes through one electrical engineering team removes the handoff gaps that occur when separate contractors each assume the other has covered a given interface.",
        ],
      },
    ],
    useCases: [
      {
        sector: "Hospitals & Healthcare",
        description:
          "Resilient power infrastructure with automatic transfer to standby generation, designed around the zero-tolerance-for-outage requirements of critical medical equipment.",
      },
      {
        sector: "Data Centres",
        description:
          "Selectively coordinated distribution with harmonic mitigation and redundant supply paths, engineered to keep IT load running through both grid faults and routine maintenance.",
      },
      {
        sector: "Industrial Facilities",
        description:
          "LV distribution and motor control sized for heavy industrial loads, with power factor correction to reduce utility penalty charges and improve overall system efficiency.",
      },
      {
        sector: "Residential Developments",
        description:
          "Standby generator and ATS systems sized to cover essential apartment loads during outages, integrated cleanly with each building's existing distribution.",
      },
      {
        sector: "Hospitality",
        description:
          "Full LV distribution, standby generation, and building automation for hotels and lodges, coordinated with HVAC and solar scopes to reduce total energy spend.",
      },
    ],
    faq: [
      {
        q: "Do you handle electrical installations for commercial buildings in Kenya?",
        a: "Yes. We handle complete electrical installations for commercial buildings including LV distribution boards, sub-distribution panels, final circuit wiring, containment systems, earthing and bonding, emergency lighting, fire alarm interfaces, and building management system integration.",
      },
      {
        q: "Can you install standby generators in Nairobi?",
        a: "Yes. We supply and install diesel standby generators from 20kVA to 2000kVA, complete with automatic transfer switches (ATS), acoustic enclosures, fuel tanks, exhaust systems, and EPRA-compliant earthing. We also provide maintenance contracts covering fuel polishing, load bank testing, and annual engine overhauls.",
      },
      {
        q: "What is an infrared thermographic survey and why does my building need one?",
        a: "An infrared thermographic survey uses thermal imaging cameras to scan electrical panels, busbars, and connections for hot spots caused by loose connections, overloaded circuits, or failing components. It's the most cost-effective way to prevent electrical fires and unplanned outages. We recommend annual surveys for commercial buildings and industrial facilities.",
      },
      {
        q: "Are your electrical installations EPRA compliant in Kenya?",
        a: "Yes. All our electrical installations are designed and executed to comply with EPRA (Energy and Petroleum Regulatory Authority) requirements and Kenya's adoption of IEC 60364. Our engineers are licensed and registered with EPRA for electrical contracting work.",
      },
      {
        q: "Do you install solar-electrical hybrid systems in Kenya?",
        a: "Yes. We specialise in integrating solar PV systems with existing LV electrical infrastructure, including grid-tied hybrid inverters, battery storage, automatic source changeover, and energy management systems that optimise between grid, solar, and battery sources for maximum savings.",
      },
      {
        q: "What size generator do I need for my building in Kenya?",
        a: "Generator sizing depends on which loads need to be covered during an outage — essential lighting and lifts only, or the full building load. We calculate this from your actual load schedule rather than a rough estimate, since both undersizing and oversizing carry real cost and reliability consequences.",
      },
      {
        q: "How often should electrical systems be inspected in Kenya?",
        a: "We recommend annual infrared thermographic surveys for commercial and industrial buildings, alongside periodic inspection and testing of distribution boards, earthing systems, and protective devices — typically every 1–3 years depending on building use and load intensity.",
      },
      {
        q: "Can you upgrade an existing building's electrical system to support higher loads?",
        a: "Yes. We assess existing distribution capacity, cabling, and earthing against the new intended load — common with HVAC retrofits, EV charging additions, or solar installations — and design the necessary upgrades, which can range from a new sub-board to a full distribution overhaul depending on the gap.",
      },
      {
        q: "What is power factor correction and does my facility need it?",
        a: "Power factor correction uses capacitor banks to offset the reactive power drawn by motors and inductive equipment, bringing a site's power factor back within KPLC's penalty-free threshold. Industrial and manufacturing facilities with significant motor load are the most common candidates, and correction typically pays for itself within two years through reduced utility charges.",
      },
      {
        q: "Can you design the electrical scope for a project that also includes HVAC, solar, or elevator works?",
        a: "Yes. Because electrical, HVAC, solar, cold room refrigeration, plumbing, and elevator installation are all delivered in-house at Élan Climat, we routinely design the electrical interfaces for these scopes as one coordinated package, rather than leaving a client to reconcile drawings from separate specialist contractors.",
      },
    ],
    whyPoints: [
      {
        title: "EPRA-Licensed Engineers",
        body: "All electrical design and installation work is carried out by EPRA-registered engineers — legally and technically compliant.",
      },
      {
        title: "Infrared Thermography",
        body: "We offer preventive IR surveys that catch dangerous hot spots before they cause fires or outages.",
      },
      {
        title: "Generator Specialists",
        body: "Full generator supply, installation and maintenance from 20kVA to 2000kVA.",
      },
      {
        title: "Smart Building Integration",
        body: "Building automation and energy management systems that reduce electricity bills and carbon footprint.",
      },
    ],
    heroImg:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80",
    heroAlt: "Electrical installation Kenya",
    colA: "https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=700&q=80",
    colB: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=700&q=80",
    colAlt: [
      "Electrical panel installation Kenya",
      "Power distribution system Nairobi",
    ],
    dark: true,
  },
];

export type Service = (typeof SERVICES)[0];
