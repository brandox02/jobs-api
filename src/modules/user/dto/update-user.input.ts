import { InputType } from '@nestjs/graphql';
import { ResumeInput } from './resume.input';

@InputType()
export class UpdateCandidateProfileInput {
  id?: number;
  professionalTitle: string;
  currentSalary: number;
  desiredSalary: number;
  genderId: number;
  bornDate: Date;
  aboutMe?: string;
  phone: string;
  countryId: number;
  cityId: number;
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

@InputType()
export class UpdateCompanyProfileInput {
  id?: number;
  name: string;
  email: string;
  website?: string;
  foundationDate?: string;
  countryId: number;
  cityId: number;
  description: string;
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}

@InputType()
export class UpdateUserInput {
  id: number;
  email?: string;
  firstname?: string;
  lastname?: string;
  image?: string;
  imageUrl?: string;
  candidateProfile?: UpdateCandidateProfileInput;
  companyProfile?: UpdateCompanyProfileInput;
  resume?: ResumeInput;
}
