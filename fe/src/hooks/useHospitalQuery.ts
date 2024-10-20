import { useMutation, useQuery } from '@tanstack/react-query';

import { createHospitalRecord, getHospitalInfo, getHospitalsInfo } from '@/apis/hospitalAPI';
// 전체 병원 기록 조회
export const useHospitalsInfoQuery = (petId?: number) => {
  return useQuery({
    queryKey: ['hospitalsInfo', petId],
    queryFn: () => getHospitalsInfo(petId!),
    enabled: !!petId,
  });
};

// 특정 병원 기록 조회
export const useHospitalInfoQuery = (petId: number, id: number) => {
  return useQuery({
    queryKey: ['hospitalInfo', petId, id],
    queryFn: () => getHospitalInfo(petId, id),
  });
};

// 병원 기록 생성하기
export const useCreateHospitalRecordMutation = (petId: number) => {
  return useMutation({
    mutationFn: (formData: FormData) => createHospitalRecord(petId, formData),
    onSuccess: () => {
      console.log('병원 기록이 성공적으로 추가되었습니다.');
    },
    onError: (error) => {
      console.error('병원 기록 추가 실패:', error);
    },
  });
};
