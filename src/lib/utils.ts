import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to get primary color from CSS variables
export const getPrimaryColor = () => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement
    const primaryHsl = getComputedStyle(root).getPropertyValue('--primary').trim()
    return `hsl(${primaryHsl})`
  }
  // Fallback color if window is not available (SSR)
  return 'hsl(22 98% 58%)'
}

// Remove locale prefix from path, e.g. /en/products -> /products
export function getPathWithoutLocale(path: string) {
  const parts = path.split('/')
  if (parts.length === 2 && parts[1].length === 2) {
    return '/'
  }
  if (parts.length > 2 && parts[1].length === 2) {
    return '/' + parts.slice(2).join('/')
  }
  return path
}
