import type { CanvasComponent, ComponentType } from '../types/schema'
import type {
  ButtonProps,
  NavbarProps,
  CardProps,
  InputProps,
  SectionProps,
  TextProps,
  BadgeProps,
  BottomNavProps,
} from '../types/schema'

// ─── Per-component HTML generators ───────────────────────────────────────────

function generateButton(props: ButtonProps): string {
  const height: Record<string, string> = { sm: '40px', md: '44px', lg: '52px' }
  const padding: Record<string, string> = { sm: '0 20px', md: '0 24px', lg: '0 32px' }
  const fsize: Record<string, string> = { sm: '14px', md: '15px', lg: '18px' }
  const radius: Record<string, string> = { sm: '12px', md: '20px', lg: '30px', full: '999px' }
  const bgColor: Record<string, string> = { primary: '#0071E3', secondary: '#F0F0F5', ghost: 'transparent', danger: '#FF3B30' }
  const fgColor: Record<string, string> = { primary: '#fff', secondary: '#1D1D1F', ghost: '#0071E3', danger: '#fff' }
  const border: Record<string, string> = { primary: 'none', secondary: 'none', ghost: '1px solid #D2D2D7', danger: 'none' }

  const w = props.fullWidth ? '100%' : 'auto'
  const da = props.disabled ? ' disabled' : ''
  const ds = props.disabled ? 'opacity:0.5;cursor:not-allowed;pointer-events:none;' : 'cursor:pointer;'

  return `<button style="display:inline-flex;align-items:center;justify-content:center;width:${w};height:${height[props.size]};padding:${padding[props.size]};font-size:${fsize[props.size]};font-weight:600;letter-spacing:-0.01em;background:${bgColor[props.variant]};color:${fgColor[props.variant]};border:${border[props.variant]};border-radius:${radius[props.rounded]};box-shadow:0 10px 30px rgba(0,0,0,0.08);transition:all 0.2s;${ds}"${da}>${props.label}</button>`
}

// Components that render full-bleed vs. inside a max-width container
const FULL_WIDTH_TYPES = new Set<string>(['navbar', 'section', 'divider', 'bottomnav'])

function wrapContained(html: string): string {
  return `<div style="width:100%;max-width:1200px;margin:0 auto;padding:16px 24px;">\n  ${html}\n</div>`
}

function generateNavbar(props: NavbarProps): string {
  const bg: Record<string, string> = {
    light: '#FFFFFF',
    dark: '#1D1D1F',
    blur: 'rgba(255,255,255,0.75)',
  }
  const borderColor: Record<string, string> = {
    light: '#E5E5EA',
    dark: 'rgba(255,255,255,0.1)',
    blur: 'rgba(255,255,255,0.3)',
  }
  const textColor = props.variant === 'dark' ? '#FFFFFF' : '#1D1D1F'
  const linkColor = props.variant === 'dark' ? 'rgba(255,255,255,0.7)' : '#6E6E73'
  const stickyStyle = props.sticky ? 'position:sticky;top:0;z-index:50;' : ''

  const links = props.links
    .map((l) => `      <a href="#" style="color:${linkColor};font-size:15px;font-weight:500;text-decoration:none;">${l}</a>`)
    .join('\n')

  const cta = props.showCta
    ? `<button style="height:40px;padding:0 20px;font-size:15px;font-weight:600;background:#0071E3;color:#fff;border:none;border-radius:12px;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,0.08);">${props.ctaLabel}</button>`
    : ''

  return `<nav style="${stickyStyle}width:100%;background:${bg[props.variant]};border-bottom:1px solid ${borderColor[props.variant]};box-shadow:0 10px 30px rgba(0,0,0,0.08);">
  <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 24px;height:64px;">
    <span style="color:${textColor};font-size:20px;font-weight:700;letter-spacing:-0.02em;">${props.brand}</span>
    <div style="display:flex;align-items:center;gap:28px;">
${links}
    </div>
    ${cta}
  </div>
</nav>`
}

