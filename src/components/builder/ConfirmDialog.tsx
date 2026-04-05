import { useEffect, useRef } from 'react'
import { cn } from '../../utils/cn'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  hideCancel?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  hideCancel = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null)

  // Focus the primary button when opened
  useEffect(() => {
    if (open) confirmRef.current?.focus()
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
      if (e.key === 'Enter') onConfirm()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onCancel, onConfirm])

  if (!open) return null

  return (
    /* Backdrop — no dim, just centers the card */
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center"
      onClick={onCancel}
    >
      {/* Card */}
      <div
        className={cn(
          'relative z-10 w-[360px] bg-white/60 backdrop-blur-xl backdrop-saturate-150',
          'rounded-[40px] shadow-soft-lg border border-white/50',
          'animate-scale-in p-6 flex flex-col gap-4',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title + message */}
        <div>
          <h3 className="text-[15px] font-semibold text-text-primary leading-snug">{title}</h3>
          <p className="text-[13px] text-text-secondary mt-1.5 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className={cn(
              'w-full py-2.5 rounded-full text-[13px] font-semibold text-white transition-all duration-150 shadow-soft',
              danger
                ? 'bg-danger hover:bg-danger/90'
                : 'bg-accent hover:bg-accent-hover',
            )}
          >
            {confirmLabel}
          </button>
          {!hideCancel && (
            <button
              onClick={onCancel}
              className="w-full py-2.5 rounded-full text-[13px] font-medium text-text-secondary bg-surface-secondary hover:bg-border-light transition-all duration-150"
            >
              {cancelLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
