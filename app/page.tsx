"use client";
import clsx from "clsx";
import { CHAIRS, DESKS, ITEMS, QUICK, ZONES, item } from "@/data/catalog";
import { useBuilder } from "@/lib/store";
import { idr, weekly } from "@/lib/pricing";
import { Scene } from "@/components/Scene";
import { Slot, Cap } from "@/components/Slot";
import { Checkout } from "@/components/Checkout";

const TABS = [
  ["chair", "Chairs"],
  ["desk", "Desks"],
  ["acc", "Accessories"],
] as const;

export default function Page() {
  const s = useBuilder(),
    { tab, q, set, toggle } = s;
  const acc = (id: string, extra = {}) => {
    const i = item(id);
    return (
      <Slot
        icon={i.icon}
        on={q[id] > 0}
        n={q[id]}
        onClick={() => toggle(id)}
        {...extra}
      />
    );
  };
  return (
    <main className="mx-auto max-w-300 px-4 pb-10 pt-7">
      <h1 className="text-center text-4xl font-extrabold md:text-5xl">
        Design Your Workspace!
      </h1>
      <p className="mb-7 mt-1 text-center text-lg text-soft">
        — Create Your Perfect Setup! —
      </p>

      <div className="relative grid items-start gap-4 lg:grid-cols-[300px_1fr_250px] lg:pb-21">
        <div className="absolute inset-x-0 bottom-16 hidden h-37.5 rounded-[50%] border-2 border-ink lg:block" />
        <section className="relative z-10 overflow-hidden rounded-2xl border-2 border-ink bg-paper p-3.5">
          <div role="tablist" className="-mx-3.5 -mt-3.5 mb-3 flex">
            {TABS.map(([k, l]) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                onClick={() => set({ tab: k })}
                className={clsx(
                  "flex-1 border-b-2 border-ink py-2.5 font-bold not-last:border-r-2",
                  tab === k
                    ? "border-b-transparent bg-paper font-extrabold"
                    : "bg-wash",
                )}>
                {l}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {tab === "chair" &&
              CHAIRS.map((c) => (
                <div key={c.id}>
                  <Slot
                    icon={c.icon}
                    on={s.chair === c.id}
                    onClick={() => set({ chair: c.id })}
                  />
                  <Cap name={c.name} price={c.price} />
                </div>
              ))}
            {tab === "desk" &&
              DESKS.map((d) => (
                <div key={d.id}>
                  <Slot
                    icon={d.icon}
                    on={s.desk === d.id}
                    onClick={() => set({ desk: d.id })}
                  />
                  <Cap name={d.name} price={d.price} />
                </div>
              ))}
            {tab === "acc" &&
              ITEMS.filter((i) => i.group === "desk").map((i) => (
                <div key={i.id}>
                  {acc(i.id)}
                  <Cap name={i.name} price={i.price} />
                </div>
              ))}
          </div>
        </section>

        <div className="relative z-10 pb-10 max-lg:order-first">
          <Scene />
          <button
            onClick={() => toggle("monitor")}
            className="absolute right-0 top-[64%] rounded-lg border-2 border-ink bg-paper px-2 text-[13px] font-extrabold">
            + Add Monitor
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-x-2.5 gap-y-7 p-1">
          {QUICK.map((id) => (
            <div key={id}>{acc(id, { pill: item(id).label })}</div>
          ))}
        </div>

        <div className="z-20 mx-auto w-62.5 text-center lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2">
          <div className="rounded-xl border-2 border-ink bg-paper p-2 text-xl font-extrabold leading-tight">
            Ready to Rent?
            <small className="block text-sm font-bold text-soft">
              {idr(weekly(s))} / week
            </small>
          </div>
          <button
            onClick={() => set({ open: true })}
            className="-mt-0.5 block w-[88%] rounded-xl border-2 border-ink bg-paper py-1.5 font-bold hover:bg-ink hover:text-paper max-lg:mx-auto lg:ml-[6%]">
            Rent Your Setup!
          </button>
        </div>
      </div>

      <div className="mt-8 grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
        {ZONES.map(([t, ids]) => (
          <div
            key={t}
            className="px-3.5 pb-4 lg:border-l-2 lg:border-dashed lg:border-dash lg:first:border-l-0">
            <h2 className="-mt-5 mb-3 inline-block rounded-2xl border-2 border-ink bg-paper px-4 py-1 text-lg font-extrabold">
              {t}
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {ids.map((id) => (
                <div key={id}>
                  {acc(id, { label: item(id).label })}
                  <Cap name="" price={item(id).price} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Checkout />
    </main>
  );
}
