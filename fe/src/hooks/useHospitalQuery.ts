import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createHospitalRecord,
  getHospitalRecord,
  getHospitalsRecord,
  deleteHospitalRecord,
  getVaccinationsRecord,
  getVaccinationRecord,
  createVaccinationRecord,
  deleteVaccinationRecord,
} from '@/apis/healthAPI';

// 전체 병원 기록 조회
export const useHospitalsInfoQuery = (petId?: number) => {
  return useQuery({
    queryKey: ['hospitalsInfo', petId],
    queryFn: () => getHospitalsRecord(petId!),
    enabled: !!petId,
  });
};

// 특정 병원 기록 조회
export const useHospitalInfoQuery = (petId: number, id: number) => {
  return useQuery({
    queryKey: ['hospitalInfo', petId, id],
    queryFn: () => getHospitalRecord(petId, id),
  });
};

// 병원 기록 생성하기
export const useCreateHospitalRecordMutation = (petId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createHospitalRecord(petId, formData),
    onSuccess: () => {
      console.log('병원 기록이 성공적으로 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['hospitalsInfo', petId] });
    },
    onError: (error) => {
      console.error('병원 기록 추가 실패:', error);
    },
  });
};

// 병원 기록 삭제하기
export const useDeleteHospitalRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ petId, id }: { petId: number; id: number }) => deleteHospitalRecord(petId, id),
    onSuccess: (_, { petId }) => {
      console.log('병원 기록이 성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['hospitalsInfo', petId] });
    },
    onError: (error) => {
      console.error('병원 기록 삭제 실패:', error);
    },
  });
};

// 백신 전체 기록 조회
export const useVaccinationsInfoQuery = (petId?: number) => {
  return useQuery({
    queryKey: ['vaccinationsInfo', petId],
    queryFn: () => getVaccinationsRecord(petId!),
    enabled: !!petId,
  });
};

// 특정 백신 기록 조회
export const useVaccinationInfoQuery = (petId: number, id: number) => {
  return useQuery({
    queryKey: ['vaccinationInfo', petId, id],
    queryFn: () => getVaccinationRecord(petId, id),
  });
};

// 백신 기록 생성하기
export const useCreateVaccinationRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createVaccinationRecord(formData),
    onSuccess: () => {
      console.log('백신 기록이 성공적으로 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['vaccinationsInfo'] });
    },
    onError: (error) => {
      console.error('백신 기록 추가 실패:', error);
    },
  });
};

// 백신 기록 삭제하기
export const useDeleteVaccinationRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ petId, id }: { petId: number; id: number }) => deleteVaccinationRecord(petId, id),
    onSuccess: (_, { petId }) => {
      console.log('백신 기록이 성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['vaccinationsInfo', petId] });
    },
    onError: (error) => {
      console.error('백신 기록 삭제 실패:', error);
    },
  });
};
