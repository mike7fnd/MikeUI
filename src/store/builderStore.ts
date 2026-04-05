import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { v4 as uuidv4 } from 'uuid'
import type {
  CanvasComponent,
  ComponentType,
  ComponentPropsMap,
  ProjectSchema,
} from '../types/schema'
import { defaultProps } from '../registry/componentRegistry'

// ─── History Entry ────────────────────────────────────────────────────────────

interface HistoryEntry {
  canvas: CanvasComponent[]
}

// ─── Builder State ────────────────────────────────────────────────────────────

interface BuilderState {
  project: ProjectSchema
  selectedId: string | null
  draggingType: ComponentType | null
  viewport: 'mobile' | 'tablet' | 'desktop'
  showCode: boolean
  codeTab: 'html' | 'react'
  showPreview: boolean
  showTemplateGallery: boolean
  showFilesEditor: boolean
  showHome: boolean
  activeFileName: string
  zoom: number
  showGrid: boolean
  clipboard: CanvasComponent | null
  past: HistoryEntry[]
  future: HistoryEntry[]
  darkMode: boolean

  // Canvas actions
  addComponent: (type: ComponentType, insertAfterId?: string | null) => void
  removeComponent: (id: string) => void
  updateProps: <T extends ComponentType>(
    id: string,
    props: Partial<ComponentPropsMap[T]>
  ) => void
  reorderComponents: (activeId: string, overId: string) => void
  duplicateComponent: (id: string) => void
  selectComponent: (id: string | null) => void

  // Viewport
  setViewport: (v: 'mobile' | 'tablet' | 'desktop') => void

  // UI toggles
  setShowCode: (v: boolean) => void
  setCodeTab: (v: 'html' | 'react') => void
  setShowPreview: (v: boolean) => void
  setDraggingType: (t: ComponentType | null) => void
  setShowTemplateGallery: (v: boolean) => void
  setShowFilesEditor: (v: boolean) => void
  setShowHome: (v: boolean) => void
  setActiveFileName: (f: string) => void

  // Canvas zoom + grid
  setZoom: (z: number) => void
  zoomIn: () => void
  zoomOut: () => void
  resetZoom: () => void
  setShowGrid: (v: boolean) => void
  toggleGrid: () => void

  // Clipboard
  copyComponent: (id: string) => void
  pasteComponent: () => void
  deleteSelected: () => void

  // Template loader
  loadTemplate: (canvas: CanvasComponent[], viewport?: 'mobile' | 'tablet' | 'desktop') => void

  // History
  undo: () => void
  redo: () => void

  // Project persistence
  loadProject: (schema: ProjectSchema) => void
  resetProject: () => void
  setProjectName: (name: string) => void

  // Theme
  toggleDarkMode: () => void
}

// ─── Default Project ──────────────────────────────────────────────────────────

