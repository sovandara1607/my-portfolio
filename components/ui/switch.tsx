'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Base styles
        'peer inline-flex h-6 w-11 shrink-0 items-center transition-all outline-none',
        // Minecraft block styling - track
        'border-2 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4)]',
        // Unchecked state - stone gray
        'data-[state=unchecked]:bg-gradient-to-b data-[state=unchecked]:from-[#4A4A4A] data-[state=unchecked]:to-[#3A3A3A]',
        'data-[state=unchecked]:border-t-[#3A3A3A] data-[state=unchecked]:border-l-[#3A3A3A]',
        'data-[state=unchecked]:border-b-[#5A5A5A] data-[state=unchecked]:border-r-[#5A5A5A]',
        // Checked state - grass green with glow
        'data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#5D9B35] data-[state=checked]:to-[#4A7D2A]',
        'data-[state=checked]:border-t-[#3A5D20] data-[state=checked]:border-l-[#3A5D20]',
        'data-[state=checked]:border-b-[#7DBF4A] data-[state=checked]:border-r-[#7DBF4A]',
        'data-[state=checked]:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),0_0_8px_rgba(93,155,53,0.4)]',
        // Focus state
        'focus-visible:ring-2 focus-visible:ring-ring/50',
        // Disabled state
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Base thumb styles
          'pointer-events-none block size-5 transition-transform',
          // Minecraft block styling - lever/thumb
          'border-2 shadow-[2px_2px_0_rgba(0,0,0,0.4)]',
          // Unchecked - dark stone
          'data-[state=unchecked]:bg-gradient-to-b data-[state=unchecked]:from-[#7F7F7F] data-[state=unchecked]:to-[#5F5F5F]',
          'data-[state=unchecked]:border-t-[#9F9F9F] data-[state=unchecked]:border-l-[#9F9F9F]',
          'data-[state=unchecked]:border-b-[#4A4A4A] data-[state=unchecked]:border-r-[#4A4A4A]',
          'data-[state=unchecked]:translate-x-0',
          // Checked - XP green
          'data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-[#80FF20] data-[state=checked]:to-[#60C010]',
          'data-[state=checked]:border-t-[#A0FF50] data-[state=checked]:border-l-[#A0FF50]',
          'data-[state=checked]:border-b-[#409010] data-[state=checked]:border-r-[#409010]',
          'data-[state=checked]:translate-x-[calc(100%-1px)]',
          'data-[state=checked]:shadow-[2px_2px_0_rgba(0,0,0,0.4),0_0_6px_rgba(128,255,32,0.5)]',
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
