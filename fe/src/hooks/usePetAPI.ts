import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getPetInfo, getPetsInfo, createPet, deletePet } from '@/apis/petAPI';

// 전체 버디 정보
export const usePetsInfoQuery = () => {
  return useQuery({
    queryKey: ['petsInfo'],
    queryFn: getPetsInfo,
  });
};

// 특정 버디 정보
export const usePetInfoQuery = (petId: number) => {
  return useQuery({
    queryKey: ['petInfo', petId],
    queryFn: () => getPetInfo(petId),
  });
};

// 버디 추가하기
export const useCreatePetMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => createPet(formData),
  });
};

// 버디 삭제하기
export const useDeletePetMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (petId: number) => deletePet(petId),
    onSuccess: () => {
      queryClient.invalidateQueries(['petsInfo']);
    },
    onError: (error) => {
      console.error('버디 삭제 실패:', error);
    },
  });
};
