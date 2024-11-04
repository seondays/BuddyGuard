import { WalkMockData } from '@/types/walk';

export const walkMockDataWeek: WalkMockData = {
  count: 2,
  averageDistance: 2.8,
  averageTime: '10:10:02',
  data: [
    {
      date: '2024-08-30',
      distance: 2.8,
      totalTime: '00:30:00',
      buddys: [
        { id: 1, image: 'https://via.placeholder.com/100' },
        { id: 2, image: 'https://via.placeholder.com/100' },
      ],
      pathImage: 'https://via.placeholder.com/200',
    },
    {
      date: '2024-08-29',
      distance: 2.8,
      totalTime: '00:30:00',
      buddys: [{ id: 1, image: 'https://via.placeholder.com/100' }],
      pathImage: 'https://via.placeholder.com/200',
    },
  ],
};

export const walkMockDataMonth: WalkMockData = {
  count: 4,
  averageDistance: 2.8,
  averageTime: '10:10:02',
  data: [
    {
      date: '2024-08-01',
      distance: 5,
      totalTime: '00:30:00',
      buddys: [
        { id: 1, image: 'https://via.placeholder.com/100' },
        { id: 2, image: 'https://via.placeholder.com/100' },
      ],
      pathImage: 'https://via.placeholder.com/200',
    },
    {
      date: '2024-08-02',
      distance: 2.8,
      totalTime: '00:30:00',
      buddys: [
        { id: 1, image: 'https://via.placeholder.com/100' },
        { id: 2, image: 'https://via.placeholder.com/100' },
      ],
      pathImage: 'https://via.placeholder.com/200',
    },
    {
      date: '2024-08-18',
      distance: 6,
      totalTime: '01:30:00',
      buddys: [
        { id: 1, image: 'https://via.placeholder.com/100' },
        { id: 2, image: 'https://via.placeholder.com/100' },
      ],
      pathImage: 'https://via.placeholder.com/200',
    },
    {
      date: '2024-08-29',
      distance: 0.1,
      totalTime: '00:01:00',
      buddys: [{ id: 1, image: 'https://via.placeholder.com/100' }],
      pathImage: 'https://via.placeholder.com/200',
    },
  ],
};
