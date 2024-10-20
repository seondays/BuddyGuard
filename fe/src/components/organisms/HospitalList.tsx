import React, { useEffect, useState } from 'react';

import CommonCard from '@/components/molecules/CommonCard';
import { useHospitalsInfoQuery } from '@/hooks/useHospitalQuery';

interface HospitalRecord {
  id: number;
  petId: number;
  date: string;
  mainCategory: string;
  subCategory: string;
  title: string;
  description: string;
}

export default function HospitalList() {
  const [petId, setPetId] = useState<number | null>(null);

  const updatePetIdFromStorage = () => {
    const storedBuddy = localStorage.getItem('petsStorage');
    if (storedBuddy) {
      const parsedBuddy = JSON.parse(storedBuddy);
      if (parsedBuddy?.state?.selectedBuddy) {
        const { petId } = parsedBuddy.state.selectedBuddy;
        setPetId(petId);
      } else {
        console.log('selectedBuddy가 없습니다.');
      }
    } else {
      console.log('petsStorage가 없습니다.');
    }
  };

  useEffect(() => {
    updatePetIdFromStorage();

    const interval = setInterval(() => {
      updatePetIdFromStorage();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { data: HospitalList, isLoading, isError } = useHospitalsInfoQuery(petId ?? undefined);

  if (!petId) return <div>반려동물을 선택해 주세요.</div>;
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 데 실패했습니다.</div>;

  return (
    <div>
      {HospitalList &&
        HospitalList.map((Hospital: HospitalRecord) => (
          <CommonCard
            key={Hospital.id}
            title={Hospital.title}
            time={new Date(Hospital.date).toLocaleString()}
            onClick={() => console.log(`Clicked on ${Hospital.title}`)}
          >
            {Hospital.description}
          </CommonCard>
        ))}
    </div>
  );
}
