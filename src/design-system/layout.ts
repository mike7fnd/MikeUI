/**
 * Layout System
 * Central source of truth for spacing, containers, and component layout behaviour.
 *
 * Two categories of canvas components:
 *   - "full-width"  (navbar, section, bottomnav, divider):
 *       span the full canvas width, no outer container
 *   - "contained"   (button, card, input, text, badge):
 *       wrapped in a centred max-width container with horizontal padding
 */

import type { ComponentType } from '../types/schema'

// ─── Component Layout Role ────────────────────────────────────────────────────

export type LayoutRole = 'full-width' | 'contained'

export const layoutRoleMap: Record<ComponentType, LayoutRole> = {
  navbar: 'full-width',
  section: 'full-width',
  divider: 'full-width',
  bottomnav: 'full-width',
  button: 'contained',
  card: 'contained',
  input: 'contained',
  text: 'contained',
  badge: 'contained',
}

// ─── Spacing scale (4px base) ─────────────────────────────────────────────────

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
} as const

// ─── Container sizes ──────────────────────────────────────────────────────────

export const containerMaxWidth = '1200px'

/**
 * Tailwind classes for the page-level centred container.
 * Applied to "contained" components and content regions.
 */
export const containerClasses = 'w-full max-w-[1200px] mx-auto px-6'

/**
 * Padding scale applied to the outer wrapper of a "contained" component row.
 * Gives vertical breathing room between consecutive inline components.
 */
export const containedRowPadding = 'py-3'

/**
 * Vertical gap between canvas items when they are full-width layout blocks.
 * (Sections/navbars typically have their own internal padding — no extra gap.)
 */
export const fullWidthRowGap = 'mt-0'

// ─── Responsive container padding (used in generated code) ───────────────────

export const responsiveContainerClasses =
  'w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12'

// ─── Viewport breakpoints ─────────────────────────────────────────────────────

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
} as const
