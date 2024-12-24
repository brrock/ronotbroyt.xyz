import { BentoGridDemo } from "@/components/card";
import ChristmasCountdown from "@/components/christmascount";
import { Nav } from "@/components/nav";

import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react"
import { get } from "@vercel/edge-config";
const Home = async () => {
  const celebration = await get('celebration');
  const christmas = celebration === "christmas";
  return (
    <div>
      <Nav />
      <h1 className=" text-center  py-4 text-boldtext-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-wrap">
        Welcome to RoNotBroYT&apos;s offical website
      </h1>
      {christmas && (
        <><div className="flex justify-center items-center relative">
          <ChristmasCountdown /> <br />
        </div><Button variant="default"><Link href="/christmas">
          Come play some christmas games
       
        </Link>
          </Button></>
      )
      }
      <h2 className="text-center  py-4 text-4xl font-black text-wrap">
        Here are some of the latest projects I&apos;m working on
      </h2>
      <div className="flex justify-center space-x-4">
        <Button
          asChild
          className="bg-red-700 hover:bg-red-800 dark:text-white p-6 text-lg  opacity-60"
        >
          <Link href="https://www.youtube.com/@RoNotBroYT">Youtube</Link>
        </Button>

      </div>
      <br />
      <h1 className=" text-center  py-4 text-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-wrap">
        Projects
      </h1>
      <BentoGridDemo />
    </div>
  );
}
export default Home;
