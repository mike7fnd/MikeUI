import { useState, useMemo } from 'react'
import { useBuilderStore } from '../../store/builderStore'
import { componentsByCategory, componentRegistry } from '../../registry/componentRegistry'
import { cn } from '../../utils/cn'
import type { ComponentType } from '../../types/schema'
import type { LucideIcon } from 'lucide-react'
import { generateHTML } from '../../generator/htmlGenerator'
import { generateReact } from '../../generator/reactGenerator'
import { ConfirmDialog } from './ConfirmDialog'
import {
  LayoutGrid,
  Layers,
  Settings,
  FileCode2,
  ChevronRight,
  ChevronDown,
  Trash2,
  Copy,
  Monitor,
  Tablet,
  Smartphone,
  Grid3X3,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  Code2,
  Pencil,
  Moon,
  Sun,
  FileCode,
  Braces,
  ClipboardCopy,
  Download,
  Pin,
  PinOff,
  Plus,
  X,
  Puzzle,
  Box,
  Star,
  Zap,
  Heart,
  Globe,
  Package,
  Hash,
  Sparkles,
  Check,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type PanelId = 'components' | 'layers' | 'files' | 'settings'

const categoryLabels: Record<string, string> = {
  navigation: 'Navigation',
  layout: 'Layout',
  content: 'Content',
  form: 'Form',
  feedback: 'Feedback',
}

const categoryOrder = ['navigation', 'layout', 'content', 'form', 'feedback']

// ─── Custom component definitions ─────────────────────────────────────────────

export interface CustomComponentDef {
  id: string
  label: string
  description: string
  baseType: ComponentType
  iconName: string
  category: string
}

const CUSTOM_ICON_OPTIONS: { name: string; Icon: LucideIcon }[] = [
  { name: 'puzzle', Icon: Puzzle },
  { name: 'box', Icon: Box },
  { name: 'star', Icon: Star },
  { name: 'zap', Icon: Zap },
  { name: 'heart', Icon: Heart },
  { name: 'globe', Icon: Globe },
  { name: 'package', Icon: Package },
  { name: 'hash', Icon: Hash },
  { name: 'sparkles', Icon: Sparkles },
  { name: 'layers', Icon: Layers },
]

const CUSTOM_ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
  CUSTOM_ICON_OPTIONS.map(({ name, Icon }) => [name, Icon]),
)

function useCustomComponents() {
  const [defs, setDefs] = useState<CustomComponentDef[]>(() => {
    try { return JSON.parse(localStorage.getItem('mikeui-custom-components') ?? '[]') } catch { return [] }
  })

  const persist = (d: CustomComponentDef[]) => {
    setDefs(d)
    localStorage.setItem('mikeui-custom-components', JSON.stringify(d))
  }

  const add = (def: Omit<CustomComponentDef, 'id'>) =>
    persist([...defs, { ...def, id: `custom_${Date.now()}` }])

  const remove = (id: string) => persist(defs.filter((d) => d.id !== id))

  return { defs, add, remove }
}

// ─── Create Component Form ────────────────────────────────────────────────────

interface CreateFormState {
  label: string
  description: string
  baseType: ComponentType
  iconName: string
}

