import { InputType } from '@nestjs/graphql';

@InputType()
export class EducationListInput {
  id: number;
  name: string;
}

@InputType()
export class ResumeLaboralExperiencesInput {
  id: string;
  companyName: string;
  charge: string;
  isYourCurrentJob: boolean;
  startDate: string;
  endDate?: string;
  description: string;
}

@InputType()
export class ResumeEducationInput {
  id: string;
  educationId: number;
  education: EducationListInput;
  title: string;
  institution: string;
  isStudyingHere: boolean;
  startDate: string;
  endDate?: string;
}

@InputType()
export class ResumeProjectInput {
  id: string;
  name: string;
  customer: string;
  isFinished: boolean;
  startDate: string;
  endDate: string;
  description: string;
}

@InputType()
export class ResumeInput {
  id: string;
  resume: string;
  keySkills: string[];
  laboralExperiences: ResumeLaboralExperiencesInput[];
  educations: ResumeEducationInput[];
  projects: ResumeProjectInput[];
  image?: string;
}
