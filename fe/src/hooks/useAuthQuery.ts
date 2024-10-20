import { useMutation } from '@tanstack/react-query';

import { fetchAccessToken } from '@/apis/authAPI';

export const useAuthMutation = () => {
  const { mutate: getAccessToken, status } = useMutation({
    mutationFn: fetchAccessToken,
    onSuccess: (newAccessToken) => {
      localStorage.setItem('accessToken', newAccessToken);
    },
    onError: async () => {
      localStorage.removeItem('accessToken');
      window.location.href = '/join';
    },
  });

  return { getAccessToken, status };
};
