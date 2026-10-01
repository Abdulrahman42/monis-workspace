// ✏️ Edit this file to change products, prices and images.
// Images live in /public/assets — replace a file (keep the name) or point `src`/`icon` at a new one (svg, png, webp).
// Scene units: the preview is 600 × 370. `w`/`h` = image size in those units. Desks stand on the floor (y = 336).
export type Anchor = "center" | "left" | "right";
export interface Product { id: string; name: string; price: number; icon: string }
export interface Desk extends Product { src: string; w: number; h: number }
export interface Chair extends Product { src: string; w: number; h: number }
export interface Item extends Product {
  label: string; max: number; group: "desk" | "zone";
  src?: string; w?: number; h?: number; anchor?: Anchor; dx?: number; slots?: number[][];
}
const ic = (id: string) => `/assets/icons/${id}.svg`;

export const DESKS: Desk[] = [
  { id: "oak", name: "Oak Classic", price: 180000, icon: ic("oak"), src: "/assets/desks/oak.svg", w: 402, h: 98 },
  { id: "stand", name: "Standing Desk", price: 260000, icon: ic("stand"), src: "/assets/desks/stand.svg", w: 362, h: 124 },
  { id: "mini", name: "Compact White", price: 120000, icon: ic("mini"), src: "/assets/desks/mini.svg", w: 302, h: 98 },
];
export const CHAIRS: Chair[] = [
  { id: "mesh", name: "Ergo Mesh", price: 90000, icon: ic("mesh"), src: "/assets/chairs/mesh.svg", w: 102, h: 132 },
  { id: "boss", name: "Executive", price: 110000, icon: ic("boss"), src: "/assets/chairs/boss.svg", w: 102, h: 148 },
  { id: "stool", name: "Active Stool", price: 60000, icon: ic("stool"), src: "/assets/chairs/stool.svg", w: 102, h: 60 },
];
export const ITEMS: Item[] = [
  { id: "monitor", name: "Monitor", label: "Add Monitor!", price: 100000, max: 3, group: "desk", icon: ic("monitor"), src: "/assets/items/monitor.svg", w: 98, h: 84, slots: [[0], [-55, 55], [-110, 0, 110]] },
  { id: "laptop", name: "Laptop", label: "Add Laptop!", price: 150000, max: 1, group: "desk", icon: ic("laptop"), src: "/assets/items/laptop.svg", w: 70, h: 34, dx: -100 },
  { id: "keyboard", name: "Keyboard & mouse", label: "Add Keyboard!", price: 30000, max: 1, group: "desk", icon: ic("keyboard"), src: "/assets/items/keyboard.svg", w: 118, h: 10, dx: 10 },
  { id: "lamp", name: "Desk lamp", label: "Add Lamp!", price: 25000, max: 1, group: "desk", icon: ic("lamp"), src: "/assets/items/lamp.svg", w: 86, h: 86, anchor: "right", dx: -40 },
  { id: "plant", name: "Plant", label: "Place a Plant!", price: 20000, max: 1, group: "desk", icon: ic("plant"), src: "/assets/items/plant.svg", w: 46, h: 52, anchor: "left", dx: 34 },
  { id: "mug", name: "Coffee mug", label: "Add Mug!", price: 0, max: 1, group: "desk", icon: ic("mug"), src: "/assets/items/mug.svg", w: 24, h: 18, anchor: "right", dx: -110 },
  { id: "coffee", name: "Coffee machine", label: "Add Coffee Machine", price: 50000, max: 1, group: "zone", icon: ic("coffee") },
  { id: "surf", name: "Surfboard", label: "Add Surfboard", price: 80000, max: 1, group: "zone", icon: ic("surf") },
  { id: "moto", name: "Motorcycle", label: "Add Motorcycle", price: 250000, max: 1, group: "zone", icon: ic("moto") },
  { id: "bean", name: "Bean bag", label: "Add Bean Bag", price: 40000, max: 1, group: "zone", icon: ic("bean") },
  { id: "tool", name: "Tool shelf", label: "Add Tool Shelf", price: 60000, max: 1, group: "zone", icon: ic("tool") },
];
export const ZONES: [string, string[]][] = [["Coffee Station", ["coffee"]], ["Outdoor Gear", ["surf", "moto"]], ["Relax Zone", ["bean"]], ["Garage Space", ["tool"]]];
export const QUICK = ["monitor", "lamp", "laptop", "plant"];
export const WA = process.env.NEXT_PUBLIC_WA_NUMBER ?? "6280000000000";
export const item = (id: string) => ITEMS.find((i) => i.id === id)!;
