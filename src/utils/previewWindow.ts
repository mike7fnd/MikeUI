import { generateHTML } from '../generator/htmlGenerator'
import type { CanvasComponent } from '../types/schema'

/**
 * Opens the current canvas as a standalone app preview in a new browser window.
 * Generates a complete self-contained HTML page via the HTML generator,
 * encodes it as a Blob URL, and opens it in a new tab.
 */
export function openPreviewWindow(canvas: CanvasComponent[], projectName: string): void {
  const html = generateHTML(canvas)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const win = window.open(url, '_blank', 'noopener,noreferrer')
  if (win) {
    win.addEventListener('load', () => {
      // Clean up blob URL after the window loads to avoid memory leaks
      // Small delay to ensure the page has fully loaded
      setTimeout(() => URL.revokeObjectURL(url), 5000)
    })
    win.document.title = projectName
  } else {
    // Fallback: offer direct download if popups are blocked
    const a = document.createElement('a')
    a.href = url
    a.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}-preview.html`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
}

/**
 * Opens a mobile-simulated preview in a narrow popup window.
 */
export function openMobilePreviewWindow(canvas: CanvasComponent[], projectName: string): void {
  const html = generateHTML(canvas)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const win = window.open(
    url,
    '_blank',
    'width=430,height=932,resizable=yes,scrollbars=yes,noopener,noreferrer',
  )
  if (win) {
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  } else {
    const a = document.createElement('a')
    a.href = url
    a.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}-mobile-preview.html`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
}
