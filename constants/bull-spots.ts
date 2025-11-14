export type BullSpot = {
  id: string;
  x: number; // relative [0..1]
  y: number; // relative [0..1]
  title?: string;
  subtitle?: string;
  size?: number; // multiplier for marker size
  meta?: { color?: string; [k: string]: any };
};

// FONTOS: a require útvonal constants könyvtárból az assets mappára mutat
// Helyezd be a képet a projekt_root/assets/bull.png
export const BULL_IMAGE = require("../assets/bull.png");

// Példa hotspotok — igazítsd a koordinátákat a saját képedhez
export const BULL_SPOTS: BullSpot[] = [
  { id: "spot-1", x: 0.25, y: 0.30, title: "Depot A", subtitle: "Nyitva: 9-18", size: 1.0 },
  { id: "spot-2", x: 0.60, y: 0.45, title: "Pickup Point", subtitle: "Porta", size: 1.1 },
  { id: "spot-3", x: 0.82, y: 0.20, title: "Courier Hub", subtitle: "Express", size: 0.9 },
];

export const SPOT_TO_ROUTE: Record<string, string> = {
  "spot-1": "/depots/depot-a",
  "spot-2": "/pickup/point",
  "spot-3": "/courier/hub",
};
