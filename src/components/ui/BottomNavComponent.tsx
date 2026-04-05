import { cn } from '../../utils/cn'
import type { BottomNavProps } from '../../types/schema'
import type { LucideIcon } from 'lucide-react'
import {
  Home,
  Search,
  Heart,
  User,
  ShoppingBag,
  BarChart2,
  Bell,
  Settings,
  Compass,
  Grid,
  MessageCircle,
  Bookmark,
  Camera,
  Play,
  Star,
} from 'lucide-react'

// Maps icon string names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  home: Home,
  search: Search,
  heart: Heart,
  user: User,
  bag: ShoppingBag,
  chart: BarChart2,
  bell: Bell,
  settings: Settings,
  compass: Compass,
  grid: Grid,
  message: MessageCircle,
  bookmark: Bookmark,
  camera: Camera,
  play: Play,
  star: Star,
}

const variantMap = {
  light: 'bg-white border-t border-border-light shadow-soft-md',
  dark: 'bg-text-primary border-t border-white/10 shadow-soft-md',
  blur: 'glass border-t border-white/30 shadow-soft-md',
}

export function BottomNavComponent({ props }: { props: BottomNavProps }) {
  const isDark = props.variant === 'dark'
  const inactiveColor = isDark ? 'text-white/50' : 'text-text-tertiary'
  const activeColor = isDark ? 'text-white' : 'text-accent'
  const activeDot = isDark ? 'bg-white' : 'bg-accent'

  return (
    <div
      className={cn(
        'w-full flex items-center justify-around px-2 py-3',
        variantMap[props.variant],
        'rounded-t-lg',
      )}
    >
      {props.items.map((item, i) => {
        const IconComp = iconMap[item.icon] ?? Home
        const isActive = i === props.activeIndex
        return (
          <button
            key={i}
            className={cn(
              'flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-lg transition-all duration-200',
              'min-w-[48px] min-h-[48px]',
              isActive ? activeColor : inactiveColor,
              'hover:opacity-80',
            )}
          >
            <div className="relative">
              <IconComp size={22} />
              {isActive && (
                <span
                  className={cn(
                    'absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full',
                    activeDot,
                  )}
                />
              )}
            </div>
            {props.showLabels && (
              <span className={cn('text-xs font-medium leading-none', isActive && 'font-semibold')}>
                {item.label}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
