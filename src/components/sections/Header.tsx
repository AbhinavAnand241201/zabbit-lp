"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { RabbitIcon } from '@/components/icons/RabbitIcon';
import { cn } from '@/lib/utils';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const CtaButton = ({ className }: { className?: string }) => (
    <Button
      asChild
      className={cn(
        'rounded-full font-bold transition-all hover:shadow-lg hover:brightness-110 hover:scale-105',
        'gradient-background',
        className
      )}
    >
      <a href="#quiz">Take the Quiz</a>
    </Button>
  );

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <RabbitIcon className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold lowercase text-white">Zabbit</span>
        </Link>
        <nav>
          {isMobile ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-sm">
                <div className="flex flex-col items-center justify-center h-full gap-8">
                  <CtaButton className="w-full text-lg py-6" />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <CtaButton />
          )}
        </nav>
      </div>
    </header>
  );
}
