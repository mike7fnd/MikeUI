import { useState } from 'react'
import { useBuilderStore } from '../../store/builderStore'
import { cn } from '../../utils/cn'
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
import {
  MousePointerClick, ChevronDown,
  Type, Palette, Layout as LayoutIcon, Accessibility,
  Image, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Underline, Link,
} from 'lucide-react'

// â”€â”€â”€ Accordion Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function PanelSection({
  title,
  icon,
  defaultOpen = true,
  children,
}: {
  title: string
  icon?: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-border-light/60 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2.5 text-xs font-semibold text-text-tertiary uppercase tracking-wider hover:text-text-primary transition-colors group"
      >
        <span className="flex items-center gap-1.5 text-text-secondary group-hover:text-text-primary transition-colors">
          {icon}
          {title}
        </span>
        <ChevronDown
          size={12}
          className={cn('transition-transform duration-200 text-text-tertiary', open && 'rotate-180')}
        />
      </button>
      {open && <div className="space-y-3 pb-4">{children}</div>}
    </div>
  )
}

// â”€â”€â”€ Color Picker â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ColorPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="relative cursor-pointer shrink-0">
        <input
          type="color"
          value={value || '#ffffff'}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
        />
        <div
          className="w-8 h-8 rounded-lg border-2 border-border shadow-inner-soft cursor-pointer hover:border-accent transition-all duration-150"
          style={{ background: value || '#ffffff' }}
        />
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Auto"
        spellCheck={false}
        maxLength={7}
        className="flex-1 px-2.5 py-1.5 text-xs font-mono bg-white border border-border rounded-md outline-none focus:ring-2 focus:ring-accent/20 text-text-primary placeholder:text-text-tertiary"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="text-text-tertiary hover:text-danger text-xs transition-colors shrink-0"
          title="Clear override"
        >
          âœ•
        </button>
      )}
    </div>
  )
}

// â”€â”€â”€ Slider â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function SliderInput({
  value = 100,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange,
}: {
  value?: number
  min?: number
  max?: number
  step?: number
  unit?: string
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 rounded-full accent-accent cursor-pointer"
      />
      <span className="text-xs font-mono text-text-secondary w-10 text-right shrink-0">
        {value}{unit}
      </span>
    </div>
  )
}

// â”€â”€â”€ Number Stepper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function NumberInput({
  value = 0,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
}: {
  value?: number
  min?: number
  max?: number
  step?: number
  unit?: string
  onChange: (v: number) => void
}) {
  const decrement = () => onChange(Math.max(min ?? -Infinity, (value ?? 0) - step))
  const increment = () => onChange(Math.min(max ?? Infinity, (value ?? 0) + step))
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={decrement}
        className="w-7 h-7 rounded-md bg-surface-secondary hover:bg-border-light border border-border flex items-center justify-center text-text-secondary hover:text-text-primary text-base font-medium transition-all duration-150"
      >âˆ’</button>
      <span className="flex-1 text-center text-sm font-mono text-text-primary">{value ?? 0}{unit}</span>
      <button
        onClick={increment}
        className="w-7 h-7 rounded-md bg-surface-secondary hover:bg-border-light border border-border flex items-center justify-center text-text-secondary hover:text-text-primary text-base font-medium transition-all duration-150"
      >+</button>
    </div>
  )
}

// â”€â”€â”€ Segmented Control â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function SegmentedControl({
  value,
  options,
  onChange,
}: {
  value: string
  options: { label: string; value: string; icon?: React.ReactNode }[]
  onChange: (v: string) => void
}) {
  return (
    <div className="flex bg-surface-secondary rounded-lg p-0.5 gap-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          title={opt.label}
          className={cn(
            'flex-1 h-7 text-xs font-medium rounded-md transition-all duration-150 flex items-center justify-center gap-1',
            value === opt.value
              ? 'bg-white shadow-soft text-text-primary'
              : 'text-text-secondary hover:text-text-primary',
          )}
        >
          {opt.icon ?? opt.label}
        </button>
      ))}
    </div>
  )
}

// â”€â”€â”€ Reusable Field Controls â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function FieldGroup({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wide flex items-center gap-1">
        {label}
        {hint && (
          <span className="text-[10px] font-normal text-text-tertiary normal-case tracking-normal">({hint})</span>
        )}
      </label>
      {children}
    </div>
  )
}

function TextInput({
  value,
  onChange,
  placeholder,
  mono,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  mono?: boolean
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        'w-full px-3 py-2 text-sm bg-white border border-border rounded-md outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-150 text-text-primary placeholder:text-text-tertiary',
        mono && 'font-mono text-xs',
      )}
    />
  )
}

function Select({
  value,
  options,
  onChange,
}: {
  value: string
  options: { label: string; value: string }[]
  onChange: (v: string) => void
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm bg-white border border-border rounded-md outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-150 text-text-primary cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

function Toggle({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
  hint?: string
}) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <div>
        <span className="text-sm text-text-primary">{label}</span>
        {hint && <p className="text-[11px] text-text-tertiary mt-0.5">{hint}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          'w-10 h-6 rounded-full transition-all duration-200 relative shrink-0 ml-2',
          checked ? 'bg-accent' : 'bg-border',
        )}
      >
        <span
          className={cn(
            'absolute top-1 w-4 h-4 rounded-full bg-white shadow-soft transition-all duration-200',
            checked ? 'left-5' : 'left-1',
          )}
        />
      </button>
    </div>
  )
}

function TagsInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const next = [...value]
    next[idx] = e.target.value
    onChange(next)
  }
  const addTag = () => onChange([...value, ''])
  const removeTag = (idx: number) => onChange(value.filter((_, i) => i !== idx))

  return (
    <div className="space-y-1.5">
      {value.map((tag, idx) => (
        <div key={idx} className="flex gap-1">
          <input
            type="text"
            value={tag}
            onChange={(e) => handleChange(e, idx)}
            placeholder={placeholder}
            className="flex-1 px-3 py-1.5 text-sm bg-white border border-border rounded-md outline-none focus:ring-2 focus:ring-accent/20"
          />
          <button
            onClick={() => removeTag(idx)}
            className="px-2 py-1.5 text-text-tertiary hover:text-danger transition-colors text-xs rounded-md hover:bg-danger-light"
          >
            âœ•
          </button>
        </div>
      ))}
      <button
        onClick={addTag}
        className="w-full py-1.5 text-xs font-medium text-accent hover:bg-accent-light rounded-md transition-all duration-150 border border-dashed border-accent/40"
      >
        + Add item
      </button>
    </div>
  )
}

// â”€â”€â”€ Per-type property panels â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ButtonPanel({ props, update }: { props: ButtonProps; update: (p: Partial<ButtonProps>) => void }) {
  return (
    <div className="divide-y divide-border-light/50">
      <PanelSection title="Content" icon={<Type size={11} />}>
        <FieldGroup label="Label">
          <TextInput value={props.label} onChange={(v) => update({ label: v })} placeholder="Button text" />
        </FieldGroup>
        <FieldGroup label="Icon">
          <Select
            value={props.icon || ''}
            options={[
              { label: 'None', value: '' },
              { label: 'â†’ Arrow Right', value: 'arrow-right' },
              { label: '+ Plus', value: 'plus' },
              { label: 'â†“ Download', value: 'download' },
              { label: 'âœ‰ Mail', value: 'mail' },
              { label: 'â˜… Star', value: 'star' },
              { label: 'â™¥ Heart', value: 'heart' },
              { label: 'âš™ Settings', value: 'settings' },
            ]}
            onChange={(v) => update({ icon: v || undefined })}
          />
        </FieldGroup>
        {props.icon && (
          <FieldGroup label="Icon Position">
            <SegmentedControl
              value={props.iconPosition || 'left'}
              options={[{ label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }]}
              onChange={(v) => update({ iconPosition: v as ButtonProps['iconPosition'] })}
            />
          </FieldGroup>
        )}
        <FieldGroup label="Link URL" hint="optional">
          <TextInput value={props.href || ''} onChange={(v) => update({ href: v || undefined })} placeholder="https://..." />
        </FieldGroup>
      </PanelSection>

      <PanelSection title="Style" icon={<Palette size={11} />}>
        <FieldGroup label="Variant">
          <SegmentedControl
            value={props.variant}
            options={[
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
              { label: 'Ghost', value: 'ghost' },
              { label: 'Danger', value: 'danger' },
            ]}
            onChange={(v) => update({ variant: v as ButtonProps['variant'] })}
          />
        </FieldGroup>
        <FieldGroup label="Background Color" hint="overrides variant">
          <ColorPicker value={props.customBgColor || ''} onChange={(v) => update({ customBgColor: v || undefined })} />
        </FieldGroup>
        <FieldGroup label="Text Color" hint="overrides variant">
          <ColorPicker value={props.customTextColor || ''} onChange={(v) => update({ customTextColor: v || undefined })} />
        </FieldGroup>
        <FieldGroup label="Border Color">
          <ColorPicker value={props.customBorderColor || ''} onChange={(v) => update({ customBorderColor: v || undefined })} />
        </FieldGroup>
        <FieldGroup label="Shadow">
          <Select
            value={props.shadow || 'sm'}
            options={[
              { label: 'None', value: 'none' },
              { label: 'Soft (default)', value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Large', value: 'lg' },
            ]}
            onChange={(v) => update({ shadow: v as ButtonProps['shadow'] })}
          />
        </FieldGroup>
        <FieldGroup label="Opacity">
          <SliderInput value={props.opacity ?? 100} min={10} max={100} step={5} unit="%" onChange={(v) => update({ opacity: v })} />
        </FieldGroup>
      </PanelSection>

      <PanelSection title="Layout" icon={<LayoutIcon size={11} />}>
        <FieldGroup label="Size">
          <SegmentedControl
            value={props.size}
            options={[{ label: 'S', value: 'sm' }, { label: 'M', value: 'md' }, { label: 'L', value: 'lg' }]}
            onChange={(v) => update({ size: v as ButtonProps['size'] })}
          />
        </FieldGroup>
        <FieldGroup label="Border Radius">
          <Select
            value={props.rounded}
            options={[
              { label: '12px â€” Small', value: 'sm' },
              { label: '20px â€” Medium', value: 'md' },
              { label: '30px â€” Large', value: 'lg' },
              { label: 'Pill / Full', value: 'full' },
            ]}
            onChange={(v) => update({ rounded: v as ButtonProps['rounded'] })}
          />
        </FieldGroup>
        <Toggle label="Full Width" checked={props.fullWidth} onChange={(v) => update({ fullWidth: v })} />
        <Toggle label="Disabled" checked={props.disabled} onChange={(v) => update({ disabled: v })} />
      </PanelSection>

      <PanelSection title="Accessibility" icon={<Accessibility size={11} />} defaultOpen={false}>
        <FieldGroup label="Aria Label" hint="screen readers">
          <TextInput value={props.ariaLabel || ''} onChange={(v) => update({ ariaLabel: v || undefined })} placeholder="e.g. Submit contact form" />
        </FieldGroup>
        <FieldGroup label="Title Tooltip">
          <TextInput value={props.title || ''} onChange={(v) => update({ title: v || undefined })} placeholder="Describe button action" />
        </FieldGroup>
      </PanelSection>
    </div>
  )
}

