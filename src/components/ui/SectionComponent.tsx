import React from 'react'
import { cn } from '../../utils/cn'
import type { SectionProps } from '../../types/schema'

const bgMap = {
  default: 'bg-background',
  alternate: 'bg-white',
  accent: 'bg-accent-light',
}

const paddingMap = {
  sm: 'py-10',
  md: 'py-16',
  lg: 'py-20',
  xl: 'py-28',
}

const maxWidthMap = {
  sm: '580px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  full: '100%',
}

const ctaVariantMap = {
  primary: 'bg-accent text-white hover:bg-accent-hover shadow-soft',
  secondary: 'bg-surface-secondary text-text-primary border border-border-light hover:bg-border-light',
  ghost: 'bg-transparent text-accent border border-accent/30 hover:bg-accent-light',
}

export function SectionComponent({ props }: { props: SectionProps }) {
  const sectionStyle: React.CSSProperties = {}
  if (props.customBgColor) sectionStyle.backgroundColor = props.customBgColor
  if (props.minHeight) sectionStyle.minHeight = props.minHeight

  return (
    <section
      aria-label={props.ariaLabel}
      className={cn(
        !props.customBgColor && bgMap[props.variant],
        paddingMap[props.paddingY],
        'w-full px-6',
      )}
      style={Object.keys(sectionStyle).length ? sectionStyle : undefined}
    >
      <div
        className={cn('mx-auto w-full', props.centered && 'text-center')}
        style={{ maxWidth: maxWidthMap[props.maxWidth] }}
      >
        {/* Eyebrow */}
        {props.eyebrow ? (
          <p className={cn(
            'text-accent text-[0.8125rem] font-semibold uppercase tracking-widest mb-3',
            props.centered && 'text-center',
          )}>
            {props.eyebrow}
          </p>
        ) : props.centered && (
          <div className="mb-4 flex justify-center">
            <span className="inline-block h-1 w-12 rounded-full bg-accent opacity-60" />
          </div>
        )}

        {/* Heading */}
        <h2 className={cn(
          'text-text-primary font-bold tracking-tight leading-[1.15]',
          'text-[2rem] sm:text-[2.5rem] lg:text-[3rem]',
          'mb-5',
        )}>
          {props.heading}
        </h2>

        {/* Subheading */}
        <p className={cn(
          'text-text-secondary text-[1.0625rem] leading-[1.75] max-w-2xl',
          props.centered && 'mx-auto',
        )}>
          {props.subheading}
        </p>

        {/* CTA Button */}
        {props.showCtaButton && props.ctaLabel && (
          <div className={cn('mt-8', props.centered && 'flex justify-center')}>
            <button
              className={cn(
                'h-11 px-7 text-[15px] font-semibold rounded-lg',
                'transition-all duration-200 hover:scale-[1.02] hover:shadow-soft-md',
                ctaVariantMap[props.ctaVariant ?? 'primary'],
              )}
            >
              {props.ctaLabel}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