function CreateComponentForm({
  form,
  setForm,
  onSave,
  onCancel,
}: {
  form: CreateFormState
  setForm: React.Dispatch<React.SetStateAction<CreateFormState>>
  onSave: () => void
  onCancel: () => void
}) {
  const componentTypes: ComponentType[] = ['button', 'navbar', 'card', 'input', 'section', 'text', 'badge', 'divider', 'bottomnav']

  return (
    <div className="border-b border-border-light bg-surface-secondary/60 px-3 py-3 space-y-2.5 flex-shrink-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-semibold text-text-primary uppercase tracking-wider">New Component</span>
        <button onClick={onCancel} className="p-0.5 rounded text-text-tertiary hover:text-text-primary transition-colors">
          <X size={12} />
        </button>
      </div>

      {/* Name */}
      <input
        type="text"
        placeholder="Component name *"
        value={form.label}
        onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
        className="w-full text-[12px] bg-white border border-border rounded-md px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-text-primary placeholder:text-text-tertiary"
      />

      {/* Description */}
      <input
        type="text"
        placeholder="Short description (optional)"
        value={form.description}
        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        className="w-full text-[12px] bg-white border border-border rounded-md px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-text-primary placeholder:text-text-tertiary"
      />

      {/* Base type */}
      <div>
        <div className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider mb-1">Base type</div>
        <select
          value={form.baseType}
          onChange={(e) => setForm((f) => ({ ...f, baseType: e.target.value as ComponentType }))}
          className="w-full text-[12px] bg-white border border-border rounded-md px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-text-primary capitalize"
        >
          {componentTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Icon picker */}
      <div>
        <div className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider mb-1.5">Icon</div>
        <div className="flex flex-wrap gap-1">
          {CUSTOM_ICON_OPTIONS.map(({ name, Icon }) => (
            <button
              key={name}
              onClick={() => setForm((f) => ({ ...f, iconName: name }))}
              title={name}
              className={cn(
                'w-7 h-7 flex items-center justify-center rounded-md transition-all duration-150',
                form.iconName === name
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-secondary hover:border-accent hover:text-accent',
              )}
            >
              <Icon size={13} />
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 pt-0.5">
        <button
          onClick={onSave}
          disabled={!form.label.trim()}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md bg-accent text-white text-[12px] font-semibold disabled:opacity-40 hover:bg-accent-hover transition-all"
        >
          <Check size={12} />
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex-1 py-1.5 rounded-md bg-white border border-border text-text-secondary text-[12px] font-medium hover:bg-surface-secondary transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// ─── Activity rail items ───────────────────────────────────────────────────────

const railItems: { id: PanelId; icon: typeof LayoutGrid; label: string }[] = [
  { id: 'components', icon: LayoutGrid, label: 'Components' },
  { id: 'layers', icon: Layers, label: 'Layers' },
  { id: 'files', icon: FileCode2, label: 'Files' },
]

// ─── Components panel ─────────────────────────────────────────────────────────

function ComponentsPanel() {
  const addComponent = useBuilderStore((s) => s.addComponent)
  const setDraggingType = useBuilderStore((s) => s.setDraggingType)
  const { defs: customDefs, add: addCustomDef, remove: removeCustomDef } = useCustomComponents()

  // ── Pin / collapse state (persisted to localStorage) ──────────────────────
  const [pinnedCats, setPinnedCats] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('mikeui-pinned-cats') ?? '[]') } catch { return [] }
  })
  const [collapsedCats, setCollapsedCats] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('mikeui-collapsed-cats') ?? '[]') } catch { return [] }
  })

  const togglePin = (cat: string) => {
    const next = pinnedCats.includes(cat)
      ? pinnedCats.filter((c) => c !== cat)
      : [...pinnedCats, cat]
    setPinnedCats(next)
    localStorage.setItem('mikeui-pinned-cats', JSON.stringify(next))
  }

  const toggleCollapse = (cat: string) => {
    const next = collapsedCats.includes(cat)
      ? collapsedCats.filter((c) => c !== cat)
      : [...collapsedCats, cat]
    setCollapsedCats(next)
    localStorage.setItem('mikeui-collapsed-cats', JSON.stringify(next))
  }

  // ── Create component form ─────────────────────────────────────────────────
  const [createOpen, setCreateOpen] = useState(false)
  const [form, setForm] = useState<{ label: string; description: string; baseType: ComponentType; iconName: string }>({
    label: '', description: '', baseType: 'section', iconName: 'puzzle',
  })

  const handleSaveCustom = () => {
    if (!form.label.trim()) return
    addCustomDef({ ...form, category: 'custom' })
    setForm({ label: '', description: '', baseType: 'section', iconName: 'puzzle' })
    setCreateOpen(false)
  }

  // ── Drag helpers ──────────────────────────────────────────────────────────
  const handleDragStart = (e: React.DragEvent, type: ComponentType) => {
    e.dataTransfer.setData('componentType', type)
    e.dataTransfer.effectAllowed = 'copy'
    setDraggingType(type)
  }
  const handleDragEnd = () => setDraggingType(null)

  // ── Category ordering (pinned first) ─────────────────────────────────────
  const pinnedOrder = pinnedCats.filter((c) => categoryOrder.includes(c))
  const unpinnedOrder = categoryOrder.filter((c) => !pinnedCats.includes(c))
  const orderedCats = [...pinnedOrder, ...unpinnedOrder]

  const renderCategory = (cat: string) => {
    const items = componentsByCategory[cat]
    if (!items?.length) return null
    const isPinned = pinnedCats.includes(cat)
    const isCollapsed = collapsedCats.includes(cat)

    return (
      <div key={cat} className="mb-1">
        {/* Section header */}
        <div
          className="group/cat px-3 pt-3 pb-1 flex items-center justify-between cursor-pointer select-none"
          onClick={() => toggleCollapse(cat)}
        >
          <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-widest flex items-center gap-1.5">
            {isPinned && <Pin size={8} className="text-accent fill-accent flex-shrink-0" />}
            {categoryLabels[cat]}
          </span>
          <div className="flex items-center gap-0.5 opacity-0 group-hover/cat:opacity-100 transition-opacity duration-150">
            <button
              onClick={(e) => { e.stopPropagation(); togglePin(cat) }}
              title={isPinned ? 'Unpin' : 'Pin to top'}
              className={cn(
                'p-1 rounded-md transition-colors',
                isPinned
                  ? 'text-accent hover:bg-accent/10'
                  : 'text-text-tertiary hover:text-accent hover:bg-accent/10',
              )}
            >
              {isPinned ? <PinOff size={10} /> : <Pin size={10} />}
            </button>
            <ChevronDown
              size={11}
              className={cn(
                'text-text-tertiary transition-transform duration-200',
                isCollapsed ? '-rotate-90' : 'rotate-0',
              )}
            />
          </div>
        </div>

        {!isCollapsed && (
          <div className="px-2 space-y-0.5">
            {items.map((comp) => {
              const Icon = comp.icon
              return (
                <div
                  key={comp.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, comp.type)}
                  onDragEnd={handleDragEnd}
                  onClick={() => addComponent(comp.type)}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-md cursor-pointer hover:bg-surface-secondary transition-all duration-150 group select-none"
                >
                  <div className="w-7 h-7 rounded-md bg-accent-light flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-all duration-150">
                    <Icon size={14} className="text-accent group-hover:text-white transition-colors duration-150" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium text-text-primary leading-none mb-0.5">{comp.label}</div>
                    <div className="text-[11px] text-text-tertiary truncate leading-none">{comp.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const isCustomCollapsed = collapsedCats.includes('__custom__')

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border-light flex-shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-semibold text-text-primary tracking-wider uppercase">Components</h2>
          <p className="text-[11px] text-text-tertiary mt-0.5">Drag or click to add</p>
        </div>
        <button
          onClick={() => setCreateOpen((v) => !v)}
          title={createOpen ? 'Cancel' : 'Create custom component'}
          className={cn(
            'w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-150',
            createOpen
              ? 'bg-accent text-white'
              : 'bg-surface-secondary text-text-secondary hover:bg-accent/10 hover:text-accent',
          )}
        >
          {createOpen ? <X size={13} /> : <Plus size={13} />}
        </button>
      </div>

      {/* Create component inline form */}
      {createOpen && (
        <CreateComponentForm
          form={form}
          setForm={setForm}
          onSave={handleSaveCustom}
          onCancel={() => setCreateOpen(false)}
        />
      )}

      {/* Component list */}
      <div className="flex-1 overflow-y-auto py-2">
        {/* Pinned separator */}
        {pinnedOrder.length > 0 && (
          <div className="px-4 pb-1">
            <div className="flex items-center gap-1.5">
              <Pin size={8} className="text-accent fill-accent flex-shrink-0" />
              <span className="text-[9px] font-semibold text-accent uppercase tracking-widest">Pinned</span>
              <div className="flex-1 h-px bg-accent/15" />
            </div>
          </div>
        )}

        {orderedCats.map((cat) => renderCategory(cat))}

        {/* Custom section */}
        <div className="mb-1 mt-1">
          <div
            className="group/cat px-3 pt-3 pb-1 flex items-center justify-between cursor-pointer select-none"
            onClick={() => toggleCollapse('__custom__')}
          >
            <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-widest flex items-center gap-1.5">
              <Puzzle size={9} className="flex-shrink-0" />
              Custom
              {customDefs.length > 0 && (
                <span className="px-1 py-px rounded bg-accent/10 text-accent text-[9px] font-bold">{customDefs.length}</span>
              )}
            </span>
            <ChevronDown
              size={11}
              className={cn(
                'text-text-tertiary transition-transform duration-200 opacity-0 group-hover/cat:opacity-100',
                isCustomCollapsed ? '-rotate-90' : 'rotate-0',
              )}
            />
          </div>

          {!isCustomCollapsed && (
            <div className="px-2 space-y-0.5">
              {customDefs.length === 0 ? (
                <div className="px-2 py-4 text-center">
                  <Puzzle size={18} className="mx-auto mb-2 text-text-tertiary/30" />
                  <p className="text-[11px] text-text-tertiary leading-snug">
                    No custom components yet.<br />
                    Click <span className="font-semibold text-accent">+</span> to create one.
                  </p>
                </div>
              ) : (
                customDefs.map((def) => {
                  const Icon = CUSTOM_ICON_MAP[def.iconName] ?? Puzzle
                  return (
                    <div
                      key={def.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, def.baseType)}
                      onDragEnd={handleDragEnd}
                      onClick={() => addComponent(def.baseType)}
                      className="group flex items-center gap-2.5 px-2.5 py-2 rounded-md cursor-pointer hover:bg-surface-secondary transition-all duration-150 select-none"
                    >
                      <div className="w-7 h-7 rounded-md bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500 transition-all duration-150">
                        <Icon size={14} className="text-purple-500 group-hover:text-white transition-colors duration-150" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-medium text-text-primary leading-none mb-0.5 truncate">{def.label}</div>
                        <div className="text-[11px] text-text-tertiary truncate leading-none">{def.description || def.baseType}</div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeCustomDef(def.id) }}
                        title="Delete"
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-danger-light hover:text-danger text-text-tertiary transition-all"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-border-light flex-shrink-0">
        <p className="text-[11px] text-text-tertiary">
          {componentRegistry.length} built-in · {customDefs.length} custom
        </p>
      </div>
    </div>
  )
}

// ─── Layers panel ─────────────────────────────────────────────────────────────

function LayersPanel() {
  const canvas = useBuilderStore((s) => s.project.canvas)
  const selectedId = useBuilderStore((s) => s.selectedId)
  const selectComponent = useBuilderStore((s) => s.selectComponent)
  const removeComponent = useBuilderStore((s) => s.removeComponent)
  const duplicateComponent = useBuilderStore((s) => s.duplicateComponent)

  const getMeta = (type: string) => componentRegistry.find((c) => c.type === type)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border-light flex-shrink-0">
        <h2 className="text-xs font-semibold text-text-primary tracking-wider uppercase">Layers</h2>
        <p className="text-[11px] text-text-tertiary mt-0.5">
          {canvas.length} component{canvas.length !== 1 ? 's' : ''} on canvas
        </p>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto py-2">
        {canvas.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-36 gap-2 px-4 text-center">
            <Layers size={22} className="text-text-tertiary/40" />
            <p className="text-[12px] text-text-tertiary leading-snug">
              No components yet.<br />Add one from the Components panel.
            </p>
          </div>
        ) : (
          <div className="px-2 space-y-0.5">
            {[...canvas].reverse().map((item, reverseIdx) => {
              const idx = canvas.length - 1 - reverseIdx
              const meta = getMeta(item.type)
              const Icon = meta?.icon
              const isSelected = selectedId === item.id

              return (
                <div
                  key={item.id}
                  onClick={() => selectComponent(isSelected ? null : item.id)}
                  className={cn(
                    'group flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer transition-all duration-150 select-none border',
                    isSelected
                      ? 'bg-accent/10 border-accent/25'
                      : 'hover:bg-surface-secondary border-transparent',
                  )}
                >
                  {/* Tree indent stub */}
                  <ChevronRight size={11} className="text-text-tertiary/30 flex-shrink-0" />

                  {/* Icon */}
                  <div className={cn(
                    'w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-all duration-150',
                    isSelected ? 'bg-accent text-white' : 'bg-accent-light text-accent',
                  )}>
                    {Icon ? <Icon size={12} /> : null}
                  </div>

                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <div className={cn(
                      'text-[12px] font-medium leading-none mb-0.5 truncate',
                      isSelected ? 'text-accent' : 'text-text-primary',
                    )}>
                      {meta?.label ?? item.type}
                    </div>
                    <div className="text-[10px] text-text-tertiary leading-none font-mono">
                      #{idx + 1} · {item.type}
                    </div>
                  </div>

                  {/* Hover actions */}
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <button
                      onClick={(e) => { e.stopPropagation(); duplicateComponent(item.id) }}
                      className="p-1 rounded hover:bg-accent/10 hover:text-accent text-text-tertiary transition-colors"
                      title="Duplicate"
                    >
                      <Copy size={11} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeComponent(item.id) }}
                      className="p-1 rounded hover:bg-danger-light hover:text-danger text-text-tertiary transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {canvas.length > 0 && (
        <div className="px-4 py-2.5 border-t border-border-light flex-shrink-0">
          <p className="text-[11px] text-text-tertiary">Top of list = topmost layer</p>
        </div>
      )}
    </div>
  )
}

// ─── Files panel ──────────────────────────────────────────────────────────────

type FileEntry = { name: string; lang: string; icon: typeof FileCode }

const FILE_LIST: FileEntry[] = [
  { name: 'index.html', lang: 'html', icon: FileCode },
  { name: 'Page.tsx', lang: 'tsx', icon: FileCode },
  { name: 'project.json', lang: 'json', icon: Braces },
]

function FilesPanel() {
  const activeFileName = useBuilderStore((s) => s.activeFileName)
  const setActiveFileName = useBuilderStore((s) => s.setActiveFileName)
  const setShowFilesEditor = useBuilderStore((s) => s.setShowFilesEditor)
  const setShowCode = useBuilderStore((s) => s.setShowCode)
  const setShowPreview = useBuilderStore((s) => s.setShowPreview)

  const openFile = (name: string) => {
    setActiveFileName(name)
    setShowFilesEditor(true)
    setShowCode(false)
    setShowPreview(false)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border-light flex-shrink-0">
        <h2 className="text-xs font-semibold text-text-primary tracking-wider uppercase">Files</h2>
        <p className="text-[11px] text-text-tertiary mt-0.5">Click a file to open in editor</p>
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-y-auto py-1">
        <div className="px-3 py-1.5">
          <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-widest">Output</span>
        </div>
        {FILE_LIST.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => openFile(name)}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-1.5 text-[12px] transition-colors duration-100',
              activeFileName === name
                ? 'bg-accent/8 text-accent font-medium'
                : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary',
            )}
          >
            <Icon size={13} className="flex-shrink-0" />
            <span className="truncate font-mono">{name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Settings panel ───────────────────────────────────────────────────────────

function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="text-[12px] text-text-secondary flex-shrink-0">{label}</span>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  )
}

function SectionHead({ title }: { title: string }) {
  return (
    <div className="px-4 pt-4 pb-1">
      <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-widest">{title}</span>
    </div>
  )
}

function SettingsPanel() {
  const project = useBuilderStore((s) => s.project)
  const viewport = useBuilderStore((s) => s.viewport)
  const zoom = useBuilderStore((s) => s.zoom)
  const showGrid = useBuilderStore((s) => s.showGrid)
  const showCode = useBuilderStore((s) => s.showCode)
  const showPreview = useBuilderStore((s) => s.showPreview)
  const darkMode = useBuilderStore((s) => s.darkMode)

  const setViewport = useBuilderStore((s) => s.setViewport)
  const setZoom = useBuilderStore((s) => s.setZoom)
  const zoomIn = useBuilderStore((s) => s.zoomIn)
  const zoomOut = useBuilderStore((s) => s.zoomOut)
  const resetZoom = useBuilderStore((s) => s.resetZoom)
  const toggleGrid = useBuilderStore((s) => s.toggleGrid)
  const setShowCode = useBuilderStore((s) => s.setShowCode)
  const setShowPreview = useBuilderStore((s) => s.setShowPreview)
  const setProjectName = useBuilderStore((s) => s.setProjectName)
  const resetProject = useBuilderStore((s) => s.resetProject)
  const toggleDarkMode = useBuilderStore((s) => s.toggleDarkMode)

  const [resetConfirmOpen, setResetConfirmOpen] = useState(false)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border-light flex-shrink-0">
        <h2 className="text-xs font-semibold text-text-primary tracking-wider uppercase">Settings</h2>
        <p className="text-[11px] text-text-tertiary mt-0.5">Canvas &amp; project options</p>
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* ── Project ─────────────────────────────────────────────────── */}
        <SectionHead title="Project" />
        <div className="px-4 divide-y divide-border-light/60">
          <div className="py-2">
            <label className="text-[10px] font-semibold text-text-tertiary uppercase tracking-widest mb-1.5 block">Name</label>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={project.name}
                onChange={(e) => setProjectName(e.target.value)}
                className="flex-1 min-w-0 text-[13px] font-medium text-text-primary bg-surface-secondary border border-border rounded-md px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              />
              <Pencil size={13} className="text-text-tertiary flex-shrink-0" />
            </div>
          </div>
          <SettingRow label="Components">
            <span className="text-[12px] font-semibold text-accent">{project.canvas.length}</span>
          </SettingRow>
          <div className="py-2">
            <button
              onClick={() => setResetConfirmOpen(true)}
              className="w-full text-left text-[12px] font-medium text-danger hover:bg-danger-light px-2.5 py-1.5 rounded-md transition-colors"
            >
              Reset project…
            </button>
          </div>
        </div>

        {/* ── Canvas ──────────────────────────────────────────────────── */}
        <SectionHead title="Canvas" />
        <div className="px-4 divide-y divide-border-light/60">

          {/* Viewport */}
          <div className="py-2">
            <label className="text-[10px] font-semibold text-text-tertiary uppercase tracking-widest mb-1.5 block">Viewport</label>
            <div className="flex items-center gap-1">
              {([
                { v: 'desktop' as const, icon: Monitor, label: 'Desktop' },
                { v: 'tablet' as const, icon: Tablet, label: 'Tablet' },
                { v: 'mobile' as const, icon: Smartphone, label: 'Mobile' },
              ]).map(({ v, icon: Icon, label }) => (
                <button
                  key={v}
                  onClick={() => setViewport(v)}
                  title={label}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md text-[11px] font-medium transition-all duration-150',
                    viewport === v
                      ? 'bg-accent text-white shadow-soft'
                      : 'bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border-light',
                  )}
                >
                  <Icon size={12} />
                  <span className="hidden xl:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Zoom */}
          <div className="py-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-semibold text-text-tertiary uppercase tracking-widest">Zoom</label>
              <span className="text-[12px] font-semibold text-accent tabular-nums">{zoom}%</span>
            </div>
            <input
              type="range"
              min={25}
              max={200}
              step={5}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-1.5 accent-accent rounded-full cursor-pointer"
            />
            <div className="flex items-center gap-1 mt-2">
              <button
                onClick={zoomOut}
                title="Zoom out"
                className="flex-1 flex items-center justify-center py-1.5 rounded-md bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border-light transition-all duration-150"
              >
                <ZoomOut size={13} />
              </button>
              <button
                onClick={resetZoom}
                title="Reset zoom"
                className="flex-1 flex items-center justify-center py-1.5 rounded-md bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border-light transition-all duration-150 text-[10px] font-medium"
              >
                <RotateCcw size={12} />
              </button>
              <button
                onClick={zoomIn}
                title="Zoom in"
                className="flex-1 flex items-center justify-center py-1.5 rounded-md bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border-light transition-all duration-150"
              >
                <ZoomIn size={13} />
              </button>
            </div>
          </div>

          {/* Grid */}
          <SettingRow label="Layout grid">
            <button
              onClick={toggleGrid}
              title="Toggle grid"
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-150',
                showGrid
                  ? 'bg-accent text-white shadow-soft'
                  : 'bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border-light',
              )}
            >
              <Grid3X3 size={12} />
              {showGrid ? 'On' : 'Off'}
            </button>
          </SettingRow>
        </div>

        {/* ── View ────────────────────────────────────────────────────── */}
        <SectionHead title="View" />
        <div className="px-4 divide-y divide-border-light/60">
          <SettingRow label="Code panel">
            <button
              onClick={() => { setShowCode(!showCode); if (!showCode) setShowPreview(false) }}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-150',
                showCode
                  ? 'bg-accent text-white shadow-soft'
                  : 'bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border-light',
              )}
            >
              <Code2 size={12} />
              {showCode ? 'Visible' : 'Hidden'}
            </button>
          </SettingRow>
          <SettingRow label="Preview panel">
            <button
              onClick={() => { setShowPreview(!showPreview); if (!showPreview) setShowCode(false) }}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-150',
                showPreview
                  ? 'bg-accent text-white shadow-soft'
                  : 'bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border-light',
              )}
            >
              <Eye size={12} />
              {showPreview ? 'Visible' : 'Hidden'}
            </button>
          </SettingRow>
          <SettingRow label="Dark mode">
            <button
              onClick={toggleDarkMode}
              title="Toggle dark mode"
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-150',
                darkMode
                  ? 'bg-accent text-white shadow-soft'
                  : 'bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border-light',
              )}
            >
              {darkMode ? <Moon size={12} /> : <Sun size={12} />}
              {darkMode ? 'On' : 'Off'}
            </button>
          </SettingRow>
        </div>

        <div className="h-4" />
      </div>

      <ConfirmDialog
        open={resetConfirmOpen}
        title="Reset Project"
        message="Clear all components and reset the project? This cannot be undone."
        danger
        confirmLabel="Reset"
        onConfirm={() => { resetProject(); setResetConfirmOpen(false) }}
        onCancel={() => setResetConfirmOpen(false)}
      />
    </div>
  )
}

