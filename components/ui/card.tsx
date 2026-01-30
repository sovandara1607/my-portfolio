import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const cardVariants = cva(
  'bg-gradient-to-b from-card to-card/95 text-card-foreground flex flex-col gap-6 py-6 transition-all',
  {
    variants: {
      variant: {
        // Default stone panel style
        default: [
          'border-4 shadow-[4px_4px_0_rgba(0,0,0,0.35)]',
          'border-t-[rgba(255,255,255,0.12)] border-l-[rgba(255,255,255,0.12)]',
          'border-b-[rgba(0,0,0,0.35)] border-r-[rgba(0,0,0,0.35)]',
        ].join(' '),
        // Interactive card with hover effects
        interactive: [
          'border-4 shadow-[4px_4px_0_rgba(0,0,0,0.35)]',
          'border-t-[rgba(255,255,255,0.12)] border-l-[rgba(255,255,255,0.12)]',
          'border-b-[rgba(0,0,0,0.35)] border-r-[rgba(0,0,0,0.35)]',
          'hover:shadow-[6px_6px_0_rgba(0,0,0,0.4),0_0_20px_rgba(93,155,53,0.15)]',
          'hover:-translate-y-1 hover:border-t-[rgba(93,155,53,0.3)] hover:border-l-[rgba(93,155,53,0.3)]',
          'cursor-pointer',
        ].join(' '),
        // Achievement/reward card with gold accent
        achievement: [
          'border-4 shadow-[4px_4px_0_rgba(0,0,0,0.35)]',
          'border-t-[rgba(252,219,0,0.3)] border-l-[rgba(252,219,0,0.3)]',
          'border-b-[rgba(0,0,0,0.35)] border-r-[rgba(0,0,0,0.35)]',
          'hover:shadow-[0_0_20px_rgba(252,219,0,0.2)]',
        ].join(' '),
        // Ghost/transparent variant
        ghost: 'border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-none',
        // Outline only
        outline: 'border-3 border-border bg-transparent shadow-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold text-lg', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm leading-relaxed', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
