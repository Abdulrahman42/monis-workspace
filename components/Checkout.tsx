"use client";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WA } from "@/data/catalog";
import { useBuilder } from "@/lib/store";
import { disc, idr, lines, message, total } from "@/lib/pricing";

const field = "rounded-lg border-2 border-ink bg-paper p-2 text-ink";
export function Checkout() {
  const s = useBuilder(),
    { open, set } = s;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => set({ open: false })}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Rental summary"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-md overflow-auto rounded-2xl border-2 border-ink bg-paper p-6"
            initial={{ y: 30, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 30, scale: 0.96 }}>
            <h2 className="mb-2 text-3xl font-extrabold">Your setup</h2>
            {lines(s).map((l) => (
              <div
                key={l.name}
                className="flex justify-between border-b border-dashed border-dash py-2">
                <span>
                  {l.n}× {l.name}
                </span>
                <span>{idr(l.sub)}/wk</span>
              </div>
            ))}
            <div className="my-4 grid grid-cols-2 gap-2.5 text-sm font-bold text-soft">
              <label className="grid gap-1">
                Duration
                <select
                  className={field}
                  value={s.weeks}
                  onChange={(e) => set({ weeks: +e.target.value })}>
                  {[1, 2, 4, 8, 12].map((w) => (
                    <option key={w} value={w}>
                      {w} week{w > 1 ? "s" : ""}
                      {disc(w) ? ` (−${disc(w) * 100}%)` : ""}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1">
                Start date
                <input
                  type="date"
                  className={field}
                  value={s.start}
                  onChange={(e) => set({ start: e.target.value })}
                />
              </label>
              <label className="col-span-2 grid gap-1">
                Delivery area (e.g. Canggu)
                <input
                  className={field}
                  value={s.area}
                  onChange={(e) => set({ area: e.target.value })}
                />
              </label>
            </div>
            <div className="flex justify-between text-xl font-extrabold">
              <span>Total</span>
              <span>{idr(total(s))}</span>
            </div>
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent(message(s))}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-xl border-2 border-ink py-3 font-extrabold hover:bg-ink hover:text-paper">
              <MessageCircle size={18} /> Rent this setup on WhatsApp
            </a>
            <button
              className="mt-3 w-full text-soft underline"
              onClick={() => set({ open: false })}>
              Keep editing
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
