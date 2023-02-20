import { InputType } from '@nestjs/graphql';

@InputType()
export class ResumeLaboralExperiencesInput {
  id: number;
  companyName: string;
  charge: string;
  isYourCurrentJob: boolean;
  startDate: string;
  endDate: string;
  description: string;
}

@InputType()
export class ResumeEducationInput {
  id: number;
  educationId: number;
  title: string;
  institution: string;
  isStudyingHere: boolean;
  startDate: string;
  endDate: string;
}

@InputType()
export class ResumeProjectInput {
  id: number;
  name: string;
  customer: string;
  isFinished: boolean;
  startDate: string;
  endDate: string;
  description: string;
}

@InputType()
export class ResumeInput {
  id: number;
  resume: string;
  keyAbilities: string[];
  laboralExperiences: ResumeLaboralExperiencesInput[];
  education: ResumeEducationInput[];
  projects: ResumeProjectInput[];
}
