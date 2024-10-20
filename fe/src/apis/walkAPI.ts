import apiClient from '@/apis/axiosInstance';
import { UseWalkQueryProps } from '@/hooks/useWalkQuery';

const WALK_BASE_URL = '/api/walkRecords';

export const getWalkRecords = async ({ filterKey, buddyId, month, year }: UseWalkQueryProps) => {
  try {
    let url = '';
    if (filterKey === 'weekly') url = `${WALK_BASE_URL}/${buddyId}/${filterKey}`;
    if (filterKey === 'monthly' && month) url = `${WALK_BASE_URL}/${buddyId}/${filterKey}/${month}`;
    if (filterKey === 'all' && month && year) url = `${WALK_BASE_URL}/${buddyId}/monthly/${month}?year=${year}`;

    const response = await apiClient.get(url);

    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error(error);
  }
};

/** 폼 데이터를 서버에 전송하는 함수 */
export const postWalkData = async (form: FormData) => {
  try {
    const response = await apiClient.post(WALK_BASE_URL, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // const response = await apiClient.post(WALK_BASE_URL, form);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};
