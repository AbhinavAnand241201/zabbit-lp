"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const animalCards = [
  {
    name: 'Morning Cheetah',
    type: 'SLEEP CHRONOTYPE',
    image: 'https://placehold.co/360x540.png',
    aiHint: 'morning cheetah',
    rotation: '-rotate-6',
    glowColor: 'from-pink-500/10',
    parallaxFactor: 0.15,
  },
  {
    name: 'Night Owl',
    type: 'SLEEP CHRONOTYPE',
    image: 'https://placehold.co/400x600.png',
    aiHint: 'night owl',
    rotation: 'rotate-0',
    glowColor: 'from-purple-500/20',
    parallaxFactor: 0.05,
  },
  {
    name: 'Active Orca',
    type: 'SLEEP CHRONOTYPE',
    image: 'https://placehold.co/360x540.png',
    aiHint: 'orca whale',
    rotation: 'rotate-6',
    glowColor: 'from-blue-500/10',
    parallaxFactor: 0.1,
  },
];

export function AnimalCards() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { top } = ref.current.getBoundingClientRect();
        // Only update scrollY when the component is near/in the viewport
        if (top < window.innerHeight && top > -ref.current.offsetHeight) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getParallaxStyle = (factor: number) => {
    if (!ref.current) return {};
    const { top } = ref.current.getBoundingClientRect();
    const offset = (top + ref.current.offsetHeight / 2) * factor;
    return { transform: `translateY(${offset}px)` };
  };

  return (
    <section ref={ref} id="quiz" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={cn(
            'flex flex-col md:flex-row items-center justify-center gap-4 md:-space-x-12 transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          )}
        >
          {animalCards.map((card, index) => (
            <div
              key={card.name}
              className={cn(
                'transition-all duration-500 hover:-translate-y-4 w-full max-w-[280px] md:max-w-none md:w-auto',
                card.rotation
              )}
              style={getParallaxStyle(card.parallaxFactor)}
            >
              <Card
                className={cn(
                  'relative overflow-hidden border-purple-500/20 bg-background/50 backdrop-blur-sm group',
                  'transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20',
                  { 'z-10 scale-110': index === 1, 'mt-8 md:mt-0': index !== 1 }
                )}
              >
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-t to-transparent opacity-20 transition-opacity duration-500 group-hover:opacity-40',
                    card.glowColor
                  )}
                />
                {index === 1 && (
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/30 to-transparent blur-3xl" />
                )}
                <CardContent className="relative p-4 flex flex-col items-center text-center h-[450px] md:h-auto">
                  <p className="text-xs font-bold tracking-widest text-muted-foreground">
                    {card.type}
                  </p>
                  <div className="flex-grow flex items-center justify-center my-4">
                    <Image
                      src={card.image}
                      alt={card.name}
                      width={index === 1 ? 200 : 180}
                      height={index === 1 ? 300 : 270}
                      data-ai-hint={card.aiHint}
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-white">{card.name}</h3>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
