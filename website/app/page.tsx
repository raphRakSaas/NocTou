import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { RoadmapSection } from "@/components/RoadmapSection";
import { StorySection } from "@/components/StorySection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <StorySection />
        <RoadmapSection />
      </main>
      <Footer />
    </>
  );
}
