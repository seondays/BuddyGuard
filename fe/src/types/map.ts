export type StatusOfTime = 'start' | 'pause' | 'stop';

export type PositionType = [number, number];

export interface PositionPair {
  previous: PositionType | null;
  current: PositionType;
}
export interface SelctedBuddy {
  img: string;
}

export interface CheckboxChangeHandler {
  (checkBoxId: string, isChecked: boolean): void;
}

export interface TimeRef {
  start: { day: string; time: string };
  end: { day: string; time: string };
  total: string;
}
