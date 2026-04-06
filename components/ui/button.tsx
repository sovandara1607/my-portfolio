import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 rounded-md",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 shadow-sm',
        
        outline:
          'border border-border bg-transparent text-foreground hover:bg-muted hover:text-foreground shadow-sm',
        
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm',
        
        gold:
          'bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-sm',
        
        diamond:
          'bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 shadow-sm',
        
        ghost:
          'hover:bg-muted hover:text-foreground',
        
        link: 'text-primary underline-offset-4 hover:underline',
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
