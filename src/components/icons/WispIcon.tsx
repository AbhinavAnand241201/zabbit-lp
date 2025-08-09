import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function WispIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 162 162"
      fill="none"
      className={cn('animate-drift', props.className)}
      {...props}
    >
      <path
        d="M160.5 1.5C148 14 113.667 47.1667 114 81C114.333 114.833 148.5 149 160.5 160.5"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <path
        d="M114 81L1.5 1.5"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
    </svg>
  );
}
