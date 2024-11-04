export interface PetData {
  name: string;
  type: string;
  birth: string;
  profile_image: File | string | null;
}

export interface PetInfo {
  userId: number;
  petId: number;
  petName: string;
  profileImage: string;
}
