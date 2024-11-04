import { http, HttpResponse } from 'msw';

import { walkMockDataMonth, walkMockDataWeek } from './walkMockDatas';

export const handlers = [
  // http.get('http://api.buddyguard.site/walkRecords/weekly', () => HttpResponse.json(walkMockDataWeek)),
  http.get('/walkRecords/weekly', () => HttpResponse.json(walkMockDataWeek)),
  http.get('/walkRecords/monthly ', () => HttpResponse.json(walkMockDataMonth)),
  http.get('/walkRecords/monthly ', () => HttpResponse.json(walkMockDataMonth)),
];
