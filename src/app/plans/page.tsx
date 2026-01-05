import { MomentOfBible } from "@/components/plans/MomentOfBible";
import { plans } from "@/static/plans";

export default function PlansPage() {
  return (
    <div className="px-20">
      {plans.plan365.map((data, i) => {
        if (typeof data === "string") {
          return (
            <div className="bg-neutral-950 z-3 flex items-center -mx-18 pt-6 pb-4 sticky top-16" key={"title-of-moment-" + i}>
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
