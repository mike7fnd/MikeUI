import { useMemo, useState } from 'react'
import { useBuilderStore } from '../../store/builderStore'
import { generateHTML } from '../../generator/htmlGenerator'
import { generateReact } from '../../generator/reactGenerator'
import { cn } from '../../utils/cn'
import {
  FileCode,
  Braces,
  ClipboardCopy,
  Download,
  X,
  Check,
} from 'lucide-react'

// ─── File list ────────────────────────────────────────────────────────────────

type FileEntry = { name: string; lang: string; icon: typeof FileCode }

const FILE_LIST: FileEntry[] = [
  { name: 'index.html', lang: 'html', icon: FileCode },
  { name: 'Page.tsx', lang: 'tsx', icon: FileCode },
  { name: 'project.json', lang: 'json', icon: Braces },
]

// ─── FilesEditorPanel ─────────────────────────────────────────────────────────

export function FilesEditorPanel() {
  const project = useBuilderStore((s) => s.project)
  const activeFileName = useBuilderStore((s) => s.activeFileName)
  const setActiveFileName = useBuilderStore((s) => s.setActiveFileName)
  const setShowFilesEditor = useBuilderStore((s) => s.setShowFilesEditor)
  const [copied, setCopied] = useState(false)

  const code = useMemo(() => {
    if (activeFileName === 'index.html') return generateHTML(project.canvas)
    if (activeFileName === 'Page.tsx') return generateReact(project.canvas)
    if (activeFileName === 'project.json') return JSON.stringify(project, null, 2)
    return ''
  }, [activeFileName, project])

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    })
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = activeFileName
    a.click()
    URL.revokeObjectURL(url)
  }

  const activeEntry = FILE_LIST.find((f) => f.name === activeFileName) ?? FILE_LIST[0]

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white min-w-0">
      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <div className="h-9 flex items-center justify-between px-4 border-b border-border-light flex-shrink-0 bg-surface-secondary/60">
        <div className="flex items-center gap-2">
          <activeEntry.icon size={13} className="text-text-tertiary" />
          <span className="text-[12px] font-mono text-text-primary font-medium">{activeFileName}</span>
          <span className="text-[10px] text-text-tertiary bg-border-light px-1.5 py-0.5 rounded font-mono uppercase">{activeEntry.lang}</span>
        </div>

        <div className="flex items-center gap-1">
          {/* Copy */}
          <button
            onClick={handleCopy}
            title="Copy to clipboard"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-text-secondary hover:text-accent hover:bg-accent/8 transition-all duration-150"
          >
            {copied ? <Check size={13} className="text-accent" /> : <ClipboardCopy size={13} />}
            {copied ? 'Copied' : 'Copy'}
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            title={`Download ${activeFileName}`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-text-secondary hover:text-accent hover:bg-accent/8 transition-all duration-150"
          >
            <Download size={13} />
            Download
          </button>

          <div className="w-px h-4 bg-border-light mx-1" />

          {/* Close → back to canvas */}
          <button
            onClick={() => setShowFilesEditor(false)}
            title="Close editor"
            className="p-1.5 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-secondary transition-all duration-150"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* ── Body: file tree + editor ──────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* File tree sidebar */}
        <div className="w-44 flex-shrink-0 border-r border-border-light bg-surface-secondary/30 flex flex-col overflow-y-auto">
          <div className="px-3 py-2.5">
            <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-widest">Output Files</span>
          </div>
          {FILE_LIST.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveFileName(name)}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 text-[12px] transition-colors duration-100 text-left',
                activeFileName === name
                  ? 'bg-accent/8 text-accent font-medium border-r-2 border-accent'
                  : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary',
              )}
            >
              <Icon size={13} className="flex-shrink-0" />
              <span className="truncate font-mono">{name}</span>
            </button>
          ))}
        </div>

        {/* Code editor */}
        <div className="flex-1 overflow-auto bg-white relative min-w-0">
          {/* Line numbers + code */}
          <div className="flex h-full">
            {/* Line numbers */}
            <div
              className="flex-shrink-0 select-none text-right pr-3 pl-4 pt-4 pb-4 bg-surface-secondary/20 border-r border-border-light/60"
              aria-hidden="true"
            >
              {code.split('\n').map((_, i) => (
                <div key={i} className="text-[11px] font-mono text-text-tertiary leading-relaxed">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code */}
            <textarea
              key={activeFileName}
              value={code}
              readOnly
              spellCheck={false}
              className="flex-1 resize-none font-mono text-[12px] leading-relaxed text-text-primary bg-transparent px-4 py-4 outline-none border-none min-w-0"
              style={{ tabSize: 2 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
