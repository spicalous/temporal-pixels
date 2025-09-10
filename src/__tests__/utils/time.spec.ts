import { describe, it, expect } from 'vitest';
import {
  FORMAT_TIME_24,
  FORMAT_EMPTY,
  FORMAT_DAY,
  FORMAT_DATE_DAY,
  FORMAT_DAY_DATE,
  FORMAT_DAY_OF_MONTH,
  FORMAT_DAY_OF_YEAR,
  FORMAT_WEEK_OF_YEAR,
  FORMAT_MONTH,
  FORMAT_DAY_MONTH_YEAR,
  FORMAT_YEAR_MONTH_DATE,
  Day,
  format,
  getElapsedPercentageOfDay,
  getElapsedPercentageOfWeek,
  getElapsedPercentageOfMonth,
} from '@/utils/time.ts';

describe('utils / time', () => {

  const TZ_OFFSET_MINUTES = new Date().getTimezoneOffset();
  const TZ_OFFSET_MILLIS = TZ_OFFSET_MINUTES * 60 * 1000 * -1;
  // seconds in a day * 1000
  const MILLIS_IN_A_DAY = 86400 * 1000;
  const MILLIS_IN_A_WEEK = MILLIS_IN_A_DAY * 7;
  // epoch 0 is thursday so we need 3 days in millis to get to sunday 00:00
  const MILLIS_FROM_EPOCH_TO_SUNDAY = MILLIS_IN_A_DAY * 3;

  describe('elapsed percentage', () => {

    it('getElapsedPercentageOfDay 1%', () => {
      const mockNow = new Date((MILLIS_IN_A_DAY / 100) - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfDay(mockNow)).toEqual(0.01);
    });

    it('getElapsedPercentageOfDay 50%', () => {
      const mockNow = new Date((MILLIS_IN_A_DAY / 2) - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfDay(mockNow)).toEqual(0.5);
    });

    it('getElapsedPercentageOfWeek 1%', () => {
      const mockNow = new Date((MILLIS_IN_A_WEEK / 100) + MILLIS_FROM_EPOCH_TO_SUNDAY - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfWeek(mockNow)).toEqual(0.01);
    });

    it('getElapsedPercentageOfWeek 50%', () => {
      const mockNow = new Date((MILLIS_IN_A_WEEK / 2) + MILLIS_FROM_EPOCH_TO_SUNDAY - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfWeek(mockNow)).toEqual(0.5);
    });

    it('getElapsedPercentageOfWeek 1% with specified weekStartsOn', () => {
      const mockNow = new Date((MILLIS_IN_A_WEEK / 100) + MILLIS_FROM_EPOCH_TO_SUNDAY + MILLIS_IN_A_DAY - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfWeek(mockNow, Day.MONDAY)).toEqual(0.01);
    });

    it('getElapsedPercentageOfWeek 50% with specified weekStartsOn', () => {
      const mockNow = new Date((MILLIS_IN_A_WEEK / 2) + MILLIS_FROM_EPOCH_TO_SUNDAY + MILLIS_IN_A_DAY - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfWeek(mockNow, Day.MONDAY)).toEqual(0.5);
    });

    it('getElapsedPercentageOfMonth 1%', () => {
      const mockNow = new Date(((MILLIS_IN_A_DAY * 31) / 100) - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfMonth(mockNow)).toEqual(0.01);
    });

    it('getElapsedPercentageOfMonth 50%', () => {
      const mockNow = new Date(((MILLIS_IN_A_DAY * 31) / 2) - TZ_OFFSET_MILLIS);
      expect(getElapsedPercentageOfMonth(mockNow)).toEqual(0.5);
    });
  });

  describe('format', () => {

    const mockNow = new Date(0 - TZ_OFFSET_MILLIS);

    [
      ['FORMAT_TIME_24', FORMAT_TIME_24, '00:00:00'],
      ['FORMAT_EMPTY', FORMAT_EMPTY, ' '],
      ['FORMAT_DAY', FORMAT_DAY, 'Thu'],
      ['FORMAT_DATE_DAY', FORMAT_DATE_DAY, '1 Thu'],
      ['FORMAT_DAY_DATE', FORMAT_DAY_DATE, 'Thu 1'],
      ['FORMAT_DAY_OF_MONTH', FORMAT_DAY_OF_MONTH, '1'],
      ['FORMAT_DAY_OF_YEAR', FORMAT_DAY_OF_YEAR, '1'],
      ['FORMAT_WEEK_OF_YEAR', FORMAT_WEEK_OF_YEAR, '1'],
      ['FORMAT_MONTH', FORMAT_MONTH, 'Jan'],
      ['FORMAT_DAY_MONTH_YEAR', FORMAT_DAY_MONTH_YEAR, '01-01-1970'],
      ['FORMAT_YEAR_MONTH_DATE', FORMAT_YEAR_MONTH_DATE, '1970-01-01'],
    ].forEach(([testName, formatToTest, expected]) => {
      it(testName, () => {
        expect(format(mockNow, formatToTest)).toEqual(expected);
      });
    });
  });
});
