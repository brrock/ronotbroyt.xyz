import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArticle,
  IconBrandDiscord,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { Signature, Gamepad, Bot } from "lucide-react";

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto ">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          href={item.href}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-200 dark:from-blue-900 dark:to-purple-950 to-violet-600"></div>
);
const items = [
  {
    title: "Blog",
    description: "Read everything about tech here.",
    header: <Skeleton />,
    icon: <IconArticle className="h-4 w-4 text-neutral-500" />,
    href: "/blog",
  },
  {
    title: "Forum",
    description: "Come hang out with everyone ",
    header: <Skeleton />,
    icon: <Signature className="h-4 w-4 text-neutral-500" />,
    href: "/forum",
  },
  {
    title: "Discord",
    description: "Stay up to date with everything.",
    header: <Skeleton />,
    icon: <IconBrandDiscord className="h-4 w-4 text-neutral-500" />,
    href: "https://www.discord.gg/VDQQvPQHjN",
  },
  {
    title: "Game",
    description: "Come play this fun block game",
    header: <Skeleton />,
    icon: <Gamepad className="h-4 w-4 text-neutral-500" />,
    href: "/game",
  },
  {
    title: "AI",
    description: "My very own AI",
    header: <Skeleton />,
    icon: <Bot className="h-4 w-4 text-neutral-500" />,
    href: "https://ai.ronotbroyt.xyz",
  },
];
