import type { Day } from 'date-fns';
import { differenceInSeconds, format, startOfDay, startOfWeek } from 'date-fns';
import {
  secondsInDay as SECONDS_IN_DAY,
  secondsInWeek as SECONDS_IN_WEEK
} from 'date-fns/constants';
import { percentFloor } from '@/utils/math.ts';

const PRECISION = 1000;
const TIME_FORMAT_24 = 'HH:mm:ss';
const WEEK_DAY_FORMAT = 'eee';
const EMPTY_STR = '';

export enum Weekday {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY"
}

const WeekdayIndex: { [k in Weekday]: Day } = {
  [Weekday.SUNDAY]: 0,
  [Weekday.MONDAY]: 1,
  [Weekday.TUESDAY]: 2,
  [Weekday.WEDNESDAY]: 3,
  [Weekday.THURSDAY]: 4,
  [Weekday.FRIDAY]: 5,
  [Weekday.SATURDAY]: 6
};

export interface CalculateElapsedPercentageFunction {
  (date: Date, dayToStartWeek: Weekday): number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getElapsedPercentageOfDay(date: Date, dayToStartWeek: Weekday): number {
  const elapsedSeconds = differenceInSeconds(date, startOfDay(date));
  return percentFloor(elapsedSeconds, SECONDS_IN_DAY, PRECISION);
}

export function getElapsedPercentageOfWeek(date: Date, weekStartsOn: Weekday): number {
  const elapsedSeconds = differenceInSeconds(date, startOfWeek(date, { weekStartsOn: WeekdayIndex[weekStartsOn] }));
  return percentFloor(elapsedSeconds, SECONDS_IN_WEEK, PRECISION);
}

export function formatTime(date: Date): string {
  return format(date, TIME_FORMAT_24);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function emptyStr(date: Date): string {
  return EMPTY_STR;
}

export function formatWeekDays(date: Date): string {
  return format(date, WEEK_DAY_FORMAT);
}
