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

export interface clickedFilterType {
  weekly: boolean;
  monthly: boolean;
  all: boolean;
}
