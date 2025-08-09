import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function RabbitIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <g className="animate-pulse-glow">
        <path d="M14.5 12.5c0-2.5-1.5-5-3.5-5s-3.5 2.5-3.5 5c0 2.05 1.14 3.8 2.83 4.5" />
        <path
          d="M16 13.04a3.5 3.5 0 0 1 0-7.08"
          className={cn('origin-bottom animate-ear-twitch')}
        />
        <path
          d="M8 13.04a3.5 3.5 0 0 0 0-7.08"
          className={cn('origin-bottom animate-ear-twitch', 'animation-delay-500')}
        />
        <path d="M18.5 13.5c0 3.5-1.5 6-4.5 6s-4.5-2.5-4.5-6" />
        <path d="M12 12m-1 0a1 1 0 1 0-2 0a1 1 0 1 0 2 0" />
      </g>
    </svg>
  );
}
