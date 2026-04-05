import React from 'react'
import { cn } from '../../utils/cn'
import type { TextProps, BadgeProps, DividerProps } from '../../types/schema'

// ─── Text ─────────────────────────────────────────────────────────────────────

const textVariantMap = {
  h1: 'text-[3rem]   font-bold tracking-[-0.02em] leading-[1.1]  text-text-primary',
  h2: 'text-[2.25rem] font-bold tracking-[-0.015em] leading-[1.15] text-text-primary',
  h3: 'text-[1.75rem] font-semibold tracking-tight leading-[1.2]  text-text-primary',
  h4: 'text-[1.25rem] font-semibold tracking-tight leading-[1.3]  text-text-primary',
  body: 'text-[1.0625rem] font-normal leading-[1.75] text-text-primary',
  caption: 'text-[0.875rem] leading-[1.6] text-text-secondary',
  label: 'text-[0.6875rem] font-semibold uppercase tracking-widest text-text-tertiary',
}

const colorMap = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  tertiary: 'text-text-tertiary',
  accent: 'text-accent',
}

const alignMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const tagMap: Record<TextProps['variant'], keyof JSX.IntrinsicElements> = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4',
  body: 'p', caption: 'p', label: 'span',
}

export function TextComponent({ props }: { props: TextProps }) {
  const Tag = tagMap[props.variant]

  const style: React.CSSProperties = {}
  if (props.customColor) style.color = props.customColor
  if (props.fontWeight) style.fontWeight = props.fontWeight
  if (props.lineHeight) style.lineHeight = props.lineHeight
  if (props.letterSpacing) style.letterSpacing = props.letterSpacing
  if (props.maxWidth) style.maxWidth = props.maxWidth

  return (
    <Tag
      className={cn(
        textVariantMap[props.variant],
        !props.customColor && colorMap[props.color],
        alignMap[props.align],
        props.italic && 'italic',
        props.underline && 'underline underline-offset-2',
        props.strikethrough && 'line-through',
      )}
      style={Object.keys(style).length ? style : undefined}
    >
      {props.content}
    </Tag>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────

const badgeVariantMap = {
  default: 'bg-surface-secondary  text-text-secondary',
  success: 'bg-success-light       text-success',
  warning: 'bg-yellow-50           text-yellow-700',
  danger: 'bg-danger-light        text-danger',
  info: 'bg-accent-light        text-accent',
}

const badgeSizeMap = {
  sm: 'h-5  px-2.5 text-[0.6875rem]',
  md: 'h-6  px-3   text-[0.75rem]',
}

export function BadgeComponent({ props }: { props: BadgeProps }) {
  const customStyle: React.CSSProperties = {}
  if (props.customBgColor) customStyle.backgroundColor = props.customBgColor
  if (props.customTextColor) customStyle.color = props.customTextColor

  return (
    <span
      aria-label={props.ariaLabel}
      className={cn(
        !props.customBgColor && badgeVariantMap[props.variant],
        badgeSizeMap[props.size],
        'font-semibold tracking-tight rounded-full inline-flex items-center gap-1.5 leading-none',
        props.uppercase && 'uppercase tracking-wider',
      )}
      style={Object.keys(customStyle).length ? customStyle : undefined}
    >
      {props.dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: props.customTextColor ?? 'currentColor' }}
        />
      )}
      {props.label}
    </span>
  )
}

// ─── Divider ─────────────────────────────────────────────────────────────────

const spacingMap = {
  sm: 'py-1',
  md: 'py-3',
  lg: 'py-6',
}

export function DividerComponent({ props }: { props: DividerProps }) {
  const thickness = props.thickness ?? 1
  const lineStyle = props.lineStyle ?? 'solid'
  const color = props.color ?? undefined
  const spacingCls = spacingMap[(props.spacing as keyof typeof spacingMap) ?? 'md'] ?? 'py-3'

  const hrStyle: React.CSSProperties = {
    borderTopWidth: thickness,
    borderTopStyle: lineStyle as React.CSSProperties['borderTopStyle'],
    borderColor: color ?? undefined,
  }

  if (props.orientation === 'vertical') {
    return <div className="w-px bg-border-light self-stretch mx-3" style={color ? { backgroundColor: color } : undefined} />
  }

  return (
    <div className={cn('w-full flex items-center gap-4', spacingCls)}>
      {props.label ? (
        <>
          <hr className="flex-1 border-0" style={hrStyle} />
          <span className="text-[0.6875rem] font-semibold uppercase tracking-widest text-text-tertiary whitespace-nowrap">
            {props.label}
          </span>
          <hr className="flex-1 border-0" style={hrStyle} />
        </>
      ) : (
        <hr className="flex-1 border-0" style={hrStyle} />
      )}
    </div>
  )
}
