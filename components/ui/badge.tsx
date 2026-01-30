import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center border-2 px-2.5 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-all overflow-hidden',
  {
    variants: {
      variant: {
        // Primary grass green badge
        default: [
          'bg-gradient-to-b from-[#5D9B35] to-[#4A7D2A] text-white',
          'border-t-[#7DBF4A] border-l-[#7DBF4A] border-b-[#3A5D20] border-r-[#3A5D20]',
          'shadow-[2px_2px_0_rgba(0,0,0,0.3)]',
          '[a&]:hover:from-[#6BAA42] [a&]:hover:to-[#5A8D38]',
        ].join(' '),
        // Secondary stone badge
        secondary: [
          'bg-gradient-to-b from-[#4A4A4A] to-[#3A3A3A] text-secondary-foreground',
          'border-t-[#6A6A6A] border-l-[#6A6A6A] border-b-[#2A2A2A] border-r-[#2A2A2A]',
          'shadow-[2px_2px_0_rgba(0,0,0,0.3)]',
          '[a&]:hover:from-[#5A5A5A] [a&]:hover:to-[#4A4A4A]',
        ].join(' '),
        // Destructive redstone badge
        destructive: [
          'bg-gradient-to-b from-[#D93A3A] to-[#A82C2C] text-white',
          'border-t-[#EF5555] border-l-[#EF5555] border-b-[#8A2020] border-r-[#8A2020]',
          'shadow-[2px_2px_0_rgba(0,0,0,0.3)]',
          '[a&]:hover:from-[#E54545] [a&]:hover:to-[#B53535]',
        ].join(' '),
        // Gold badge for achievements/special items
        gold: [
          'bg-gradient-to-b from-[#FCDB00] to-[#C9A800] text-[#3A2800]',
          'border-t-[#FFE940] border-l-[#FFE940] border-b-[#9A7F00] border-r-[#9A7F00]',
          'shadow-[2px_2px_0_rgba(0,0,0,0.3)]',
          '[a&]:hover:from-[#FFE420] [a&]:hover:to-[#D9B800]',
        ].join(' '),
        // Diamond badge for premium items
        diamond: [
          'bg-gradient-to-b from-[#4AEDD9] to-[#2EB5A6] text-[#0A3A35]',
          'border-t-[#7FFFF0] border-l-[#7FFFF0] border-b-[#1A8A7A] border-r-[#1A8A7A]',
          'shadow-[2px_2px_0_rgba(0,0,0,0.3)]',
          '[a&]:hover:from-[#60FFF0] [a&]:hover:to-[#3EC5B6]',
        ].join(' '),
        // Outline badge
        outline: [
          'bg-transparent text-foreground border-border',
          'shadow-none',
          '[a&]:hover:bg-accent/20 [a&]:hover:text-accent-foreground',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
