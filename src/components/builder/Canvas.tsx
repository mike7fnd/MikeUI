import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useBuilderStore } from '../../store/builderStore'
import { SortableCanvasItem } from './SortableCanvasItem'
import { cn } from '../../utils/cn'
import { PlusCircle } from 'lucide-react'
import type { ComponentType } from '../../types/schema'

const viewportWidths = {
  mobile: 'max-w-sm',
  tablet: 'max-w-2xl',
  desktop: 'max-w-full',
}

/**
 * Canvas
 * The main drop target and sortable area for building the layout.
 */
export function Canvas() {
  const canvas = useBuilderStore((s) => s.project.canvas)
  const viewport = useBuilderStore((s) => s.viewport)
  const addComponent = useBuilderStore((s) => s.addComponent)
  const reorderComponents = useBuilderStore((s) => s.reorderComponents)
  const draggingType = useBuilderStore((s) => s.draggingType)
  const zoom = useBuilderStore((s) => s.zoom)
  const showGrid = useBuilderStore((s) => s.showGrid)
  const [isDragOver, setIsDragOver] = useState(false)

  // DnD-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      reorderComponents(active.id as string, over.id as string)
    }
  }

  // Native drag-and-drop from palette
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const type = e.dataTransfer.getData('componentType') as ComponentType
    if (type) addComponent(type)
  }

  const isEmpty = canvas.length === 0

  return (
    <div className="flex-1 bg-background overflow-auto flex flex-col items-center py-8 px-4 min-h-0 relative">
      {/* Grid overlay */}
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0,113,227,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,113,227,0.07) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      )}

      <div
        className={cn('w-full transition-all duration-300', viewportWidths[viewport])}
        style={{
          transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined,
          transformOrigin: 'top center',
        }}
      >
        {/* Page chrome — white page with shadow simulating a real document */}
        <div
          data-canvas-preserve
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'min-h-[600px] rounded-xl bg-white shadow-soft-lg overflow-hidden transition-all duration-200',
            isDragOver && 'ring-2 ring-accent ring-offset-4 bg-accent-light/5',
            isEmpty && 'flex flex-col items-center justify-center',
          )}
        >
          {isEmpty ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div
                className={cn(
                  'w-20 h-20 rounded-xl bg-white shadow-soft flex items-center justify-center mb-6',
                  'transition-all duration-200',
                  isDragOver && 'scale-110 shadow-soft-md bg-accent-light',
                )}
              >
                <PlusCircle
                  size={36}
                  className={cn('text-text-tertiary transition-colors duration-200', isDragOver && 'text-accent')}
                />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {isDragOver ? 'Drop to add component' : 'Start building'}
              </h3>
              <p className="text-text-secondary text-sm max-w-xs">
                Drag components from the left panel, or click a component to add it to the canvas.
              </p>
            </div>
          ) : (
            /* Sortable component list */
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={canvas.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                {/* SortableCanvasItem owns per-item rhythm; dividers provide subtle row separation */}
                <div className="w-full divide-y divide-border-light/40 pb-10">
                  {canvas.map((component) => (
                    <SortableCanvasItem key={component.id} component={component} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* Drop zone footer (when canvas has items) */}
        {!isEmpty && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              'mt-2 border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200',
              isDragOver
                ? 'border-accent bg-accent-light/30 text-accent'
                : 'border-border text-text-tertiary hover:border-accent/50',
            )}
          >
            <p className="text-sm">Drop here to add component</p>
          </div>
        )}
      </div>
    </div>
  )
}
