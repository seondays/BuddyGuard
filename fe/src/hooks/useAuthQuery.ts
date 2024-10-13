import { useMutation } from '@tanstack/react-query';

import apiClient from '@/apis/axiosInstance';
import { delay } from '@/utils/utils';

const fetchAccessToken = async () => {
  const response = await apiClient.post('/reissue', { withCredentials: true });
  console.log(response);
  return response.data.accessToken;
};

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
