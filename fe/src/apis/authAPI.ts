import apiClient from '@/apis/axiosInstance';

export const fetchAccessToken = async () => {
  const response = await apiClient.post('/reissue', { withCredentials: true });
  console.log(response);
  return response.headers.authorization;
};
