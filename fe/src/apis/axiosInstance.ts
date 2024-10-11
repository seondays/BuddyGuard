import axios from 'axios';

/** Axios 인스턴스 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
});

// 인터셉터 추가: 요청마다 Authorization 헤더 자동 추가
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default apiClient;
