import { CHAIRS, DESKS, ITEMS } from "@/data/catalog";
export const idr = (n: number) =>
  "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(n));
export const disc = (w: number) => (w >= 12 ? 0.2 : w >= 4 ? 0.1 : 0);
type S = {
  desk: string;
  chair: string;
  q: Record<string, number>;
  weeks: number;
  start: string;
  area: string;
};
export const lines = (s: S) => {
  const d = DESKS.find((x) => x.id === s.desk)!,
    c = CHAIRS.find((x) => x.id === s.chair)!;
  return [
    { name: d.name, n: 1, sub: d.price },
    { name: c.name, n: 1, sub: c.price },
    ...ITEMS.filter((a) => s.q[a.id] > 0).map((a) => ({
      name: a.name,
      n: s.q[a.id],
      sub: a.price * s.q[a.id],
    })),
  ];
};
export const weekly = (s: S) => lines(s).reduce((t, l) => t + l.sub, 0);
export const total = (s: S) => weekly(s) * s.weeks * (1 - disc(s.weeks));
export const message = (s: S) =>
  `Hi Monis! I'd like to rent this workspace in Bali:\n${lines(s)
    .map((l) => `- ${l.n}x ${l.name}`)
    .join(
      "\n",
    )}\nDuration: ${s.weeks} week(s)\nStart: ${s.start || "flexible"}\nDelivery area: ${s.area || "TBD"}\nEstimated total: ${idr(total(s))}`;
