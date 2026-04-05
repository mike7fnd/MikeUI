import { Monitor, Tablet, Smartphone, X, ArrowLeft } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { TemplateDefinition } from '../../types/schema'
import { ComponentRenderer } from './ComponentRenderer'

interface Props {
  template: TemplateDefinition
  viewport: 'desktop' | 'tablet' | 'mobile'
  onViewportChange: (v: 'desktop' | 'tablet' | 'mobile') => void
  onUse: () => void
  onClose: () => void
}

const viewportWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
}

const viewportIcons = {
  desktop: Monitor,
  tablet: Tablet,
  mobile: Smartphone,
}

/**
 * TemplatePreview
 * A full-screen modal that renders the template canvas at the selected
 * breakpoint and allows the user to switch between device sizes.
 */
export function TemplatePreview({ template, viewport, onViewportChange, onUse, onClose }: Props) {
  const canvas = template.layout[viewport]
  const ViewportIcon = viewportIcons[viewport]

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-background/95 backdrop-blur-sm animate-fade-in">
      {/* ── Preview Toolbar ── */}
      <div className="flex-shrink-0 bg-white border-b border-border-light px-6 py-4 flex items-center justify-between shadow-soft">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Gallery
          </button>
          <span className="text-border">|</span>
          <div className="flex items-center gap-2">
            <ViewportIcon size={16} className="text-text-secondary" />
            <span className="text-text-primary font-semibold text-base">{template.name}</span>
          </div>
        </div>

        {/* Viewport switcher */}
        <div className="flex items-center gap-1 bg-surface-secondary rounded-lg p-1">
          {(['desktop', 'tablet', 'mobile'] as const).map((vp) => {
            const Icon = viewportIcons[vp]
            return (
              <button
                key={vp}
                onClick={() => onViewportChange(vp)}
                title={vp.charAt(0).toUpperCase() + vp.slice(1)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 capitalize',
                  viewport === vp
                    ? 'bg-white text-text-primary shadow-soft'
                    : 'text-text-secondary hover:text-text-primary',
                )}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{vp}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-text-tertiary hidden md:block">
            {canvas.length} components
          </span>
          <button
            onClick={onUse}
            className="px-5 py-2 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors duration-200 shadow-soft"
          >
            Use This Template
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-secondary flex items-center justify-center text-text-secondary hover:bg-border-light transition-colors duration-200"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* ── Preview Area ── */}
      <div className="flex-1 overflow-auto flex items-start justify-center py-8 px-6">
        <div
          className={cn(
            'bg-white shadow-soft-lg transition-all duration-300 overflow-hidden',
            viewport === 'desktop' ? 'rounded-lg w-full' : 'rounded-xl',
          )}
          style={{
            width: viewport === 'desktop' ? '100%' : viewportWidths[viewport],
            maxWidth: viewport === 'desktop' ? '1280px' : viewportWidths[viewport],
            minHeight: '80vh',
          }}
        >
          {/* Device chrome for non-desktop */}
          {viewport !== 'desktop' && (
            <div className="h-10 bg-surface-secondary flex items-center justify-center border-b border-border-light">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-border" />
                <div className="w-14 h-2 rounded-full bg-border" />
                <div className="w-2 h-2 rounded-full bg-border" />
              </div>
            </div>
          )}

          {/* Rendered components */}
          <div
            className={cn(
              'w-full bg-background',
              viewport === 'mobile' && 'flex flex-col min-h-[600px]',
            )}
          >
            {canvas.map((comp) => (
              <div
                key={comp.id}
                className={cn(
                  'w-full',
                  // Bottom nav sticks to bottom on mobile preview
                  comp.type === 'bottomnav' && viewport === 'mobile' && 'sticky bottom-0 mt-auto',
                )}
              >
                <ComponentRenderer component={comp} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Footer ── */}
      <div className="flex-shrink-0 bg-white border-t border-border-light px-6 py-3 flex items-center justify-between">
        <p className="text-xs text-text-tertiary">
          Previewing <span className="font-medium text-text-secondary">{template.name}</span> at{' '}
          <span className="font-medium text-text-secondary capitalize">{viewport}</span> · All components are
          fully editable after loading
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-tertiary">
            {viewportWidths[viewport] === '100%' ? '≥1024px' : viewportWidths[viewport]}
          </span>
          <button
            onClick={onUse}
            className="px-4 py-1.5 bg-accent text-white text-xs font-semibold rounded-lg hover:bg-accent-hover transition-colors duration-200 shadow-soft"
          >
            Use Template
          </button>
        </div>
      </div>
    </div>
  )
}