function generateCard(props: CardProps): string {
  const bg: Record<string, string> = {
    default: '#FFFFFF',
    elevated: '#FFFFFF',
    outlined: '#FFFFFF',
    flat: '#F0F0F5',
  }
  const shadow: Record<string, string> = {
    default: '0 10px 30px rgba(0,0,0,0.08)',
    elevated: '0 20px 60px rgba(0,0,0,0.15)',
    outlined: 'none',
    flat: 'none',
  }
  const border: Record<string, string> = {
    default: '1px solid #E5E5EA',
    elevated: 'none',
    outlined: '2px solid #D2D2D7',
    flat: 'none',
  }
  const radius: Record<string, string> = { sm: '12px', md: '20px', lg: '30px' }

  const image = props.showImage
    ? `\n  <div style="height:208px;overflow:hidden;">\n    <img src="${props.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'}" alt="${props.title}" style="width:100%;height:100%;object-fit:cover;" />\n  </div>`
    : ''

  const subtitle = props.subtitle
    ? `\n      <p style="margin-top:4px;font-size:12px;font-weight:600;color:#0071E3;text-transform:uppercase;letter-spacing:0.06em;">${props.subtitle}</p>`
    : ''

  const footer = props.showFooter
    ? `\n  <div style="padding:0 28px 24px;">\n    <div style="padding-top:16px;border-top:1px solid #E5E5EA;">\n      <button style="color:#0071E3;font-size:14px;font-weight:600;background:none;border:none;cursor:pointer;">${props.footerLabel} \u2192</button>\n    </div>\n  </div>`
    : ''

  return `<div style="background:${bg[props.variant]};border:${border[props.variant]};border-radius:${radius[props.rounded]};box-shadow:${shadow[props.variant]};overflow:hidden;width:100%;">${image}
  <div style="padding:28px;">
    <div style="margin-bottom:12px;">
      <h3 style="font-size:20px;font-weight:600;color:#1D1D1F;letter-spacing:-0.02em;line-height:1.3;">${props.title}</h3>${subtitle}
    </div>
    <p style="font-size:15px;color:#6E6E73;line-height:1.7;">${props.body}</p>
  </div>${footer}
</div>`
}

function generateInput(props: InputProps): string {
  const h: Record<string, string> = { sm: '36px', md: '44px', lg: '52px' }
  const px: Record<string, string> = { sm: '14px', md: '16px', lg: '20px' }
  const fs: Record<string, string> = { sm: '14px', md: '15px', lg: '16px' }
  const lfs: Record<string, string> = { sm: '12px', md: '14px', lg: '16px' }

  const borderColor = props.error ? '#FF3B30' : '#D2D2D7'
  const inputBg = props.disabled ? '#F0F0F5' : '#FFFFFF'
  const requiredAttr = props.required ? ' required' : ''
  const disabledAttr = props.disabled ? ' disabled' : ''
  const opacity = props.disabled ? 'opacity:0.5;cursor:not-allowed;' : ''

  const helper = props.error
    ? `\n  <p style="color:#FF3B30;font-size:12px;margin-top:4px;">&#9888; ${props.errorMessage}</p>`
    : props.helperText
      ? `\n  <p style="color:#AEAEB2;font-size:12px;margin-top:4px;">${props.helperText}</p>`
      : ''

  return `<div style="display:flex;flex-direction:column;gap:6px;width:100%;">
  <label style="font-size:${lfs[props.size]};font-weight:600;color:#1D1D1F;">${props.label}${props.required ? ' <span style="color:#FF3B30">*</span>' : ''}</label>
  <input type="${props.type}" placeholder="${props.placeholder}" style="width:100%;height:${h[props.size]};padding:0 ${px[props.size]};font-size:${fs[props.size]};background:${inputBg};border:1px solid ${borderColor};border-radius:12px;outline:none;box-shadow:inset 0 2px 8px rgba(0,0,0,0.06);${opacity}"${requiredAttr}${disabledAttr} />${helper}
</div>`
}

