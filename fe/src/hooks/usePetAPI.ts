import { useMutation, useQuery } from '@tanstack/react-query';

import { getPetInfo, getPetsInfo, createPet } from '@/apis/petAPI';

// 전체 버디 정보
export const usePetsInfoQuery = () => {
  return useQuery({
    queryKey: ['petsInfo'],
    queryFn: getPetsInfo,
    // staleTime: 1000 * 60 * 5,
    // cacheTime: 1000 * 60 * 30,
  });
};

// 특정 버디 정보
export const usePetInfoQuery = (petId: number) => {
  return useQuery({
    queryKey: ['petInfo', petId],
    queryFn: () => getPetInfo(petId),
    // staleTime: 1000 * 60 * 5,
    // cacheTime: 1000 * 60 * 30,
  });
};

// 버디 추가하기
export const useCreatePetMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => createPet(formData),
  });
};
