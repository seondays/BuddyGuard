import { useEffect } from 'react';

import { usePetsInfoQuery } from '@/hooks/usePetAPI';
import { useUserInfoQuery } from '@/hooks/useUserAPI';
import { usePetStore } from '@/stores/usePetStore';
import { useUserInfoStore } from '@/stores/useUserInfoStore';

export function useLoadUserInfo() {
  const { data: userInfo, isSuccess: isUserInfoSuccess } = useUserInfoQuery();
  const { setUserInfo } = useUserInfoStore();

  useEffect(() => {
    if (isUserInfoSuccess && userInfo) {
      setUserInfo(userInfo.userId, userInfo.petsId);
    }
  }, [isUserInfoSuccess, userInfo, setUserInfo]);
}

export function useLoadPetsInfo() {
  const { data: petsData, isSuccess: isPetsInfoSuccess } = usePetsInfoQuery();
  const { setPetsInfo, setSelectedBuddy } = usePetStore();
  useEffect(() => {
    if (isPetsInfoSuccess && petsData) {
      setPetsInfo(petsData);
    }
    if (!petsData?.length) {
      setSelectedBuddy(null);
    }
  }, [isPetsInfoSuccess, petsData, setPetsInfo, setSelectedBuddy]);
}
