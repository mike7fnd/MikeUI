import type { TemplateDefinition, CanvasComponent } from '../types/schema'

// ─── Helper to re-tag IDs per breakpoint ─────────────────────────────────────
function withIds(prefix: string, comps: Omit<CanvasComponent, 'id'>[]): CanvasComponent[] {
  return comps.map((c, i) => ({ ...c, id: `${prefix}-${i}` } as CanvasComponent))
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. LANDING PAGE
// ═══════════════════════════════════════════════════════════════════════════════

const landingDesktop: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'navbar',
    order: 0,
    props: {
      brand: 'Lumina',
      links: ['Product', 'Pricing', 'Blog', 'Company'],
      variant: 'light',
      sticky: true,
      showCta: true,
      ctaLabel: 'Start Free Trial',
    },
  },
  {
    type: 'section',
    order: 1,
    props: {
      heading: 'Design smarter. Ship faster.',
      subheading:
        'Lumina gives your team the tools to build stunning interfaces without writing a single line of CSS. Go from idea to production in hours.',
      variant: 'default',
      paddingY: 'xl',
      centered: true,
      maxWidth: 'lg',
    },
  },
  {
    type: 'badge',
    order: 2,
    props: { label: '✦ Trusted by 10,000+ teams worldwide', variant: 'info', size: 'md' },
  },
  {
    type: 'button',
    order: 3,
    props: {
      label: 'Get Started — It\'s Free',
      variant: 'primary',
      size: 'lg',
      fullWidth: false,
      disabled: false,
      rounded: 'lg',
    },
  },
  {
    type: 'divider',
    order: 4,
    props: { label: '', orientation: 'horizontal' },
  },
  {
    type: 'text',
    order: 5,
    props: {
      content: 'Everything your team needs',
      variant: 'h2',
      align: 'center',
      color: 'primary',
    },
  },
  {
    type: 'card',
    order: 6,
    props: {
      title: 'Drag & Drop Builder',
      subtitle: 'Visual editing',
      body: 'Assemble pages with an intuitive drag-and-drop canvas. No code required — just creativity.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 7,
    props: {
      title: 'Real-Time Preview',
      subtitle: 'Instant feedback',
      body: 'See exactly how your design renders on every device. Switch breakpoints with one click.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 8,
    props: {
      title: 'Export Clean Code',
      subtitle: 'Production-ready',
      body: 'Generate semantic HTML and React components that follow best practices and design tokens.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'section',
    order: 9,
    props: {
      heading: 'Ready to build something beautiful?',
      subheading: 'Join thousands of designers and developers who ship faster with Lumina.',
      variant: 'accent',
      paddingY: 'lg',
      centered: true,
      maxWidth: 'md',
    },
  },
  {
    type: 'button',
    order: 10,
    props: {
      label: 'Start Building Now',
      variant: 'primary',
      size: 'lg',
      fullWidth: false,
      disabled: false,
      rounded: 'full',
    },
  },
]

const landingTablet: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'navbar',
    order: 0,
    props: {
      brand: 'Lumina',
      links: ['Product', 'Pricing', 'Blog'],
      variant: 'light',
      sticky: true,
      showCta: true,
      ctaLabel: 'Try Free',
    },
  },
  {
    type: 'section',
    order: 1,
    props: {
      heading: 'Design smarter. Ship faster.',
      subheading:
        'Lumina gives your team the tools to build stunning interfaces without writing a single line of CSS.',
      variant: 'default',
      paddingY: 'lg',
      centered: true,
      maxWidth: 'md',
    },
  },
  {
    type: 'button',
    order: 2,
    props: {
      label: 'Get Started Free',
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      disabled: false,
      rounded: 'lg',
    },
  },
  {
    type: 'divider',
    order: 3,
    props: { label: '', orientation: 'horizontal' },
  },
  {
    type: 'card',
    order: 4,
    props: {
      title: 'Visual Builder',
      subtitle: 'No code required',
      body: 'Assemble pages using an intuitive drag-and-drop canvas.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 5,
    props: {
      title: 'Live Preview',
      subtitle: 'Instant feedback',
      body: 'See how your design renders across every breakpoint.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'section',
    order: 6,
    props: {
      heading: 'Start building today',
      subheading: 'Free trial, no credit card required.',
      variant: 'accent',
      paddingY: 'md',
      centered: true,
      maxWidth: 'sm',
    },
  },
]

const landingMobile: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'section',
    order: 0,
    props: {
      heading: 'Design smarter.',
      subheading: 'Build stunning interfaces without writing a single line of CSS.',
      variant: 'default',
      paddingY: 'lg',
      centered: true,
      maxWidth: 'full',
    },
  },
  {
    type: 'badge',
    order: 1,
    props: { label: '✦ 10,000+ teams', variant: 'info', size: 'sm' },
  },
  {
    type: 'button',
    order: 2,
    props: {
      label: 'Get Started Free',
      variant: 'primary',
      size: 'md',
      fullWidth: true,
      disabled: false,
      rounded: 'lg',
    },
  },
  {
    type: 'button',
    order: 3,
    props: {
      label: 'Watch Demo',
      variant: 'ghost',
      size: 'md',
      fullWidth: true,
      disabled: false,
      rounded: 'lg',
    },
  },
  {
    type: 'divider',
    order: 4,
    props: { label: '', orientation: 'horizontal' },
  },
  {
    type: 'card',
    order: 5,
    props: {
      title: 'Visual Builder',
      subtitle: 'No code required',
      body: 'Assemble pages with drag-and-drop.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 6,
    props: {
      title: 'Export Code',
      subtitle: 'Production-ready',
      body: 'Generate clean HTML and React code instantly.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'bottomnav',
    order: 7,
    props: {
      items: [
        { icon: 'home', label: 'Home' },
        { icon: 'search', label: 'Features' },
        { icon: 'star', label: 'Pricing' },
        { icon: 'user', label: 'Login' },
      ],
      activeIndex: 0,
      variant: 'light',
      showLabels: true,
    },
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// 2. DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

const dashboardDesktop: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'navbar',
    order: 0,
    props: {
      brand: 'Pulse',
      links: ['Overview', 'Analytics', 'Reports', 'Settings'],
      variant: 'light',
      sticky: true,
      showCta: false,
      ctaLabel: '',
    },
  },
  {
    type: 'section',
    order: 1,
    props: {
      heading: 'Good morning, Alex 👋',
      subheading: 'Here\'s what\'s happening with your business today.',
      variant: 'default',
      paddingY: 'md',
      centered: false,
      maxWidth: 'full',
    },
  },
  {
    type: 'card',
    order: 2,
    props: {
      title: '$48,295',
      subtitle: 'Total Revenue',
      body: '+12.5% from last month. Consistent growth across all product lines.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 3,
    props: {
      title: '3,842',
      subtitle: 'Active Users',
      body: '+8.1% week-over-week. Highest engagement on Tuesdays.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 4,
    props: {
      title: '94.3%',
      subtitle: 'Customer Satisfaction',
      body: 'Up 2.4 points. Support response time improved by 18%.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 5,
    props: {
      title: '1,247',
      subtitle: 'New Orders',
      body: 'This week. 94% fulfillment rate. Average order value: $38.70.',
      variant: 'elevated',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'divider',
    order: 6,
    props: { label: '', orientation: 'horizontal' },
  },
  {
    type: 'text',
    order: 7,
    props: {
      content: 'Recent Activity',
      variant: 'h3',
      align: 'left',
      color: 'primary',
    },
  },
  {
    type: 'card',
    order: 8,
    props: {
      title: 'Transaction Overview',
      subtitle: 'Last 30 days',
      body: 'Your top-performing products are Premium Plan (+34%), Analytics Suite (+28%), and Team Licenses (+19%). International markets now account for 31% of total revenue.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: true,
      footerLabel: 'View Full Report →',
      rounded: 'lg',
    },
  },
  {
    type: 'badge',
    order: 9,
    props: { label: '● Live — Updated 2 min ago', variant: 'success', size: 'sm' },
  },
]

const dashboardTablet: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'navbar',
    order: 0,
    props: {
      brand: 'Pulse',
      links: ['Overview', 'Analytics', 'Settings'],
      variant: 'light',
      sticky: true,
      showCta: false,
      ctaLabel: '',
    },
  },
  {
    type: 'section',
    order: 1,
    props: {
      heading: 'Dashboard',
      subheading: 'Your business at a glance.',
      variant: 'default',
      paddingY: 'sm',
      centered: false,
      maxWidth: 'full',
    },
  },
  {
    type: 'card',
    order: 2,
    props: {
      title: '$48,295',
      subtitle: 'Total Revenue',
      body: '+12.5% from last month.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 3,
    props: {
      title: '3,842',
      subtitle: 'Active Users',
      body: '+8.1% week-over-week.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 4,
    props: {
      title: 'Transaction Overview',
      subtitle: 'Last 30 days',
      body: 'Premium Plan, Analytics Suite, and Team Licenses are your top performers this month.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: true,
      footerLabel: 'View Report →',
      rounded: 'lg',
    },
  },
]

const dashboardMobile: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'section',
    order: 0,
    props: {
      heading: 'Dashboard',
      subheading: 'Good morning, Alex 👋',
      variant: 'default',
      paddingY: 'sm',
      centered: false,
      maxWidth: 'full',
    },
  },
  {
    type: 'badge',
    order: 1,
    props: { label: '● Live', variant: 'success', size: 'sm' },
  },
  {
    type: 'card',
    order: 2,
    props: {
      title: '$48,295',
      subtitle: 'Total Revenue',
      body: '+12.5% from last month.',
      variant: 'elevated',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 3,
    props: {
      title: '3,842',
      subtitle: 'Active Users',
      body: '+8.1% week-over-week.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 4,
    props: {
      title: '94.3%',
      subtitle: 'Customer Satisfaction',
      body: 'Support response time improved by 18%.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'bottomnav',
    order: 5,
    props: {
      items: [
        { icon: 'home', label: 'Overview' },
        { icon: 'chart', label: 'Analytics' },
        { icon: 'bell', label: 'Alerts' },
        { icon: 'settings', label: 'Settings' },
      ],
      activeIndex: 0,
      variant: 'light',
      showLabels: true,
    },
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// 3. E-COMMERCE STORE
// ═══════════════════════════════════════════════════════════════════════════════

const ecomDesktop: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'navbar',
    order: 0,
    props: {
      brand: 'Maison',
      links: ['New In', 'Women', 'Men', 'Accessories', 'Sale'],
      variant: 'light',
      sticky: true,
      showCta: true,
      ctaLabel: 'Cart (0)',
    },
  },
  {
    type: 'section',
    order: 1,
    props: {
      heading: 'New Season. New You.',
      subheading:
        'Discover our curated edit of minimalist essentials — designed to elevate your everyday.',
      variant: 'alternate',
      paddingY: 'xl',
      centered: true,
      maxWidth: 'lg',
    },
  },
  {
    type: 'badge',
    order: 2,
    props: { label: 'Free shipping on orders over $75', variant: 'success', size: 'md' },
  },
  {
    type: 'text',
    order: 3,
    props: {
      content: 'Featured Collection',
      variant: 'h2',
      align: 'center',
      color: 'primary',
    },
  },
  {
    type: 'card',
    order: 4,
    props: {
      title: 'Linen Relaxed Shirt',
      subtitle: '$89 — Available in 6 colors',
      body: 'Breathable European linen with a relaxed fit. Perfect for warm-weather dressing.',
      variant: 'default',
      showImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
      showFooter: true,
      footerLabel: 'Add to Cart',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 5,
    props: {
      title: 'Merino Crewneck',
      subtitle: '$145 — Sizes XS–XXL',
      body: 'Superfine 18.5-micron merino. Naturally temperature-regulating and ultra-soft.',
      variant: 'default',
      showImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
      showFooter: true,
      footerLabel: 'Add to Cart',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 6,
    props: {
      title: 'Cotton Trench Coat',
      subtitle: '$295 — Limited Stock',
      body: 'Classic trench silhouette with a modern cropped cut. Stone cotton-blend fabric.',
      variant: 'elevated',
      showImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
      showFooter: true,
      footerLabel: 'Add to Cart',
      rounded: 'lg',
    },
  },
  {
    type: 'divider',
    order: 7,
    props: { label: '', orientation: 'horizontal' },
  },
  {
    type: 'button',
    order: 8,
    props: {
      label: 'View All Products',
      variant: 'secondary',
      size: 'lg',
      fullWidth: false,
      disabled: false,
      rounded: 'lg',
    },
  },
  {
    type: 'section',
    order: 9,
    props: {
      heading: 'Crafted with intention',
      subheading:
        'Every piece in the Maison collection is made from sustainably sourced materials, with longevity in mind over trends.',
      variant: 'default',
      paddingY: 'lg',
      centered: true,
      maxWidth: 'md',
    },
  },
]

const ecomTablet: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'navbar',
    order: 0,
    props: {
      brand: 'Maison',
      links: ['New In', 'Women', 'Men', 'Sale'],
      variant: 'light',
      sticky: true,
      showCta: true,
      ctaLabel: 'Cart',
    },
  },
  {
    type: 'section',
    order: 1,
    props: {
      heading: 'New Season.',
      subheading: 'Curated minimalist essentials for your everyday.',
      variant: 'alternate',
      paddingY: 'lg',
      centered: true,
      maxWidth: 'md',
    },
  },
  {
    type: 'card',
    order: 2,
    props: {
      title: 'Linen Relaxed Shirt',
      subtitle: '$89',
      body: 'Breathable European linen with a relaxed fit.',
      variant: 'default',
      showImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
      showFooter: true,
      footerLabel: 'Add to Cart',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 3,
    props: {
      title: 'Merino Crewneck',
      subtitle: '$145',
      body: 'Superfine 18.5-micron merino. Warm and ultra-soft.',
      variant: 'default',
      showImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
      showFooter: true,
      footerLabel: 'Add to Cart',
      rounded: 'lg',
    },
  },
  {
    type: 'button',
    order: 4,
    props: {
      label: 'Shop All',
      variant: 'secondary',
      size: 'md',
      fullWidth: false,
      disabled: false,
      rounded: 'lg',
    },
  },
]

const ecomMobile: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'section',
    order: 0,
    props: {
      heading: 'New Season.',
      subheading: 'Minimalist essentials for your everyday.',
      variant: 'alternate',
      paddingY: 'md',
      centered: true,
      maxWidth: 'full',
    },
  },
  {
    type: 'badge',
    order: 1,
    props: { label: 'Free shipping over $75', variant: 'success', size: 'sm' },
  },
  {
    type: 'card',
    order: 2,
    props: {
      title: 'Linen Relaxed Shirt',
      subtitle: '$89',
      body: 'Breathable European linen. Perfect for warm weather.',
      variant: 'default',
      showImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
      showFooter: true,
      footerLabel: 'Add to Cart',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 3,
    props: {
      title: 'Merino Crewneck',
      subtitle: '$145',
      body: 'Superfine merino. Naturally temperature-regulating.',
      variant: 'default',
      showImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
      showFooter: true,
      footerLabel: 'Add to Cart',
      rounded: 'lg',
    },
  },
  {
    type: 'bottomnav',
    order: 4,
    props: {
      items: [
        { icon: 'home', label: 'Home' },
        { icon: 'search', label: 'Browse' },
        { icon: 'heart', label: 'Wishlist' },
        { icon: 'bag', label: 'Cart' },
        { icon: 'user', label: 'Account' },
      ],
      activeIndex: 0,
      variant: 'light',
      showLabels: true,
    },
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// 4. MOBILE APP UI
// ═══════════════════════════════════════════════════════════════════════════════

const mobileAppDesktop: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'navbar',
    order: 0,
    props: {
      brand: 'Aura',
      links: ['Features', 'Pricing', 'Download'],
      variant: 'dark',
      sticky: true,
      showCta: true,
      ctaLabel: 'Download App',
    },
  },
  {
    type: 'section',
    order: 1,
    props: {
      heading: 'Your mind, organized.',
      subheading:
        'Aura is a beautifully designed focus app that helps you build habits, manage your day, and stay in flow.',
      variant: 'default',
      paddingY: 'xl',
      centered: true,
      maxWidth: 'lg',
    },
  },
  {
    type: 'badge',
    order: 2,
    props: { label: '★ 4.9 on App Store · 50k+ reviews', variant: 'default', size: 'md' },
  },
  {
    type: 'button',
    order: 3,
    props: {
      label: 'Download on iOS',
      variant: 'primary',
      size: 'lg',
      fullWidth: false,
      disabled: false,
      rounded: 'full',
    },
  },
  {
    type: 'button',
    order: 4,
    props: {
      label: 'Get it on Android',
      variant: 'ghost',
      size: 'lg',
      fullWidth: false,
      disabled: false,
      rounded: 'full',
    },
  },
  {
    type: 'divider',
    order: 5,
    props: { label: '', orientation: 'horizontal' },
  },
  {
    type: 'text',
    order: 6,
    props: {
      content: 'Built for deep work',
      variant: 'h2',
      align: 'center',
      color: 'primary',
    },
  },
  {
    type: 'card',
    order: 7,
    props: {
      title: 'Focus Sessions',
      subtitle: 'Block distractions',
      body: 'Start a focused work session with one tap. Aura silences notifications and plays ambient soundscapes to keep you in the zone.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 8,
    props: {
      title: 'Habit Streaks',
      subtitle: 'Build consistency',
      body: 'Track daily habits with visual streaks. Research-backed reminders help you stay on track without feeling overwhelmed.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 9,
    props: {
      title: 'Mindful Insights',
      subtitle: 'Understand yourself',
      body: 'Weekly reports surface patterns in your productivity, mood, and focus. Know exactly what works for you.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
]

const mobileAppTablet: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'navbar',
    order: 0,
    props: {
      brand: 'Aura',
      links: ['Features', 'Download'],
      variant: 'dark',
      sticky: true,
      showCta: true,
      ctaLabel: 'Download',
    },
  },
  {
    type: 'section',
    order: 1,
    props: {
      heading: 'Your mind, organized.',
      subheading: 'A beautifully designed focus app for deep work and better habits.',
      variant: 'default',
      paddingY: 'lg',
      centered: true,
      maxWidth: 'md',
    },
  },
  {
    type: 'badge',
    order: 2,
    props: { label: '★ 4.9 · 50k+ reviews', variant: 'default', size: 'md' },
  },
  {
    type: 'button',
    order: 3,
    props: {
      label: 'Download Free',
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      disabled: false,
      rounded: 'full',
    },
  },
  {
    type: 'card',
    order: 4,
    props: {
      title: 'Focus Sessions',
      subtitle: 'Block distractions',
      body: 'Start a focused session with one tap. Ambient soundscapes keep you in the zone.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 5,
    props: {
      title: 'Habit Streaks',
      subtitle: 'Build consistency',
      body: 'Visual streaks and smart reminders help you build lasting habits.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
]

const mobileAppMobile: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'section',
    order: 0,
    props: {
      heading: 'Your mind,\norganized.',
      subheading: 'Focus, habits, and clarity — in one beautiful app.',
      variant: 'default',
      paddingY: 'lg',
      centered: true,
      maxWidth: 'full',
    },
  },
  {
    type: 'badge',
    order: 1,
    props: { label: '★ 4.9 App Store', variant: 'default', size: 'sm' },
  },
  {
    type: 'button',
    order: 2,
    props: {
      label: 'Download Free',
      variant: 'primary',
      size: 'md',
      fullWidth: true,
      disabled: false,
      rounded: 'full',
    },
  },
  {
    type: 'card',
    order: 3,
    props: {
      title: 'Focus Sessions',
      subtitle: 'Block distractions',
      body: 'Deep work mode with ambient audio and notification blocking.',
      variant: 'elevated',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 4,
    props: {
      title: 'Habit Streaks',
      subtitle: 'Build consistency',
      body: 'Research-backed habit tracking with visual streaks.',
      variant: 'default',
      showImage: false,
      imageUrl: '',
      showFooter: false,
      footerLabel: '',
      rounded: 'lg',
    },
  },
  {
    type: 'bottomnav',
    order: 5,
    props: {
      items: [
        { icon: 'home', label: 'Today' },
        { icon: 'play', label: 'Focus' },
        { icon: 'star', label: 'Habits' },
        { icon: 'chart', label: 'Insights' },
        { icon: 'user', label: 'Profile' },
      ],
      activeIndex: 1,
      variant: 'blur',
      showLabels: true,
    },
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// 5. PORTFOLIO / PERSONAL SITE
// ═══════════════════════════════════════════════════════════════════════════════

const portfolioDesktop: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'navbar',
    order: 0,
    props: {
      brand: 'Alex Chen',
      links: ['Work', 'About', 'Writing', 'Contact'],
      variant: 'blur',
      sticky: true,
      showCta: true,
      ctaLabel: 'Hire Me',
    },
  },
  {
    type: 'section',
    order: 1,
    props: {
      heading: 'I design products people love.',
      subheading:
        'Senior Product Designer at Horizon Studio. I craft thoughtful digital experiences where clarity meets delight — from zero to shipped.',
      variant: 'default',
      paddingY: 'xl',
      centered: false,
      maxWidth: 'lg',
    },
  },
  {
    type: 'badge',
    order: 2,
    props: { label: '● Available for freelance · April 2026', variant: 'success', size: 'md' },
  },
  {
    type: 'button',
    order: 3,
    props: {
      label: 'View My Work',
      variant: 'primary',
      size: 'lg',
      fullWidth: false,
      disabled: false,
      rounded: 'lg',
    },
  },
  {
    type: 'button',
    order: 4,
    props: {
      label: 'Download Resume',
      variant: 'ghost',
      size: 'lg',
      fullWidth: false,
      disabled: false,
      rounded: 'lg',
    },
  },
  {
    type: 'divider',
    order: 5,
    props: { label: '', orientation: 'horizontal' },
  },
  {
    type: 'text',
    order: 6,
    props: {
      content: 'Selected Projects',
      variant: 'h2',
      align: 'left',
      color: 'primary',
    },
  },
  {
    type: 'card',
    order: 7,
    props: {
      title: 'Orbit — Design System',
      subtitle: 'Horizon Studio · 2025',
      body: 'Built a comprehensive design system from scratch for a 40-person product org. 220+ components, full Figma + code parity, adopted by 8 product teams.',
      variant: 'default',
      showImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      showFooter: true,
      footerLabel: 'View Case Study →',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 8,
    props: {
      title: 'Vessel — iOS Banking App',
      subtitle: 'Freelance · 2024',
      body: 'End-to-end UX and visual design for a challenger bank. Reduced onboarding from 12 steps to 4. Launched with 25k users on day one.',
      variant: 'default',
      showImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      showFooter: true,
      footerLabel: 'View Case Study →',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 9,
    props: {
      title: 'Atlas — Data Dashboard',
      subtitle: 'YC Startup · 2024',
      body: 'Redesigned the analytics dashboard for a Series A startup. Improved task completion by 40%, time-on-task reduced by 60%.',
      variant: 'default',
      showImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      showFooter: true,
      footerLabel: 'View Case Study →',
      rounded: 'lg',
    },
  },
  {
    type: 'divider',
    order: 10,
    props: { label: '', orientation: 'horizontal' },
  },
  {
    type: 'text',
    order: 11,
    props: {
      content: '© 2026 Alex Chen · Built with MikeUI',
      variant: 'caption',
      align: 'center',
      color: 'tertiary',
    },
  },
]

const portfolioTablet: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'navbar',
    order: 0,
    props: {
      brand: 'Alex Chen',
      links: ['Work', 'About', 'Contact'],
      variant: 'blur',
      sticky: true,
      showCta: true,
      ctaLabel: 'Hire Me',
    },
  },
  {
    type: 'section',
    order: 1,
    props: {
      heading: 'I design products people love.',
      subheading: 'Senior Product Designer. Thoughtful digital experiences from zero to shipped.',
      variant: 'default',
      paddingY: 'lg',
      centered: false,
      maxWidth: 'md',
    },
  },
  {
    type: 'badge',
    order: 2,
    props: { label: '● Available for freelance', variant: 'success', size: 'md' },
  },
  {
    type: 'button',
    order: 3,
    props: {
      label: 'View My Work',
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      disabled: false,
      rounded: 'lg',
    },
  },
  {
    type: 'divider',
    order: 4,
    props: { label: '', orientation: 'horizontal' },
  },
  {
    type: 'card',
    order: 5,
    props: {
      title: 'Orbit — Design System',
      subtitle: 'Horizon Studio · 2025',
      body: '220+ components. Full Figma + code parity. Adopted by 8 product teams.',
      variant: 'default',
      showImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      showFooter: true,
      footerLabel: 'View Case Study →',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 6,
    props: {
      title: 'Vessel — iOS Banking App',
      subtitle: 'Freelance · 2024',
      body: 'Onboarding reduced from 12 steps to 4. 25k users on day one.',
      variant: 'default',
      showImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      showFooter: true,
      footerLabel: 'View Case Study →',
      rounded: 'lg',
    },
  },
]

const portfolioMobile: Omit<CanvasComponent, 'id'>[] = [
  {
    type: 'section',
    order: 0,
    props: {
      heading: 'I design products people love.',
      subheading: 'Product Designer. From zero to shipped.',
      variant: 'default',
      paddingY: 'lg',
      centered: false,
      maxWidth: 'full',
    },
  },
  {
    type: 'badge',
    order: 1,
    props: { label: '● Available for freelance', variant: 'success', size: 'sm' },
  },
  {
    type: 'button',
    order: 2,
    props: {
      label: 'View My Work',
      variant: 'primary',
      size: 'md',
      fullWidth: true,
      disabled: false,
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 3,
    props: {
      title: 'Orbit — Design System',
      subtitle: '2025',
      body: '220+ components. Full Figma + code parity.',
      variant: 'default',
      showImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      showFooter: true,
      footerLabel: 'View Case Study →',
      rounded: 'lg',
    },
  },
  {
    type: 'card',
    order: 4,
    props: {
      title: 'Vessel — Banking App',
      subtitle: '2024',
      body: 'Onboarding from 12 steps to 4. 25k users day one.',
      variant: 'default',
      showImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      showFooter: true,
      footerLabel: 'View Case Study →',
      rounded: 'lg',
    },
  },
  {
    type: 'bottomnav',
    order: 5,
    props: {
      items: [
        { icon: 'home', label: 'Home' },
        { icon: 'grid', label: 'Work' },
        { icon: 'bookmark', label: 'Writing' },
        { icon: 'message', label: 'Contact' },
      ],
      activeIndex: 0,
      variant: 'blur',
      showLabels: true,
    },
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const templates: TemplateDefinition[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'A polished product landing page with hero, features, and CTA.',
    category: 'landing',
    tags: ['SaaS', 'Product', 'Marketing'],
    accentColor: '#0071E3',
    layout: {
      desktop: withIds('lp-d', landingDesktop),
      tablet: withIds('lp-t', landingTablet),
      mobile: withIds('lp-m', landingMobile),
    },
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'A clean analytics dashboard with metrics, KPIs, and activity feed.',
    category: 'dashboard',
    tags: ['Analytics', 'Admin', 'SaaS'],
    accentColor: '#30D158',
    layout: {
      desktop: withIds('db-d', dashboardDesktop),
      tablet: withIds('db-t', dashboardTablet),
      mobile: withIds('db-m', dashboardMobile),
    },
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'A minimal fashion store with product cards and smooth navigation.',
    category: 'ecommerce',
    tags: ['Retail', 'Fashion', 'Shop'],
    accentColor: '#1D1D1F',
    layout: {
      desktop: withIds('ec-d', ecomDesktop),
      tablet: withIds('ec-t', ecomTablet),
      mobile: withIds('ec-m', ecomMobile),
    },
  },
  {
    id: 'mobile-app',
    name: 'Mobile App UI',
    description: 'A focus productivity app landing page with app-store-style layout.',
    category: 'mobile',
    tags: ['Mobile', 'App', 'Productivity'],
    accentColor: '#6E3FF3',
    layout: {
      desktop: withIds('ma-d', mobileAppDesktop),
      tablet: withIds('ma-t', mobileAppTablet),
      mobile: withIds('ma-m', mobileAppMobile),
    },
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'A personal portfolio for designers and developers with case studies.',
    category: 'portfolio',
    tags: ['Personal', 'Creative', 'Freelance'],
    accentColor: '#FF3B30',
    layout: {
      desktop: withIds('pf-d', portfolioDesktop),
      tablet: withIds('pf-t', portfolioTablet),
      mobile: withIds('pf-m', portfolioMobile),
    },
  },
]

export const templateCategories: { id: string; label: string }[] = [
  { id: 'all', label: 'All Templates' },
  { id: 'landing', label: 'Landing Page' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'mobile', label: 'Mobile App' },
  { id: 'portfolio', label: 'Portfolio' },
]
