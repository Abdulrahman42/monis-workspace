"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CHAIRS, DESKS, ITEMS } from "@/data/catalog";
import { useBuilder } from "@/lib/store";

const W = 600,
  H = 370,
  FLOOR = 336;
const pos = (x: number, y: number, w: number) => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
  width: `${(w / W) * 100}%`,
});

function Layer({
  id,
  src,
  x,
  y,
  w,
}: {
  id: string;
  src: string;
  x: number;
  y: number;
  w: number;
}) {
  return (
    <motion.img
      key={id}
      src={src}
      alt=""
      draggable={false}
      className="absolute"
      style={{ ...pos(x, y, w), transformOrigin: "50% 100%" }}
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.4, opacity: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
    />
  );
}

export function Scene() {
  const { desk: dId, chair: cId, q } = useBuilder();
  const desk = DESKS.find((d) => d.id === dId)!,
    chair = CHAIRS.find((c) => c.id === cId)!;
  const top = FLOOR - desk.h,
    L = 300 - desk.w / 2,
    R = 300 + desk.w / 2;
  const layers: { id: string; src: string; x: number; y: number; w: number }[] =
    [];
  for (const it of ITEMS) {
    const n = q[it.id] || 0;
    if (!n || !it.src || !it.w || !it.h) continue;
    const xs = it.slots ? it.slots[n - 1] : [it.dx ?? 0];
    const base = it.anchor === "left" ? L : it.anchor === "right" ? R : 300;
    xs.forEach((dx, i) =>
      layers.push({
        id: `${it.id}${i}`,
        src: it.src!,
        x: (it.slots ? 300 : base) + dx - it.w! / 2,
        y: top - it.h! + 1,
        w: it.w!,
      }),
    );
  }
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label="Workspace preview">
      <AnimatePresence mode="popLayout">
        <Layer
          key={desk.id}
          id={desk.id}
          src={desk.src}
          x={300 - desk.w / 2}
          y={top}
          w={desk.w}
        />
        {layers.map((l) => (
          <Layer key={l.id} {...l} />
        ))}
        <Layer
          key={chair.id}
          id={chair.id}
          src={chair.src}
          x={300 - chair.w / 2}
          y={346 - chair.h}
          w={chair.w}
        />
      </AnimatePresence>
    </div>
  );
}
