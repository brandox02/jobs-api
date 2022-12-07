import { InputType } from '@nestjs/graphql';

@InputType()
export class CompanyWhereInput {
  name?: string;
  id?: number;
  sede?: string;
  location?: string;
}

@InputType()
export class UpdateDepartmentInput {
  id?: number;
  name?: string;
}

@InputType()
export class UpdateCompanyInput {
  id: number;
  name?: string;
  sede?: string;
  location?: string;
  acronym?: string;
  departments?: UpdateDepartmentInput[];
}

@InputType()
export class CreateDepartmentInput {
  name?: string;
}
@InputType()
export class CreateCompanyInput {
  name?: string;
  sede?: string;
  location?: string;
  acronym?: string;
  departments?: CreateDepartmentInput[];
}
