"use client";

import { cn } from "@/lib/shad";
import { scrollToElement } from "@/lib/utils";
import { Story } from "@/services/api";
import { RefObject, useContext, useEffect, useState } from "react";
import { PiList } from "react-icons/pi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { RootContext } from "@/providers/rootProvider";
import { PopoverClose } from "@radix-ui/react-popover";

interface Props {
  stories: Story[];
  parent: RefObject<HTMLDivElement>;
}

export function StoriesNavigation({ stories: storiesParam, parent }: Props) {
  const { device } = useContext(RootContext);
  const [parentWidth, setParentWidth] = useState<number>(0);

  useEffect(() => {
    if (parent.current) {
      setParentWidth(parent.current.offsetWidth);
    }
  }, [parent]);

  const navigateToStory = (story: Story) => () => {
    scrollToElement(document.getElementById(`story-${story.verse}-${story.order_if_several}`));
  };

  const stories = storiesParam.filter((story) => !story.title.startsWith("<i>")).toSorted((a, b) => a.verse - b.verse);

  if (!stories.length) return <></>;

  if (device.type === "mobile") {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className={cn("fixed h-14 w-14 z-10 cursor-pointer", "transition-all duration-500")}>
            <div
              className={cn(
                "flex h-full w-full rounded-full items-center justify-center bg-highlight shadow-sm shadow-black "
              )}
            >
              <PiList size={24} />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" side="top" className="w-[350px]">
          {stories.map((story) => (
            <PopoverClose
              onClick={navigateToStory(story)}
              key={`story-link-${story.translation}-${story.book}-${story.chapter}-${story.verse}-${story.order_if_several}`}
              className="w-full text-left outline-none p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              dangerouslySetInnerHTML={{ __html: story.title }}
            ></PopoverClose>
          ))}
        </PopoverContent>
      </Popover>
    );
  } else {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className={cn("sticky right-0 top-20 h-14 w-14 flex items-center justify-center cursor-pointer")}>
            <PiList size={24} />
          </div>
        </PopoverTrigger>
        <PopoverContent align="start" side="left" sideOffset={-50} style={{ maxWidth: parentWidth }}>
          {stories.map((story) => (
            <div
              onClick={navigateToStory(story)}
              key={`story-link-${story.translation}-${story.book}-${story.chapter}-${story.verse}-${story.order_if_several}`}
              className="line-clamp-2 text-sm p-2 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
              dangerouslySetInnerHTML={{ __html: story.title }}
            ></div>
          ))}
        </PopoverContent>
      </Popover>
    );
  }
}
