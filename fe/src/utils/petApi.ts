import axios from 'axios';

// 기본 API URL
const BASE_URL = 'http://buddyguard.site:8080/api/pet';

// 모든 pet 데이터를 가져오는 함수 (READ)
export const getPetsRecords = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pet records:', error);
    throw error;
  }
};

// 특정 pet 데이터를 가져오는 함수 (READ)
export const getPetRecords = async (userId: string, petId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/${petId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pet records:', error);
    throw error;
  }
};

// 새로운 pet 데이터를 생성하는 함수 (CREATE)
export const createPetRecord = async (record: any) => {
  try {
    const response = await axios.post(`${BASE_URL}`, record);
    return response.data;
  } catch (error) {
    console.error('Error creating pet record:', error);
    throw error;
  }
};

// 기존 pet 데이터를 수정하는 함수 (UPDATE)
export const updatePetRecord = async (userId: string, petId: string, updatedRecord: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/${userId}/${petId}`, updatedRecord);
    return response.data;
  } catch (error) {
    console.error('Error updating pet record:', error);
    throw error;
  }
};

// pet 데이터를 삭제하는 함수 (DELETE)
export const deletePetRecord = async (userId: string, petId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${userId}/${petId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting pet record:', error);
    throw error;
  }
};
