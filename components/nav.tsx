import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Nav() {
  return (
    <header className="flex h-16 items-center justify-between  px-4 md:px-6">
      <div className="flex items-center gap-4 text-center">
        <Link href="/">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">RoNotBroYT</span>
          </div>
        </Link>
        <nav className="hidden gap-4 text-sm font-medium md:flex">
          <Link className="hover:underline" href="/">
            Home
          </Link>
          <Link className="hover:underline" href="#">
            Blog
          </Link>
          <Link className="hover:underline" href="/forum">
            Forum
          </Link>

        
        </nav>
      </div>
      <div className="relative flex-1 max-w-md space-x-4">
       
       <SignedOut>
        <Button
          asChild
          className= "  bg-red-800 hover:bg-red-900 dark:text-white  opacity-60"
        >
          <Link className="" href="/sign-in">
            Sign In
          </Link>
        </Button>
        <Button
          asChild
          className= " bg-blue-800 hover:bg-blue-900 dark:text-white opacity-60"
        >
          <Link className="" href="/sign-up">
            Sign Up
          </Link>
        </Button>
        </SignedOut>
        <ModeToggle />
        <SignedIn>
        <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
