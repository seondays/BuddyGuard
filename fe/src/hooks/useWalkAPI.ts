import { useQuery } from '@tanstack/react-query';

import { getWalkRecords } from '@/apis/walkAPI';
import { FilterType } from '@/types/walk';

/** getWalkRecords */
export const useWalkQuery = (filterKey: FilterType, buddyId: number, month?: number) => {
  return useQuery({
    queryKey: ['walkRecords', filterKey],
    queryFn: () => getWalkRecords(filterKey, buddyId, month),
  });
};
