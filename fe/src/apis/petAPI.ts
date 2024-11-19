import apiClient from './axiosInstance';

const PET_BASE_URL = '/pet';

// 전체 버디 정보 가져오기
export const getPetsInfo = async () => {
  try {
    const response = await apiClient.get(`${PET_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 특정 버디 정보 가져오기
export const getPetInfo = async (petId: number) => {
  try {
    const response = await apiClient.get(`${PET_BASE_URL}/${petId}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 버디 추가하기
export const createPet = async (formData: FormData) => {
  try {
    const response = await apiClient.post(`${PET_BASE_URL}`, formData, {
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

// 버디 삭제하기
export const deletePet = async (petId: number) => {
  try {
    const response = await apiClient.delete(`${PET_BASE_URL}/${petId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
