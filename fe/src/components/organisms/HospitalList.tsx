import React, { useEffect, useState } from 'react';

import CommonCard from '@/components/molecules/CommonCard';
import { useHospitalsInfoQuery, useDeleteHospitalRecordMutation } from '@/hooks/useHospitalQuery';

import DetailModal from '../molecules/DetailModal';

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
  const [selectedHospital, setSelectedHospital] = useState<HospitalRecord | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const deleteHospitalMutation = useDeleteHospitalRecordMutation();

  const handleHospitalClick = (hospital: HospitalRecord) => {
    setSelectedHospital(hospital);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDeleteHospital = () => {
    if (selectedHospital && petId) {
      deleteHospitalMutation.mutate(
        { petId, id: selectedHospital.id },
        {
          onSuccess: () => {
            closePopup();
          },
        }
      );
    }
  };

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
  if (isError) return <div>데이터가 없습니다.</div>;

  const formatDateToYMD = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  const formatDateToYMDHM = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('ko-KR', options);
  };

  return (
    <div>
      {HospitalList &&
        HospitalList.map((hospital: HospitalRecord) => (
          <CommonCard
            key={hospital.id}
            subCategory={hospital.subCategory}
            title={hospital.title}
            time={formatDateToYMD(hospital.date)}
            onClick={() => handleHospitalClick(hospital)}
          >
            {hospital.description}
          </CommonCard>
        ))}
      {isPopupOpen && selectedHospital && (
        <DetailModal
          subCategory={selectedHospital.subCategory}
          title={selectedHospital.title}
          time={formatDateToYMDHM(selectedHospital.date)}
          content={selectedHospital.description}
          onClose={closePopup}
          onDelete={handleDeleteHospital}
        />
      )}
    </div>
  );
}
