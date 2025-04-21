import { IsEmail, IsEnum, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsNotEmpty()
  name!: string;

  @IsEnum(['pet_owner', 'veterinarian', 'secretary', 'admin'])
  role!: 'pet_owner' | 'veterinarian' | 'secretary' | 'admin';

  @IsEnum(['es', 'en'])
  language!: 'es' | 'en';

  // Vet-specific fields (optional for pet_owner)
  @IsOptional()
  specialty?: string;

  @IsOptional()
  location?: string;

  @IsOptional()
  pricingTier?: 'basic' | 'standard' | 'premium';
}
