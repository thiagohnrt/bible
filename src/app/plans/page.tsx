import { CircularSteps } from "@/components/plans/CircularSteps";
import { Container } from "@/components/root/Container";
import { cn } from "@/lib/shad";
import { PlanOfDay, plans } from "@/static/plans";
import { forwardRef } from "react";

export default function PlansPage() {
  return (
    <div className="px-20">
      {plans.plan365.map((data, i) => {
        if (typeof data === "string") {
          return (
            <div className="flex items-center -mx-18 pt-6 pb-4" key={"title-of-moment-" + i}>
              <hr className="flex-1" />
              <div className="px-4">{data}</div>
              <hr className="flex-1" />
            </div>
          );
        } else
          return (
            <MomentOfBible
              position={data.position}
              plan={data}
              completed={0}
              active={0}
              key={"moment-of-bible-" + i}
            ></MomentOfBible>
          );
      })}
    </div>
  );
}

interface MomentOfBibleProps {
  position: number;
  plan: PlanOfDay;
  completed: number;
  active: number;
}

const MomentOfBible = forwardRef<HTMLDivElement, MomentOfBibleProps>(
  ({ position, plan, completed, active }: MomentOfBibleProps, ref) => {
    return (
      <div className={`grid grid-cols-5 py-4`}>
        <div className="flex justify-center" style={{ gridColumnStart: position }}>
          <div className="relative ">
            <CircularSteps
              steps={plan.read.length}
              size={110}
              thickness={10}
              gapPx={20}
              completed={completed}
              active={active}
              colors={{
                base: "#333",
                completed: "#22c55e", // green-500
                active: "#f59e0b", // amber-500
              }}
              lineCap="round"
              className="absolute z-0 select-none"
              style={{ top: -11.25, left: -15, transform: "rotate3d(1, 0, 0, 35deg)" }}
            />
            <div
              className={`transition-all active:translate-y-2 cursor-pointer active:[&>button]:shadow-[0_0px_0_#3fa37c,0_10px_15px_rgba(0,0,0,0.3)]`}
            >
              <button
                className={cn(
                  "rounded-full",
                  "bg-linear-to-b from-emerald-300 to-emerald-500",
                  "shadow-[0_8px_0_#3fa37c,0_18px_25px_rgba(0,0,0,0.4)]",
                  "transition-all",
                  "flex items-center justify-center",
                  "z-1"
                )}
                style={{ width: 80, height: 80, transform: "rotate3d(1, 0, 0, 45deg)" }}
              ></button>
              <span className="absolute z-2 select-none" style={{ left: "calc(50% - 18px)", top: "calc(50% - 18px)" }}>
                {plan.icon}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
MomentOfBible.displayName = "MomentOfBible";
