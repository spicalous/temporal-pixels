import { describe, it, expect } from 'vitest';

import { getElapsedSecondsOfDay } from '@/utils/time.ts';

describe('utils / time', () => {

  it('getElapsedSecondsOfDay', () => {
    const mockNow = new Date(2000);
    const tzOffsetMinutes = mockNow.getTimezoneOffset();
    const tzOffsetSeconds = tzOffsetMinutes * 60 * -1;
    expect(getElapsedSecondsOfDay(mockNow)).toEqual(2 + tzOffsetSeconds);
  });
});
