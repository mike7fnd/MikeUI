import { useBuilderStore } from '../../store/builderStore'
import { cn } from '../../utils/cn'
import {
  Undo2,
  Redo2,
  Monitor,
  Tablet,
  Smartphone,
  Code2,
  Eye,
  Download,
  Save,
  Trash2,
  Layers,
} from 'lucide-react'
import { generateHTML } from '../../generator/htmlGenerator'

type Viewport = 'mobile' | 'tablet' | 'desktop'

const viewportOptions: { value: Viewport; icon: typeof Monitor; label: string }[] = [
  { value: 'desktop', icon: Monitor, label: 'Desktop' },
  { value: 'tablet', icon: Tablet, label: 'Tablet' },
  { value: 'mobile', icon: Smartphone, label: 'Mobile' },
]

/**
 * Toolbar
 * Top bar with project name, viewport switcher, undo/redo, and action buttons.
 */
export function Toolbar() {
  const project = useBuilderStore((s) => s.project)
  const viewport = useBuilderStore((s) => s.viewport)
  const showCode = useBuilderStore((s) => s.showCode)
  const showPreview = useBuilderStore((s) => s.showPreview)
  const past = useBuilderStore((s) => s.past)
  const future = useBuilderStore((s) => s.future)

  const setViewport = useBuilderStore((s) => s.setViewport)
  const setShowCode = useBuilderStore((s) => s.setShowCode)
  const setShowPreview = useBuilderStore((s) => s.setShowPreview)
  const setShowTemplateGallery = useBuilderStore((s) => s.setShowTemplateGallery)
  const undo = useBuilderStore((s) => s.undo)
  const redo = useBuilderStore((s) => s.redo)
  const setProjectName = useBuilderStore((s) => s.setProjectName)
  const resetProject = useBuilderStore((s) => s.resetProject)

  // Save project to localStorage
  const handleSave = () => {
    localStorage.setItem('mikeui_project', JSON.stringify(project))
    // Brief visual feedback
    const btn = document.getElementById('save-btn')
    if (btn) {
      btn.textContent = 'Saved!'
      setTimeout(() => { btn.textContent = 'Save' }, 1500)
    }
  }

  // Export HTML file
  const handleExportHTML = () => {
    const html = generateHTML(project.canvas)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Export JSON schema
  const handleExportJSON = () => {
    const json = JSON.stringify(project, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <header className="h-14 bg-white border-b border-border-light flex items-center px-4 gap-3 flex-shrink-0 z-10">
      {/* Brand */}
      <div className="flex items-center gap-2 mr-2 flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
          <span className="text-white text-xs font-bold">M</span>
        </div>
        <span className="text-sm font-semibold text-text-primary tracking-tight">MikeUI</span>
      </div>

      {/* Project name */}
      <input
        type="text"
        value={project.name}
        onChange={(e) => setProjectName(e.target.value)}
        className="text-sm font-medium text-text-primary bg-transparent border-none outline-none focus:bg-surface-secondary px-2 py-1 rounded-md transition-all duration-150 w-40"
        title="Project name"
      />

      {/* Templates button */}
      <button
        onClick={() => setShowTemplateGallery(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border-light transition-all duration-150"
      >
        <Layers size={15} />
        Templates
      </button>

      <div className="flex-1" />

      {/* Undo / Redo */}
      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          disabled={past.length === 0}
          title="Undo (Ctrl+Z)"
          className={cn(
            'p-2 rounded-md transition-all duration-150 text-text-secondary hover:text-text-primary hover:bg-surface-secondary',
            past.length === 0 && 'opacity-30 cursor-not-allowed',
          )}
        >
          <Undo2 size={16} />
        </button>
        <button
          onClick={redo}
          disabled={future.length === 0}
          title="Redo (Ctrl+Y)"
          className={cn(
            'p-2 rounded-md transition-all duration-150 text-text-secondary hover:text-text-primary hover:bg-surface-secondary',
            future.length === 0 && 'opacity-30 cursor-not-allowed',
          )}
        >
          <Redo2 size={16} />
        </button>
      </div>

      <div className="w-px h-5 bg-border-light mx-1" />

      {/* Viewport toggle */}
      <div className="flex items-center gap-0.5 bg-surface-secondary rounded-lg p-0.5">
        {viewportOptions.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setViewport(value)}
            title={label}
            className={cn(
              'p-1.5 rounded-md transition-all duration-150',
              viewport === value
                ? 'bg-white shadow-soft text-text-primary'
                : 'text-text-tertiary hover:text-text-secondary',
            )}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>

      <div className="w-px h-5 bg-border-light mx-1" />

      {/* Code view */}
      <button
        onClick={() => { setShowCode(!showCode); if (showPreview) setShowPreview(false) }}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150',
          showCode
            ? 'bg-accent text-white shadow-soft'
            : 'bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border-light',
        )}
      >
        <Code2 size={15} />
        <span>Code</span>
      </button>

      {/* Preview */}
      <button
        onClick={() => { setShowPreview(!showPreview); if (showCode) setShowCode(false) }}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150',
          showPreview
            ? 'bg-accent text-white shadow-soft'
            : 'bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border-light',
        )}
      >
        <Eye size={15} />
        <span>Preview</span>
      </button>

      <div className="w-px h-5 bg-border-light mx-1" />

      {/* Save */}
      <button
        id="save-btn"
        onClick={handleSave}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border-light transition-all duration-150"
      >
        <Save size={15} />
        Save
      </button>

      {/* Export dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent-hover shadow-soft transition-all duration-150">
          <Download size={15} />
          Export
        </button>
        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-soft-md border border-border-light py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
          <button
            onClick={handleExportHTML}
            className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors"
          >
            Export HTML
          </button>
          <button
            onClick={handleExportJSON}
            className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors"
          >
            Export JSON
          </button>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          if (confirm('Reset the project? This cannot be undone.')) resetProject()
        }}
        className="p-2 rounded-md text-text-tertiary hover:text-danger hover:bg-danger-light transition-all duration-150"
        title="Reset project"
      >
        <Trash2 size={16} />
      </button>
    </header>
  )
}
