import apiClient from './axiosInstance';

const PET_BASE_URL = '/pet';

// 전체 버디 정보 가져오기
export const getPetsInfo = async () => {
  try {
    const response = await apiClient.get(`${PET_BASE_URL}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 특정 버디 정보 가져오기
export const getPetInfo = async (petId: number) => {
  try {
    const response = await apiClient.get(`${PET_BASE_URL}/${petId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 버디 추가하기
export const createPet = async (formData: FormData) => {
  try {
    console.log(formData);
    const response = await apiClient.post(`${PET_BASE_URL}`, formData);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
