"use client";

import { cn } from "@/lib/shad";
import { scrollToElement } from "@/lib/utils";
import { api, Story } from "@/services/api";
import { PopoverClose } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { PiList } from "react-icons/pi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface Props {
  version: string;
  book: number;
  chapter: number;
  className?: string;
}

export function StoriesNavigationMobile({ version, book, chapter, className }: Props) {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    api
      .getStoriesByChapter(version, book, chapter)
      .then((data) => setStories(data.filter((s) => !s.title.startsWith("<i"))));
  }, [book, chapter, version]);

  const navigateToStory = (story: Story) => () => {
    scrollToElement(document.getElementById(`story-${story.verse}-${story.order_if_several}`));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={cn("fixed h-14 w-14 z-10 cursor-pointer", "transition-all duration-500", className)}>
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
}
