'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const progressVariants = cva(
  'relative w-full overflow-hidden border-2',
  {
    variants: {
      variant: {
        // XP bar style (default Minecraft look)
        xp: [
          'h-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]',
          'border-t-[#3a3a3a] border-l-[#3a3a3a] border-b-[#1a1a1a] border-r-[#1a1a1a]',
          'shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]',
        ].join(' '),
        // Health bar style (red)
        health: [
          'h-3 bg-gradient-to-b from-[#2a1515] to-[#1a0a0a]',
          'border-t-[#4a2525] border-l-[#4a2525] border-b-[#1a0a0a] border-r-[#1a0a0a]',
          'shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]',
        ].join(' '),
        // Hunger bar style (gold/yellow)
        hunger: [
          'h-3 bg-gradient-to-b from-[#2a2515] to-[#1a1505]',
          'border-t-[#4a4525] border-l-[#4a4525] border-b-[#1a1505] border-r-[#1a1505]',
          'shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]',
        ].join(' '),
        // Diamond/mana style (blue)
        mana: [
          'h-3 bg-gradient-to-b from-[#152a2a] to-[#0a1a1a]',
          'border-t-[#254a4a] border-l-[#254a4a] border-b-[#0a1a1a] border-r-[#0a1a1a]',
          'shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]',
        ].join(' '),
        // Minimal style
        minimal: [
          'h-2 bg-muted border-border',
          'shadow-none',
        ].join(' '),
      },
      size: {
        sm: 'h-2',
        default: 'h-3',
        lg: 'h-4',
        xl: 'h-6',
      },
    },
    defaultVariants: {
      variant: 'xp',
      size: 'default',
    },
  }
)

const indicatorVariants = cva(
  'h-full w-full flex-1 transition-all',
  {
    variants: {
      variant: {
        xp: 'bg-gradient-to-b from-[#80FF20] via-[#50C010] to-[#409010] shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_0_10px_rgba(128,255,32,0.5)]',
        health: 'bg-gradient-to-b from-[#EF5555] via-[#D93A3A] to-[#A82C2C] shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_0_8px_rgba(217,58,58,0.4)]',
        hunger: 'bg-gradient-to-b from-[#FFE940] via-[#FCDB00] to-[#C9A800] shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_0_8px_rgba(252,219,0,0.4)]',
        mana: 'bg-gradient-to-b from-[#7FFFF0] via-[#4AEDD9] to-[#2EB5A6] shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_0_8px_rgba(74,237,217,0.4)]',
        minimal: 'bg-primary',
      },
    },
    defaultVariants: {
      variant: 'xp',
    },
  }
)

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  showValue?: boolean
}

function Progress({
  className,
  value,
  variant,
  size,
  showValue = false,
  ...props
}: ProgressProps) {
  return (
    <div className="relative">
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(progressVariants({ variant, size }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(indicatorVariants({ variant }))}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
      {showValue && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          {Math.round(value || 0)}%
        </span>
      )}
    </div>
  )
}

export { Progress, progressVariants }
