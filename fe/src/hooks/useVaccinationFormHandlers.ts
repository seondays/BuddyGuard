import { useState, useEffect } from 'react';
import { z } from 'zod';

import { vaccinationSchema } from '@/schema/formSchema';

export const useVaccinationFormHandlers = (petId: number, createVaccinationMutation: any, navigate: any) => {
  const [formData, setFormData] = useState({
    petId: petId || 0,
    vaccinationDate: '',
    vaccinationName: '',
    description: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const petsStorage = localStorage.getItem('petsStorage');
    if (petsStorage) {
      const parsedPets = JSON.parse(petsStorage);
      const selectedPetId = parsedPets?.state?.selectedBuddy?.petId;
      setFormData((prev) => ({ ...prev, petId: selectedPetId || petId }));
    }
  }, [petId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, vaccinationDate: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const convertToISO = (localDateTime: string) => new Date(localDateTime).toISOString();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('petId', String(formData.petId));
    formDataToSubmit.append('vaccinationDate', convertToISO(formData.vaccinationDate));
    formDataToSubmit.append('vaccinationName', formData.vaccinationName);
    formDataToSubmit.append('description', formData.description);

    try {
      const validationData = {
        petId: formData.petId,
        vaccinationDate: convertToISO(formData.vaccinationDate),
        vaccinationName: formData.vaccinationName,
        description: formData.description,
      };

      vaccinationSchema.parse(validationData);
      createVaccinationMutation.mutate(formDataToSubmit, {
        onSuccess: () => {
          alert('백신 기록 등록 성공!');
          navigate('/menu/hospital');
        },
        onError: (error: any) => {
          console.error('백신 기록 등록 실패:', error);
          alert('백신 기록 등록에 실패했습니다. 다시 시도해 주세요.');
        },
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setFormErrors(newErrors);
      }
    }
  };

  return {
    formData,
    formErrors,
    handleInputChange,
    handleDateInputChange,
    handleSubmit,
  };
};
