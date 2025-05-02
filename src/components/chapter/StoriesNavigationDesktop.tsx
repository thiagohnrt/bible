"use client";

import { cn } from "@/lib/shad";
import { scrollToElement } from "@/lib/utils";
import { api, Story } from "@/services/api";
import { useEffect, useState } from "react";
import { MdFormatListBulleted } from "react-icons/md";
import { PiList } from "react-icons/pi";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

interface Props {
  version: string;
  book: number;
  chapter: number;
  className?: string;
}

export function StoriesNavigationDesktop({ version, book, chapter, className }: Props) {
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
    <HoverCard openDelay={0}>
      <HoverCardTrigger asChild>
        <div className={cn("sticky top-20 h-14 w-14 flex items-center justify-center cursor-pointer", className)}>
          <PiList size={24} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="max-w-80" side="left" sideOffset={-56} align="start">
        {stories.map((story) => (
          <div
            onClick={navigateToStory(story)}
            key={`story-link-${story.translation}-${story.book}-${story.chapter}-${story.verse}-${story.order_if_several}`}
            className="line-clamp-2 text-sm p-2 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
            dangerouslySetInnerHTML={{ __html: story.title }}
          ></div>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
}
