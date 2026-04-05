import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useBuilderStore } from '../../store/builderStore'
import { ComponentRenderer } from './ComponentRenderer'
import { cn } from '../../utils/cn'
import type { CanvasComponent } from '../../types/schema'
import { GripVertical, Copy, Trash2 } from 'lucide-react'
import { layoutRoleMap, containerMaxWidth } from '../../design-system/layout'

interface Props {
  component: CanvasComponent
}

/**
 * SortableCanvasItem
 * A wrapper for each component on the canvas.
 * Provides selection, drag handles, and action buttons.
 */
export function SortableCanvasItem({ component }: Props) {
  const selectedId = useBuilderStore((s) => s.selectedId)
  const selectComponent = useBuilderStore((s) => s.selectComponent)
  const removeComponent = useBuilderStore((s) => s.removeComponent)
  const duplicateComponent = useBuilderStore((s) => s.duplicateComponent)

  const isSelected = selectedId === component.id

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group rounded-lg transition-all duration-150',
        isSelected && 'ring-2 ring-accent ring-offset-2',
        isDragging && 'opacity-50 z-50',
      )}
      onClick={(e) => {
        e.stopPropagation()
        selectComponent(component.id)
      }}
    >
      {/* Selection indicator label */}
      {isSelected && (
        <div className="absolute -top-3 left-0 z-20 flex items-center gap-1">
          <span className="bg-accent text-white text-xs font-medium px-2 py-0.5 rounded-full shadow-soft">
            {component.type}
          </span>
        </div>
      )}

      {/* Action toolbar */}
      <div
        className={cn(
          'absolute top-1 right-1 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150',
          isSelected && 'opacity-100',
        )}
      >
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="w-6 h-6 flex items-center justify-center rounded bg-white/90 shadow-soft hover:bg-white text-text-tertiary hover:text-text-primary transition-all duration-150 cursor-grab active:cursor-grabbing"
          title="Drag to reorder"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={12} />
        </button>

        {/* Duplicate */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            duplicateComponent(component.id)
          }}
          className="w-6 h-6 flex items-center justify-center rounded bg-white/90 shadow-soft hover:bg-white text-text-tertiary hover:text-accent transition-all duration-150"
          title="Duplicate"
        >
          <Copy size={12} />
        </button>

        {/* Delete */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            removeComponent(component.id)
          }}
          className="w-6 h-6 flex items-center justify-center rounded bg-white/90 shadow-soft hover:bg-danger-light text-text-tertiary hover:text-danger transition-all duration-150"
          title="Delete"
        >
          <Trash2 size={12} />
        </button>
      </div>

      {/* Component content — full-width components render edge-to-edge */}
      {layoutRoleMap[component.type] === 'full-width' ? (
        <div className="w-full overflow-hidden rounded-lg">
          <ComponentRenderer component={component} />
        </div>
      ) : (
        /* Contained components get a centred, max-width wrapper with vertical rhythm */
        <div
          className="w-full px-6 py-4"
          style={{ maxWidth: containerMaxWidth, margin: '0 auto' }}
        >
          <ComponentRenderer component={component} />
        </div>
      )}
    </div>
  )
}
