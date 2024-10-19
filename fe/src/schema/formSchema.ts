import { z } from 'zod';

// PetData에 대한 zod 스키마 정의
export const petSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  type: z.enum(['개', '고양이'], { message: '품종은 개 또는 고양이만 가능합니다.' }),
  birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: '생일은 YYYY-MM-DD 형식으로 입력해주세요.' }),
  profile_image: z.instanceof(File).optional(),
});
