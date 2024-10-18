import { useMutation } from '@tanstack/react-query';

import { fetchAccessToken } from '@/apis/authAPI';
import { delay } from '@/utils/utils';

export const useAuthMutation = () => {
  const { mutate: getAccessToken, status } = useMutation({
    mutationFn: fetchAccessToken,
    onSuccess: (newAccessToken) => {
      localStorage.setItem('accessToken', newAccessToken);
    },
    onError: async () => {
      await delay(5000);
      localStorage.removeItem('accessToken');
      window.location.href = '/join';
    },
  });

  return { getAccessToken, status };
};
