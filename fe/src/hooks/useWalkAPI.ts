import { useQuery } from '@tanstack/react-query';

import { getWalkRecords } from '@/apis/walkAPI';
import { FilterType } from '@/types/walk';

/** getWalkRecords */
export const useWalkQuery = (filterKey: FilterType, buddyId: number, month?: number) => {
  const checkedfilterKey = filterKey === 'all' ? 'monthly' : filterKey;
  return useQuery({
    queryKey: ['walkRecords', filterKey],
    queryFn: () => getWalkRecords(checkedfilterKey, buddyId, month),
  });
};
