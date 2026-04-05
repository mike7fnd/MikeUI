import { clsx, type ClassValue } from 'clsx'

/**
 * Merge Tailwind classes + conditional class values.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
