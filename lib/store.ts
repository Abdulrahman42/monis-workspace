import { create } from "zustand";
import { item } from "@/data/catalog";

interface State {
  tab: "chair" | "desk" | "acc";
  desk: string;
  chair: string;
  q: Record<string, number>;
  weeks: number;
  start: string;
  area: string;
  open: boolean;
  set: (p: Partial<State>) => void;
  toggle: (id: string) => void;
}
export const useBuilder = create<State>((set) => ({
  tab: "chair",
  desk: "oak",
  chair: "mesh",
  q: { monitor: 1, keyboard: 1, plant: 1 },
  weeks: 4,
  start: "",
  area: "",
  open: false,
  set: (p) => set(p),
  // click cycles 0 → max → 0
  toggle: (id) =>
    set((s) => {
      const v = (s.q[id] || 0) + 1;
      return { q: { ...s.q, [id]: v > item(id).max ? 0 : v } };
    }),
}));
