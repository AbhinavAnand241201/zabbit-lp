import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { AnimalCards } from "@/components/sections/AnimalCards";
import { WhyQuiz } from "@/components/sections/WhyQuiz";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <AnimalCards />
        <WhyQuiz />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
