import { InputType } from '@nestjs/graphql';

@InputType()
export class JobWhereInput {
  id?: number;
  createdUserId?: number;
  cityId?: number;
  categoryId?: number;
  dailyWorkTimeId?: number;
  employmentContractId?: number;
  workingModalityId?: number;
  englishRequired?: boolean;
  minSalary?: number;
  maxSalary?: number;
  experienceTimeId?: number;
  name?: string;
}
