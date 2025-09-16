"use client";

import { Navigation } from "../app/components/Navigation";
import { HeroSection } from "../app/components/HeroSection";
import { FeaturesSection } from "../app/components/FeaturesSection";
import { CourseSection } from "../app/components/CourseSection";
import { Footer } from "../app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <HeroSection />
        <FeaturesSection />
        <CourseSection />
      </main>
      <Footer />
    </div>
  );
}
