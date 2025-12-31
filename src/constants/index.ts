import type { TimeZone } from '@/types';

export const TIMEZONES: TimeZone[] = [
  { label: 'Local Time', offset: 0 },
  { label: 'GMT+7 (Hanoi/Bangkok)', offset: 7 },
  { label: 'GMT+0 (London)', offset: 0 },
  { label: 'GMT-8 (Los Angeles)', offset: -8 },
  { label: 'GMT-5 (New York)', offset: -5 },
  { label: 'GMT+9 (Tokyo)', offset: 9 },
];

export const INITIAL_RESOLUTIONS = [
  'Learn a new skill',
  'Read 12 books',
  'Travel to a new place',
  'Stay healthy & fit',
];