function NavbarPanel({ props, update }: { props: NavbarProps; update: (p: Partial<NavbarProps>) => void }) {
  return (
    <div className="divide-y divide-border-light/50">
      <PanelSection title="Content" icon={<Type size={11} />}>
        <FieldGroup label="Brand Name">
          <TextInput value={props.brand} onChange={(v) => update({ brand: v })} placeholder="Your Brand" />
        </FieldGroup>
        <FieldGroup label="Nav Links">
          <TagsInput value={props.links} onChange={(v) => update({ links: v })} placeholder="Link label" />
        </FieldGroup>
        <Toggle label="Show Search Bar" checked={props.showSearch ?? false} onChange={(v) => update({ showSearch: v })} />
        <Toggle label="Show CTA Button" checked={props.showCta} onChange={(v) => update({ showCta: v })} />
        {props.showCta && (
          <FieldGroup label="CTA Label">
            <TextInput value={props.ctaLabel} onChange={(v) => update({ ctaLabel: v })} />
          </FieldGroup>
        )}
      </PanelSection>

      <PanelSection title="Style" icon={<Palette size={11} />}>
        <FieldGroup label="Variant">
          <Select
            value={props.variant}
            options={[
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' },
              { label: 'Blur / Glass', value: 'blur' },
            ]}
            onChange={(v) => update({ variant: v as NavbarProps['variant'] })}
          />
        </FieldGroup>
        <FieldGroup label="Custom Background">
          <ColorPicker value={props.customBgColor || ''} onChange={(v) => update({ customBgColor: v || undefined })} />
        </FieldGroup>
        <FieldGroup label="Brand Text Color">
          <ColorPicker value={props.customBrandColor || ''} onChange={(v) => update({ customBrandColor: v || undefined })} />
        </FieldGroup>
        <FieldGroup label="Link Color">
          <ColorPicker value={props.customLinkColor || ''} onChange={(v) => update({ customLinkColor: v || undefined })} />
        </FieldGroup>
        <Toggle label="Border Bottom" checked={props.borderBottom ?? true} onChange={(v) => update({ borderBottom: v })} />
      </PanelSection>

      <PanelSection title="Layout" icon={<LayoutIcon size={11} />}>
        <Toggle label="Sticky (fixed to top)" checked={props.sticky} onChange={(v) => update({ sticky: v })} />
      </PanelSection>

      <PanelSection title="Accessibility" icon={<Accessibility size={11} />} defaultOpen={false}>
        <FieldGroup label="Aria Label">
          <TextInput value={props.ariaLabel || ''} onChange={(v) => update({ ariaLabel: v || undefined })} placeholder="Site navigation" />
        </FieldGroup>
      </PanelSection>
    </div>
  )
}

