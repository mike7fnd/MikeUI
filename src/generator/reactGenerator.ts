import type { CanvasComponent, ComponentType } from '../types/schema'
import type {
  ButtonProps,
  NavbarProps,
  CardProps,
  InputProps,
  SectionProps,
  TextProps,
  BadgeProps,
} from '../types/schema'

// ─── Per-component React generators ──────────────────────────────────────────

function generateButtonComponent(): string {
  return `import { type FC } from 'react'

interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  onClick?: () => void
}

const variantClasses = {
  primary: 'bg-[#0071E3] text-white hover:bg-[#0077ED]',
  secondary: 'bg-[#F0F0F5] text-[#1D1D1F] hover:bg-[#E5E5EA]',
  ghost: 'bg-transparent text-[#0071E3] hover:bg-[#EBF4FF] border border-[#D2D2D7]',
  danger: 'bg-[#FF3B30] text-white hover:opacity-90',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-8 py-4 text-[17px]',
}

const roundedClasses = {
  sm: 'rounded-[12px]',
  md: 'rounded-[20px]',
  lg: 'rounded-[30px]',
  full: 'rounded-full',
}

const Button: FC<ButtonProps> = ({
  label = 'Continue',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  rounded = 'lg',
  onClick,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={\`\${fullWidth ? 'w-full' : 'inline-flex'} items-center justify-center font-medium
      shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-200
      \${variantClasses[variant]} \${sizeClasses[size]} \${roundedClasses[rounded]}
      \${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}\`}
  >
    {label}
  </button>
)

export default Button`
}

function generateNavbarComponent(): string {
  return `import { type FC } from 'react'

interface NavbarProps {
  brand?: string
  links?: string[]
  variant?: 'light' | 'dark' | 'blur'
  sticky?: boolean
  showCta?: boolean
  ctaLabel?: string
}

const Navbar: FC<NavbarProps> = ({
  brand = 'MikeUI',
  links = ['Home', 'Features', 'Pricing'],
  variant = 'light',
  sticky = true,
  showCta = true,
  ctaLabel = 'Get Started',
}) => {
  const bgClass = {
    light: 'bg-white',
    dark: 'bg-[#1D1D1F]',
    blur: 'bg-white/80 backdrop-blur-xl',
  }[variant]

  const textClass = variant === 'dark' ? 'text-white' : 'text-[#1D1D1F]'
  const linkClass = variant === 'dark' ? 'text-white/80 hover:text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'

  return (
    <nav className={\`\${bgClass} \${sticky ? 'sticky top-0 z-50' : ''} shadow-[0_10px_30px_rgba(0,0,0,0.08)] px-6 py-4\`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className={\`\${textClass} text-[20px] font-semibold tracking-tight\`}>{brand}</span>
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a key={link} href="#" className={\`\${linkClass} text-[13px] font-medium transition-colors duration-200\`}>
              {link}
            </a>
          ))}
        </div>
        {showCta && (
          <button className="ml-4 px-5 py-2 bg-[#0071E3] text-white text-[13px] font-medium rounded-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:bg-[#0077ED] transition-all duration-200">
            {ctaLabel}
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar`
}

function generateCardComponent(): string {
  return `import { type FC } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  body?: string
  variant?: 'default' | 'elevated' | 'outlined' | 'flat'
  showImage?: boolean
  imageUrl?: string
  showFooter?: boolean
  footerLabel?: string
  rounded?: 'sm' | 'md' | 'lg'
}

const variantClasses = {
  default: 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]',
  elevated: 'bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]',
  outlined: 'bg-white border border-[#D2D2D7]',
  flat: 'bg-[#F0F0F5]',
}

const roundedClasses = {
  sm: 'rounded-[12px]',
  md: 'rounded-[20px]',
  lg: 'rounded-[30px]',
}

const Card: FC<CardProps> = ({
  title = 'Card Title',
  subtitle = 'A concise subtitle',
  body = 'Your card body text here.',
  variant = 'default',
  showImage = false,
  imageUrl = '',
  showFooter = true,
  footerLabel = 'Learn More',
  rounded = 'lg',
}) => (
  <div className={\`\${variantClasses[variant]} \${roundedClasses[rounded]} p-6 transition-all duration-200 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]\`}>
    {showImage && (
      <div className={\`h-48 bg-[#F0F0F5] \${roundedClasses[rounded]} overflow-hidden mb-4\`}>
        <img src={imageUrl || 'https://via.placeholder.com/600x300'} alt={title} className="w-full h-full object-cover" />
      </div>
    )}
    <div className="space-y-2">
      <h3 className="text-[20px] font-semibold text-[#1D1D1F] tracking-tight">{title}</h3>
      <p className="text-[13px] font-medium text-[#0071E3]">{subtitle}</p>
      <p className="text-[#6E6E73] text-[15px] leading-relaxed">{body}</p>
    </div>
    {showFooter && (
      <div className="pt-4 mt-4 border-t border-[#E5E5EA]">
        <button className="text-[#0071E3] text-[13px] font-medium hover:underline">{footerLabel}</button>
      </div>
    )}
  </div>
)

export default Card`
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

function getComponentSource(type: ComponentType): string {
  switch (type) {
    case 'button': return generateButtonComponent()
    case 'navbar': return generateNavbarComponent()
    case 'card': return generateCardComponent()
    default: return `// Component "${type}" — add your implementation here`
  }
}

function propsToJSX(props: Record<string, unknown>): string {
  return Object.entries(props)
    .map(([key, value]) => {
      if (typeof value === 'string') return `  ${key}="${value}"`
      if (typeof value === 'boolean') return value ? `  ${key}` : `  ${key}={false}`
      if (Array.isArray(value)) return `  ${key}={${JSON.stringify(value)}}`
      return `  ${key}={${JSON.stringify(value)}}`
    })
    .join('\n')
}

function componentNameFromType(type: ComponentType): string {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

export function generateReact(components: CanvasComponent[]): string {
  if (components.length === 0) {
    return `// No components added yet.\n// Start building by dragging components onto the canvas!`
  }

  const imports = [...new Set(components.map((c) => c.type))]
    .map((type) => `import ${componentNameFromType(type)} from './${componentNameFromType(type)}'`)
    .join('\n')

  const jsx = components
    .map((c) => {
      const name = componentNameFromType(c.type)
      const propsStr = propsToJSX(c.props as unknown as Record<string, unknown>)
      return `<${name}\n${propsStr}\n/>`
    })
    .join('\n\n')

  return `import React from 'react'
${imports}

// Generated by MikeUI — https://mikeui.app

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans">
      ${jsx.split('\n').join('\n      ')}
    </div>
  )
}
`
}

export function generateComponentFile(type: ComponentType): string {
  return getComponentSource(type)
}

// Props type needed for generic serialization
export type { ButtonProps, NavbarProps, CardProps, InputProps, SectionProps, TextProps, BadgeProps }
