import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateJobInput {
  id: number;
  name?: string;
  contactEmail?: string;
  englishRequired?: boolean;
  workingModalityId?: number;
  employmentContractId?: number;
  dailyWorkTimeId: number;
  experienceTimeId?: number;
  categoryId?: number;
  maxSalary?: number;
  minSalary?: number;
  countryId?: number;
  cityId?: number;
  location?: string;
  vigencyDays?: number;
  statusId: number;
}