const makeDefaultProject = (): ProjectSchema => ({
  id: uuidv4(),
  name: 'Untitled Project',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  canvas: [],
  viewport: 'desktop',
})

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBuilderStore = create<BuilderState>()(
  immer((set) => ({
    project: makeDefaultProject(),
    selectedId: null,
    draggingType: null,
    viewport: 'desktop',
    showCode: false,
    codeTab: 'html',
    showPreview: false,
    showTemplateGallery: false,
    showFilesEditor: false,
    showHome: false,
    activeFileName: 'index.html',
    zoom: 100,
    showGrid: false,
    clipboard: null,
    past: [],
    future: [],
    darkMode: false,

    // ── Snapshot helper ───────────────────────────────────────────────────────
    // Called before any canvas mutation to record history
    addComponent: (type, insertAfterId) => {
      set((state) => {
        // Record history
        state.past.push({ canvas: JSON.parse(JSON.stringify(state.project.canvas)) })
        state.future = []

        const newComponent: CanvasComponent = {
          id: uuidv4(),
          type,
          props: defaultProps[type] as never,
          order: state.project.canvas.length,
        }

        if (insertAfterId) {
          const idx = state.project.canvas.findIndex((c) => c.id === insertAfterId)
          state.project.canvas.splice(idx + 1, 0, newComponent)
        } else {
          state.project.canvas.push(newComponent)
        }

        // Re-index orders
        state.project.canvas.forEach((c, i) => { c.order = i })
        state.project.updatedAt = new Date().toISOString()
        state.selectedId = newComponent.id
      })
    },

    removeComponent: (id) => {
      set((state) => {
        state.past.push({ canvas: JSON.parse(JSON.stringify(state.project.canvas)) })
        state.future = []

        state.project.canvas = state.project.canvas.filter((c) => c.id !== id)
        state.project.canvas.forEach((c, i) => { c.order = i })
        state.project.updatedAt = new Date().toISOString()

        if (state.selectedId === id) state.selectedId = null
      })
    },

    updateProps: (id, props) => {
      set((state) => {
        const comp = state.project.canvas.find((c) => c.id === id)
        if (!comp) return

        state.past.push({ canvas: JSON.parse(JSON.stringify(state.project.canvas)) })
        state.future = []

        Object.assign(comp.props, props)
        state.project.updatedAt = new Date().toISOString()
      })
    },

    reorderComponents: (activeId, overId) => {
      set((state) => {
        state.past.push({ canvas: JSON.parse(JSON.stringify(state.project.canvas)) })
        state.future = []

        const canvas = state.project.canvas
        const activeIdx = canvas.findIndex((c) => c.id === activeId)
        const overIdx = canvas.findIndex((c) => c.id === overId)
        if (activeIdx === -1 || overIdx === -1) return

        const [moved] = canvas.splice(activeIdx, 1)
        canvas.splice(overIdx, 0, moved)
        canvas.forEach((c, i) => { c.order = i })
        state.project.updatedAt = new Date().toISOString()
      })
    },

    duplicateComponent: (id) => {
      set((state) => {
        state.past.push({ canvas: JSON.parse(JSON.stringify(state.project.canvas)) })
        state.future = []

        const idx = state.project.canvas.findIndex((c) => c.id === id)
        if (idx === -1) return

        const original = state.project.canvas[idx]
        const copy: CanvasComponent = {
          ...JSON.parse(JSON.stringify(original)),
          id: uuidv4(),
          order: idx + 1,
        }
        state.project.canvas.splice(idx + 1, 0, copy)
        state.project.canvas.forEach((c, i) => { c.order = i })
        state.project.updatedAt = new Date().toISOString()
        state.selectedId = copy.id
      })
    },

    selectComponent: (id) => {
      set((state) => { state.selectedId = id })
    },

    setViewport: (v) => {
      set((state) => { state.viewport = v; state.project.viewport = v })
    },

    setShowCode: (v) => {
      set((state) => { state.showCode = v })
    },

    setCodeTab: (v) => {
      set((state) => { state.codeTab = v })
    },

    setShowPreview: (v) => {
      set((state) => { state.showPreview = v })
    },

    setShowFilesEditor: (v) => {
      set((state) => { state.showFilesEditor = v })
    },

    setShowHome: (v) => {
      set((state) => { state.showHome = v })
    },

    setActiveFileName: (f) => {
      set((state) => { state.activeFileName = f })
    },

    setShowTemplateGallery: (v) => {
      set((state) => { state.showTemplateGallery = v })
    },

    setZoom: (z) => {
      set((state) => { state.zoom = Math.min(200, Math.max(25, z)) })
    },

    zoomIn: () => {
      set((state) => { state.zoom = Math.min(200, state.zoom + 10) })
    },

    zoomOut: () => {
      set((state) => { state.zoom = Math.max(25, state.zoom - 10) })
    },

    resetZoom: () => {
      set((state) => { state.zoom = 100 })
    },

    setShowGrid: (v) => {
      set((state) => { state.showGrid = v })
    },

    toggleGrid: () => {
      set((state) => { state.showGrid = !state.showGrid })
    },

    copyComponent: (id) => {
      set((state) => {
        const comp = state.project.canvas.find((c) => c.id === id)
        if (comp) state.clipboard = JSON.parse(JSON.stringify(comp))
      })
    },

    pasteComponent: () => {
      set((state) => {
        if (!state.clipboard) return
        state.past.push({ canvas: JSON.parse(JSON.stringify(state.project.canvas)) })
        state.future = []
        const pasted: CanvasComponent = {
          ...JSON.parse(JSON.stringify(state.clipboard)),
          id: uuidv4(),
          order: state.project.canvas.length,
        }
        state.project.canvas.push(pasted)
        state.project.canvas.forEach((c, i) => { c.order = i })
        state.project.updatedAt = new Date().toISOString()
        state.selectedId = pasted.id
      })
    },

    deleteSelected: () => {
      set((state) => {
        if (!state.selectedId) return
        state.past.push({ canvas: JSON.parse(JSON.stringify(state.project.canvas)) })
        state.future = []
        state.project.canvas = state.project.canvas.filter((c) => c.id !== state.selectedId)
        state.project.canvas.forEach((c, i) => { c.order = i })
        state.project.updatedAt = new Date().toISOString()
        state.selectedId = null
      })
    },

    loadTemplate: (canvas, viewport = 'desktop') => {
      set((state) => {
        state.past.push({ canvas: JSON.parse(JSON.stringify(state.project.canvas)) })
        state.future = []
        // Deep-clone canvas to ensure fresh IDs are independent
        state.project.canvas = JSON.parse(JSON.stringify(canvas))
        state.project.canvas.forEach((c: CanvasComponent, i: number) => { c.order = i })
        state.project.updatedAt = new Date().toISOString()
        state.viewport = viewport
        state.project.viewport = viewport
        state.selectedId = null
        state.showTemplateGallery = false
        state.showCode = false
        state.showPreview = false
        state.showFilesEditor = false
      })
    },

    setDraggingType: (t) => {
      set((state) => { state.draggingType = t })
    },

    undo: () => {
      set((state) => {
        if (state.past.length === 0) return
        const prev = state.past[state.past.length - 1]
        state.past.pop()
        state.future.unshift({ canvas: JSON.parse(JSON.stringify(state.project.canvas)) })
        state.project.canvas = prev.canvas
        state.project.canvas.forEach((c, i) => { c.order = i })
      })
    },

    redo: () => {
      set((state) => {
        if (state.future.length === 0) return
        const next = state.future[0]
        state.future.shift()
        state.past.push({ canvas: JSON.parse(JSON.stringify(state.project.canvas)) })
        state.project.canvas = next.canvas
        state.project.canvas.forEach((c, i) => { c.order = i })
      })
    },

    loadProject: (schema) => {
      set((state) => {
        state.project = schema
        state.selectedId = null
        state.past = []
        state.future = []
        state.viewport = schema.viewport || 'desktop'
      })
    },

    resetProject: () => {
      set((state) => {
        state.project = makeDefaultProject()
        state.selectedId = null
        state.past = []
        state.future = []
        state.viewport = 'desktop'
      })
    },

    setProjectName: (name) => {
      set((state) => { state.project.name = name })
    },

    toggleDarkMode: () => {
      set((state) => { state.darkMode = !state.darkMode })
    },
  }))
)
