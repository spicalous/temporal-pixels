import { describe, it, expect } from 'vitest';

import { percentFloor } from '@/utils/math.ts';

describe('utils / math', () => {

  it('percentFloor', () => {
    expect(percentFloor(0, 0, 100)).toEqual(0);
    expect(percentFloor(1, 1, 100)).toEqual(1);
    expect(percentFloor(1, 2, 100)).toEqual(0.5);
    expect(percentFloor(1, 3, 100)).toEqual(0.33);
    expect(percentFloor(10, 1, 100)).toEqual(1);
    expect(percentFloor(25, 1000, 100)).toEqual(0.02);
  });

  it('percentFloor with greater precision', () => {
    expect(percentFloor(0, 0, 1000)).toEqual(0);
    expect(percentFloor(1, 1, 1000)).toEqual(1);
    expect(percentFloor(1, 2, 1000)).toEqual(0.5);
    expect(percentFloor(1, 3, 1000)).toEqual(0.333);
    expect(percentFloor(10, 1, 1000)).toEqual(1);
    expect(percentFloor(25, 1000, 1000)).toEqual(0.025);
  });
});
