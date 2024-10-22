import React, { useEffect, useState } from 'react';

import CommonCard from '@/components/molecules/CommonCard';
import { useVaccinationsInfoQuery, useDeleteVaccinationRecordMutation } from '@/hooks/useHospitalQuery';

import DetailModal from '../molecules/DetailModal';

interface VaccinationRecord {
  id: number;
  petId: number;
  vaccinationDate: string;
  mainCategory: string;
  subCategory: string;
  vaccinationName: string;
  description: string;
}

export default function VaccinationList() {
  const [petId, setPetId] = useState<number | null>(null);
  const [selectedVaccination, setSelectedVaccination] = useState<VaccinationRecord | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const deleteVaccinationMutation = useDeleteVaccinationRecordMutation();

  const handleVaccinationClick = (vaccination: VaccinationRecord) => {
    setSelectedVaccination(vaccination);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDeleteVaccination = () => {
    if (selectedVaccination && petId) {
      deleteVaccinationMutation.mutate(
        { petId, id: selectedVaccination.id },
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

  const { data: VaccinationList, isLoading, isError } = useVaccinationsInfoQuery(petId ?? undefined);

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
      {VaccinationList &&
        VaccinationList.map((vaccination: VaccinationRecord) => (
          <CommonCard
            key={vaccination.id}
            subCategory="백신"
            title={vaccination.vaccinationName}
            time={formatDateToYMD(vaccination.vaccinationDate)}
            onClick={() => handleVaccinationClick(vaccination)}
          >
            {vaccination.description}
          </CommonCard>
        ))}
      {isPopupOpen && selectedVaccination && (
        <DetailModal
          subCategory={selectedVaccination.subCategory}
          title={selectedVaccination.vaccinationName}
          time={formatDateToYMDHM(selectedVaccination.vaccinationDate)}
          content={selectedVaccination.description}
          onClose={closePopup}
          onDelete={handleDeleteVaccination}
        />
      )}
    </div>
  );
}
