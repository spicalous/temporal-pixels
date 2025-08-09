import { differenceInSeconds, format, startOfDay, startOfWeek } from 'date-fns';
import { percentFloor } from '@/utils/math.ts';

const SECONDS_IN_A_DAY = 86400;
const SECONDS_IN_A_WEEK = SECONDS_IN_A_DAY * 7;
const PRECISION = 1000;
const TIME_FORMAT_24 = 'HH:mm:ss';

function getElapsedSecondsOfDay(date: Date): number {
  return differenceInSeconds(date, startOfDay(date));
}

function getElapsedSecondsOfWeek(date: Date): number {
  return differenceInSeconds(date, startOfWeek(date));
}

export function getElapsedPercentageOfDay(date: Date): number {
  const elapsedSeconds = getElapsedSecondsOfDay(date);
  return percentFloor(elapsedSeconds, SECONDS_IN_A_DAY, PRECISION);
}

export function getElapsedPercentageOfWeek(date: Date): number {
  const elapsedSeconds = getElapsedSecondsOfWeek(date);
  return percentFloor(elapsedSeconds, SECONDS_IN_A_WEEK, PRECISION);
}

export function formatTime(date: Date): string {
  return format(date, TIME_FORMAT_24);
}
