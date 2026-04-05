import { useState, useCallback } from 'react'
import { useBuilderStore } from '../../store/builderStore'
import { cn } from '../../utils/cn'
import { v4 as uuidv4 } from 'uuid'
import type { CanvasComponent } from '../../types/schema'
import { FRAMEWORK_FILE_GENERATORS, exportToDirectory } from '../../generator/frameworkFiles'
import {
  X, Plus, FolderOpen, Layers, Zap, Code2, Globe, Cpu,
  ArrowRight, Star, ChevronRight, FileCode2, Package,
  LayoutTemplate, Sparkles, CheckCircle2, AlertCircle, Loader2,
} from 'lucide-react'

// ─── Framework templates ──────────────────────────────────────────────────────

interface Framework {
  id: string
  name: string
  description: string
  color: string
  bg: string
  badge: string
  fileTree: string[]
  canvasTemplate: () => CanvasComponent[]
}

const makeComp = (type: CanvasComponent['type'], props: Record<string, unknown> = {}): CanvasComponent => ({
  id: uuidv4(),
  type,
  order: 0,
  props: props as unknown as CanvasComponent['props'],
})

const FRAMEWORKS: Framework[] = [
  {
    id: 'react-vite',
    name: 'React + Vite',
    description: 'Fast SPA with Vite bundler and Tailwind CSS',
    color: '#61DAFB',
    bg: 'bg-[#20232a]',
    badge: 'Popular',
    fileTree: [
      'src/',
      '  main.tsx',
      '  App.tsx',
      '  index.css',
      '  components/',
      '    Navbar.tsx',
      '    Hero.tsx',
      'public/',
      'index.html',
      'vite.config.ts',
      'tailwind.config.js',
      'package.json',
    ],
    canvasTemplate: () => [
      makeComp('navbar', { brand: 'MyApp', links: ['Home', 'About', 'Contact'] }),
      makeComp('section', { heading: 'Welcome to React + Vite', subheading: 'Build fast, ship faster.' }),
      makeComp('card', { title: 'Feature One', body: 'Lightning fast HMR with Vite.' }),
      makeComp('card', { title: 'Feature Two', body: 'Component-driven UI with React.' }),
      makeComp('button', { label: 'Get Started', variant: 'primary' }),
    ],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'Full-stack React framework with SSR & routing',
    color: '#000000',
    bg: 'bg-gray-900',
    badge: 'Full-stack',
    fileTree: [
      'app/',
      '  layout.tsx',
      '  page.tsx',
      '  globals.css',
      '  about/',
      '    page.tsx',
      'components/',
      '  Navbar.tsx',
      '  Footer.tsx',
      'public/',
      'next.config.ts',
      'tailwind.config.js',
      'package.json',
    ],
    canvasTemplate: () => [
      makeComp('navbar', { brand: 'NextApp', links: ['Home', 'Blog', 'Docs', 'Contact'] }),
      makeComp('section', { heading: 'The React Framework', subheading: 'Production-grade apps with SSR, routing and more.' }),
      makeComp('card', { title: 'Server Components', body: 'Render on the server, hydrate on the client.' }),
      makeComp('card', { title: 'File-based Routing', body: 'Every file in app/ is a route automatically.' }),
      makeComp('input', { placeholder: 'Search docs...', label: 'Search' }),
      makeComp('button', { label: 'Start Building', variant: 'primary' }),
    ],
  },
  {
    id: 'vue',
    name: 'Vue 3',
    description: 'Progressive framework with Composition API',
    color: '#42B883',
    bg: 'bg-emerald-900',
    badge: 'Reactive',
    fileTree: [
      'src/',
      '  main.ts',
      '  App.vue',
      '  assets/',
      '    main.css',
      '  components/',
      '    TheNavbar.vue',
      '    HeroSection.vue',
      'public/',
      'index.html',
      'vite.config.ts',
      'tailwind.config.js',
      'package.json',
    ],
    canvasTemplate: () => [
      makeComp('navbar', { brand: 'VueApp', links: ['Home', 'Features', 'Docs'] }),
      makeComp('section', { heading: 'The Progressive Framework', subheading: 'Gentle learning curve, powerful when needed.' }),
      makeComp('card', { title: 'Composition API', body: 'Flexible and reusable component logic.' }),
      makeComp('card', { title: 'Reactivity System', body: 'Fine-grained reactive tracking out of the box.' }),
      makeComp('button', { label: 'Try Vue', variant: 'primary' }),
    ],
  },
  {
    id: 'svelte',
    name: 'Svelte',
    description: 'Compile-time framework with zero runtime overhead',
    color: '#FF3E00',
    bg: 'bg-orange-900',
    badge: 'Compiler',
    fileTree: [
      'src/',
      '  routes/',
      '    +page.svelte',
      '    +layout.svelte',
      '  lib/',
      '    Navbar.svelte',
      '    Footer.svelte',
      'static/',
      'svelte.config.js',
      'vite.config.ts',
      'package.json',
    ],
    canvasTemplate: () => [
      makeComp('navbar', { brand: 'SvelteApp', links: ['Home', 'About'] }),
      makeComp('section', { heading: 'Cybernetically Enhanced Web Apps', subheading: 'No virtual DOM. Truly reactive.' }),
      makeComp('card', { title: 'No Runtime', body: 'Svelte compiles your app to vanilla JS.' }),
      makeComp('button', { label: 'Explore Svelte', variant: 'primary' }),
    ],
  },
  {
    id: 'html',
    name: 'Vanilla HTML',
    description: 'Pure HTML + Tailwind CSS, no build step required',
    color: '#E44D26',
    bg: 'bg-red-900',
    badge: 'Zero deps',
    fileTree: [
      'index.html',
      'about.html',
      'css/',
      '  styles.css',
      'js/',
      '  main.js',
      'assets/',
      '  images/',
    ],
    canvasTemplate: () => [
      makeComp('navbar', { brand: 'MySite', links: ['Home', 'About', 'Contact'] }),
      makeComp('section', { heading: 'Hello, World!', subheading: 'A clean HTML starter with Tailwind CSS.' }),
      makeComp('card', { title: 'Simple', body: 'No frameworks, just clean HTML.' }),
      makeComp('card', { title: 'Fast', body: 'Zero build time, instant in browser.' }),
      makeComp('button', { label: 'Get Started', variant: 'primary' }),
    ],
  },
  {
    id: 'astro',
    name: 'Astro',
    description: 'Content-focused sites with partial hydration',
    color: '#FF5D01',
    bg: 'bg-purple-900',
    badge: 'Islands',
    fileTree: [
      'src/',
      '  pages/',
      '    index.astro',
      '    about.astro',
      '  components/',
      '    Navbar.astro',
      '    Card.astro',
      '  layouts/',
      '    BaseLayout.astro',
      'public/',
      'astro.config.mjs',
      'tailwind.config.js',
      'package.json',
    ],
    canvasTemplate: () => [
      makeComp('navbar', { brand: 'AstroSite', links: ['Home', 'Blog', 'About'] }),
      makeComp('section', { heading: 'Ship Less JavaScript', subheading: 'Content-focused. SEO-friendly. Blazing fast.' }),
      makeComp('card', { title: 'Islands Architecture', body: 'Only hydrate interactive components.' }),
      makeComp('card', { title: 'Framework Agnostic', body: 'Use React, Vue, Svelte, or none at all.' }),
      makeComp('button', { label: 'Explore Astro', variant: 'primary' }),
    ],
  },
]

