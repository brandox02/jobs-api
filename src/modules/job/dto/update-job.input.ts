import { InputType } from '@nestjs/graphql';
import { RequirementInput } from './requirement.input';

@InputType()
export class UpdateTagInput {
  jobId?: number;
  id?: number;
  name: string;
}

@InputType()
export class UpdateJobInput {
  id: number;
  name?: string;
  contactEmail?: string;
  englishRequired?: boolean;
  workingModalityId?: number;
  employmentContractId?: number;
  dailyWorkTimeId?: number;
  experienceTimeId?: number;
  categoryId?: number;
  maxSalary?: number;
  minSalary?: number;
  countryId?: number;
  cityId?: number;
  location?: string;
  vigencyDays?: number;
  statusId?: number;
  tags?: UpdateTagInput[];
  description2?: string;
  enabled?: boolean;
  requirements?: RequirementInput[];
}

@InputType()
export class ApplyJobInput {
  jobId: number;
  userId: number;
}
