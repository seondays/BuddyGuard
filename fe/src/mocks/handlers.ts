import { http, HttpResponse } from 'msw';

const mockData = {};

export const handlers = [http.get('/api/', () => HttpResponse.json(mockData))];
