import { tokenClient } from '@/apis/axiosInstance';

export const fetchAccessToken = async () => {
  const response = await tokenClient.post('/reissue', { withCredentials: true });
  console.log(response);
  return response.headers.authorization;
};
