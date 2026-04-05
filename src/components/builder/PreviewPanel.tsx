import { useMemo } from 'react'
import { useBuilderStore } from '../../store/builderStore'
import { generateHTML } from '../../generator/htmlGenerator'
import { cn } from '../../utils/cn'

const viewportWidths = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%',
}

const viewportLabels = {
  mobile: 'iPhone SE / 375px',
  tablet: 'iPad / 768px',
  desktop: 'Full Width',
}

/**
 * PreviewPanel
 * Renders a sandboxed iframe of the generated HTML for accurate live preview.
 */
export function PreviewPanel() {
  const canvas = useBuilderStore((s) => s.project.canvas)
  const viewport = useBuilderStore((s) => s.viewport)

  const html = useMemo(() => generateHTML(canvas), [canvas])

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-border-light">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="px-3 py-1 bg-surface-secondary rounded-md text-xs text-text-secondary font-mono flex-1 min-w-0">
            preview.mikeui.app
          </div>
        </div>
        <span className="text-xs text-text-tertiary">{viewportLabels[viewport]}</span>
      </div>

      {/* Frame container */}
      <div className="flex-1 overflow-auto flex justify-center bg-background p-4">
        <div
          className={cn(
            'bg-white shadow-soft-lg rounded-lg overflow-hidden transition-all duration-300',
            viewport !== 'desktop' && 'shadow-soft-lg',
          )}
          style={{
            width: viewportWidths[viewport],
            minHeight: '600px',
          }}
        >
          <iframe
            srcDoc={html}
            title="Live Preview"
            className="w-full h-full border-0"
            style={{ minHeight: '600px' }}
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  )
}