function generateSection(props: SectionProps): string {
  const bgColor: Record<string, string> = {
    default: '#F5F5F7',
    alternate: '#FFFFFF',
    accent: '#EBF4FF',
  }
  const padding: Record<string, string> = {
    sm: '40px 24px', md: '64px 24px', lg: '80px 24px', xl: '112px 24px',
  }
  const maxW: Record<string, string> = {
    sm: '580px', md: '768px', lg: '960px', xl: '1200px', full: '100%',
  }
  const align = props.centered ? 'center' : 'left'
  const bar = props.centered
    ? `<div style="display:flex;justify-content:center;margin-bottom:16px;"><span style="display:inline-block;height:4px;width:48px;border-radius:99px;background:#0071E3;opacity:0.6;"></span></div>`
    : ''
  const subMax = props.centered ? 'max-width:640px;margin:0 auto;' : ''

  return `<section style="background:${bgColor[props.variant]};padding:${padding[props.paddingY]};width:100%;">
  <div style="max-width:${maxW[props.maxWidth]};margin:0 auto;text-align:${align};">
    ${bar}<h2 style="font-size:clamp(32px,4vw,48px);font-weight:700;color:#1D1D1F;letter-spacing:-0.02em;line-height:1.1;margin-bottom:20px;">${props.heading}</h2>
    <p style="font-size:17px;color:#6E6E73;line-height:1.75;${subMax}">${props.subheading}</p>
  </div>
</section>`
}

function generateText(props: TextProps): string {
  const tags: Record<string, string> = {
    h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', body: 'p', caption: 'p', label: 'span',
  }
  const styles: Record<string, string> = {
    h1: 'font-size:3rem;font-weight:700;letter-spacing:-0.02em;line-height:1.1;',
    h2: 'font-size:2.25rem;font-weight:700;letter-spacing:-0.015em;line-height:1.15;',
    h3: 'font-size:1.75rem;font-weight:600;letter-spacing:-0.01em;line-height:1.2;',
    h4: 'font-size:1.25rem;font-weight:600;letter-spacing:-0.01em;line-height:1.3;',
    body: 'font-size:1.0625rem;font-weight:400;line-height:1.75;',
    caption: 'font-size:0.875rem;font-weight:400;line-height:1.6;',
    label: 'font-size:0.6875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;',
  }
  const colors: Record<string, string> = {
    primary: '#1D1D1F', secondary: '#6E6E73', tertiary: '#AEAEB2', accent: '#0071E3',
  }
  const aligns: Record<string, string> = { left: 'left', center: 'center', right: 'right' }
  const tag = tags[props.variant]
  return `<${tag} style="${styles[props.variant]}color:${colors[props.color]};text-align:${aligns[props.align]};">${props.content}</${tag}>`
}

function generateBadge(props: BadgeProps): string {
  const bg: Record<string, string> = { default: '#F0F0F5', success: '#EDFBF2', warning: '#FEFCE8', danger: '#FFF0EE', info: '#EBF4FF' }
  const fg: Record<string, string> = { default: '#6E6E73', success: '#30D158', warning: '#A16207', danger: '#FF3B30', info: '#0071E3' }
  const h = props.size === 'sm' ? '20px' : '24px'
  const px = props.size === 'sm' ? '10px' : '12px'
  const fs = props.size === 'sm' ? '11px' : '12px'
  return `<span style="background:${bg[props.variant]};color:${fg[props.variant]};height:${h};padding:0 ${px};font-size:${fs};font-weight:600;border-radius:999px;display:inline-flex;align-items:center;line-height:1;">${props.label}</span>`
}

function generateDivider(): string {
  return `<div style="width:100%;padding:4px 0;"><hr style="border:none;border-top:1px solid #E5E5EA;" /></div>`
}

// Inline SVG icon paths (stroke-based, viewBox 0 0 24 24, matches Lucide icons)
const SVG_ICONS: Record<string, string> = {
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  bag: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  play: '<polygon points="5 3 19 12 5 21 5 3"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
}

function svgIcon(name: string, color: string, size = 22): string {
  const paths = SVG_ICONS[name] ?? SVG_ICONS['home']
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
}

