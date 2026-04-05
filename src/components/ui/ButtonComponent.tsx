import React from 'react'
import { cn } from '../../utils/cn'
import type { ButtonProps } from '../../types/schema'

const variantMap = {
  primary: 'bg-accent text-white hover:bg-accent-hover shadow-soft active:scale-[0.98]',
  secondary: 'bg-surface-secondary text-text-primary hover:bg-border-light border border-border-light',
  ghost: 'bg-transparent text-accent hover:bg-accent-light border border-accent/30 hover:border-accent/60',
  danger: 'bg-danger text-white hover:opacity-90 shadow-soft active:scale-[0.98]',
}

const sizeMap = {
  sm: 'h-10 px-5 text-sm  gap-1.5',
  md: 'h-11 px-6 text-base gap-2',
  lg: 'h-13 px-8 text-lg  gap-2.5',
}

const roundedMap = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

const shadowMap = {
  none: '',
  sm: 'shadow-soft',
  md: 'shadow-soft-md',
  lg: 'shadow-soft-lg',
}

export function ButtonComponent({ props }: { props: ButtonProps }) {
  // Build custom inline style overrides
  const customStyle: React.CSSProperties = {}
  if (props.customBgColor) customStyle.backgroundColor = props.customBgColor
  if (props.customTextColor) customStyle.color = props.customTextColor
  if (props.customBorderColor) { customStyle.borderColor = props.customBorderColor; customStyle.borderWidth = 1; customStyle.borderStyle = 'solid' }
  if (props.opacity !== undefined && props.opacity !== 100) customStyle.opacity = props.opacity / 100

  const sharedClass = cn(
    'inline-flex items-center justify-center font-semibold tracking-tight',
    'select-none whitespace-nowrap transition-all duration-200 leading-none',
    // Only apply Tailwind variant colours when no custom bg is set
    !props.customBgColor && variantMap[props.variant],
    sizeMap[props.size],
    roundedMap[props.rounded],
    props.shadow && shadowMap[props.shadow],
    props.fullWidth && 'w-full',
    props.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
    !props.disabled && 'hover:scale-[1.02] hover:shadow-soft-md',
  )

  if (props.href) {
    return (
      <a
        href={props.href}
        aria-label={props.ariaLabel}
        title={props.title}
        className={sharedClass}
        style={customStyle}
        onClick={(e) => e.preventDefault()}
      >
        {props.label}
      </a>
    )
  }

  return (
    <button
      disabled={props.disabled}
      aria-label={props.ariaLabel}
      title={props.title}
      className={sharedClass}
      style={customStyle}
    >
      {props.label}
    </button>
  )
}
