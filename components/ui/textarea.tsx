import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base styles
        'flex field-sizing-content min-h-24 w-full px-3 py-2 text-base transition-all outline-none md:text-sm resize-y',
        // Minecraft block styling
        'bg-gradient-to-b from-input to-input/80 border-3',
        'border-t-[rgba(0,0,0,0.3)] border-l-[rgba(0,0,0,0.3)]',
        'border-b-[rgba(255,255,255,0.08)] border-r-[rgba(255,255,255,0.08)]',
        'shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3)]',
        // Text and placeholder
        'text-foreground placeholder:text-muted-foreground',
        // Focus state with green glow
        'focus-visible:border-primary/50 focus-visible:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),0_0_8px_rgba(93,155,53,0.3)]',
        // Invalid state
        'aria-invalid:border-destructive/50 aria-invalid:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),0_0_8px_rgba(217,58,58,0.3)]',
        // Disabled state
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
