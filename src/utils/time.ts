import { differenceInSeconds, startOfDay } from 'date-fns';

export const SECONDS_IN_A_DAY = 86400;

export function getElapsedSecondsOfDay(now: Date): number {
  return differenceInSeconds(now, startOfDay(now));
}
