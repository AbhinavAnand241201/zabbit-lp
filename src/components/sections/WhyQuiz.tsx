"use client";

import { useRef } from 'react';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';

export function WhyQuiz() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, { threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <div
          className={cn(
            'flex flex-col items-center text-center gap-6 transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Why Take This Quiz?
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground max-w-2xl">
            <p>
              Understanding your unique sleep chronotype is the first step towards a more{' '}
              <span className="gradient-text font-bold">energetic</span> life. Our quiz,
              grounded in scientific research, helps you identify your natural sleep-wake cycle.
            </p>
            <p>
              By aligning your daily schedule with your internal clock, you can unlock peak
              performance, improve your mood, and boost your overall{' '}
              <span className="gradient-text font-bold">productivity</span>. Stop fighting
              your body's natural rhythm and start living in harmony with it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
