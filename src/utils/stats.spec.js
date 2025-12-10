import { describe, it, expect } from 'vitest'
import { getTime, formatTime, getMean } from '@/utils/stats'

describe('Utils: stats', () => {
  describe('getTime', () => {
    it('correctly converts milliseconds to time components', () => {
      const ms = 3661005 // 1h 1m 1s 5ms
      const time = getTime(ms)

      expect(time.hours).toBe(1)
      expect(time.minutes).toBe(1)
      expect(time.seconds).toBe(1)
      expect(time.milliseconds).toBe(5)
    })

    it('handles zero', () => {
      const time = getTime(0)
      expect(time.hours).toBe(0)
      expect(time.minutes).toBe(0)
      expect(time.seconds).toBe(0)
      expect(time.milliseconds).toBe(0)
    })
  })

  describe('formatTime', () => {
    it('formats time correctly', () => {
      const time = {
        hours: 1,
        minutes: 5,
        seconds: 9,
        milliseconds: 123
      }
      expect(formatTime(time)).toBe('01:05:09:123')
    })

    it('pads zeros correctly', () => {
      const time = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 1
      }
      expect(formatTime(time)).toBe('00:00:00:001')
    })
  })

  describe('getMean', () => {
    it('calculates mean correctly', () => {
      const list = [
        { hours: 0, minutes: 0, seconds: 10, milliseconds: 0 },
        { hours: 0, minutes: 0, seconds: 20, milliseconds: 0 }
      ]
      // Average should be 15 seconds
      const meanStr = getMean(list)
      expect(meanStr).toBe('00:00:15:000')
    })

    it('returns null for empty list', () => {
      expect(getMean([])).toBeNull()
    })
  })
})
