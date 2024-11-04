export type successType = 'save' | 'edit' | 'delete';

export type FilterType = 'weekly' | 'monthly' | 'all';

export type path = { latitude: number; longitude: number };

export type record = {
  id: number;
  buddyIds: number[];
  centerPosition: path;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  totalTime: string;
  note: string;
  mapLevel: number;
  path: path[];
  distance: number;
  fileUrl: string;
};

export interface Buddy {
  id: number;
  image: string;
}

export interface WalkData {
  date: string;
  distance: number;
  totalTime: string;
  buddys: Buddy[];
  pathImage: string;
}

export interface WalkMockData {
  count: number;
  averageDistance: number;
  averageTime: string;
  data: WalkData[];
}
