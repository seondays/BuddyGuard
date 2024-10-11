import { useMutation, useQuery } from '@tanstack/react-query';

import { getWalkRecords } from '@/apis/walkAPI';
import { clickedFilterType } from '@/types/walk';

/** getWalkRecords */
export const useWalkQuery = (filterKey: keyof clickedFilterType) => {
  return useQuery({
    queryKey: ['walkRecords', filterKey],
    queryFn: () => getWalkRecords(filterKey),
  });
};
