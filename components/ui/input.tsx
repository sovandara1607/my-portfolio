import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        'h-10 w-full min-w-0 px-3 py-2 text-base transition-all outline-none md:text-sm',
        // Minecraft block styling
        'bg-gradient-to-b from-input to-input/80 border-3',
        'border-t-[rgba(0,0,0,0.3)] border-l-[rgba(0,0,0,0.3)]',
        'border-b-[rgba(255,255,255,0.08)] border-r-[rgba(255,255,255,0.08)]',
        'shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3)]',
        // Text and placeholder
        'text-foreground placeholder:text-muted-foreground',
        'selection:bg-primary selection:text-primary-foreground',
        // Focus state with green glow
        'focus-visible:border-primary/50 focus-visible:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),0_0_8px_rgba(93,155,53,0.3)]',
        // Invalid state
        'aria-invalid:border-destructive/50 aria-invalid:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),0_0_8px_rgba(217,58,58,0.3)]',
        // Disabled state
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        // File input styling
        'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
