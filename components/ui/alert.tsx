import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full border-3 px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*5)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-1 items-start [&>svg]:size-5 [&>svg]:translate-y-0.5',
  {
    variants: {
      variant: {
        // Default stone panel alert
        default: [
          'bg-gradient-to-b from-card to-card/95 text-card-foreground',
          'border-t-[rgba(255,255,255,0.1)] border-l-[rgba(255,255,255,0.1)]',
          'border-b-[rgba(0,0,0,0.3)] border-r-[rgba(0,0,0,0.3)]',
          'shadow-[3px_3px_0_rgba(0,0,0,0.3)]',
          '[&>svg]:text-muted-foreground',
        ].join(' '),
        // Destructive redstone alert
        destructive: [
          'bg-gradient-to-b from-[#3a1a1a] to-[#2a1010]',
          'text-[#ff9999] border-[#D93A3A]',
          'border-t-[#EF5555] border-l-[#EF5555]',
          'border-b-[#8A2020] border-r-[#8A2020]',
          'shadow-[3px_3px_0_rgba(0,0,0,0.3),0_0_15px_rgba(217,58,58,0.15)]',
          '[&>svg]:text-[#EF5555]',
          '*:data-[slot=alert-description]:text-[#ff9999]/80',
        ].join(' '),
        // Warning gold alert
        warning: [
          'bg-gradient-to-b from-[#3a3215] to-[#2a250a]',
          'text-[#ffe680] border-[#FCDB00]',
          'border-t-[#FFE940] border-l-[#FFE940]',
          'border-b-[#9A7F00] border-r-[#9A7F00]',
          'shadow-[3px_3px_0_rgba(0,0,0,0.3),0_0_15px_rgba(252,219,0,0.15)]',
          '[&>svg]:text-[#FFE940]',
          '*:data-[slot=alert-description]:text-[#ffe680]/80',
        ].join(' '),
        // Success emerald alert
        success: [
          'bg-gradient-to-b from-[#1a3a1a] to-[#0a2a0a]',
          'text-[#99ff99] border-[#5D9B35]',
          'border-t-[#7DBF4A] border-l-[#7DBF4A]',
          'border-b-[#3A5D20] border-r-[#3A5D20]',
          'shadow-[3px_3px_0_rgba(0,0,0,0.3),0_0_15px_rgba(93,155,53,0.15)]',
          '[&>svg]:text-[#80FF20]',
          '*:data-[slot=alert-description]:text-[#99ff99]/80',
        ].join(' '),
        // Info diamond alert
        info: [
          'bg-gradient-to-b from-[#1a2a3a] to-[#0a1a2a]',
          'text-[#99e5ff] border-[#4AEDD9]',
          'border-t-[#7FFFF0] border-l-[#7FFFF0]',
          'border-b-[#1A8A7A] border-r-[#1A8A7A]',
          'shadow-[3px_3px_0_rgba(0,0,0,0.3),0_0_15px_rgba(74,237,217,0.15)]',
          '[&>svg]:text-[#4AEDD9]',
          '*:data-[slot=alert-description]:text-[#99e5ff]/80',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
