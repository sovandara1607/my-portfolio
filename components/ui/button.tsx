import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-60 disabled:saturate-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 border-0",
  {
    variants: {
      variant: {
        // Primary grass green button - main CTA
        default: 'bg-gradient-to-b from-[#5D9B35] to-[#4A7D2A] text-white border-[3px] border-t-[#7DBF4A] border-l-[#7DBF4A] border-b-[#3A5D20] border-r-[#3A5D20] shadow-[3px_3px_0_rgba(0,0,0,0.4)] hover:from-[#6BAA42] hover:to-[#5A8D38] hover:shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:shadow-[1px_1px_0_rgba(0,0,0,0.3)] active:translate-x-[2px] active:translate-y-[2px]',
        
        // Destructive redstone button
        destructive:
          'bg-gradient-to-b from-[#D93A3A] to-[#A82C2C] text-white border-[3px] border-t-[#EF5555] border-l-[#EF5555] border-b-[#8A2020] border-r-[#8A2020] shadow-[3px_3px_0_rgba(0,0,0,0.4)] hover:from-[#E54545] hover:to-[#B53535] hover:shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:shadow-[1px_1px_0_rgba(0,0,0,0.3)] active:translate-x-[2px] active:translate-y-[2px]',
        
        // Outline stone button
        outline:
          'bg-gradient-to-b from-[#4A4A4A] to-[#3A3A3A] text-foreground border-[3px] border-t-[#6A6A6A] border-l-[#6A6A6A] border-b-[#2A2A2A] border-r-[#2A2A2A] shadow-[3px_3px_0_rgba(0,0,0,0.4)] hover:from-[#5A5A5A] hover:to-[#4A4A4A] hover:text-primary hover:shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:shadow-[1px_1px_0_rgba(0,0,0,0.3)] active:translate-x-[2px] active:translate-y-[2px]',
        
        // Secondary stone gray button
        secondary:
          'bg-gradient-to-b from-[#7F7F7F] to-[#5F5F5F] text-white border-[3px] border-t-[#9F9F9F] border-l-[#9F9F9F] border-b-[#4A4A4A] border-r-[#4A4A4A] shadow-[3px_3px_0_rgba(0,0,0,0.4)] hover:from-[#8F8F8F] hover:to-[#6F6F6F] hover:shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:shadow-[1px_1px_0_rgba(0,0,0,0.3)] active:translate-x-[2px] active:translate-y-[2px]',
        
        // Gold button for special actions
        gold:
          'bg-gradient-to-b from-[#FCDB00] to-[#C9A800] text-[#3A2800] font-semibold border-[3px] border-t-[#FFE940] border-l-[#FFE940] border-b-[#9A7F00] border-r-[#9A7F00] shadow-[3px_3px_0_rgba(0,0,0,0.4)] hover:from-[#FFE420] hover:to-[#D9B800] hover:shadow-[4px_4px_0_rgba(0,0,0,0.5),0_0_15px_rgba(252,219,0,0.3)] active:shadow-[1px_1px_0_rgba(0,0,0,0.3)] active:translate-x-[2px] active:translate-y-[2px]',
        
        // Diamond button for premium actions
        diamond:
          'bg-gradient-to-b from-[#4AEDD9] to-[#2EB5A6] text-[#0A3A35] font-semibold border-[3px] border-t-[#7FFFF0] border-l-[#7FFFF0] border-b-[#1A8A7A] border-r-[#1A8A7A] shadow-[3px_3px_0_rgba(0,0,0,0.4)] hover:from-[#60FFF0] hover:to-[#3EC5B6] hover:shadow-[4px_4px_0_rgba(0,0,0,0.5),0_0_15px_rgba(74,237,217,0.3)] active:shadow-[1px_1px_0_rgba(0,0,0,0.3)] active:translate-x-[2px] active:translate-y-[2px]',
        
        // Ghost button for subtle actions
        ghost:
          'hover:bg-primary/15 hover:text-primary border-transparent shadow-none active:bg-primary/20',
        
        // Link style button
        link: 'text-primary underline-offset-4 hover:underline border-transparent shadow-none',
      },
      size: {
        default: 'h-10 px-5 py-2 has-[>svg]:px-4',
        sm: 'h-8 gap-1.5 px-3 text-xs has-[>svg]:px-2.5',
        lg: 'h-12 px-8 text-base has-[>svg]:px-6',
        xl: 'h-14 px-10 text-lg has-[>svg]:px-8',
        icon: 'size-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
