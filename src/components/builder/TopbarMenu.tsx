import { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '../../utils/cn'
import { useBuilderStore } from '../../store/builderStore'
import { generateHTML } from '../../generator/htmlGenerator'
import { generateReact } from '../../generator/reactGenerator'
import { openPreviewWindow, openMobilePreviewWindow } from '../../utils/previewWindow'
import { ConfirmDialog } from './ConfirmDialog'
import type { ProjectSchema } from '../../types/schema'
import {
  ChevronRight,
  Check,
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

// ─── Types ────────────────────────────────────────────────────────────────────

type MenuId = 'file' | 'edit' | 'view' | 'insert' | 'run' | 'help'

interface MenuItemDef {
  id: string
  label: string
  shortcut?: string
  icon?: React.ReactNode
  disabled?: boolean
  checked?: boolean
  danger?: boolean
  separator?: boolean                // renders a divider BEFORE this item
  action?: () => void
  submenu?: MenuItemDef[]
}

interface MenuGroupDef {
  id: MenuId
  label: string
  items: MenuItemDef[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isMac() {
  return navigator.platform.toUpperCase().includes('MAC')
}

function mod(key: string) {
  return isMac() ? `⌘${key}` : `Ctrl+${key}`
}

// ─── TopbarMenu component ─────────────────────────────────────────────────────

/**
 * TopbarMenu
 * IDE-style menu bar (File / Edit / View / Insert / Run / Help) rendered
 * above the existing icon toolbar.  Each menu group opens a dropdown on click
 * and closes when the user clicks outside or presses Escape.
 */
export function TopbarMenu() {
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null)
  const menuBarRef = useRef<HTMLDivElement>(null)

  // ── Custom dialog state ────────────────────────────────────────────────────
  const [dialog, setDialog] = useState<{
    open: boolean
    title: string
    message: string
    danger: boolean
    hideCancel: boolean
    onConfirm: () => void
  }>({
    open: false, title: '', message: '', danger: false, hideCancel: false, onConfirm: () => { },
  })

  const openConfirm = useCallback((title: string, message: string, danger: boolean, onConfirm: () => void) => {
    setDialog({ open: true, title, message, danger, hideCancel: false, onConfirm })
  }, [])

  const openAlert = useCallback((title: string, message: string) => {
    setDialog({ open: true, title, message, danger: false, hideCancel: true, onConfirm: () => setDialog((d) => ({ ...d, open: false })) })
  }, [])

  const closeDialog = useCallback(() => setDialog((d) => ({ ...d, open: false })), [])

  // ── Store selectors ────────────────────────────────────────────────────────
  const project = useBuilderStore((s) => s.project)
  const viewport = useBuilderStore((s) => s.viewport)
  const showGrid = useBuilderStore((s) => s.showGrid)
  const showCode = useBuilderStore((s) => s.showCode)
  const showPreview = useBuilderStore((s) => s.showPreview)
  const zoom = useBuilderStore((s) => s.zoom)
  const selectedId = useBuilderStore((s) => s.selectedId)
  const clipboard = useBuilderStore((s) => s.clipboard)
  const past = useBuilderStore((s) => s.past)
  const future = useBuilderStore((s) => s.future)

  const undo = useBuilderStore((s) => s.undo)
  const redo = useBuilderStore((s) => s.redo)
  const setViewport = useBuilderStore((s) => s.setViewport)
  const zoomIn = useBuilderStore((s) => s.zoomIn)
  const zoomOut = useBuilderStore((s) => s.zoomOut)
  const resetZoom = useBuilderStore((s) => s.resetZoom)
  const toggleGrid = useBuilderStore((s) => s.toggleGrid)
  const addComponent = useBuilderStore((s) => s.addComponent)
  const deleteSelected = useBuilderStore((s) => s.deleteSelected)
  const duplicateComponent = useBuilderStore((s) => s.duplicateComponent)
  const copyComponent = useBuilderStore((s) => s.copyComponent)
  const pasteComponent = useBuilderStore((s) => s.pasteComponent)
  const resetProject = useBuilderStore((s) => s.resetProject)
  const loadProject = useBuilderStore((s) => s.loadProject)
  const setProjectName = useBuilderStore((s) => s.setProjectName)
  const setShowCode = useBuilderStore((s) => s.setShowCode)
  const setShowPreview = useBuilderStore((s) => s.setShowPreview)
  const setShowTemplateGallery = useBuilderStore((s) => s.setShowTemplateGallery)

  // ── Close on outside click ─────────────────────────────────────────────────
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // ── File operations ────────────────────────────────────────────────────────
  const handleSave = useCallback(() => {
    localStorage.setItem('mikeui_project', JSON.stringify(project))
  }, [project])

  const handleSaveAs = useCallback(() => {
    const name = window.prompt('Project name:', project.name)
    if (name) {
      setProjectName(name)
      localStorage.setItem('mikeui_project', JSON.stringify({ ...project, name }))
    }
  }, [project, setProjectName])

  const handleOpen = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        try {
          const schema = JSON.parse(ev.target?.result as string) as ProjectSchema
          loadProject(schema)
        } catch {
          openAlert('Invalid File', 'The selected file is not a valid MikeUI project JSON.')
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }, [loadProject])

  const handleExportHTML = useCallback(() => {
    const html = generateHTML(project.canvas)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}.html`
    a.click()
    URL.revokeObjectURL(url)
  }, [project])

  const handleExportReact = useCallback(() => {
    const code = generateReact(project.canvas)
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Page.tsx'
    a.click()
    URL.revokeObjectURL(url)
  }, [project])

  const handleExportJSON = useCallback(() => {
    const json = JSON.stringify(project, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [project])

  const handleClose = useCallback(() => {
    openConfirm(
      'Close Project',
      'Close this project? Unsaved changes will be lost.',
      false,
      () => { resetProject(); setDialog((d) => ({ ...d, open: false })) },
    )
  }, [openConfirm, resetProject])

  const handleImportTemplate = useCallback(() => {
    setShowTemplateGallery(true)
  }, [setShowTemplateGallery])

  // ── Run ────────────────────────────────────────────────────────────────────
  const handleRunInWindow = useCallback(() => {
    openPreviewWindow(project.canvas, project.name)
  }, [project])

  const handleMobilePreview = useCallback(() => {
    openMobilePreviewWindow(project.canvas, project.name)
  }, [project])

  const handleRefreshPreview = useCallback(() => {
    setShowPreview(false)
    requestAnimationFrame(() => setShowPreview(true))
  }, [setShowPreview])

  // ── Help ───────────────────────────────────────────────────────────────────
  const showShortcuts = useCallback(() => {
    openAlert(
      'Keyboard Shortcuts',
      `${mod('Z')}  Undo\n${mod('Y')} / ${mod('⇧Z')}  Redo\n${mod('S')}  Save\nEscape  Deselect\nDelete / Backspace  Delete selected`,
    )
  }, [openAlert])

  // ── Keyboard shortcuts handled here ───────────────────────────────────────
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      const mod = e.metaKey || e.ctrlKey
      if (mod && e.key === 's') { e.preventDefault(); handleSave() }
      if (mod && e.shiftKey && e.key === 's') { e.preventDefault(); handleSaveAs() }
      if (mod && e.key === 'o') { e.preventDefault(); handleOpen() }
      if (mod && e.key === '+' || (mod && e.key === '=')) { e.preventDefault(); zoomIn() }
      if (mod && e.key === '-') { e.preventDefault(); zoomOut() }
      if (mod && e.key === '0') { e.preventDefault(); resetZoom() }
      if (mod && e.key === 'g') { e.preventDefault(); toggleGrid() }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) { e.preventDefault(); deleteSelected() }
      if (mod && e.key === 'c' && selectedId) { e.preventDefault(); copyComponent(selectedId) }
      if (mod && e.key === 'v') { e.preventDefault(); pasteComponent() }
      if (mod && e.key === 'd' && selectedId) { e.preventDefault(); duplicateComponent(selectedId) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSave, handleSaveAs, handleOpen, zoomIn, zoomOut, resetZoom, toggleGrid, selectedId, deleteSelected, copyComponent, pasteComponent, duplicateComponent])

  // ── Menu definitions ───────────────────────────────────────────────────────
  const menuGroups: MenuGroupDef[] = [
    {
      id: 'file',
      label: 'File',
      items: [
        {
          id: 'new',
          label: 'New Project',
          shortcut: mod('N'),
          action: () => {
            openConfirm(
              'New Project',
              'Start a new project? Unsaved changes will be lost.',
              false,
              () => { resetProject(); setDialog((d) => ({ ...d, open: false })) },
            )
          },
        },
        {
          id: 'open',
          label: 'Open Project…',
          shortcut: mod('O'),
          action: handleOpen,
        },
        { id: 's1', label: '', separator: true, action: undefined },
        {
          id: 'save',
          label: 'Save',
          shortcut: mod('S'),
          action: handleSave,
        },
        {
          id: 'save-as',
          label: 'Save As…',
          shortcut: `${mod('⇧')}S`,
          action: handleSaveAs,
        },
        { id: 's2', label: '', separator: true, action: undefined },
        {
          id: 'export',
          label: 'Export Code',
          submenu: [
            { id: 'exp-html', label: 'HTML + Tailwind', action: handleExportHTML },
            { id: 'exp-react', label: 'React (JSX)', action: handleExportReact },
            { id: 'exp-json', label: 'Project JSON', action: handleExportJSON },
          ],
        },
        {
          id: 'import-template',
          label: 'Import Template…',
          action: handleImportTemplate,
        },
        { id: 's3', label: '', separator: true, action: undefined },
        {
          id: 'close',
          label: 'Close Project',
          danger: true,
          action: handleClose,
        },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      items: [
        {
          id: 'undo',
          label: 'Undo',
          shortcut: mod('Z'),
          disabled: past.length === 0,
          action: undo,
        },
        {
          id: 'redo',
          label: 'Redo',
          shortcut: mod('Y'),
          disabled: future.length === 0,
          action: redo,
        },
        { id: 's1', label: '', separator: true, action: undefined },
        {
          id: 'copy',
          label: 'Copy',
          shortcut: mod('C'),
          disabled: !selectedId,
          action: () => { if (selectedId) copyComponent(selectedId) },
        },
        {
          id: 'paste',
          label: 'Paste',
          shortcut: mod('V'),
          disabled: !clipboard,
          action: pasteComponent,
        },
        { id: 's2', label: '', separator: true, action: undefined },
        {
          id: 'duplicate',
          label: 'Duplicate Component',
          shortcut: mod('D'),
          disabled: !selectedId,
          action: () => { if (selectedId) duplicateComponent(selectedId) },
        },
        {
          id: 'delete',
          label: 'Delete',
          shortcut: '⌫',
          disabled: !selectedId,
          danger: true,
          action: deleteSelected,
        },
      ],
    },
    {
      id: 'view',
      label: 'View',
      items: [
        {
          id: 'desktop',
          label: 'Desktop',
          shortcut: '⌥1',
          checked: viewport === 'desktop',
          action: () => setViewport('desktop'),
        },
        {
          id: 'tablet',
          label: 'Tablet',
          shortcut: '⌥2',
          checked: viewport === 'tablet',
          action: () => setViewport('tablet'),
        },
        {
          id: 'mobile',
          label: 'Mobile',
          shortcut: '⌥3',
          checked: viewport === 'mobile',
          action: () => setViewport('mobile'),
        },
        { id: 's1', label: '', separator: true, action: undefined },
        {
          id: 'zoom-in',
          label: 'Zoom In',
          shortcut: mod('+'),
          action: zoomIn,
        },
        {
          id: 'zoom-out',
          label: 'Zoom Out',
          shortcut: mod('-'),
          action: zoomOut,
        },
        {
          id: 'zoom-reset',
          label: `Reset Zoom (${zoom}%)`,
          shortcut: mod('0'),
          action: resetZoom,
        },
        { id: 's2', label: '', separator: true, action: undefined },
        {
          id: 'grid',
          label: 'Toggle Layout Grid',
          shortcut: mod('G'),
          checked: showGrid,
          action: toggleGrid,
        },
        { id: 's3', label: '', separator: true, action: undefined },
        {
          id: 'code',
          label: 'Show Code Panel',
          action: () => { setShowCode(true); setShowPreview(false) },
        },
        {
          id: 'preview',
          label: 'Show Preview',
          action: () => { setShowPreview(true); setShowCode(false) },
        },
      ],
    },
    {
      id: 'insert',
      label: 'Insert',
      items: [
        {
          id: 'ins-btn',
          label: 'Button',
          action: () => addComponent('button'),
        },
        {
          id: 'ins-navbar',
          label: 'Navbar',
          action: () => addComponent('navbar'),
        },
        {
          id: 'ins-card',
          label: 'Card',
          action: () => addComponent('card'),
        },
        {
          id: 'ins-input',
          label: 'Input',
          action: () => addComponent('input'),
        },
        {
          id: 'ins-section',
          label: 'Section',
          action: () => addComponent('section'),
        },
        {
          id: 'ins-text',
          label: 'Text',
          action: () => addComponent('text'),
        },
        {
          id: 'ins-badge',
          label: 'Badge',
          action: () => addComponent('badge'),
        },
        {
          id: 'ins-divider',
          label: 'Divider',
          action: () => addComponent('divider'),
        },
        {
          id: 'ins-bottomnav',
          label: 'Bottom Nav',
          action: () => addComponent('bottomnav'),
        },
        { id: 's1', label: '', separator: true, action: undefined },
        {
          id: 'ins-template',
          label: 'Add from Template…',
          action: handleImportTemplate,
        },
      ],
    },
    {
      id: 'run',
      label: 'Run',
      items: [
        {
          id: 'run-window',
          label: 'Open Preview in New Window',
          shortcut: mod('⇧P'),
          disabled: project.canvas.length === 0,
          action: handleRunInWindow,
        },
        {
          id: 'run-mobile',
          label: 'Simulate Mobile App Mode',
          disabled: project.canvas.length === 0,
          action: handleMobilePreview,
        },
        {
          id: 'run-refresh',
          label: 'Refresh Preview',
          shortcut: mod('R'),
          action: handleRefreshPreview,
        },
        { id: 's1', label: '', separator: true, action: undefined },
        {
          id: 'run-code',
          label: 'View Generated Code',
          action: () => { setShowCode(true); setShowPreview(false) },
        },
      ],
    },
    {
      id: 'help',
      label: 'Help',
      items: [
        {
          id: 'shortcuts',
          label: 'Keyboard Shortcuts',
          shortcut: '?',
          action: showShortcuts,
        },
        {
          id: 'about',
          label: 'About MikeUI',
          action: () => openAlert('MikeUI v1.0', 'A production-ready visual UI builder with an Apple-inspired design system.'),
        },
      ],
    },
  ]

  function handleMenuClick(id: MenuId) {
    setOpenMenu(openMenu === id ? null : id)
  }

  function handleItemClick(item: MenuItemDef) {
    if (item.disabled || !item.action) return
    item.action()
    setOpenMenu(null)
  }

  const viewportOptions: { value: 'desktop' | 'tablet' | 'mobile'; icon: typeof Monitor; label: string }[] = [
    { value: 'desktop', icon: Monitor, label: 'Desktop' },
    { value: 'tablet', icon: Tablet, label: 'Tablet' },
    { value: 'mobile', icon: Smartphone, label: 'Mobile' },
  ]

  const handleExportHTMLToolbar = () => {
    const html = generateHTML(project.canvas)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportJSONToolbar = () => {
    const json = JSON.stringify(project, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSaveWithFeedback = () => {
    handleSave()
    const btn = document.getElementById('save-btn-unified')
    if (btn) {
      btn.textContent = 'Saved!'
      setTimeout(() => { if (btn) btn.textContent = 'Save' }, 1500)
    }
  }

  return (
    <div
      ref={menuBarRef}
      className="h-14 bg-white border-b border-border-light flex items-center px-4 flex-shrink-0 select-none relative z-[200] gap-3"
    >
      {/* ── Brand icon ────────────────────────────────────────────────────── */}
      <div className="flex items-center flex-shrink-0">
        <button
          onClick={() => useBuilderStore.getState().setShowHome(true)}
          className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center hover:bg-accent-hover transition-all duration-150 shadow-soft"
          title="Home"
        >
          <span className="text-white text-xs font-bold">M</span>
        </button>
      </div>

      <div className="w-px h-5 bg-border-light flex-shrink-0" />

      {/* ── Dropdown menus ────────────────────────────────────────────────── */}
      <div className="flex items-stretch h-full">
        {menuGroups.map((group) => (
          <div key={group.id} className="relative flex items-stretch">
            <button
              onClick={() => handleMenuClick(group.id)}
              onMouseEnter={() => { if (openMenu !== null) setOpenMenu(group.id) }}
              className={cn(
                'px-3 text-sm font-medium transition-colors duration-100 rounded flex items-center h-full',
                openMenu === group.id
                  ? 'text-accent'
                  : 'text-text-secondary hover:text-accent',
              )}
            >
              {group.label}
            </button>

            {openMenu === group.id && (
              <Dropdown
                items={group.items}
                onItemClick={handleItemClick}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Spacer ────────────────────────────────────────────────────────── */}
      <div className="flex-1" />

      {/* ── Zoom badge (when not 100%) ─────────────────────────────────── */}
      {zoom !== 100 && (
        <span
          className="px-1.5 py-0.5 text-xs bg-surface-secondary rounded text-text-secondary cursor-pointer"
          onClick={resetZoom}
          title="Click to reset zoom"
        >
          {zoom}%
        </span>
      )}

      {/* ── Component count ───────────────────────────────────────────────── */}
      <span className="text-xs text-text-tertiary">
        {project.canvas.length} component{project.canvas.length !== 1 ? 's' : ''}
      </span>

      <div className="w-px h-5 bg-border-light" />

      {/* ── Templates ─────────────────────────────────────────────────────── */}
      <button
        onClick={() => setShowTemplateGallery(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border-light transition-all duration-150"
      >
        <Layers size={15} />
        Templates
      </button>

      <div className="w-px h-5 bg-border-light" />

      {/* ── Undo / Redo ───────────────────────────────────────────────────── */}
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

      <div className="w-px h-5 bg-border-light" />

      {/* ── Viewport switcher ─────────────────────────────────────────────── */}
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

      <div className="w-px h-5 bg-border-light" />

      {/* ── Code / Preview ────────────────────────────────────────────────── */}
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

      <div className="w-px h-5 bg-border-light" />

      {/* ── Save ──────────────────────────────────────────────────────────── */}
      <button
        id="save-btn-unified"
        onClick={handleSaveWithFeedback}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border-light transition-all duration-150"
      >
        <Save size={15} />
        Save
      </button>

      {/* ── Export dropdown ───────────────────────────────────────────────── */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent-hover shadow-soft transition-all duration-150">
          <Download size={15} />
          Export
        </button>
        <div className="absolute right-0 top-full mt-1 w-44 bg-white/60 backdrop-blur-xl backdrop-saturate-150 rounded-lg shadow-soft-md border border-white/60 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
          <button
            onClick={handleExportHTMLToolbar}
            className="w-[calc(100%-8px)] mx-1 rounded-md text-left px-3 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors"
          >
            HTML + Tailwind
          </button>
          <button
            onClick={() => { const code = generateReact(project.canvas); const blob = new Blob([code], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Page.tsx'; a.click(); URL.revokeObjectURL(url) }}
            className="w-[calc(100%-8px)] mx-1 rounded-md text-left px-3 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors"
          >
            React (JSX)
          </button>
          <button
            onClick={handleExportJSONToolbar}
            className="w-[calc(100%-8px)] mx-1 rounded-md text-left px-3 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors"
          >
            Project JSON
          </button>
        </div>
      </div>

      {/* ── Reset ─────────────────────────────────────────────────────────── */}
      <button
        onClick={() => openConfirm(
          'Reset Project',
          'Reset the project? All components will be removed. This cannot be undone.',
          true,
          () => { resetProject(); setDialog((d) => ({ ...d, open: false })) },
        )}
        className="p-2 rounded-md text-text-tertiary hover:text-danger hover:bg-danger-light transition-all duration-150"
        title="Reset project"
      >
        <Trash2 size={16} />
      </button>

      <ConfirmDialog
        open={dialog.open}
        title={dialog.title}
        message={dialog.message}
        danger={dialog.danger}
        hideCancel={dialog.hideCancel}
        confirmLabel={dialog.hideCancel ? 'OK' : dialog.danger ? 'Reset' : 'Continue'}
        onConfirm={dialog.onConfirm}
        onCancel={closeDialog}
      />
    </div>
  )
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────

interface DropdownProps {
  items: MenuItemDef[]
  onItemClick: (item: MenuItemDef) => void
  submenuSide?: 'right' | 'left'
}

function Dropdown({ items, onItemClick, submenuSide = 'right' }: DropdownProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  return (
    <div
      className={cn(
        'absolute top-full mt-0.5 min-w-[220px] bg-white/60 rounded-lg shadow-soft-md',
        'border border-white/60 py-1 z-[300] animate-scale-in',
        'backdrop-blur-xl backdrop-saturate-150',
      )}
      style={{
        left: submenuSide === 'right' ? 0 : 'auto',
        right: submenuSide === 'left' ? 0 : 'auto',
      }}
    >
      {items.map((item) => {
        if (item.separator) {
          return <div key={item.id} className="my-1 border-t border-border-light" />
        }

        const hasSubmenu = item.submenu && item.submenu.length > 0
        const isDisabled = item.disabled

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => { if (hasSubmenu) setOpenSubmenu(item.id) }}
            onMouseLeave={() => { if (hasSubmenu) setOpenSubmenu(null) }}
          >
            <button
              onClick={() => {
                if (hasSubmenu) return
                onItemClick(item)
              }}
              disabled={isDisabled}
              className={cn(
                'w-[calc(100%-8px)] mx-1 rounded-md text-left flex items-center justify-between gap-3 px-3 py-1.5 text-sm',
                'transition-colors duration-100',
                isDisabled
                  ? 'text-text-tertiary cursor-not-allowed'
                  : item.danger
                    ? 'text-danger hover:bg-danger-light'
                    : 'text-text-primary hover:bg-surface-secondary',
              )}
            >
              <span className="flex items-center gap-2">
                {/* Checkmark for checked items */}
                <span className="w-4 flex-shrink-0">
                  {item.checked && <Check size={12} className="text-accent" />}
                </span>
                {item.label}
              </span>

              <span className="flex items-center gap-1 flex-shrink-0">
                {item.shortcut && (
                  <kbd className="text-xs text-text-tertiary font-mono">{item.shortcut}</kbd>
                )}
                {hasSubmenu && (
                  <ChevronRight size={12} className="text-text-tertiary" />
                )}
              </span>
            </button>

            {/* Submenu */}
            {hasSubmenu && openSubmenu === item.id && (
              <div className="absolute left-full top-0 ml-1">
                <Dropdown
                  items={item.submenu!}
                  onItemClick={onItemClick}
                  submenuSide="right"
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
