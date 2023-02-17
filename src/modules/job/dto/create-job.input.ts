import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  name: string;
}

@InputType()
export class CreateJobInput {
  name: string;
  contactEmail: string;
  englishRequired: boolean;
  workingModalityId: number;
  employmentContractId: number;
  experienceTimeId: number;
  dailyWorkTimeId: number;
  categoryId: number;
  maxSalary: number;
  minSalary: number;
  countryId: number;
  cityId: number;
  location: string;
  vigencyDays: number;
  statusId: number;
  tags: CreateTagInput[];
  description: string;
}
