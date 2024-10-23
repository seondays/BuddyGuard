import apiClient from './axiosInstance';

const HOSPITAL_BASE_URL = `/hospitalRecords`;
const VACCINATION_BASE_URL = '/vaccination';

// 병원 전체 기록 조회
export const getHospitalsRecord = async (petId: number) => {
  try {
    const response = await apiClient.get(`${HOSPITAL_BASE_URL}/${petId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 병원 기록 상세 조회
export const getHospitalRecord = async (petId: number, id: number) => {
  try {
    const response = await apiClient.get(`${HOSPITAL_BASE_URL}/${petId}/detail/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 병원 기록 생성
export const createHospitalRecord = async (petId: number, formData: FormData) => {
  try {
    const response = await apiClient.post(`${HOSPITAL_BASE_URL}/${petId}`, formData, {
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
    const response = await apiClient.delete(`${HOSPITAL_BASE_URL}/${petId}/detail/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 백신 전체 기록 조회
export const getVaccinationsRecord = async (petId: number) => {
  try {
    const response = await apiClient.get(`${VACCINATION_BASE_URL}/${petId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 백신 기록 상세 조회
export const getVaccinationRecord = async (petId: number, id: number) => {
  try {
    const response = await apiClient.get(`${VACCINATION_BASE_URL}/${petId}/detail/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 백신 기록 생성
export const createVaccinationRecord = async (formData: FormData) => {
  try {
    const response = await apiClient.post(`${VACCINATION_BASE_URL}`, formData, {
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

// 백신 기록 삭제
export const deleteVaccinationRecord = async (petId: number, id: number) => {
  try {
    const response = await apiClient.delete(`${VACCINATION_BASE_URL}/${petId}/detail/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
