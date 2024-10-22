import apiClient from './axiosInstance';

const PET_BASE_URL = `/hospitalRecords`;

// 병원 전체 기록 조회
export const getHospitalsInfo = async (petId: number) => {
  try {
    const response = await apiClient.get(`${PET_BASE_URL}/${petId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 병원 기록 상세 조회
export const getHospitalInfo = async (petId: number, id: number) => {
  try {
    const response = await apiClient.get(`${PET_BASE_URL}/${petId}/detail/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 병원 기록 생성
export const createHospitalRecord = async (petId: number, formData: FormData) => {
  try {
    const response = await apiClient.post(`${PET_BASE_URL}/${petId}`, formData, {
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

// 병원 기록 삭제
export const deleteHospitalRecord = async (petId: number, id: number) => {
  try {
    const response = await apiClient.delete(`${PET_BASE_URL}/${petId}/detail/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
