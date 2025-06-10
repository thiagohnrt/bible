"use client";

import { cn } from "@/lib/shad";
import * as utils from "@/lib/utils";
import { ChapterContext } from "@/providers/chapterProvider";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarRightExpand } from "react-icons/tb";
import { Skeleton } from "../ui/skeleton";
import { StoriesNavigation } from "./StoriesNavigation";

export function VersionsSidebar() {
  const { data } = useContext(ChapterContext);
  const [collapsed, setCollapsed] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const collapsed = localStorage.getItem("versions_sidebar_collapsed");
    setCollapsed(collapsed === "true");
  }, []);

  const onCollapse = () => {
    localStorage.setItem("versions_sidebar_collapsed", String(!collapsed));
    setCollapsed(!collapsed);
  };

  if (!data.length) {
    return (
      <div className={collapsed ? "basis-7" : "basis-1/6"}>
        <Skeleton className={cn("w-1/2 h-10 bg-highlight", collapsed && "hidden")} />
        {utils.repeat((searchParams.get("parallel")?.split(" ") || []).length + 1, (i) => (
          <Skeleton
            key={`skltn-version-side-bar-${i}`}
            className={cn("h-8 mt-2 bg-highlight", collapsed && "hidden")}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("transition-all duration-300", collapsed ? "basis-7" : "basis-1/6")} ref={parentRef}>
      <div className="sticky top-20">
        <div className={cn("flex items-center gap-3 pb-4 font-semibold p-2")}>
          <div className="flex justify-end">
            <div
              className="cursor-pointer"
              title={collapsed ? "Exibir menu de versões" : "Fechar menu de versões"}
              onClick={onCollapse}
            >
              {collapsed ? <TbLayoutSidebarRightCollapse size={24} /> : <TbLayoutSidebarRightExpand size={24} />}
            </div>
          </div>
          <div className={cn("transition-opacity", collapsed ? "opacity-0" : "opacity-100 delay-300")}>
            <h2 className={collapsed ? "hidden" : ""}>Versões</h2>
          </div>
        </div>
        <div className={cn("transition-opacity", collapsed ? "opacity-0" : "opacity-100 delay-300")}>
          <div className={cn(collapsed ? "hidden" : "")}>
            {data.map((d) => (
              <div
                className="flex items-center justify-between"
                key={`${d.translation.identifier}-chapter-${d.chapter}`}
              >
                <div className={cn("p-2 ")}>{d.translation.full_name}</div>
                <StoriesNavigation stories={d.stories} parent={parentRef} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
