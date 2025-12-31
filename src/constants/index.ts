import type { TimeZone } from '@/types';

export const TARGET_DATE = new Date('2026-01-01T00:00:00');

export const TIMEZONES: TimeZone[] = [
  { label: 'Local Time', offset: 0 },
  { label: 'GMT+7 (Hanoi/Bangkok)', offset: 7 },
  { label: 'GMT+0 (London)', offset: 0 },
  { label: 'PST (Los Angeles)', offset: -8 },
  { label: 'EST (New York)', offset: -5 },
  { label: 'JST (Tokyo)', offset: 9 },
];

export const INITIAL_RESOLUTIONS = [
  'Learn a new skill',
  'Read 12 books',
  'Travel to a new place',
  'Stay healthy & fit',
];
