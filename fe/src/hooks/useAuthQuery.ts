import { useMutation } from '@tanstack/react-query';

import apiClient from '@/apis/axiosInstance';

const fetchAccessToken = async () => {
  const response = await apiClient.post('/reissue');
  return response.data.accessToken;
};

export const useAuthMutation = () => {
  const { mutate: getAccessToken, status } = useMutation({
    mutationFn: fetchAccessToken,
    onSuccess: (newAccessToken) => {
      localStorage.setItem('accessToken', newAccessToken);
    },
    onError: () => {
      window.location.href = '/join';
      localStorage.removeItem('accessToken');
    },
  });

  return { getAccessToken, status };
};
