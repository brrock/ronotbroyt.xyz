
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { JSX, SVGProps } from "react"
import { Button } from "./ui/button"
import { ModeToggle } from "./theme-toggle"

export function Nav() {
  return (
    <header className="flex h-16 items-center justify-between  px-4 md:px-6">
      <div className="flex items-center gap-4 text-center">
        <Link href="#">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">RoNotBroYT</span>
          </div>
        </Link>
        <nav className="hidden gap-4 text-sm font-medium md:flex">
          <Link className="hover:underline" href="#">
            Home
          </Link>
          <Link className="hover:underline" href="#">
            Blog
          </Link>
          <Link className="hover:underline" href="/forum">
            Forum
          </Link>
          <Link className="hover:underline" href="/sign-in">
            Sign In 
          </Link>
          <Link className="hover:underline" href="/sign-up">
            Sign Up 
          </Link>
        </nav>
      </div>
      <div className="relative flex-1 max-w-md space-x-4">
        <Button asChild className="bg-red-700 hover:bg-red-800 dark:text-white opacity-60" >
          <Link href="https://www.youtube.com/@RoNotBroYT">Youtube</Link>
        </Button>
        <Button asChild className="bg-blue-700 hover:bg-blue-800 dark:text-white opacity-60" >
          <Link href="https://www.discord.gg/VDQQvPQHjN">Discord</Link>
        </Button>
        <ModeToggle />
      </div>
    </header>
  )
}