// ─── Quick actions ────────────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { id: 'new', icon: Plus, label: 'New Project', desc: 'Start from a blank canvas', color: 'text-accent bg-accent/10 hover:bg-accent hover:text-white' },
  { id: 'open', icon: FolderOpen, label: 'Open Project', desc: 'Load a saved .json file', color: 'text-purple-500 bg-purple-50 hover:bg-purple-500 hover:text-white' },
  { id: 'templates', icon: LayoutTemplate, label: 'Templates', desc: 'Browse UI templates', color: 'text-emerald-500 bg-emerald-50 hover:bg-emerald-500 hover:text-white' },
]

// ─── HomeScreen ───────────────────────────────────────────────────────────────

export function HomeScreen() {
  const setShowHome      = useBuilderStore((s) => s.setShowHome)
  const resetProject     = useBuilderStore((s) => s.resetProject)
  const loadTemplate     = useBuilderStore((s) => s.loadTemplate)
  const setProjectName   = useBuilderStore((s) => s.setProjectName)
  const setShowTemplateGallery = useBuilderStore((s) => s.setShowTemplateGallery)
  const project          = useBuilderStore((s) => s.project)

  const [selectedFw, setSelectedFw] = useState<Framework | null>(null)
  const [view, setView] = useState<'home' | 'fileTree'>('home')
  const [exportStatus, setExportStatus] = useState<'idle' | 'writing' | 'done' | 'unsupported' | 'error'>('idle')
  const [exportDir, setExportDir] = useState<string>('')

  const close = useCallback(() => setShowHome(false), [setShowHome])

  const handleQuickAction = (id: string) => {
    if (id === 'new') {
      resetProject()
      close()
    } else if (id === 'open') {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.json'
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => {
          try {
            const schema = JSON.parse(ev.target?.result as string)
            useBuilderStore.getState().loadProject(schema)
            close()
          } catch { /* ignore */ }
        }
        reader.readAsText(file)
      }
      input.click()
    } else if (id === 'templates') {
      setShowTemplateGallery(true)
      close()
    }
  }

  const handleUseFw = async (fw: Framework) => {
    // Always load canvas template
    const canvas = fw.canvasTemplate()
    canvas.forEach((c, i) => { c.order = i })
    loadTemplate(canvas)
    setProjectName(`${fw.name} Starter`)

    // Generate actual files and write to disk
    const generator = FRAMEWORK_FILE_GENERATORS[fw.id]
    if (!generator) { close(); return }

    const files = generator(fw.name + ' Starter')

    if (!('showDirectoryPicker' in window)) {
      setExportStatus('unsupported')
      return
    }

    try {
      setExportStatus('writing')
      const result = await exportToDirectory(files, fw.id)
      if (result === 'unsupported') {
        setExportStatus('unsupported')
      } else {
        setExportDir(fw.name + ' Starter')
        setExportStatus('done')
      }
    } catch (err: unknown) {
      // User cancelled the picker → treat as abort, not error
      const msg = err instanceof Error ? err.message : ''
      if (msg.toLowerCase().includes('abort') || msg.toLowerCase().includes('cancel')) {
        setExportStatus('idle')
      } else {
        setExportStatus('error')
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-[400] flex items-stretch overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #fafafa 50%, #f5f0ff 100%)' }}
    >
      {/* Close button */}
      <button
        onClick={close}
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/8 hover:bg-black/15 flex items-center justify-center transition-all duration-150 text-text-secondary"
      >
        <X size={16} />
      </button>

      {/* ── Left: main content ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-y-auto px-12 py-10 min-w-0">

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center shadow-soft">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-[22px] font-bold text-text-primary leading-none">MikeUI</h1>
              <p className="text-[12px] text-text-tertiary mt-0.5">Visual UI Builder</p>
            </div>
          </div>
          <h2 className="text-[32px] font-bold text-text-primary leading-tight mb-2">
            What are you<br />
            <span className="text-accent">building today?</span>
          </h2>
          <p className="text-[15px] text-text-secondary max-w-sm">
            Design beautiful interfaces visually, then export clean React or HTML code.
          </p>
        </div>

        {/* Quick actions */}
        <div className="mb-10">
          <h3 className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest mb-3">Quick Start</h3>
          <div className="grid grid-cols-3 gap-3">
            {QUICK_ACTIONS.map(({ id, icon: Icon, label, desc, color }) => (
              <button
                key={id}
                onClick={() => handleQuickAction(id)}
                className="group flex flex-col items-start gap-2 p-4 bg-white/70 hover:bg-white rounded-2xl border border-white/80 shadow-soft hover:shadow-soft-md transition-all duration-200 text-left"
              >
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200', color)}>
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-text-primary">{label}</div>
                  <div className="text-[11px] text-text-tertiary mt-0.5">{desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Continue current project */}
        {project.canvas.length > 0 && (
          <div className="mb-10">
            <h3 className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest mb-3">Continue</h3>
            <button
              onClick={close}
              className="w-full flex items-center gap-4 p-4 bg-white/70 hover:bg-white rounded-2xl border border-white/80 shadow-soft hover:shadow-soft-md transition-all duration-200 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Layers size={20} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-text-primary truncate">{project.name}</div>
                <div className="text-[12px] text-text-tertiary">{project.canvas.length} component{project.canvas.length !== 1 ? 's' : ''} · Last edited now</div>
              </div>
              <ArrowRight size={16} className="text-text-tertiary group-hover:text-accent transition-colors flex-shrink-0" />
            </button>
          </div>
        )}

        {/* Stats row */}
        <div className="mt-auto pt-6 border-t border-black/5">
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Package, label: 'Components', value: '14+', color: 'text-accent' },
              { icon: Code2, label: 'Export formats', value: '3', color: 'text-purple-500' },
              { icon: Globe, label: 'Works offline', value: 'Yes', color: 'text-emerald-500' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center gap-2.5 p-3 bg-white/60 rounded-xl border border-white/80">
                <Icon size={15} className={color} />
                <div>
                  <div className="text-[15px] font-bold text-text-primary leading-none">{value}</div>
                  <div className="text-[10px] text-text-tertiary mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ───────────────────────────────────────────────────────── */}
      <div className="w-px bg-black/6 flex-shrink-0" />

      {/* ── Right: framework selector ─────────────────────────────────────── */}
      <div className="w-[440px] flex-shrink-0 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-10 pb-4 flex-shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-accent" />
            <h3 className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest">Framework Starters</h3>
          </div>
          <p className="text-[13px] text-text-secondary">Pick a framework — we'll scaffold a canvas layout and show the file structure.</p>
        </div>

        {/* Framework grid */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {view === 'home' ? (
            <div className="grid grid-cols-2 gap-3">
              {FRAMEWORKS.map((fw) => (
                <div
                  key={fw.id}
                  onClick={() => { setSelectedFw(fw); setView('fileTree'); setExportStatus('idle') }}
                  className={cn(
                    'group relative flex flex-col p-4 rounded-2xl cursor-pointer',
                    'border border-white/20 transition-all duration-200',
                    'hover:scale-[1.02] hover:shadow-soft-md',
                    selectedFw?.id === fw.id ? 'ring-2 ring-accent ring-offset-1' : '',
                    fw.bg,
                  )}
                >
                  {/* Badge */}
                  {fw.badge && (
                    <span className="absolute top-3 right-3 text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-white/15 text-white uppercase tracking-wide">
                      {fw.badge}
                    </span>
                  )}
                  {/* Color dot */}
                  <div className="w-8 h-8 rounded-xl mb-3 flex items-center justify-center" style={{ background: fw.color + '22', border: `1.5px solid ${fw.color}44` }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: fw.color }} />
                  </div>
                  <div className="text-[13px] font-semibold text-white leading-tight">{fw.name}</div>
                  <div className="text-[11px] text-white/60 mt-1 leading-snug">{fw.description}</div>
                  <div className="flex items-center gap-1 mt-3 text-white/50 group-hover:text-white/80 transition-colors">
                    <ChevronRight size={12} />
                    <span className="text-[10px] font-medium">View structure</span>
                  </div>
                </div>
              ))}
            </div>
          ) : selectedFw ? (
            <div className="animate-scale-in">
              {/* Back button */}
              <button
                onClick={() => { setView('home'); setExportStatus('idle') }}
                className="flex items-center gap-1.5 text-[12px] text-text-secondary hover:text-accent mb-4 transition-colors"
              >
                <span className="text-lg leading-none">←</span> All frameworks
              </button>

              {/* Framework header */}
              <div className={cn('rounded-2xl p-4 mb-4 border border-white/20', selectedFw.bg)}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ background: selectedFw.color }} />
                  <span className="text-[14px] font-bold text-white">{selectedFw.name}</span>
                </div>
                <p className="text-[12px] text-white/70">{selectedFw.description}</p>
              </div>

              {/* File tree */}
              <div className="bg-white/70 rounded-2xl border border-white/80 p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileCode2 size={13} className="text-text-tertiary" />
                  <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest">File Structure</span>
                </div>
                <div className="font-mono text-[12px] space-y-0.5">
                  {selectedFw.fileTree.map((line, i) => {
                    const isDir = line.trim().endsWith('/')
                    const indent = line.match(/^(\s*)/)?.[1]?.length ?? 0
                    return (
                      <div key={i} className="flex items-center gap-1.5" style={{ paddingLeft: indent * 6 }}>
                        <span className={cn(isDir ? 'text-accent font-medium' : 'text-text-secondary')}>
                          {isDir ? '📁' : '📄'} {line.trim()}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* What gets added */}
              <div className="bg-white/70 rounded-2xl border border-white/80 p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={13} className="text-accent" />
                  <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest">Canvas Preview</span>
                </div>
                <div className="space-y-1">
                  {selectedFw.canvasTemplate().map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-[12px] text-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                      <span className="capitalize font-mono">{c.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status banner */}
              {exportStatus === 'done' && (
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 mb-3">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[13px] font-semibold text-emerald-800">Files created!</div>
                    <div className="text-[11px] text-emerald-600 mt-0.5">"{exportDir}" folder written to the directory you picked.</div>
                  </div>
                </div>
              )}
              {exportStatus === 'error' && (
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-red-50 border border-red-200 mb-3">
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="text-[12px] text-red-700">Something went wrong writing files. Canvas was still loaded.</div>
                </div>
              )}
              {exportStatus === 'unsupported' && (
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 mb-3">
                  <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-[12px] text-amber-700">Your browser doesn't support writing files. Use Chrome or Edge for this feature. Canvas was loaded anyway.</div>
                </div>
              )}

              {/* Use template */}
              {exportStatus === 'done' ? (
                <button
                  onClick={close}
                  className="w-full py-3 rounded-full bg-emerald-500 text-white text-[14px] font-semibold shadow-soft hover:bg-emerald-600 transition-all duration-150 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={15} />
                  Open in Canvas
                </button>
              ) : (
                <button
                  onClick={() => handleUseFw(selectedFw)}
                  disabled={exportStatus === 'writing'}
                  className="w-full py-3 rounded-full bg-accent text-white text-[14px] font-semibold shadow-soft hover:bg-accent-hover transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {exportStatus === 'writing' ? (
                    <><Loader2 size={15} className="animate-spin" /> Creating files…</>
                  ) : (
                    <><Star size={15} /> Use {selectedFw.name} Starter</>
                  )}
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* ── Bottom tip bar ────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-10 flex items-center justify-center">
        <div className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
          <Cpu size={11} />
          <span>MikeUI v1.0 · Apple-inspired design · Works offline</span>
        </div>
      </div>
    </div>
  )
}
