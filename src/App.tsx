import { useEffect, useCallback } from 'react'
import { TopbarMenu } from './components/builder/TopbarMenu'
import { ComponentPalette } from './components/builder/ComponentPalette'
import { Canvas } from './components/builder/Canvas'
import { PropertyPanel } from './components/builder/PropertyPanel'
import { CodePanel } from './components/builder/CodePanel'
import { PreviewPanel } from './components/builder/PreviewPanel'
import { FilesEditorPanel } from './components/builder/FilesEditorPanel'
import { TemplateGallery } from './components/builder/TemplateGallery'
import { HomeScreen } from './components/builder/HomeScreen'
import { useBuilderStore } from './store/builderStore'
import type { ProjectSchema } from './types/schema'

/**
 * App
 * Root layout: Toolbar + 3-column builder (Palette | Canvas | Properties)
 * with Code/Preview overlays toggled via the toolbar.
 */
export default function App() {
  const showCode = useBuilderStore((s) => s.showCode)
  const showPreview = useBuilderStore((s) => s.showPreview)
  const showFilesEditor = useBuilderStore((s) => s.showFilesEditor)
  const showHome = useBuilderStore((s) => s.showHome)
  const showTemplateGallery = useBuilderStore((s) => s.showTemplateGallery)
  const darkMode = useBuilderStore((s) => s.darkMode)
  const undo = useBuilderStore((s) => s.undo)
  const redo = useBuilderStore((s) => s.redo)
  const selectComponent = useBuilderStore((s) => s.selectComponent)
  const loadProject = useBuilderStore((s) => s.loadProject)

  // Load project from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mikeui_project')
    if (saved) {
      try {
        const schema = JSON.parse(saved) as ProjectSchema
        loadProject(schema)
      } catch {
        // Ignore malformed data
      }
    }
  }, [loadProject])

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      const isEditing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
      if (isEditing) return

      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        redo()
      }
      if (e.key === 'Escape') {
        selectComponent(null)
      }
    },
    [undo, redo, selectComponent],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background font-sans" data-ui-theme={darkMode ? 'dark' : 'light'}>
      {/* Unified top bar: brand + menus + toolbar actions */}
      <TopbarMenu />

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left: Component palette (always visible) */}
        <ComponentPalette />

        {/* Center: Canvas or overlay panels */}
        {showCode ? (
          <CodePanel />
        ) : showPreview ? (
          <PreviewPanel />
        ) : showFilesEditor ? (
          <FilesEditorPanel />
        ) : (
          <Canvas />
        )}

        {/* Right: Property panel (always visible) */}
        <PropertyPanel />
      </div>

      {/* Template gallery overlay (portal-style, full screen) */}
      {showTemplateGallery && <TemplateGallery />}

      {/* Home screen overlay */}
      {showHome && <HomeScreen />}
    </div>
  )
}
