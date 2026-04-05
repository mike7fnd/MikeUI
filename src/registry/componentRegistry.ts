import type {
  ComponentType,
  ComponentPropsMap,
  ButtonProps,
  NavbarProps,
  CardProps,
  InputProps,
  SectionProps,
  TextProps,
  BadgeProps,
  DividerProps,
  BottomNavProps,
} from '../types/schema'
import type { LucideIcon } from 'lucide-react'
import {
  Square,
  Navigation,
  CreditCard,
  TextCursor,
  Layout,
  Type,
  Tag,
  SeparatorHorizontal,
  LayoutGrid,
} from 'lucide-react'

// ─── Default Props ─────────────────────────────────────────────────────────────

export const defaultProps: ComponentPropsMap = {
  button: {
    label: 'Continue',
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    disabled: false,
    rounded: 'lg',
    shadow: 'sm',
    opacity: 100,
  } satisfies ButtonProps,

  navbar: {
    brand: 'MikeUI',
    links: ['Home', 'Features', 'Pricing', 'About'],
    variant: 'light',
    sticky: true,
    showCta: true,
    ctaLabel: 'Get Started',
    showSearch: false,
    borderBottom: true,
  } satisfies NavbarProps,

  card: {
    title: 'Card Title',
    subtitle: 'A concise subtitle',
    body: 'This is the card body. You can add any descriptive text here to give context to your content.',
    variant: 'default',
    showImage: false,
    imageUrl: '',
    imageAlt: '',
    imageHeight: 'md',
    imageObjectFit: 'cover',
    showFooter: true,
    footerLabel: 'Learn More',
    rounded: 'lg',
    padding: 'md',
    hoverEffect: true,
  } satisfies CardProps,

  input: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
    size: 'md',
    disabled: false,
    required: true,
    helperText: "We'll never share your email.",
    error: false,
    errorMessage: 'This field is required',
    borderRadius: 'md',
    readonly: false,
    autocomplete: 'off',
  } satisfies InputProps,

  section: {
    heading: 'Built for modern teams',
    subheading: 'Everything you need to design, build, and ship beautiful interfaces — all in one place.',
    variant: 'default',
    paddingY: 'lg',
    centered: true,
    maxWidth: 'lg',
    showCtaButton: false,
    ctaLabel: 'Get Started',
    ctaVariant: 'primary',
  } satisfies SectionProps,

  text: {
    content: 'Your text goes here',
    variant: 'body',
    align: 'left',
    color: 'primary',
    italic: false,
    underline: false,
    strikethrough: false,
  } satisfies TextProps,

  badge: {
    label: 'New',
    variant: 'info',
    size: 'md',
    dot: false,
    uppercase: false,
  } satisfies BadgeProps,

  divider: {
    label: '',
    orientation: 'horizontal',
    thickness: 1,
    lineStyle: 'solid',
    spacing: 'md',
  } satisfies DividerProps,

  bottomnav: {
    items: [
      { icon: 'home', label: 'Home' },
      { icon: 'search', label: 'Explore' },
      { icon: 'heart', label: 'Saved' },
      { icon: 'user', label: 'Profile' },
    ],
    activeIndex: 0,
    variant: 'light',
    showLabels: true,
  } satisfies BottomNavProps,
}

// ─── Registry Meta ─────────────────────────────────────────────────────────────

export interface ComponentMeta {
  type: ComponentType
  label: string
  description: string
  icon: LucideIcon
  category: 'layout' | 'navigation' | 'content' | 'form' | 'feedback'
}

export const componentRegistry: ComponentMeta[] = [
  {
    type: 'navbar',
    label: 'Navbar',
    description: 'Top navigation bar with brand + links',
    icon: Navigation,
    category: 'navigation',
  },
  {
    type: 'section',
    label: 'Section',
    description: 'Full-width page section container',
    icon: Layout,
    category: 'layout',
  },
  {
    type: 'card',
    label: 'Card',
    description: 'Elevated card with title, body and footer',
    icon: CreditCard,
    category: 'content',
  },
  {
    type: 'button',
    label: 'Button',
    description: 'Interactive button with variants',
    icon: Square,
    category: 'form',
  },
  {
    type: 'input',
    label: 'Input',
    description: 'Text input field with label and helper',
    icon: TextCursor,
    category: 'form',
  },
  {
    type: 'text',
    label: 'Text',
    description: 'Typographic text block',
    icon: Type,
    category: 'content',
  },
  {
    type: 'badge',
    label: 'Badge',
    description: 'Small status or label badge',
    icon: Tag,
    category: 'feedback',
  },
  {
    type: 'divider',
    label: 'Divider',
    description: 'Horizontal or vertical separator',
    icon: SeparatorHorizontal,
    category: 'layout',
  },
  {
    type: 'bottomnav',
    label: 'Bottom Nav',
    description: 'Mobile bottom navigation bar',
    icon: LayoutGrid,
    category: 'navigation',
  },
]

export const componentsByCategory = componentRegistry.reduce(
  (acc, comp) => {
    if (!acc[comp.category]) acc[comp.category] = []
    acc[comp.category].push(comp)
    return acc
  },
  {} as Record<string, ComponentMeta[]>
)
