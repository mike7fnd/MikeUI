import React from 'react'
import { cn } from '../../utils/cn'
import type { NavbarProps } from '../../types/schema'
import { containerMaxWidth } from '../../design-system/layout'

const bgMap = {
  light: 'bg-white/95 backdrop-blur-sm',
  dark: 'bg-text-primary',
  blur: 'bg-white/70 backdrop-blur-xl',
}

export function NavbarComponent({ props }: { props: NavbarProps }) {
  const isDark = props.variant === 'dark'
  const textCls = isDark ? 'text-white' : 'text-text-primary'

  // Custom colour overrides via inline style
  const brandStyle: React.CSSProperties = props.customBrandColor ? { color: props.customBrandColor } : {}
  const linkStyle: React.CSSProperties = props.customLinkColor ? { color: props.customLinkColor } : {}
  const navStyle: React.CSSProperties = props.customBgColor ? { backgroundColor: props.customBgColor } : {}

  const linkBaseCls = cn(
    'text-[15px] font-medium transition-all duration-200 relative',
    'after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0',
    'after:transition-all after:duration-200',
    isDark ? 'text-white/70 hover:text-white after:bg-white hover:after:w-full'
      : 'text-text-secondary hover:text-text-primary after:bg-accent hover:after:w-full',
  )

  return (
    <nav
      aria-label={props.ariaLabel}
      className={cn(
        bgMap[props.variant],
        'w-full shadow-soft',
        props.sticky && 'sticky top-0 z-50',
        // borderBottom: default on, but can be toggled off
        props.borderBottom !== false && (
          isDark ? 'border-b border-white/10' : 'border-b border-border-light'
        ),
      )}
      style={navStyle}
    >
      <div
        className="mx-auto flex items-center justify-between px-6 h-16"
        style={{ maxWidth: containerMaxWidth }}
      >
        {/* Brand */}
        <span
          className={cn(textCls, 'text-xl font-bold tracking-tight select-none')}
          style={brandStyle}
        >
          {props.brand}
        </span>

        {/* Links */}
        <div className="hidden md:flex items-center gap-7">
          {props.links.map((link, i) => (
            <a
              key={i}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={linkBaseCls}
              style={linkStyle}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right side: optional search + CTA */}
        <div className="flex items-center gap-3">
          {props.showSearch && (
            <div className="relative hidden md:block">
              <input
                readOnly
                placeholder="Search…"
                className={cn(
                  'h-9 pl-9 pr-4 text-sm rounded-lg outline-none border transition-all duration-200',
                  isDark
                    ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20'
                    : 'bg-surface-secondary border-border text-text-primary placeholder-text-tertiary focus:border-accent',
                )}
              />
              <svg className="absolute left-2.5 top-2.5 opacity-40" width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          )}
          {props.showCta && (
            <button
              className={cn(
                'h-10 px-5 text-[15px] font-semibold rounded-lg transition-all duration-200',
                'bg-accent text-white hover:bg-accent-hover shadow-soft hover:shadow-soft-md hover:scale-[1.02]',
              )}
            >
              {props.ctaLabel}
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
