import { useMutation } from '@tanstack/react-query';

import { getWalkRecords } from '@/apis/walkAPI';

export const useWalkMutation = ({ successFn }: { successFn: () => void }) => {
  const { mutate: fetchWalkRecord } = useMutation({
    mutationFn: getWalkRecords,
    onSuccess: successFn,
    onError: (error) => console.error('Error fetching walk records:', error.message),
  });

  return { fetchWalkRecord };
};