function generateBottomNav(props: BottomNavProps): string {
  const bg: Record<string, string> = {
    light: '#FFFFFF',
    dark: '#1D1D1F',
    blur: 'rgba(255,255,255,0.85)',
  }
  const borderColor: Record<string, string> = {
    light: '#E5E5EA',
    dark: 'rgba(255,255,255,0.1)',
    blur: 'rgba(255,255,255,0.3)',
  }
  const inactiveColor = props.variant === 'dark' ? 'rgba(255,255,255,0.45)' : '#AEAEB2'
  const activeColor = props.variant === 'dark' ? '#FFFFFF' : '#0071E3'
  const dotColor = props.variant === 'dark' ? '#FFFFFF' : '#0071E3'

  const items = props.items
    .map((item, i) => {
      const isActive = i === props.activeIndex
      const color = isActive ? activeColor : inactiveColor
      const weight = isActive ? '600' : '500'
      const dot = isActive
        ? `<span style="display:block;width:4px;height:4px;border-radius:50%;background:${dotColor};margin:2px auto 0;"></span>`
        : ''
      const label = props.showLabels
        ? `<span style="font-size:11px;font-weight:${weight};color:${color};line-height:1;">${item.label}</span>`
        : ''
      return `    <button style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 12px;min-width:48px;border:none;background:none;cursor:pointer;">
      <div style="position:relative;display:flex;align-items:center;justify-content:center;">
        ${svgIcon(item.icon, color)}
        ${dot}
      </div>
      ${label}
    </button>`
    })
    .join('\n')

  return `<nav style="width:100%;background:${bg[props.variant]};border-top:1px solid ${borderColor[props.variant]};box-shadow:0 -10px 30px rgba(0,0,0,0.08);border-radius:24px 24px 0 0;position:sticky;bottom:0;z-index:50;">
  <div style="display:flex;align-items:center;justify-content:space-around;padding:4px 8px;">
${items}
  </div>
</nav>`
}

// ─── Main HTML Generator ───────────────────────────────────────────────────────

function generateComponentHTML(component: CanvasComponent): string {
  const { type, props } = component

  let html: string
  switch (type as ComponentType) {
    case 'button': html = generateButton(props as ButtonProps); break
    case 'navbar': html = generateNavbar(props as NavbarProps); break
    case 'card': html = generateCard(props as CardProps); break
    case 'input': html = generateInput(props as InputProps); break
    case 'section': html = generateSection(props as SectionProps); break
    case 'text': html = generateText(props as TextProps); break
    case 'badge': html = generateBadge(props as BadgeProps); break
    case 'divider': html = generateDivider(); break
    case 'bottomnav': html = generateBottomNav(props as BottomNavProps); break
    default: html = `<!-- Unknown component: ${type} -->`
  }

  return FULL_WIDTH_TYPES.has(type) ? html : wrapContained(html)
}

export function generateHTML(components: CanvasComponent[]): string {
  const body = components
    .map(generateComponentHTML)
    .join('\n\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MikeUI Export</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'] },
          colors: {
            background: '#F5F5F7',
            surface: { DEFAULT: '#FFFFFF', secondary: '#F0F0F5' },
            'text-primary': '#1D1D1F',
            'text-secondary': '#6E6E73',
            'text-tertiary': '#AEAEB2',
            border: { DEFAULT: '#D2D2D7', light: '#E5E5EA' },
            accent: { DEFAULT: '#0071E3', hover: '#0077ED', light: '#EBF4FF' },
            danger: { DEFAULT: '#FF3B30', light: '#FFF0EE' },
            success: { DEFAULT: '#30D158', light: '#EDFBF2' },
          },
          borderRadius: { sm: '12px', md: '20px', lg: '30px' },
          boxShadow: {
            soft: '0 10px 30px rgba(0,0,0,0.08)',
            'soft-md': '0 15px 40px rgba(0,0,0,0.12)',
            'soft-lg': '0 20px 60px rgba(0,0,0,0.15)',
            'inner-soft': 'inset 0 2px 8px rgba(0,0,0,0.06)',
          },
        },
      },
    }
  </script>
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
  </style>
</head>
<body class="bg-background min-h-screen">

${body}

</body>
</html>`
}
