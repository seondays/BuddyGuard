import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getFeedsRecord, createFeedRecord, deleteFeedRecord } from '@/apis/feedAPI';

// 먹이 기록을 전체 조회
export const useFeedQuery = (petId: number) => {
  return useQuery({
    queryKey: ['feedsInfo', petId],
    queryFn: () => getFeedsRecord(petId),
    enabled: !petId,
  });
};

// 먹이 기록을 생성하기
export const useCreateFeedMutation = (petId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createFeedRecord(petId, formData),
    onSuccess: () => {
      console.log('먹이 기록이 성공적으로 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['feedsInfo', petId] });
    },
    onError: (error) => {
      console.error('먹이 기록 추가 실패:', error);
    },
  });
};

// 먹이 기록을 삭제하기
export const useDeleteFeedMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ petId, feedId }: { petId: number; feedId: number }) => deleteFeedRecord(petId, feedId),
    onSuccess: (_, { petId }) => {
      console.log('먹이 기록이 성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['feedsInfo', petId] });
    },
    onError: (error) => {
      console.error('먹이 기록 삭제 실패:', error);
    },
  });
};
