import apiClient from './axiosInstance';

const FEED_BASE_URL = `/feed`;

// 먹이 전체 기록 조회
export const getFeedsRecord = async (petId: number) => {
  try {
    const response = await apiClient.get(`${FEED_BASE_URL}/${petId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 먹이 기록 생성
export const createFeedRecord = async (petId: number, formData: FormData) => {
  try {
    const response = await apiClient.post(`${FEED_BASE_URL}/${petId}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

// 먹이 기록 삭제
export const deleteFeedRecord = async (petId: number, feedId: number) => {
  try {
    const response = await apiClient.delete(`${FEED_BASE_URL}/${petId}/${feedId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
