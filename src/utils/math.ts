
export function percentFloor(elapsed: number, total: number, precision: number): number {
  if (total === 0) {
    return 0;
  }
  return Math.min(1, Math.floor((elapsed / total) * precision) / precision);
}
