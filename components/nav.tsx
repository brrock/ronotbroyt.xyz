
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { JSX, SVGProps } from "react"
import { Button } from "./ui/button"
import { ModeToggle } from "./theme-toggle"

export function Nav() {
  return (
<<<<<<< HEAD
    <header className="flex h-16 items-center justify-between  px-4 md:px-6">
      <div className="flex items-center gap-4 text-center">
=======
    <header className="flex h-16 items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
>>>>>>> 1be49f91a8c39b3a681d9ccdc970cedc35cbc166
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
        </nav>
      </div>
      <div className="relative flex-1 max-w-md space-x-4">
        <Button asChild className="bg-red-700 hover:bg-red-800 dark:text-white " >
          <Link href="https://www.youtube.com/@RoNotBroYT">Youtube</Link>
        </Button>
<<<<<<< HEAD
        <Button asChild className="bg-blue-700 hover:bg-blue-800 dark:text-white " >
          <Link href="https://www.discord.gg/VDQQvPQHjN">Discord</Link>
        </Button>
=======
>>>>>>> 1be49f91a8c39b3a681d9ccdc970cedc35cbc166
        <ModeToggle />
      </div>
    </header>
  )
}
