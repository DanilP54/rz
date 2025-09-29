import { describe, it, expect } from 'vitest'
import { sortWithActiveItem } from '../lib/sorting'

interface Link {
  href: string
  label: string
}

describe('sortWithActiveItem', () => {
  describe('basic behavior with string items', () => {
    const items = ['alpha', 'beta', 'gamma', 'delta']

    it('moves active to start when move.then = "start" and condition is true', () => {
      const result = sortWithActiveItem<string>({
        items,
        isActive: (s: string) => s === 'gamma',
        move: { when: true, then: 'start', else: 'end' },
      })

      expect(result[0]).toBe('gamma')
      expect(result).toEqual(['gamma', 'alpha', 'beta', 'delta'])
    })

    it('moves active to end when move.then = "end" and condition is true', () => {
      const result = sortWithActiveItem<string>({
        items,
        isActive: (s: string) => s === 'beta',
        move: { when: true, then: 'end', else: 'start' },
      })

      expect(result[result.length - 1]).toBe('beta')
      expect(result).toEqual(['alpha', 'gamma', 'delta', 'beta'])
    })

    it('keeps order when finalPosition = "keep"', () => {
      const result = sortWithActiveItem<string>({
        items,
        isActive: (s: string) => s === 'beta',
        move: { when: true, then: 'keep', else: 'start' },
      })

      // should be a shallow copy with the same order
      expect(result).toEqual(items)
      expect(result).not.toBe(items)
    })

    it('keeps order when predicate never matches any item', () => {
      const result = sortWithActiveItem<string>({
        items,
        isActive: () => false,
        move: { when: true, then: 'start', else: 'end' },
      })
      expect(result).toEqual(items)
      expect(result).not.toBe(items)
    })

    it('returns a new array and does not mutate input', () => {
      const original = [...items]
      const result = sortWithActiveItem<string>({
        items,
        isActive: (s: string) => s === 'alpha',
        move: { when: true, then: 'end', else: 'start' },
      })
      expect(items).toEqual(original) // input unchanged
      expect(result).not.toBe(items) // new array instance
    })

    it('no-op (copy) if identifier does not match any item', () => {
      const result = sortWithActiveItem<string>({
        items,
        isActive: (s: string) => s === 'unknown',
        move: { when: true, then: 'start', else: 'end' },
      })
      expect(result).toEqual(items)
      expect(result).not.toBe(items)
    })
  })

  describe('behavior with object items (links)', () => {
    const links: Link[] = [
      { href: '/a', label: 'A' },
      { href: '/b', label: 'B' },
      { href: '/c', label: 'C' },
    ]

    it('moves active link to start (like in SelectedNavigationPanel)', () => {
      const currentPath = '/b'
      const result = sortWithActiveItem<Link>({
        items: links,
        isActive: (l: Link) => l.href === currentPath,
        move: { when: true, then: 'start', else: 'keep' },
      })

      expect(result[0].href).toBe('/b')
      expect(result.map((l) => l.href)).toEqual(['/b', '/a', '/c'])
    })

    it('moves active link to end when configured so', () => {
      const currentPath = '/a'
      const result = sortWithActiveItem<Link>({
        items: links,
        isActive: (l: Link) => l.href === currentPath,
        move: { when: true, then: 'end', else: 'keep' },
      })

      expect(result[result.length - 1].href).toBe('/a')
      expect(result.map((l) => l.href)).toEqual(['/b', '/c', '/a'])
    })

    it('keeps order when condition is false and else = keep', () => {
      const result = sortWithActiveItem<Link>({
        items: links,
        isActive: (l: Link) => l.href === '/c',
        move: { when: false, then: 'start', else: 'keep' },
      })

      expect(result.map((l) => l.href)).toEqual(['/a', '/b', '/c'])
      expect(result).not.toBe(links)
    })
  })
})