function CardPanel({ props, update }: { props: CardProps; update: (p: Partial<CardProps>) => void }) {
  return (
    <div className="divide-y divide-border-light/50">
      <PanelSection title="Content" icon={<Type size={11} />}>
        <FieldGroup label="Title">
          <TextInput value={props.title} onChange={(v) => update({ title: v })} />
        </FieldGroup>
        <FieldGroup label="Subtitle">
          <TextInput value={props.subtitle} onChange={(v) => update({ subtitle: v })} placeholder="Optional eyebrow" />
        </FieldGroup>
        <FieldGroup label="Body Text">
          <textarea
            value={props.body}
            onChange={(e) => update({ body: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 text-sm bg-white border border-border rounded-md outline-none focus:ring-2 focus:ring-accent/20 resize-none"
          />
        </FieldGroup>
        <Toggle label="Show Footer" checked={props.showFooter} onChange={(v) => update({ showFooter: v })} />
        {props.showFooter && (
          <>
            <FieldGroup label="Footer Label">
              <TextInput value={props.footerLabel} onChange={(v) => update({ footerLabel: v })} />
            </FieldGroup>
            <FieldGroup label="Footer URL" hint="optional">
              <TextInput value={props.footerUrl || ''} onChange={(v) => update({ footerUrl: v || undefined })} placeholder="https://..." />
            </FieldGroup>
          </>
        )}
      </PanelSection>

      <PanelSection title="Image" icon={<Image size={11} />}>
        <Toggle label="Show Image" checked={props.showImage} onChange={(v) => update({ showImage: v })} />
        {props.showImage && (
          <>
            <FieldGroup label="Image URL">
              <TextInput value={props.imageUrl} onChange={(v) => update({ imageUrl: v })} placeholder="https://..." />
            </FieldGroup>
            <FieldGroup label="Alt Text" hint="accessibility">
              <TextInput value={props.imageAlt || ''} onChange={(v) => update({ imageAlt: v || undefined })} placeholder="Describe the image" />
            </FieldGroup>
            <FieldGroup label="Image Height">
              <SegmentedControl
                value={props.imageHeight || 'md'}
                options={[{ label: 'S', value: 'sm' }, { label: 'M', value: 'md' }, { label: 'L', value: 'lg' }, { label: 'XL', value: 'xl' }]}
                onChange={(v) => update({ imageHeight: v as CardProps['imageHeight'] })}
              />
            </FieldGroup>
            <FieldGroup label="Object Fit">
              <Select
                value={props.imageObjectFit || 'cover'}
                options={[
                  { label: 'Cover (crop)', value: 'cover' },
                  { label: 'Contain (letterbox)', value: 'contain' },
                  { label: 'Fill (stretch)', value: 'fill' },
                ]}
                onChange={(v) => update({ imageObjectFit: v as CardProps['imageObjectFit'] })}
              />
            </FieldGroup>
          </>
        )}
      </PanelSection>

      <PanelSection title="Style" icon={<Palette size={11} />}>
        <FieldGroup label="Variant">
          <Select
            value={props.variant}
            options={[
              { label: 'Default', value: 'default' },
              { label: 'Elevated', value: 'elevated' },
              { label: 'Outlined', value: 'outlined' },
              { label: 'Flat', value: 'flat' },
            ]}
            onChange={(v) => update({ variant: v as CardProps['variant'] })}
          />
        </FieldGroup>
        <FieldGroup label="Background Color">
          <ColorPicker value={props.customBgColor || ''} onChange={(v) => update({ customBgColor: v || undefined })} />
        </FieldGroup>
        <Toggle label="Hover Lift Effect" checked={props.hoverEffect ?? true} onChange={(v) => update({ hoverEffect: v })} />
      </PanelSection>

      <PanelSection title="Layout" icon={<LayoutIcon size={11} />}>
        <FieldGroup label="Border Radius">
          <SegmentedControl
            value={props.rounded}
            options={[{ label: '12px', value: 'sm' }, { label: '20px', value: 'md' }, { label: '30px', value: 'lg' }]}
            onChange={(v) => update({ rounded: v as CardProps['rounded'] })}
          />
        </FieldGroup>
        <FieldGroup label="Inner Padding">
          <SegmentedControl
            value={props.padding || 'md'}
            options={[{ label: 'S', value: 'sm' }, { label: 'M', value: 'md' }, { label: 'L', value: 'lg' }]}
            onChange={(v) => update({ padding: v as CardProps['padding'] })}
          />
        </FieldGroup>
      </PanelSection>

      <PanelSection title="Accessibility" icon={<Accessibility size={11} />} defaultOpen={false}>
        <FieldGroup label="Aria Label">
          <TextInput value={props.ariaLabel || ''} onChange={(v) => update({ ariaLabel: v || undefined })} placeholder="Card description" />
        </FieldGroup>
      </PanelSection>
    </div>
  )
}

function InputPanel({ props, update }: { props: InputProps; update: (p: Partial<InputProps>) => void }) {
  return (
    <div className="divide-y divide-border-light/50">
      <PanelSection title="Content" icon={<Type size={11} />}>
        <FieldGroup label="Label">
          <TextInput value={props.label} onChange={(v) => update({ label: v })} />
        </FieldGroup>
        <FieldGroup label="Placeholder">
          <TextInput value={props.placeholder} onChange={(v) => update({ placeholder: v })} />
        </FieldGroup>
        <FieldGroup label="Helper Text">
          <TextInput value={props.helperText} onChange={(v) => update({ helperText: v })} placeholder="Optional hint below input" />
        </FieldGroup>
        <FieldGroup label="Prefix" hint="optional">
          <TextInput value={props.prefix || ''} onChange={(v) => update({ prefix: v || undefined })} placeholder="e.g. $, @, https://" />
        </FieldGroup>
        <FieldGroup label="Suffix" hint="optional">
          <TextInput value={props.suffix || ''} onChange={(v) => update({ suffix: v || undefined })} placeholder="e.g. .com, kg, %" />
        </FieldGroup>
      </PanelSection>

      <PanelSection title="Validation" icon={<Palette size={11} />}>
        <Toggle label="Required" checked={props.required} onChange={(v) => update({ required: v })} />
        <Toggle label="Read Only" checked={props.readonly ?? false} onChange={(v) => update({ readonly: v })} />
        <Toggle label="Disabled" checked={props.disabled} onChange={(v) => update({ disabled: v })} />
        <Toggle label="Show Error State" checked={props.error} onChange={(v) => update({ error: v })} />
        {props.error && (
          <FieldGroup label="Error Message">
            <TextInput value={props.errorMessage} onChange={(v) => update({ errorMessage: v })} />
          </FieldGroup>
        )}
        {(props.maxLength ?? 0) > 0 ? null : null}
        <FieldGroup label="Max Length" hint="0 = unlimited">
          <NumberInput value={props.maxLength ?? 0} min={0} max={9999} step={10} onChange={(v) => update({ maxLength: v || undefined })} />
        </FieldGroup>
      </PanelSection>

      <PanelSection title="Style & Layout" icon={<LayoutIcon size={11} />}>
        <FieldGroup label="Input Type">
          <Select
            value={props.type}
            options={[
              { label: 'Text', value: 'text' },
              { label: 'Email', value: 'email' },
              { label: 'Password', value: 'password' },
              { label: 'Number', value: 'number' },
              { label: 'Search', value: 'search' },
            ]}
            onChange={(v) => update({ type: v as InputProps['type'] })}
          />
        </FieldGroup>
        <FieldGroup label="Size">
          <SegmentedControl
            value={props.size}
            options={[{ label: 'S', value: 'sm' }, { label: 'M', value: 'md' }, { label: 'L', value: 'lg' }]}
            onChange={(v) => update({ size: v as InputProps['size'] })}
          />
        </FieldGroup>
        <FieldGroup label="Border Radius">
          <SegmentedControl
            value={props.borderRadius || 'sm'}
            options={[{ label: '12px', value: 'sm' }, { label: '20px', value: 'md' }, { label: '30px', value: 'lg' }]}
            onChange={(v) => update({ borderRadius: v as InputProps['borderRadius'] })}
          />
        </FieldGroup>
      </PanelSection>

      <PanelSection title="Accessibility" icon={<Accessibility size={11} />} defaultOpen={false}>
        <FieldGroup label="Aria Label">
          <TextInput value={props.ariaLabel || ''} onChange={(v) => update({ ariaLabel: v || undefined })} placeholder="Describe this field" />
        </FieldGroup>
        <FieldGroup label="Aria Described By" hint="element ID">
          <TextInput value={props.ariaDescribedBy || ''} onChange={(v) => update({ ariaDescribedBy: v || undefined })} placeholder="helper-text-id" mono />
        </FieldGroup>
        <FieldGroup label="Autocomplete">
          <Select
            value={props.autocomplete || 'off'}
            options={[
              { label: 'Off', value: 'off' },
              { label: 'On', value: 'on' },
              { label: 'Name', value: 'name' },
              { label: 'Email', value: 'email' },
              { label: 'Username', value: 'username' },
              { label: 'New Password', value: 'new-password' },
            ]}
            onChange={(v) => update({ autocomplete: v })}
          />
        </FieldGroup>
      </PanelSection>
    </div>
  )
}

function SectionPanel({ props, update }: { props: SectionProps; update: (p: Partial<SectionProps>) => void }) {
  return (
    <div className="divide-y divide-border-light/50">
      <PanelSection title="Content" icon={<Type size={11} />}>
        <FieldGroup label="Eyebrow Label" hint="optional">
          <TextInput value={props.eyebrow || ''} onChange={(v) => update({ eyebrow: v || undefined })} placeholder="e.g. FEATURES" />
        </FieldGroup>
        <FieldGroup label="Heading">
          <TextInput value={props.heading} onChange={(v) => update({ heading: v })} />
        </FieldGroup>
        <FieldGroup label="Subheading">
          <textarea
            value={props.subheading}
            onChange={(e) => update({ subheading: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 text-sm bg-white border border-border rounded-md outline-none focus:ring-2 focus:ring-accent/20 resize-none"
          />
        </FieldGroup>
        <Toggle label="Show CTA Button" checked={props.showCtaButton ?? false} onChange={(v) => update({ showCtaButton: v })} />
        {props.showCtaButton && (
          <>
            <FieldGroup label="CTA Label">
              <TextInput value={props.ctaLabel || 'Get started'} onChange={(v) => update({ ctaLabel: v })} />
            </FieldGroup>
            <FieldGroup label="CTA Style">
              <SegmentedControl
                value={props.ctaVariant || 'primary'}
                options={[{ label: 'Primary', value: 'primary' }, { label: 'Secondary', value: 'secondary' }, { label: 'Ghost', value: 'ghost' }]}
                onChange={(v) => update({ ctaVariant: v as SectionProps['ctaVariant'] })}
              />
            </FieldGroup>
          </>
        )}
      </PanelSection>

      <PanelSection title="Style" icon={<Palette size={11} />}>
        <FieldGroup label="Background Variant">
          <Select
            value={props.variant}
            options={[
              { label: 'Default (Gray)', value: 'default' },
              { label: 'Alternate (White)', value: 'alternate' },
              { label: 'Accent (Blue tint)', value: 'accent' },
            ]}
            onChange={(v) => update({ variant: v as SectionProps['variant'] })}
          />
        </FieldGroup>
        <FieldGroup label="Custom Background">
          <ColorPicker value={props.customBgColor || ''} onChange={(v) => update({ customBgColor: v || undefined })} />
        </FieldGroup>
      </PanelSection>

      <PanelSection title="Layout" icon={<LayoutIcon size={11} />}>
        <FieldGroup label="Vertical Padding">
          <SegmentedControl
            value={props.paddingY}
            options={[{ label: 'S', value: 'sm' }, { label: 'M', value: 'md' }, { label: 'L', value: 'lg' }, { label: 'XL', value: 'xl' }]}
            onChange={(v) => update({ paddingY: v as SectionProps['paddingY'] })}
          />
        </FieldGroup>
        <FieldGroup label="Min Height">
          <Select
            value={props.minHeight || 'auto'}
            options={[
              { label: 'Auto', value: 'auto' },
              { label: 'Small (300px)', value: 'sm' },
              { label: 'Medium (500px)', value: 'md' },
              { label: 'Large (700px)', value: 'lg' },
              { label: 'Full Viewport', value: 'screen' },
            ]}
            onChange={(v) => update({ minHeight: v as SectionProps['minHeight'] })}
          />
        </FieldGroup>
        <FieldGroup label="Content Max Width">
          <Select
            value={props.maxWidth}
            options={[
              { label: 'Small (580px)', value: 'sm' },
              { label: 'Medium (768px)', value: 'md' },
              { label: 'Large (960px)', value: 'lg' },
              { label: 'XL (1200px)', value: 'xl' },
              { label: 'Full', value: 'full' },
            ]}
            onChange={(v) => update({ maxWidth: v as SectionProps['maxWidth'] })}
          />
        </FieldGroup>
        <Toggle label="Center Content" checked={props.centered} onChange={(v) => update({ centered: v })} />
      </PanelSection>

      <PanelSection title="Accessibility" icon={<Accessibility size={11} />} defaultOpen={false}>
        <FieldGroup label="Aria Label">
          <TextInput value={props.ariaLabel || ''} onChange={(v) => update({ ariaLabel: v || undefined })} placeholder="Section purpose" />
        </FieldGroup>
      </PanelSection>
    </div>
  )
}

function TextPanel({ props, update }: { props: TextProps; update: (p: Partial<TextProps>) => void }) {
  return (
    <div className="divide-y divide-border-light/50">
      <PanelSection title="Content" icon={<Type size={11} />}>
        <FieldGroup label="Text Content">
          <textarea
            value={props.content}
            onChange={(e) => update({ content: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 text-sm bg-white border border-border rounded-md outline-none focus:ring-2 focus:ring-accent/20 resize-none"
          />
        </FieldGroup>
        <FieldGroup label="Element / Size">
          <Select
            value={props.variant}
            options={[
              { label: 'H1 â€” 3rem bold', value: 'h1' },
              { label: 'H2 â€” 2.25rem bold', value: 'h2' },
              { label: 'H3 â€” 1.75rem semibold', value: 'h3' },
              { label: 'H4 â€” 1.25rem semibold', value: 'h4' },
              { label: 'Body â€” 1.0625rem', value: 'body' },
              { label: 'Caption â€” 0.875rem', value: 'caption' },
              { label: 'Label / Overline', value: 'label' },
            ]}
            onChange={(v) => update({ variant: v as TextProps['variant'] })}
          />
        </FieldGroup>
      </PanelSection>

      <PanelSection title="Style" icon={<Palette size={11} />}>
        <FieldGroup label="Color">
          <SegmentedControl
            value={props.color}
            options={[
              { label: 'Pri', value: 'primary' },
              { label: 'Sec', value: 'secondary' },
              { label: 'Tert', value: 'tertiary' },
              { label: 'Acc', value: 'accent' },
            ]}
            onChange={(v) => update({ color: v as TextProps['color'] })}
          />
        </FieldGroup>
        <FieldGroup label="Custom Color">
          <ColorPicker value={props.customColor || ''} onChange={(v) => update({ customColor: v || undefined })} />
        </FieldGroup>
        <FieldGroup label="Font Weight">
          <Select
            value={props.fontWeight || ''}
            options={[
              { label: 'Default (variant)', value: '' },
              { label: 'Light (300)', value: '300' },
              { label: 'Regular (400)', value: '400' },
              { label: 'Medium (500)', value: '500' },
              { label: 'Semibold (600)', value: '600' },
              { label: 'Bold (700)', value: '700' },
              { label: 'Extrabold (800)', value: '800' },
            ]}
            onChange={(v) => update({ fontWeight: (v || undefined) as TextProps['fontWeight'] })}
          />
        </FieldGroup>
        <div className="flex gap-2">
          <button
            onClick={() => update({ italic: !props.italic })}
            className={cn('flex-1 h-8 rounded-md text-sm font-medium transition-all border', props.italic ? 'bg-accent text-white border-accent' : 'bg-surface-secondary border-border text-text-secondary hover:text-text-primary')}
          ><Italic size={12} className="mx-auto" /></button>
          <button
            onClick={() => update({ underline: !props.underline })}
            className={cn('flex-1 h-8 rounded-md text-sm font-medium transition-all border', props.underline ? 'bg-accent text-white border-accent' : 'bg-surface-secondary border-border text-text-secondary hover:text-text-primary')}
          ><Underline size={12} className="mx-auto" /></button>
          <button
            onClick={() => update({ strikethrough: !props.strikethrough })}
            className={cn('flex-1 h-8 rounded-md text-sm font-medium transition-all border text-xs', props.strikethrough ? 'bg-accent text-white border-accent' : 'bg-surface-secondary border-border text-text-secondary hover:text-text-primary')}
          >SÌ¶</button>
        </div>
      </PanelSection>

      <PanelSection title="Layout" icon={<LayoutIcon size={11} />}>
        <FieldGroup label="Alignment">
          <SegmentedControl
            value={props.align}
            options={[
              { label: 'Left', value: 'left', icon: <AlignLeft size={12} /> },
              { label: 'Center', value: 'center', icon: <AlignCenter size={12} /> },
              { label: 'Right', value: 'right', icon: <AlignRight size={12} /> },
            ]}
            onChange={(v) => update({ align: v as TextProps['align'] })}
          />
        </FieldGroup>
        <FieldGroup label="Line Height">
          <Select
            value={props.lineHeight || 'normal'}
            options={[
              { label: 'Tight', value: 'tight' },
              { label: 'Normal', value: 'normal' },
              { label: 'Relaxed', value: 'relaxed' },
              { label: 'Loose', value: 'loose' },
            ]}
            onChange={(v) => update({ lineHeight: v as TextProps['lineHeight'] })}
          />
        </FieldGroup>
        <FieldGroup label="Letter Spacing">
          <Select
            value={props.letterSpacing || 'normal'}
            options={[
              { label: 'Tight', value: 'tight' },
              { label: 'Normal', value: 'normal' },
              { label: 'Wide', value: 'wide' },
              { label: 'Wider', value: 'wider' },
            ]}
            onChange={(v) => update({ letterSpacing: v as TextProps['letterSpacing'] })}
          />
        </FieldGroup>
        <FieldGroup label="Max Width">
          <Select
            value={props.maxWidth || 'none'}
            options={[
              { label: 'None', value: 'none' },
              { label: 'Small (480px)', value: 'sm' },
              { label: 'Medium (640px)', value: 'md' },
              { label: 'Large (768px)', value: 'lg' },
              { label: 'Prose (65ch)', value: 'prose' },
            ]}
            onChange={(v) => update({ maxWidth: v as TextProps['maxWidth'] })}
          />
        </FieldGroup>
      </PanelSection>
    </div>
  )
}

function BadgePanel({ props, update }: { props: BadgeProps; update: (p: Partial<BadgeProps>) => void }) {
  return (
    <div className="divide-y divide-border-light/50">
      <PanelSection title="Content" icon={<Type size={11} />}>
        <FieldGroup label="Label Text">
          <TextInput value={props.label} onChange={(v) => update({ label: v })} />
        </FieldGroup>
        <Toggle label="Show Dot Indicator" checked={props.dot ?? false} onChange={(v) => update({ dot: v })} />
        <Toggle label="Uppercase Text" checked={props.uppercase ?? false} onChange={(v) => update({ uppercase: v })} />
      </PanelSection>

      <PanelSection title="Style" icon={<Palette size={11} />}>
        <FieldGroup label="Variant">
          <Select
            value={props.variant}
            options={[
              { label: 'Default', value: 'default' },
              { label: 'Info', value: 'info' },
              { label: 'Success', value: 'success' },
              { label: 'Warning', value: 'warning' },
              { label: 'Danger', value: 'danger' },
            ]}
            onChange={(v) => update({ variant: v as BadgeProps['variant'] })}
          />
        </FieldGroup>
        <FieldGroup label="Custom Background">
          <ColorPicker value={props.customBgColor || ''} onChange={(v) => update({ customBgColor: v || undefined })} />
        </FieldGroup>
        <FieldGroup label="Custom Text Color">
          <ColorPicker value={props.customTextColor || ''} onChange={(v) => update({ customTextColor: v || undefined })} />
        </FieldGroup>
        <FieldGroup label="Size">
          <SegmentedControl
            value={props.size}
            options={[{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }]}
            onChange={(v) => update({ size: v as BadgeProps['size'] })}
          />
        </FieldGroup>
      </PanelSection>

      <PanelSection title="Accessibility" icon={<Accessibility size={11} />} defaultOpen={false}>
        <FieldGroup label="Aria Label">
          <TextInput value={props.ariaLabel || ''} onChange={(v) => update({ ariaLabel: v || undefined })} placeholder="Badge meaning" />
        </FieldGroup>
      </PanelSection>
    </div>
  )
}

function DividerPanel({ props, update }: { props: DividerProps; update: (p: Partial<DividerProps>) => void }) {
  return (
    <div className="divide-y divide-border-light/50">
      <PanelSection title="Content" icon={<Type size={11} />}>
        <FieldGroup label="Center Label" hint="optional">
          <TextInput value={props.label ?? ''} onChange={(v) => update({ label: v || undefined })} placeholder="OR, SECTION, etc." />
        </FieldGroup>
      </PanelSection>

      <PanelSection title="Style" icon={<Palette size={11} />}>
        <FieldGroup label="Orientation">
          <SegmentedControl
            value={props.orientation}
            options={[{ label: 'Horizontal', value: 'horizontal' }, { label: 'Vertical', value: 'vertical' }]}
            onChange={(v) => update({ orientation: v as DividerProps['orientation'] })}
          />
        </FieldGroup>
        <FieldGroup label="Line Style">
          <Select
            value={props.lineStyle || 'solid'}
            options={[
              { label: 'Solid', value: 'solid' },
              { label: 'Dashed', value: 'dashed' },
              { label: 'Dotted', value: 'dotted' },
            ]}
            onChange={(v) => update({ lineStyle: v as DividerProps['lineStyle'] })}
          />
        </FieldGroup>
        <FieldGroup label="Thickness">
          <SegmentedControl
            value={String(props.thickness ?? 1)}
            options={[{ label: '1px', value: '1' }, { label: '2px', value: '2' }, { label: '4px', value: '4' }]}
            onChange={(v) => update({ thickness: Number(v) as DividerProps['thickness'] })}
          />
        </FieldGroup>
        <FieldGroup label="Line Color">
          <ColorPicker value={props.color || ''} onChange={(v) => update({ color: v || undefined })} />
        </FieldGroup>
      </PanelSection>

      <PanelSection title="Layout" icon={<LayoutIcon size={11} />}>
        <FieldGroup label="Vertical Spacing">
          <SegmentedControl
            value={props.spacing || 'md'}
            options={[{ label: 'S', value: 'sm' }, { label: 'M', value: 'md' }, { label: 'L', value: 'lg' }]}
            onChange={(v) => update({ spacing: v as DividerProps['spacing'] })}
          />
        </FieldGroup>
      </PanelSection>
    </div>
  )
}

function BottomNavPanel({ props, update }: { props: BottomNavProps; update: (p: Partial<BottomNavProps>) => void }) {
  const AVAILABLE_ICONS = [
    'home', 'search', 'heart', 'user', 'bag', 'chart',
    'bell', 'settings', 'compass', 'grid', 'message',
    'bookmark', 'camera', 'play', 'star',
  ]

  return (
    <div className="divide-y divide-border-light/50">
      <PanelSection title="Tabs" icon={<LayoutIcon size={11} />}>
        <FieldGroup label="Active Tab">
          <Select
            value={String(props.activeIndex)}
            options={props.items.map((item, i) => ({ label: item.label || `Tab ${i + 1}`, value: String(i) }))}
            onChange={(v) => update({ activeIndex: Number(v) })}
          />
        </FieldGroup>
        <Toggle label="Show Tab Labels" checked={props.showLabels} onChange={(v) => update({ showLabels: v })} />
        <FieldGroup label="Navigation Items">
          <div className="space-y-2">
            {props.items.map((item, i) => (
              <div key={i} className="p-2 bg-surface-secondary rounded-lg space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-text-tertiary uppercase">Tab {i + 1}</span>
                  {props.items.length > 2 && (
                    <button
                      onClick={() => {
                        const items = props.items.filter((_, idx) => idx !== i)
                        update({ items, activeIndex: Math.min(props.activeIndex, items.length - 1) })
                      }}
                      className="text-text-tertiary hover:text-danger text-xs transition-colors"
                    >âœ•</button>
                  )}
                </div>
                <input
                  type="text"
                  value={item.label}
                  placeholder="Label"
                  onChange={(e) => {
                    const items = [...props.items]
                    items[i] = { ...items[i], label: e.target.value }
                    update({ items })
                  }}
                  className="w-full px-2.5 py-1.5 text-sm bg-white border border-border rounded-md outline-none focus:ring-2 focus:ring-accent/20"
                />
                <select
                  value={item.icon}
                  onChange={(e) => {
                    const items = [...props.items]
                    items[i] = { ...items[i], icon: e.target.value }
                    update({ items })
                  }}
                  className="w-full px-2.5 py-1.5 text-sm bg-white border border-border rounded-md outline-none capitalize"
                >
                  {AVAILABLE_ICONS.map((ic) => (
                    <option key={ic} value={ic} className="capitalize">{ic.charAt(0).toUpperCase() + ic.slice(1)}</option>
                  ))}
                </select>
              </div>
            ))}
            {props.items.length < 5 && (
              <button
                onClick={() => update({ items: [...props.items, { icon: 'star', label: 'New' }] })}
                className="w-full py-2 text-xs font-medium text-accent bg-accent-light rounded-lg hover:bg-accent/20 transition-colors border border-dashed border-accent/40"
              >+ Add Tab</button>
            )}
          </div>
        </FieldGroup>
      </PanelSection>

      <PanelSection title="Style" icon={<Palette size={11} />}>
        <FieldGroup label="Theme">
          <Select
            value={props.variant}
            options={[
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' },
              { label: 'Blur / Glass', value: 'blur' },
            ]}
            onChange={(v) => update({ variant: v as BottomNavProps['variant'] })}
          />
        </FieldGroup>
      </PanelSection>
    </div>
  )
}


// â”€â”€â”€ Main PropertyPanel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/**
 * PropertyPanel
 * Right sidebar showing controls for the currently selected component.
 */
export function PropertyPanel() {
  const canvas = useBuilderStore((s) => s.project.canvas)
  const selectedId = useBuilderStore((s) => s.selectedId)
  const updateProps = useBuilderStore((s) => s.updateProps)
  const removeComponent = useBuilderStore((s) => s.removeComponent)
  const duplicateComponent = useBuilderStore((s) => s.duplicateComponent)

  const selected = canvas.find((c) => c.id === selectedId)

  if (!selected) {
    return (
      <aside className="w-80 bg-white border-l border-border-light flex flex-col h-full">
        <div className="px-4 py-4 border-b border-border-light">
          <h2 className="text-sm font-semibold text-text-primary tracking-tight">Properties</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-surface-secondary flex items-center justify-center mb-4">
            <MousePointerClick size={20} className="text-text-tertiary" />
          </div>
          <p className="text-sm text-text-secondary">
            Select a component on the canvas to edit its properties.
          </p>
        </div>
      </aside>
    )
  }

  const update = (props: Record<string, unknown>) => {
    updateProps(selected.id, props as never)
  }

  return (
    <aside className="w-80 bg-white border-l border-border-light flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border-light flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-text-primary tracking-tight capitalize">
            {selected.type}
          </h2>
          <p className="text-xs text-text-tertiary font-mono">{selected.id.slice(0, 8)}...</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => duplicateComponent(selected.id)}
            className="p-1.5 rounded-md hover:bg-surface-secondary text-text-tertiary hover:text-text-primary transition-all duration-150"
            title="Duplicate"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
          <button
            onClick={() => removeComponent(selected.id)}
            className="p-1.5 rounded-md hover:bg-danger-light text-text-tertiary hover:text-danger transition-all duration-150"
            title="Delete"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Panel body */}
      <div className="flex-1 overflow-y-auto p-4">
        {selected.type === 'button' && (
          <ButtonPanel
            props={selected.props as ButtonProps}
            update={update as (p: Partial<ButtonProps>) => void}
          />
        )}
        {selected.type === 'navbar' && (
          <NavbarPanel
            props={selected.props as NavbarProps}
            update={update as (p: Partial<NavbarProps>) => void}
          />
        )}
        {selected.type === 'card' && (
          <CardPanel
            props={selected.props as CardProps}
            update={update as (p: Partial<CardProps>) => void}
          />
        )}
        {selected.type === 'input' && (
          <InputPanel
            props={selected.props as InputProps}
            update={update as (p: Partial<InputProps>) => void}
          />
        )}
        {selected.type === 'section' && (
          <SectionPanel
            props={selected.props as SectionProps}
            update={update as (p: Partial<SectionProps>) => void}
          />
        )}
        {selected.type === 'text' && (
          <TextPanel
            props={selected.props as TextProps}
            update={update as (p: Partial<TextProps>) => void}
          />
        )}
        {selected.type === 'badge' && (
          <BadgePanel
            props={selected.props as BadgeProps}
            update={update as (p: Partial<BadgeProps>) => void}
          />
        )}
        {selected.type === 'divider' && (
          <DividerPanel
            props={selected.props as DividerProps}
            update={update as (p: Partial<DividerProps>) => void}
          />
        )}
        {selected.type === 'bottomnav' && (
          <BottomNavPanel
            props={selected.props as BottomNavProps}
            update={update as (p: Partial<BottomNavProps>) => void}
          />
        )}
      </div>
    </aside>
  )
}
