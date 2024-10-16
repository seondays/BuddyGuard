import axios from 'axios';

import apiClient from '@/apis/axiosInstance';
import { clickedFilterType } from '@/types/walk';

/*
GET
/api/walkRecords/{petId}/detail/{id}
/api/walkRecords/{petId}
/api/walkRecords/{petId}/weekly
/api/walkRecords/{petId}/monthly

PUT
/api/walkRecords/{petId}/detail/{id}

DELETE
/api/walkRecords/{petId}/detail/{id}

POST
/api/walkRecords
*/

const WALK_BASE_URL = '/api/walkRecords';
export const getWalkRecords = async (filterType: keyof clickedFilterType, buddyId: number) => {
  try {
    const response = await apiClient.get(`${WALK_BASE_URL}/${buddyId}/${filterType}`);
    // const response = await axios.get(`${WALK_BASE_URL}/${filterType}`);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error(error);
  }
};
