import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArticle,
  IconBrandDiscord,
  IconBrandYoutube,
} from "@tabler/icons-react";

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
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "Blog",
    description: "Read everything about tech here. Coming soon.",
    header: <Skeleton />,
    icon: <IconArticle className="h-4 w-4 text-neutral-500" />,
    href: "/",
  },
  {
    title: "Second channel",
    description: "Make sure to come check out",
    header: <Skeleton />,
    icon: <IconBrandYoutube className="h-4 w-4 text-neutral-500" />,
    href: "https://www.youtube.com/@RoNotBroYTreacts",
  },
  {
    title: "Discord",
    description: "Stay up to date with everything.",
    header: <Skeleton />,
    icon: <IconBrandDiscord className="h-4 w-4 text-neutral-500" />,
    href: "https://www.discord.gg/VDQQvPQHjN",
  },
];