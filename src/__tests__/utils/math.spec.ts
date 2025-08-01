import { describe, it, expect } from 'vitest';

import { percentFloor } from '@/utils/math.ts';

describe('utils / math', () => {

  it('percentFloor', () => {
    expect(percentFloor(0, 0)).toEqual(0);
    expect(percentFloor(1, 1)).toEqual(1);
    expect(percentFloor(1, 2)).toEqual(0.5);
    expect(percentFloor(1, 3)).toEqual(0.33);
    expect(percentFloor(10, 1)).toEqual(1);
  });
});
