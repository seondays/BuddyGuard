import axios from 'axios';

/** Axios 인스턴스 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
});

// 요청 인터셉터: 요청마다 Authorization 헤더에 accessToken 자동 추가
// apiClient.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (!config.headers['skipAuth'] && accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// 응답 인터셉터: accessToken이 만료된 경우 refreshToken을 이용해 재발급 시도
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // refreshToken으로 accessToken 재발급(reissue 요청에는 Authorization 헤더 없음)
//       try {
//         const response = await apiClient.post('/reissue', null, { headers: { skipAuth: true } });
//         const newAccessToken = response.data.accessToken;

//         localStorage.setItem('accessToken', newAccessToken);

//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem('accessToken');
//         window.location.href = '/join';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
