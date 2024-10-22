import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const petSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  type: z.enum(['DOG', 'CAT'], { message: '품종은 개 또는 고양이만 가능합니다.' }),
  birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: '생일은 YYYY-MM-DD 형식으로 입력해주세요.' })
    .refine(
      (date) => {
        const [year, month, day] = date.split('-').map(Number);
        const isValidYear = year <= currentYear;
        const isValidMonth = month >= 1 && month <= 12;
        const isValidDay = day >= 1 && day <= 31;
        const isValidDate = !isNaN(year) && !isNaN(month) && !isNaN(day);
        return isValidDate && isValidYear && isValidMonth && isValidDay;
      },
      {
        message: '올바른 생일을 입력해주세요.',
      }
    ),
  profile_image: z.union([z.instanceof(File), z.string().nullable()]),
});

export const hospitalSchema = z.object({
  petId: z.number(),
  date: z
    .string()
    .datetime({ message: '올바른 날짜 형식이 아닙니다. ISO 8601 형식이어야 합니다.' })
    .refine(
      (dateString) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const isValidYear = year <= currentYear;
        return isValidYear && !isNaN(year) && !isNaN(month) && !isNaN(day);
      },
      {
        message: '올바른 날짜를 입력해주세요.',
      }
    ),
  title: z.string().min(1, { message: '제목을 입력해주세요.' }),
  description: z.string().min(1, { message: '메모 할 내용을 입력해주세요.' }),
});

export const vaccinationSchema = z.object({
  petId: z.number().min(1, { message: '유효한 반려동물 ID를 입력해주세요.' }),
  vaccinationDate: z
    .string()
    .datetime({ message: '올바른 날짜 형식이 아닙니다. ISO 8601 형식이어야 합니다.' })
    .refine(
      (dateString) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const isValidYear = year <= currentYear;
        return isValidYear && !isNaN(year) && !isNaN(month) && !isNaN(day);
      },
      {
        message: '올바른 날짜를 입력해주세요.',
      }
    ),
  vaccinationName: z.string().min(1, { message: '백신 이름을 입력해주세요.' }),
  description: z.string().min(1, { message: '백신에 대한 설명을 입력해주세요.' }).optional(), // 설명은 선택사항일 경우 optional로 처리
});
