import { useState } from 'react'
import { X, Layers } from 'lucide-react'
import { cn } from '../../utils/cn'
import { templates, templateCategories } from '../../templates'
import type { TemplateDefinition } from '../../types/schema'
import { useBuilderStore } from '../../store/builderStore'
import { TemplatePreview } from './TemplatePreview'

/**
 * TemplateGallery
 * Full-screen overlay showing all available templates with category
 * filtering, live preview, and one-click load into the builder.
 */
export function TemplateGallery() {
  const setShowTemplateGallery = useBuilderStore((s) => s.setShowTemplateGallery)
  const loadTemplate = useBuilderStore((s) => s.loadTemplate)
  const viewport = useBuilderStore((s) => s.viewport)

  const [activeCategory, setActiveCategory] = useState('all')
  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinition | null>(null)
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const filtered =
    activeCategory === 'all'
      ? templates
      : templates.filter((t) => t.category === activeCategory)

  function handleUseTemplate(template: TemplateDefinition, vp: 'desktop' | 'tablet' | 'mobile') {
    loadTemplate(template.layout[vp], vp)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background animate-fade-in">
      {/* ── Header ── */}
      <div className="flex-shrink-0 bg-white border-b border-border-light px-8 py-5 flex items-center justify-between shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
            <Layers size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-text-primary tracking-tight">
              Choose a Template
            </h1>
            <p className="text-xs text-text-tertiary mt-0.5">
              {templates.length} production-ready templates · fully editable
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowTemplateGallery(false)}
          className="w-9 h-9 rounded-lg bg-surface-secondary flex items-center justify-center text-text-secondary hover:bg-border-light transition-colors duration-200"
          aria-label="Close gallery"
        >
          <X size={18} />
        </button>
      </div>

      {/* ── Category Filters ── */}
      <div className="flex-shrink-0 bg-white border-b border-border-light px-8 py-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
          {templateCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200',
                activeCategory === cat.id
                  ? 'bg-accent text-white shadow-soft'
                  : 'bg-surface-secondary text-text-secondary hover:bg-border-light',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Template Grid ── */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
        >
          {filtered.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              currentViewport={viewport}
              onPreview={(vp) => {
                setPreviewTemplate(template)
                setPreviewViewport(vp)
              }}
              onUse={(vp) => handleUseTemplate(template, vp)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-xl bg-surface-secondary flex items-center justify-center mb-4">
              <Layers size={28} className="text-text-tertiary" />
            </div>
            <p className="text-text-secondary font-medium">No templates in this category</p>
            <p className="text-text-tertiary text-sm mt-1">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* ── Preview Modal ── */}
      {previewTemplate && (
        <TemplatePreview
          template={previewTemplate}
          viewport={previewViewport}
          onViewportChange={setPreviewViewport}
          onUse={() => handleUseTemplate(previewTemplate, previewViewport)}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </div>
  )
}

// ─── Template Card ─────────────────────────────────────────────────────────────

interface TemplateCardProps {
  template: TemplateDefinition
  currentViewport: 'desktop' | 'tablet' | 'mobile'
  onPreview: (vp: 'desktop' | 'tablet' | 'mobile') => void
  onUse: (vp: 'desktop' | 'tablet' | 'mobile') => void
}

function TemplateCard({ template, currentViewport, onPreview, onUse }: TemplateCardProps) {
  const [hovered, setHovered] = useState(false)

  const categoryColors: Record<string, string> = {
    landing: 'bg-blue-50 text-blue-600',
    dashboard: 'bg-green-50 text-green-700',
    ecommerce: 'bg-gray-100 text-gray-700',
    mobile: 'bg-purple-50 text-purple-600',
    portfolio: 'bg-red-50 text-red-600',
  }

  const categoryLabel: Record<string, string> = {
    landing: 'Landing Page',
    dashboard: 'Dashboard',
    ecommerce: 'E-commerce',
    mobile: 'Mobile App',
    portfolio: 'Portfolio',
  }

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-soft transition-all duration-200 overflow-hidden flex flex-col',
        hovered && 'shadow-soft-md -translate-y-0.5',
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail Area */}
      <div
        className="h-44 relative overflow-hidden bg-gradient-to-br from-surface-secondary to-border-light flex items-center justify-center cursor-pointer"
        style={{ borderBottom: `3px solid ${template.accentColor}20` }}
        onClick={() => onPreview(currentViewport)}
      >
        {/* Mini canvas preview */}
        <MiniPreview template={template} />

        {/* Hover overlay */}
        <div
          className={cn(
            'absolute inset-0 bg-text-primary/60 flex items-center justify-center transition-opacity duration-200',
            hovered ? 'opacity-100' : 'opacity-0',
          )}
        >
          <span className="text-white text-sm font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            Preview Template
          </span>
        </div>

        {/* Accent dot */}
        <div
          className="absolute top-3 right-3 w-3 h-3 rounded-full shadow-soft"
          style={{ backgroundColor: template.accentColor }}
        />
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-text-primary tracking-tight truncate">
              {template.name}
            </h3>
            <p className="text-sm text-text-secondary mt-0.5 leading-snug line-clamp-2">
              {template.description}
            </p>
          </div>
          <span
            className={cn(
              'flex-shrink-0 text-xs font-medium px-2 py-1 rounded-full',
              categoryColors[template.category] ?? 'bg-surface-secondary text-text-secondary',
            )}
          >
            {categoryLabel[template.category]}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-surface-secondary text-text-tertiary rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Breakpoint count */}
        <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
          3 breakpoints · {template.layout.desktop.length + template.layout.mobile.length} components
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-1">
          <button
            onClick={() => onPreview(currentViewport)}
            className="flex-1 py-2 text-sm font-medium text-text-secondary bg-surface-secondary rounded-md hover:bg-border-light transition-colors duration-200"
          >
            Preview
          </button>
          <button
            onClick={() => onUse(currentViewport)}
            className="flex-1 py-2 text-sm font-semibold text-white bg-accent rounded-md hover:bg-accent-hover transition-colors duration-200 shadow-soft"
          >
            Use Template
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Mini Preview ──────────────────────────────────────────────────────────────

function MiniPreview({ template }: { template: TemplateDefinition }) {
  // Render a stylized mini representation using the desktop canvas shape
  const items = template.layout.desktop.slice(0, 6)

  const shapeForType = (type: string) => {
    switch (type) {
      case 'navbar':
        return 'h-5 w-full rounded bg-white/60'
      case 'section':
        return 'h-10 w-4/5 rounded-lg bg-white/50 mx-auto'
      case 'card':
        return 'h-14 w-full rounded-lg bg-white/70'
      case 'button':
        return 'h-5 w-28 rounded-full bg-white/80 mx-auto'
      case 'text':
        return 'h-3 w-3/4 rounded bg-white/50 mx-auto'
      case 'badge':
        return 'h-3 w-20 rounded-full bg-white/60 mx-auto'
      case 'divider':
        return 'h-px w-full bg-white/30'
      case 'bottomnav':
        return 'h-6 w-full rounded-t-lg bg-white/80 mt-auto'
      default:
        return 'h-4 w-full rounded bg-white/40'
    }
  }

  return (
    <div
      className="w-full h-full px-3 py-3 flex flex-col gap-2 justify-start"
      style={{ background: `linear-gradient(135deg, ${template.accentColor}15, ${template.accentColor}05)` }}
    >
      {items.map((item, i) => (
        <div key={i} className={shapeForType(item.type)} />
      ))}
    </div>
  )
}
