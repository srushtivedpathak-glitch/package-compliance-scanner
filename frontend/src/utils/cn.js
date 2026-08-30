/**
 * Simple utility to merge Tailwind class names conditionally.
 * Lightweight alternative to clsx/classnames for this project.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

