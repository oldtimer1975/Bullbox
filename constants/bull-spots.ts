export type BullSpot = {
  id: string;
  x: number; // relative [0..1]
  y: number; // relative [0..1]
  title?: string;
  subtitle?: string;
  size?: number; // multiplier for marker size
  meta?: Record<string, any>;
};

export const HOTSPOTS: BullSpot[] = [
  {
    id: "spot-1",
    x: 0.25,
    y: 0.30,
    title: "Depot A",
    subtitle: "Nyitva: 9-18",
    size: 1.0,
  },
  {
    id: "spot-2",
    x: 0.60,
    y: 0.45,
    title: "Pickup Point",
    subtitle: "Porta",
    size: 1.1,
  },
  {
    id: "spot-3",
    x: 0.82,
    y: 0.20,
    title: "Courier Hub",
    subtitle: "Express",
    size: 0.9,
  },
  // további hotspotok ide
];
