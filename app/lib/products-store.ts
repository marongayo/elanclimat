export interface Product {
  id: number;
  name: string;
  cat: string;
  price: number;
  desc: string;
  badge: "" | "new" | "hot" | "eco";
  icon: string;
}

const seed: Product[] = [
  { id: 1,  name: "MonoSun Pro 450W Panel",        cat: "Solar Panels",  price: 289,  badge: "eco", icon: "☀️", desc: "High-efficiency monocrystalline panel with 22.1% conversion rate. Ideal for residential rooftops." },
  { id: 2,  name: "PolyGrid 380W Panel",            cat: "Solar Panels",  price: 199,  badge: "",    icon: "🌞", desc: "Cost-effective polycrystalline solution for larger commercial arrays." },
  { id: 3,  name: "SolarEdge Inverter 6kW",         cat: "Solar Panels",  price: 1240, badge: "hot", icon: "🔆", desc: "Grid-tie inverter with built-in optimiser. Wi-Fi monitoring included." },
  { id: 4,  name: "Daikin Heat Pump 12kW",          cat: "HVAC Systems",  price: 2850, badge: "hot", icon: "🌡️", desc: "Inverter-driven air-to-water heat pump. COP 4.5. Operates to −25 °C." },
  { id: 5,  name: "Mitsubishi VRF Indoor Unit",     cat: "HVAC Systems",  price: 680,  badge: "",    icon: "❄️", desc: "Ductless mini-split wall unit, ultra-quiet 19 dB, weekly scheduling." },
  { id: 6,  name: "Zehnder ComfoAir 350",           cat: "HVAC Systems",  price: 1490, badge: "eco", icon: "💨", desc: "Mechanical ventilation with heat recovery. 93% efficiency. Passive house certified." },
  { id: 7,  name: "Press-Fit Copper Pipe Set",      cat: "Plumbing",      price: 148,  badge: "",    icon: "🔧", desc: "DN15–DN28 press-fit copper pipe kit for central heating. 25 fittings included." },
  { id: 8,  name: "Grundfos ALPHA3 Pump",           cat: "Plumbing",      price: 320,  badge: "eco", icon: "💧", desc: "Smart circulator pump with auto-adapt function. A-rated energy class." },
  { id: 9,  name: "Underfloor Manifold 12-Port",    cat: "Plumbing",      price: 215,  badge: "",    icon: "🛠️", desc: "Stainless steel flow manifold with balancing valves and actuators for UFH systems." },
  { id: 10, name: "Hager 3-Phase DB 24-Way",        cat: "Electrical",    price: 440,  badge: "",    icon: "⚡", desc: "63A triple-phase distribution board with RCCB and surge protection pre-fitted." },
  { id: 11, name: "MPPT Solar Charge Controller 60A", cat: "Electrical",  price: 185,  badge: "new", icon: "🔌", desc: "60A MPPT controller, 12/24/48V auto-detect, LCD display and Bluetooth app." },
  { id: 12, name: "Legrand Cable Trunking Kit",     cat: "Electrical",    price: 72,   badge: "",    icon: "📦", desc: "40×25mm PVC trunking with all accessories. 20m set. UV stabilised." },
  { id: 13, name: "Honda EU22i Generator",          cat: "Generators",    price: 1190, badge: "hot", icon: "⚙️", desc: "2.2kW pure-sine inverter generator. 58 dB quiet. 8h runtime at 25% load." },
  { id: 14, name: "Pramac P6000s Diesel",           cat: "Generators",    price: 1840, badge: "",    icon: "🏭", desc: "6 kVA diesel open-frame generator with AVR. Electric start, 13h tank." },
  { id: 15, name: "EcoFlow Smart Generator",        cat: "Generators",    price: 870,  badge: "new", icon: "🔋", desc: "Dual-fuel LPG/petrol generator. Pairs with EcoFlow battery stations automatically." },
  { id: 16, name: "Pylontech US5000 5kWh",          cat: "Batteries",     price: 2100, badge: "eco", icon: "🔋", desc: "LiFePO4 stackable battery module. 6000+ cycle life. BMS built-in." },
  { id: 17, name: "BYD Battery Box 10kWh",          cat: "Batteries",     price: 3900, badge: "hot", icon: "🗄️", desc: "Wall-mounted lithium battery with 10-year warranty. Compatible with leading inverters." },
  { id: 18, name: "Victron SmartLithium 200Ah",     cat: "Batteries",     price: 1650, badge: "new", icon: "⚡", desc: "200Ah LiFePO4 with integrated BMS. Bluetooth monitoring via VictronConnect." },
];

// In-memory store — persists across requests within the same server process.
// Replace this with a real DB (PostgreSQL, SQLite, etc.) for production.
const store: { products: Product[]; nextId: number } = {
  products: [...seed],
  nextId: seed.length + 1,
};

export function getAll(): Product[] {
  return store.products;
}

export function getById(id: number): Product | undefined {
  return store.products.find((p) => p.id === id);
}

export function create(data: Omit<Product, "id">): Product {
  const product: Product = { id: store.nextId++, ...data };
  store.products.unshift(product);
  return product;
}

export function remove(id: number): boolean {
  const before = store.products.length;
  store.products = store.products.filter((p) => p.id !== id);
  return store.products.length < before;
}