// ─── Root sidebar ─────────────────────────────────────────────────────────────

/**
 * ComponentPalette
 * VS Code-style activity rail + collapsible panel drawer.
 * Click an icon to open/close its panel.
 */
export function ComponentPalette() {
  const [activePanel, setActivePanel] = useState<PanelId | null>('components')

  const toggle = (id: PanelId) =>
    setActivePanel((prev) => (prev === id ? null : id))

  return (
    <div className="flex h-full flex-shrink-0">
      {/* Activity rail */}
      <div className="w-12 bg-white border-r border-border-light flex flex-col items-center pt-2 pb-2 flex-shrink-0">
        {/* Top icons */}
        <div className="flex flex-col items-center gap-1">
          {railItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => toggle(id)}
              title={label}
              className={cn(
                'w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150',
                activePanel === id
                  ? 'text-accent'
                  : 'text-text-tertiary hover:text-text-primary hover:bg-surface-secondary',
              )}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom: Settings icon */}
        <button
          onClick={() => toggle('settings')}
          title="Settings"
          className={cn(
            'w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150 mb-1',
            activePanel === 'settings'
              ? 'text-accent'
              : 'text-text-tertiary hover:text-text-primary hover:bg-surface-secondary',
          )}
        >
          <Settings size={18} />
        </button>
      </div>

      {/* Panel drawer */}
      {activePanel !== null && (
        <div className={cn(
          'bg-white border-r border-border-light flex flex-col h-full overflow-hidden',
          activePanel === 'files' ? 'w-72' : 'w-56',
        )}>
          {activePanel === 'components' && <ComponentsPanel />}
          {activePanel === 'layers' && <LayersPanel />}
          {activePanel === 'files' && <FilesPanel />}
          {activePanel === 'settings' && <SettingsPanel />}
        </div>
      )}
    </div>
  )
}
