"use client";

import { useRef } from 'react';
import { Rabbit, Book, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useOnScreen } from '@/hooks/use-on-screen';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { WispIcon } from '@/components/icons/WispIcon';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  const isMobile = useIsMobile();
  const apkLink = "https://drive.google.com/file/d/1FOLZFftWKZ4sjBxoPZUKlMMOicOs31v3/view?usp=sharing";

  const AppFeatureIcons = () => (
    <div className="absolute top-1/2 -right-4 -translate-y-1/2 md:-right-16 lg:-right-24 flex flex-col gap-2">
       {[Book, BrainCircuit, Rabbit].map((Icon, i) => (
          <div key={i} className={cn(
            'p-2 bg-white/10 rounded-full backdrop-blur-sm transition-all duration-700 hover:scale-125 hover:bg-primary/50',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10',
            `delay-${i * 150}`
          )}>
            <Icon className="h-5 w-5 md:h-6 md:w-6 text-white/80" />
          </div>
        ))}
    </div>
  );

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20"
    >
      <WispIcon className="absolute -top-16 -right-16 w-48 h-48 text-primary/10 opacity-50" style={{ animationDelay: '2s' }} />
      <WispIcon className="absolute -bottom-16 -left-16 w-48 h-48 text-accent/10 opacity-50 transform scale-x-[-1] scale-y-[-1]" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative flex flex-col items-center text-center">
          <div
            className={cn(
              "transition-all duration-1000 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <p className="font-bold tracking-[0.2em] text-primary">
              SKILL-BASED LEARNING PLATFORM
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
              Unlock Your
            </h1>
            <h1 className="mt-1 text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
              <span className="gradient-text">Full Potential</span> Today!
            </h1>
          </div>
          
          <div
            className={cn(
              "mt-6 max-w-lg transition-all duration-1000 ease-out delay-300",
               isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
             <p className="text-lg text-muted-foreground">
              Progress through structured learning paths, complete quizzes, and master new skills at your own pace.
            </p>
          </div>
          
          <div
            className={cn(
              "mt-8 transition-all duration-1000 ease-out delay-500",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
          >
            <Button asChild size="lg" className="rounded-full px-10 py-7 text-lg font-bold transition-all hover:shadow-lg hover:shadow-accent/50 hover:brightness-110 hover:scale-105 gradient-background text-primary-foreground">
                <a href={apkLink} target="_blank" rel="noopener noreferrer">Download the App</a>
            </Button>
          </div>
          
          {!isMobile && <AppFeatureIcons />}
        </div>
      </div>
    </section>
  );
}
