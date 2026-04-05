/**
 * Design System Tokens
 * Single source of truth for all design values.
 * These mirror the Tailwind config and are used for code generation.
 */

export const tokens = {
  colors: {
    background: '#F5F5F7',
    surface: '#FFFFFF',
    surfaceSecondary: '#F0F0F5',
    textPrimary: '#1D1D1F',
    textSecondary: '#6E6E73',
    textTertiary: '#AEAEB2',
    border: '#D2D2D7',
    borderLight: '#E5E5EA',
    accent: '#0071E3',
    accentHover: '#0077ED',
    accentLight: '#EBF4FF',
    danger: '#FF3B30',
    dangerLight: '#FFF0EE',
    success: '#30D158',
    successLight: '#EDFBF2',
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
    8: '32px',
    12: '48px',
    16: '64px',
  },
  borderRadius: {
    none: '0px',
    sm: '12px',
    md: '20px',
    lg: '30px',
    xl: '40px',
    full: '9999px',
  },
  shadows: {
    soft: '0 10px 30px rgba(0,0,0,0.08)',
    softMd: '0 15px 40px rgba(0,0,0,0.12)',
    softLg: '0 20px 60px rgba(0,0,0,0.15)',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSizes: {
      xs: '11px',
      sm: '13px',
      base: '15px',
      lg: '17px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
    },
    fontWeights: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  animation: {
    durationFast: '150ms',
    durationBase: '200ms',
    durationSlow: '250ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const

export type ColorToken = keyof typeof tokens.colors
export type SpacingToken = keyof typeof tokens.spacing
export type RadiusToken = keyof typeof tokens.borderRadius
export type ShadowToken = keyof typeof tokens.shadows
