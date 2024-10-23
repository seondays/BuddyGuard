import axios from 'axios';

import { fetchAccessToken } from '@/apis/authAPI';

/** Axios 인스턴스 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
  withCredentials: true, // 쿠키를 포함하도록 설정
});

// 요청 인터셉터: 요청마다 Authorization 헤더에 accessToken 자동 추가
apiClient.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('accessToken');

    // 운영 : accessToken이 없는 경우 새로 갱신
    if (!accessToken && import.meta.env.VITE_MODE !== 'development') {
      try {
        accessToken = await fetchAccessToken();
        if (accessToken) localStorage.setItem('accessToken', accessToken);
      } catch (error) {
        // refreshToken이 만료되었거나 유효하지 않은 경우 로그아웃 처리
        console.error('Error fetching access token:', error);
        return Promise.reject('로그인이 필요합니다.');
      }
    }

    // 개발 : 여기서 토큰을 하드코딩하여 Authorization 헤더에 추가
    if (import.meta.env.VITE_MODE === 'development') {
      accessToken =
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJST0xFX1VTRVIiLCJ0b2tlblR5cGUiOiJBQ0NFU1MiLCJpYXQiOjE3MjkxODQzNjIsImV4cCI6NjE3MjkxODQzNjJ9.tclLX9BIEMbZoRFaY5kkaf_p_u3QbPuoW2rSygIAe4I';
    }

    if (!config.headers['skipAuth']) {
      config.headers['Authorization'] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
