import { useQuery } from '@tanstack/react-query';

import { getSchedule } from '@/apis/scheduleAPI';

// 일정 조회
export const useScheduleQuery = (petId: number, year: number, month: number) => {
  return useQuery({
    queryKey: ['scheduleInfo', petId, year, month],
    queryFn: () => getSchedule(petId, year, month),
    enabled: !!petId && !!year && !!month,
  });
};
