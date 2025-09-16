"use client"
import { Button } from "../../components/ui/button";
import { Brain, Menu, Router } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import Image from "next/image";
// import { useUser } from "@clerk/nextjs";
// const { user } = useUser();
// const isSignedIn = !!user; 

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50  border-b border-border/10 bg-red-520 bg-white text-gray-800 shadow-md" >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* <div className="p-2 hero-gradient rounded-lg">
              <Image src={"/Learnlogo.svg"} alt="logo" width={150} height={120} />
            </div>
            <span className="text-xl font-bold gradient-text">Learnify</span> */}
            <Image src={"/Learnlogo.svg"} alt="logo" width={150} height={120} />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#courses" className="text-foreground hover:text-primary transition-colors">
              Courses
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
             {/* {isSignedIn ? (
                <Button variant="ghost" onClick={() => Router.push("/profile")}>
                    {user?.firstName || "Profile"}
                </Button>
                ) : (
                <Button variant="ghost" onClick={() => router.push("/sign-in")}>
                    Sign In
                </Button>
            )} */}

            <Link href="/workspace">
  <Button
    variant="glow"
    className="transition-all duration-300 transform shadow-md shadow-blue-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/70"
  >
    Get Started
  </Button>
</Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border/10">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#courses" className="text-foreground hover:text-primary transition-colors">
                Courses
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <div className="flex flex-col gap-2 mt-4">
                {/* {isSignedIn ? (
                  <Button variant="ghost" onClick={() => router.push("/profile")}>
                    {user?.firstName || "Profile"}
                  </Button>
                ) : (
                  <Button variant="ghost" onClick={() => router.push("/sign-in")}>
                    Sign In
                  </Button>
                )} */}
            <Link href="/workspace">
  <Button
    variant="glow"
    className="transition-all duration-300 transform shadow-md shadow-blue-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/70"
  >
    Get Started
  </Button>
</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};