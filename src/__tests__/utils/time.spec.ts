import { describe, it, expect } from 'vitest';

import {
  Weekday,
  getElapsedPercentageOfDay,
  getElapsedPercentageOfWeek,
  getElapsedPercentageOfMonth
} from '@/utils/time.ts';

describe('utils / time', () => {

  const TZ_OFFSET_MINUTES = new Date().getTimezoneOffset();
  const TZ_OFFSET_MILLIS = TZ_OFFSET_MINUTES * 60 * 1000 * -1;

  // seconds in a day * 1000
  const MILLIS_IN_A_DAY = 86400 * 1000;
  const MILLIS_IN_A_WEEK = MILLIS_IN_A_DAY * 7;
  // epoch 0 is thursday so we need 3 days in millis to get to sunday 00:00
  const MILLIS_FROM_EPOCH_TO_SUNDAY = MILLIS_IN_A_DAY * 3;


  describe('getElapsedPercentageOfDay', () => {

    it('1%', () => {
      const mockNow = new Date((MILLIS_IN_A_DAY / 100) - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfDay(mockNow)).toEqual(0.01);
    });

    it('50%', () => {
      const mockNow = new Date((MILLIS_IN_A_DAY / 2) - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfDay(mockNow)).toEqual(0.5);
    });
  });

  describe('getElapsedPercentageOfWeek', () => {

    it('1%', () => {
      const mockNow = new Date((MILLIS_IN_A_WEEK / 100) + MILLIS_FROM_EPOCH_TO_SUNDAY - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfWeek(mockNow)).toEqual(0.01);
    });

    it('50%', () => {
      const mockNow = new Date((MILLIS_IN_A_WEEK / 2) + MILLIS_FROM_EPOCH_TO_SUNDAY - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfWeek(mockNow)).toEqual(0.5);
    });

    it('1% with specified weekStartsOn', () => {
      const mockNow = new Date((MILLIS_IN_A_WEEK / 100) + MILLIS_FROM_EPOCH_TO_SUNDAY + MILLIS_IN_A_DAY - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfWeek(mockNow, Weekday.MONDAY)).toEqual(0.01);
    });

    it('50% with specified weekStartsOn', () => {
      const mockNow = new Date((MILLIS_IN_A_WEEK / 2) + MILLIS_FROM_EPOCH_TO_SUNDAY + MILLIS_IN_A_DAY - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfWeek(mockNow, Weekday.MONDAY)).toEqual(0.5);
    });
  });

  describe('getElapsedPercentageOfMonth', () => {

    it('1%', () => {
      const mockNow = new Date(((MILLIS_IN_A_DAY * 31) / 100) - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfMonth(mockNow)).toEqual(0.01);
    });

    it('50%', () => {
      const mockNow = new Date(((MILLIS_IN_A_DAY * 31) / 2) - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfMonth(mockNow)).toEqual(0.5);
    });
  });
});
