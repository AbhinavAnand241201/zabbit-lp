"use client";

import { useRef } from 'react';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function WhyQuiz() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, { threshold: 0.2 });

  return (
    <section ref={ref} id="about" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <div
          className={cn(
            'flex flex-col items-center text-center gap-6 transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Why Choose Our Platform?
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground max-w-2xl">
            <p>
              Our platform provides a structured approach to learning. By breaking down complex subjects into{' '}
              <span className="gradient-text font-bold">chapters and skills</span>, we make learning manageable and motivating.
            </p>
            <p>
              Complete quizzes to test your knowledge, track your progress with detailed analytics, and unlock new content as you master each level. It's learning, gamified.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
