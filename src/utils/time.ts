import type { Day as DateFnDay } from 'date-fns';
import { differenceInSeconds, format as dateFnFormat, startOfDay, startOfWeek, startOfMonth, startOfYear, getDaysInMonth } from 'date-fns';
import {
  secondsInDay as SECONDS_IN_DAY,
  secondsInWeek as SECONDS_IN_WEEK,
  secondsInYear as SECONDS_IN_YEAR
} from 'date-fns/constants';
import { percentFloor } from '@/utils/math.ts';

const PRECISION = 1000;

export const FORMAT_TIME_24 = 'HH:mm:ss';
export const FORMAT_EMPTY = ' ';
export const FORMAT_DAY = 'eee';
export const FORMAT_DATE_DAY = 'd eee';
export const FORMAT_DAY_DATE = 'eee d';

export enum Day {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY'
}

const DayIndex: { [k in Day]: DateFnDay } = {
  [Day.SUNDAY]: 0,
  [Day.MONDAY]: 1,
  [Day.TUESDAY]: 2,
  [Day.WEDNESDAY]: 3,
  [Day.THURSDAY]: 4,
  [Day.FRIDAY]: 5,
  [Day.SATURDAY]: 6
};

export interface CalculateElapsedPercentageFunction {
  (date: Date, weekStartsOn: Day): number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getElapsedPercentageOfDay(date: Date, weekStartsOn: Day): number {
  const elapsedSeconds = differenceInSeconds(date, startOfDay(date));
  return percentFloor(elapsedSeconds, SECONDS_IN_DAY, PRECISION);
}

export function getElapsedPercentageOfWeek(date: Date, weekStartsOn: Day): number {
  const elapsedSeconds = differenceInSeconds(date, startOfWeek(date, { weekStartsOn: DayIndex[weekStartsOn] }));
  return percentFloor(elapsedSeconds, SECONDS_IN_WEEK, PRECISION);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getElapsedPercentageOfMonth(date: Date, weekStartsOn: Day) {
  const elapsedSeconds = differenceInSeconds(date, startOfMonth(date));
  const secondsInMonth = SECONDS_IN_DAY * getDaysInMonth(date);
  return percentFloor(elapsedSeconds, secondsInMonth, PRECISION);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getElapsedPercentageOfYear(date: Date, weekStartsOn: Day) {
  const elapsedSeconds = differenceInSeconds(date, startOfYear(date));
  return percentFloor(elapsedSeconds, SECONDS_IN_YEAR, PRECISION);
}

export function format(date: Date, format: string): string {
  return dateFnFormat(date, format);
}