import ChristmasGamesCollection from "@/components/christmas";
import ChristmasCountdown from "@/components/christmascount";
import { get } from "@vercel/edge-config";
import { CornerUpLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const celebration = await get("celebration");
  const christmas = celebration === "christmas";

  return (
    <div className="min-h-screenp-4">
      {christmas && (
        <div className="flex flex-col  space-y-4">
          {/* Santa Tracker Section */}
          <Link href="/">
          <CornerUpLeft /> Back  home
        </Link>
          <h1 className="text-center  py-4 text-boldtext-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-wrap">Merry Christmas </h1>
          <div className="  rounded-lg p-4">
            <ChristmasGamesCollection />
          </div>

          {/* Current Status Section */}
          <div className="flex-1">
            <div className=" rounded-lg p-4 h-full">
              <ChristmasCountdown />
            </div>
          </div>

       
        </div>
      )}
    </div>
  );
};

export default Home;