"use client";

import { useRef } from 'react';
import { Megaphone, Dna, Clock } from 'lucide-react';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Megaphone,
    title: 'No advertisements, just insights',
    description: 'We focus on providing you with valuable, personalized sleep insights without any distractions.',
  },
  {
    icon: Dna,
    title: 'Scientifically backed',
    description: 'Our quiz is based on established chronobiology research to give you accurate and reliable results.',
  },
  {
    icon: Clock,
    title: 'Immediate results',
    description: 'Discover your sleep chronotype instantly upon completing the quiz and get actionable advice.',
  },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, { threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            What You Need to Know
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">
            About the Sleep Chronotype Quiz
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  'flex flex-col items-center md:items-start text-center md:text-left gap-4 transition-all duration-700 ease-out',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
                  `delay-${index * 200}`
                )}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center gradient-background">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
