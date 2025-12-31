export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export interface Resolution {
  id: string;
  text: string;
  completed: boolean;
}

export interface TimeZone {
  label: string;
  offset: number;
}
