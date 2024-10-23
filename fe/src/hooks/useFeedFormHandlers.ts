import { useState, useEffect } from 'react';
import { z } from 'zod';

import { feedSchema } from '@/schema/formSchema';

export const useFeedFormHandlers = (petId: number, createFeedMutation: any, navigate: any) => {
  const [formData, setFormData] = useState({
    petId: petId || 0,
    date: '',
    amount: 0,
    amount_type: 'L',
    feed_type: 'MEAL',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'amount') {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, date: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const convertToISO = (localDateTime: string) => new Date(localDateTime).toISOString();

    const formDataToSubmit = {
      petId: formData.petId,
      date: convertToISO(formData.date),
      amount: formData.amount,
      amount_type: formData.amount_type,
      feed_type: formData.feed_type,
    };

    try {
      feedSchema.parse(formDataToSubmit);
      createFeedMutation.mutate(formDataToSubmit, {
        onSuccess: () => {
          alert('먹이 기록이 성공적으로 등록되었습니다!');
          navigate('/menu/feed');
        },
        onError: (error: any) => {
          console.error('먹이 기록 등록 실패:', error);
          alert('먹이 기록 등록에 실패했습니다. 다시 시도해 주세요.');
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
