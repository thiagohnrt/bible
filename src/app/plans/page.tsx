import { Container } from "@/components/root/Container";
import { forwardRef } from "react";

export default function PlansPage() {
  return (
    <div className="px-20">
      <MomentOfBible position={1}>1</MomentOfBible>
      <MomentOfBible position={2}>2</MomentOfBible>
      <MomentOfBible position={3}>3</MomentOfBible>
      <MomentOfBible position={4}>4</MomentOfBible>
      <MomentOfBible position={5}>5</MomentOfBible>
      <MomentOfBible position={6}>6</MomentOfBible>
      <MomentOfBible position={5}>7</MomentOfBible>
      <MomentOfBible position={4}>8</MomentOfBible>
      <MomentOfBible position={3}>9</MomentOfBible>
      <MomentOfBible position={2}>10</MomentOfBible>
      <MomentOfBible position={1}>11</MomentOfBible>
      <MomentOfBible position={2}>12</MomentOfBible>
    </div>
  )
}

interface MomentOfBibleProps {
  position: number;
  children?: React.ReactNode;
}

const MomentOfBible = forwardRef<HTMLDivElement, MomentOfBibleProps>(({position, children}: MomentOfBibleProps, ref) => {
  return (
    <div className={`grid grid-cols-6 py-4`}>
      <div className="flex justify-center" style={{gridColumnStart: position}}>
        <div className={`transition-all active:translate-y-2`}>
          <button
            className="
              w-20 h-20
              rounded-full
              bg-linear-to-b from-emerald-300 to-emerald-500
              shadow-[0_12px_0_#3fa37c,0_18px_25px_rgba(0,0,0,0.4)]
              active:shadow-[0_6px_0_#3fa37c,0_10px_15px_rgba(0,0,0,0.3)]
              transition-all
              flex items-center justify-center
            "
            style={{transform: "rotate3d(1, 0, 0, 35deg)"}}
          >
            {/* Ícone da estrela */}
            {/* <Star
              className="w-12 h-12 text-white fill-white"
              strokeWidth={1.5}
            /> */}
            {children}
          </button>
        </div>
      </div>
    </div>
  );
});
MomentOfBible.displayName = "MomentOfBible";
