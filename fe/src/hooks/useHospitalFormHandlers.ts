import { useState, useEffect } from 'react';
import { z } from 'zod';

import { hospitalSchema } from '@/schema/formSchema';

import { hospitalData } from '../types/hospital';

export const useHospitalFormHandlers = () => {
  const [formData, setFormData] = useState<hospitalData>({
    petId: 0,
    date: '',
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const petsStorage = localStorage.getItem('petsStorage');
    if (petsStorage) {
      const parsedPets = JSON.parse(petsStorage);
      const selectedPetId = parsedPets?.state?.selectedBuddy?.petId;

      if (selectedPetId) {
        setFormData((prev) => ({
          ...prev,
          petId: selectedPetId,
        }));
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'petId' ? Number(value) : value,
    }));
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateAndSubmit = (onSuccess: (formDataToSubmit: FormData) => void) => {
    try {
      hospitalSchema.parse(formData);
      setErrors({});

      const formDataToSubmit = new FormData();
      formDataToSubmit.append('petId', String(formData.petId));
      formDataToSubmit.append('date', formData.date);
      formDataToSubmit.append('title', formData.title);
      formDataToSubmit.append('description', formData.description);

      onSuccess(formDataToSubmit);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleDateInputChange,
    validateAndSubmit,
  };
};
