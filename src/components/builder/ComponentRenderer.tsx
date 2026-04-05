import type { CanvasComponent } from '../../types/schema'
import { ButtonComponent } from '../ui/ButtonComponent'
import { NavbarComponent } from '../ui/NavbarComponent'
import { CardComponent } from '../ui/CardComponent'
import { InputComponent } from '../ui/InputComponent'
import { SectionComponent } from '../ui/SectionComponent'
import { TextComponent, BadgeComponent, DividerComponent } from '../ui/MiscComponents'
import { BottomNavComponent } from '../ui/BottomNavComponent'
import type {
  ButtonProps,
  NavbarProps,
  CardProps,
  InputProps,
  SectionProps,
  TextProps,
  BadgeProps,
  DividerProps,
  BottomNavProps,
} from '../../types/schema'

interface Props {
  component: CanvasComponent
}

/**
 * ComponentRenderer
 * Maps a CanvasComponent schema node to its corresponding React UI component.
 */
export function ComponentRenderer({ component }: Props) {
  const { type, props } = component

  switch (type) {
    case 'button':
      return <ButtonComponent props={props as ButtonProps} />
    case 'navbar':
      return <NavbarComponent props={props as NavbarProps} />
    case 'card':
      return <CardComponent props={props as CardProps} />
    case 'input':
      return <InputComponent props={props as InputProps} />
    case 'section':
      return <SectionComponent props={props as SectionProps} />
    case 'text':
      return <TextComponent props={props as TextProps} />
    case 'badge':
      return <BadgeComponent props={props as BadgeProps} />
    case 'divider':
      return <DividerComponent props={props as DividerProps} />
    case 'bottomnav':
      return <BottomNavComponent props={props as BottomNavProps} />
    default:
      return (
        <div className="px-4 py-3 bg-surface-secondary rounded-md text-text-secondary text-sm">
          Unknown component: {type}
        </div>
      )
  }
}
