import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EducationList {
  id: number;
  name: string;
}

@ObjectType()
export class ResumeLaboralExperiences {
  id: number;
  companyName: string;
  charge: string;
  isYourCurrentJob: boolean;
  startDate: string;
  endDate: string;
  description: string;
}

@ObjectType()
export class ResumeEducation {
  id: number;
  educationId: number;
  title: string;
  institution: string;
  isStudyingHere: boolean;
  startDate: string;
  endDate: string;
}

@ObjectType()
export class ResumeProject {
  id: number;
  name: string;
  customer: string;
  isFinished: boolean;
  startDate: string;
  endDate: string;
  description: string;
}

@ObjectType()
export class Resume {
  id: number;
  resume: string;
  keyAbilities: string[];
  laboralExperiences: ResumeLaboralExperiences[];
  education: ResumeEducation[];
  projects: ResumeProject[];
}
