/**
 * Component Schema Types
 * Defines the data model for every component in the builder.
 */

// ─── Variant & Size Enums ────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type InputType = 'text' | 'email' | 'password' | 'number' | 'search'
export type InputSize = 'sm' | 'md' | 'lg'
export type NavbarVariant = 'light' | 'dark' | 'blur'
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat'
export type SectionVariant = 'default' | 'alternate' | 'accent'
export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label'
export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'

// ─── Component Props ─────────────────────────────────────────────────────────

export interface ButtonProps {
  label: string
  variant: ButtonVariant
  size: ButtonSize
  fullWidth: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  disabled: boolean
  rounded: 'sm' | 'md' | 'lg' | 'full'
  href?: string
  // Style overrides
  customBgColor?: string
  customTextColor?: string
  customBorderColor?: string
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  opacity?: number
  // Accessibility
  ariaLabel?: string
  title?: string
}

export interface NavbarProps {
  brand: string
  links: string[]
  variant: NavbarVariant
  sticky: boolean
  showCta: boolean
  ctaLabel: string
  showSearch?: boolean
  showBrandLogo?: boolean
  customBgColor?: string
  customBrandColor?: string
  customLinkColor?: string
  borderBottom?: boolean
  ariaLabel?: string
}

export interface CardProps {
  title: string
  subtitle: string
  body: string
  variant: CardVariant
  showImage: boolean
  imageUrl: string
  imageAlt?: string
  imageHeight?: 'sm' | 'md' | 'lg' | 'xl'
  imageObjectFit?: 'cover' | 'contain' | 'fill'
  showFooter: boolean
  footerLabel: string
  footerUrl?: string
  rounded: 'sm' | 'md' | 'lg'
  customBgColor?: string
  padding?: 'sm' | 'md' | 'lg'
  hoverEffect?: boolean
  ariaLabel?: string
}

export interface InputProps {
  label: string
  placeholder: string
  type: InputType
  size: InputSize
  disabled: boolean
  required: boolean
  helperText: string
  error: boolean
  errorMessage: string
  borderRadius?: 'sm' | 'md' | 'lg'
  autocomplete?: string
  maxLength?: number
  readonly?: boolean
  prefix?: string
  suffix?: string
  ariaLabel?: string
  ariaDescribedBy?: string
}

export interface SectionProps {
  heading: string
  subheading: string
  variant: SectionVariant
  paddingY: 'sm' | 'md' | 'lg' | 'xl'
  centered: boolean
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  customBgColor?: string
  minHeight?: 'auto' | 'sm' | 'md' | 'lg' | 'screen'
  showCtaButton?: boolean
  ctaLabel?: string
  ctaVariant?: 'primary' | 'secondary' | 'ghost'
  eyebrow?: string
  ariaLabel?: string
}

export interface TextProps {
  content: string
  variant: TextVariant
  align: 'left' | 'center' | 'right'
  color: 'primary' | 'secondary' | 'tertiary' | 'accent'
  customColor?: string
  fontWeight?: '300' | '400' | '500' | '600' | '700' | '800'
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose'
  letterSpacing?: 'tight' | 'normal' | 'wide' | 'wider'
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'prose'
}

export interface BadgeProps {
  label: string
  variant: BadgeVariant
  size: 'sm' | 'md'
  dot?: boolean
  uppercase?: boolean
  customBgColor?: string
  customTextColor?: string
  ariaLabel?: string
}

export interface DividerProps {
  label?: string
  orientation: 'horizontal' | 'vertical'
  thickness?: 1 | 2 | 4
  lineStyle?: 'solid' | 'dashed' | 'dotted'
  color?: string
  spacing?: 'sm' | 'md' | 'lg'
}

export interface BottomNavItem {
  icon: string
  label: string
}

export interface BottomNavProps {
  items: BottomNavItem[]
  activeIndex: number
  variant: 'light' | 'dark' | 'blur'
  showLabels: boolean
}

// ─── Component Type Map ───────────────────────────────────────────────────────

export type ComponentType =
  | 'button'
  | 'navbar'
  | 'card'
  | 'input'
  | 'section'
  | 'text'
  | 'badge'
  | 'divider'
  | 'bottomnav'

export type ComponentPropsMap = {
  button: ButtonProps
  navbar: NavbarProps
  card: CardProps
  input: InputProps
  section: SectionProps
  text: TextProps
  badge: BadgeProps
  divider: DividerProps
  bottomnav: BottomNavProps
}

// ─── Template Schema ──────────────────────────────────────────────────────────

export type TemplateCategory =
  | 'landing'
  | 'dashboard'
  | 'ecommerce'
  | 'mobile'
  | 'portfolio'

export interface TemplateBreakpoints {
  desktop: CanvasComponent[]
  tablet: CanvasComponent[]
  mobile: CanvasComponent[]
}

export interface TemplateDefinition {
  id: string
  name: string
  description: string
  category: TemplateCategory
  tags: string[]
  accentColor: string
  layout: TemplateBreakpoints
}

// ─── Canvas Component Node ────────────────────────────────────────────────────

export interface CanvasComponent<T extends ComponentType = ComponentType> {
  id: string
  type: T
  props: ComponentPropsMap[T]
  children?: CanvasComponent[]
  parentId?: string
  order: number
}

// ─── Schema Root ─────────────────────────────────────────────────────────────

export interface ProjectSchema {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  canvas: CanvasComponent[]
  viewport: 'mobile' | 'tablet' | 'desktop'
}
