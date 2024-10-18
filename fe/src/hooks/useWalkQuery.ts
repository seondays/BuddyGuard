import { useQuery } from '@tanstack/react-query';

import { getWalkRecords } from '@/apis/walkAPI';
import { FilterType } from '@/types/walk';

export type UseWalkQueryProps = {
  buddyId: number;
  filterKey: FilterType;
  month?: number;
  year?: number;
};

/** getWalkRecords */
export const useWalkQuery = ({ filterKey, buddyId, month, year }: UseWalkQueryProps) => {
  return useQuery({
    queryKey: ['walkRecords', filterKey, buddyId, month, year].filter(Boolean),
    queryFn: () => {
      if (filterKey === 'weekly') return getWalkRecords({ filterKey, buddyId });
      if (filterKey === 'monthly' && month) return getWalkRecords({ filterKey, buddyId, month });
      if (filterKey === 'all' && month && year) return getWalkRecords({ filterKey, buddyId, month, year });
      throw new Error('Invalid filter type');
    },
  });
};
