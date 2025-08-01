
export function percentFloor(elapsed: number, total: number): number {
  if (total === 0) {
    return 0;
  }
  return Math.min(1, Math.floor((elapsed / total) * 100) / 100);
}
