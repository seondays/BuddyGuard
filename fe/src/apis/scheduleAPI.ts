import apiClient from './axiosInstance';

const SCHEDULE_BASE_URL = `/schedule`;

// 일정 조회
export const getSchedule = async (petId: number, year: number, month: number) => {
  try {
    const response = await apiClient.get(`${SCHEDULE_BASE_URL}/${petId}/${year}/${month}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
