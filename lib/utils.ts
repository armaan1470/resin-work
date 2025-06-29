import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Font utility functions
export const fontWeights = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  bold: 'font-bold',
  black: 'font-black'
} as const

export const fontStyles = {
  normal: '',
  italic: 'italic'
} as const

// Helper function to get font classes
export function getFontClass(weight: keyof typeof fontWeights = 'normal', style: keyof typeof fontStyles = 'normal') {
  return cn(fontWeights[weight], fontStyles[style])
}
