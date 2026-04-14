import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-aqua text-white hover:bg-aqua-600 shadow-lg hover:shadow-aqua/25',
        navy: 'bg-navy text-white hover:bg-navy-400 shadow-lg',
        gold: 'bg-gold text-white hover:bg-gold-500 shadow-lg hover:shadow-gold/25',
        outline: 'border-2 border-aqua text-aqua hover:bg-aqua hover:text-white',
        'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-navy',
        ghost: 'hover:bg-muted hover:text-foreground',
        link: 'text-aqua underline-offset-4 hover:underline p-0 h-auto',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-md px-4 text-xs',
        lg: 'h-14 rounded-md px-10 text-base',
        xl: 'h-16 rounded-lg px-12 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
