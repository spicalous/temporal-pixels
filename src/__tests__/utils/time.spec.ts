import { describe, it, expect } from 'vitest';

import { getElapsedPercentageOfDay, getElapsedPercentageOfWeek } from '@/utils/time.ts';

describe('utils / time', () => {

  const TZ_OFFSET_MINUTES = new Date().getTimezoneOffset();
  const TZ_OFFSET_MILLIS = TZ_OFFSET_MINUTES * 60 * 1000 * -1;
  // epoch 0 is thursday so we need 3 days in millis to get to sunday 00:00
  const MILLIS_FROM_EPOCH_TO_SUNDAY = 1000 * 60 * 60 * 24 * 3;

  it('getElapsedPercentageOfDay 1%', () => {
    // 1% of a day
    const mockNow = new Date(864000 - TZ_OFFSET_MILLIS);
    expect(getElapsedPercentageOfDay(mockNow)).toEqual(0.01);
  });

  it('getElapsedPercentageOfDay 50%', () => {
    const mockNow = new Date(43200000 - TZ_OFFSET_MILLIS);
    expect(getElapsedPercentageOfDay(mockNow)).toEqual(0.5);
  });

  it('getElapsedPercentageOfWeek 1%', () => {
    const mockNow = new Date((864000 * 7) + MILLIS_FROM_EPOCH_TO_SUNDAY - TZ_OFFSET_MILLIS);
    expect(getElapsedPercentageOfWeek(mockNow)).toEqual(0.01);
  });

  it('getElapsedPercentageOfWeek 50%', () => {
    const mockNow = new Date((43200000 * 7) + MILLIS_FROM_EPOCH_TO_SUNDAY - TZ_OFFSET_MILLIS);
    expect(getElapsedPercentageOfWeek(mockNow)).toEqual(0.5);
  });

});
