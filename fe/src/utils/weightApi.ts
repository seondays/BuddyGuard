import axios from 'axios';

// 기본 API URL
const BASE_URL = 'http://buddyguard.site:8080/api/weight'; // 엔드포인트를 weight로 수정

// 모든 weight 데이터를 가져오는 함수 (READ)
export const getWeightRecords = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weight records:', error);
    throw error;
  }
};

// 새로운 weight 데이터를 생성하는 함수 (CREATE)
export const createWeightRecord = async (record: any) => {
  try {
    const response = await axios.post(`${BASE_URL}`, record);
    return response.data;
  } catch (error) {
    console.error('Error creating weight record:', error);
    throw error;
  }
};

// 기존 weight 데이터를 수정하는 함수 (UPDATE)
export const updateWeightRecord = async (id: string, updatedRecord: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedRecord);
    return response.data;
  } catch (error) {
    console.error('Error updating weight record:', error);
    throw error;
  }
};

// weight 데이터를 삭제하는 함수 (DELETE)
export const deleteWeightRecord = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting weight record:', error);
    throw error;
  }
};
