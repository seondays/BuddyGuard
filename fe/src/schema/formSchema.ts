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
        const isValidYear = year <= currentYear; // 현재 연도보다 크지 않도록 허용
        const isValidMonth = month >= 1 && month <= 12;
        const isValidDay = day >= 1 && day <= 31;
        const isValidDate = !isNaN(year) && !isNaN(month) && !isNaN(day);
        return isValidDate && isValidYear && isValidMonth && isValidDay;
      },
      {
        message: '올바른 생일을 입력해주세요.',
      }
    ),
  profile_image: z.instanceof(File).nullable(),
});
