import clsx from "clsx";
import { Check, Plus } from "lucide-react";

export function Slot({
  icon,
  on,
  n,
  pill,
  label,
  onClick,
}: {
  icon: string;
  on: boolean;
  n?: number;
  pill?: string;
  label?: string;
  onClick: () => void;
}) {
  const tag = on ? (
    <Check size={12} className="inline" strokeWidth={3} />
  ) : (
    <Plus size={12} className="inline" strokeWidth={3} />
  );
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={clsx(
        "relative grid aspect-square w-full place-items-center rounded-xl border-2 p-2 transition hover:border-ink",
        on
          ? "border-solid border-ink bg-paper"
          : "border-dashed border-dash bg-wash",
      )}>
      <img
        src={icon}
        alt=""
        className="h-full w-full object-contain"
      />
      {n && n > 1 ? (
        <span className="absolute right-1.5 top-0.5 text-xs font-extrabold">
          ×{n}
        </span>
      ) : null}
      {pill && (
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border-2 border-ink bg-paper px-2 text-[13px] font-extrabold">
          {tag} {pill}
        </span>
      )}
      {label && (
        <span className="absolute inset-x-0 bottom-0.5 text-center text-[11px] font-extrabold">
          {tag} {label}
        </span>
      )}
    </button>
  );
}
export const Cap = ({ name, price }: { name: string; price: number }) => (
  <div className="mt-1 text-center text-xs font-bold leading-tight">
    {name}
    <small className="block font-semibold text-soft">
      Rp {price / 1000}k/wk
    </small>
  </div>
);
