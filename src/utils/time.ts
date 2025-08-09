import { differenceInSeconds, format, startOfDay } from 'date-fns';

export const SECONDS_IN_A_DAY = 86400;
const TIME_FORMAT_24 = 'HH:mm:ss';

export function getElapsedSecondsOfDay(now: Date): number {
  return differenceInSeconds(now, startOfDay(now));
}

export function formatTime(date: Date) {
  return format(date, TIME_FORMAT_24);
}
