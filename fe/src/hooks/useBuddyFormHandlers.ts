import { useState } from 'react';
import { z } from 'zod';

import { petSchema } from '@/schema/formSchema';
import { PetData } from '@/types/pet';

export const useBuddyFormHandlers = () => {
  const [formData, setFormData] = useState<PetData>({
    name: '',
    type: '',
    birth: '',
    profile_image: '',
  });
  const [file, setFile] = useState<File | string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let cleanedValue = value.replace(/[^0-9]/g, '');

    if (cleanedValue.length >= 5 && cleanedValue.length <= 6) {
      cleanedValue = `${cleanedValue.slice(0, 4)}-${cleanedValue.slice(4)}`;
    } else if (cleanedValue.length >= 7) {
      cleanedValue = `${cleanedValue.slice(0, 4)}-${cleanedValue.slice(4, 6)}-${cleanedValue.slice(6, 8)}`;
    }

    setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile('');
    }
  };

  const handleProfileImageClick = () => {
    document.getElementById('profile-image-input')?.click();
  };

  const validateAndSubmit = (onSuccess: (formDataToSubmit: FormData) => void) => {
    try {
      const mappedFormData = {
        ...formData,
        type: formData.type === '개' ? 'DOG' : formData.type === '고양이' ? 'CAT' : formData.type,
        profile_image: file || 'none',
      };

      petSchema.parse(mappedFormData);
      setErrors({});

      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', mappedFormData.name);
      formDataToSubmit.append('type', mappedFormData.type);
      formDataToSubmit.append('birth', mappedFormData.birth);
      if (typeof file === 'string') {
        formDataToSubmit.append('profile_image', 'none');
      } else if (file) {
        formDataToSubmit.append('profile_image', file);
      }

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
    file,
    errors,
    handleInputChange,
    handleDateInputChange,
    handleFileChange,
    handleProfileImageClick,
    validateAndSubmit,
  };
};
