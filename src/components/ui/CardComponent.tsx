import React from 'react'
import { cn } from '../../utils/cn'
import type { CardProps } from '../../types/schema'

const variantMap = {
  default: 'bg-white shadow-soft border border-border-light',
  elevated: 'bg-white shadow-soft-lg',
  outlined: 'bg-white border-2 border-border',
  flat: 'bg-surface-secondary',
}

const roundedMap = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
}

const imageHeightMap = {
  sm: 'h-36',
  md: 'h-52',
  lg: 'h-64',
  xl: 'h-80',
}

const paddingMap = {
  sm: 'p-4',
  md: 'p-7',
  lg: 'p-10',
}

export function CardComponent({ props }: { props: CardProps }) {
  const imgH = imageHeightMap[props.imageHeight ?? 'md']
  const objFit = props.imageObjectFit ?? 'cover'
  const padCls = paddingMap[props.padding ?? 'md']
  const hoverOn = props.hoverEffect !== false
  const customBg = props.customBgColor

  return (
    <div
      aria-label={props.ariaLabel}
      className={cn(
        !customBg && variantMap[props.variant],
        roundedMap[props.rounded],
        'overflow-hidden transition-all duration-200 w-full',
        hoverOn && 'hover:shadow-soft-md hover:-translate-y-0.5',
      )}
      style={customBg ? { backgroundColor: customBg } : undefined}
    >
      {/* Image */}
      {props.showImage && (
        <div className={cn(imgH, 'w-full bg-surface-secondary overflow-hidden')}>
          <img
            src={props.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'}
            alt={props.imageAlt || props.title}
            className="w-full h-full transition-transform duration-300 hover:scale-105"
            style={{ objectFit: objFit as React.CSSProperties['objectFit'] }}
          />
        </div>
      )}

      {/* Body */}
      <div className={padCls}>
        <div className="mb-3">
          <h3 className="text-[20px] font-semibold text-text-primary tracking-tight leading-snug">
            {props.title}
          </h3>
          {props.subtitle && (
            <p className="mt-1 text-sm font-semibold text-accent uppercase tracking-wider">
              {props.subtitle}
            </p>
          )}
        </div>
        <p className="text-[15px] text-text-secondary leading-[1.7]">{props.body}</p>
      </div>

      {/* Footer */}
      {props.showFooter && (
        <div className={cn(padCls, 'pt-0')}>
          <div className="pt-4 border-t border-border-light flex items-center justify-between">
            <a
              href={props.footerUrl || '#'}
              onClick={(e) => e.preventDefault()}
              className="text-accent text-sm font-semibold hover:underline underline-offset-2 transition-all duration-200"
            >
              {props.footerLabel}
            </a>
            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="#0071E3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
