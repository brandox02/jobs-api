import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EducationList {
  id: number;
  name: string;
}

@ObjectType()
export class ResumeLaboralExperiences {
  id: string;
  companyName: string;
  charge: string;
  isYourCurrentJob: boolean;
  startDate: string;
  endDate?: string;
  description: string;
}

@ObjectType()
export class ResumeEducation {
  id: string;
  educationId: number;
  education: EducationList;
  title: string;
  institution: string;
  isStudyingHere: boolean;
  startDate: string;
  endDate?: string;
}

@ObjectType()
export class ResumeProject {
  id: string;
  name: string;
  customer: string;
  isFinished: boolean;
  startDate: string;
  endDate: string;
  description: string;
}

@ObjectType()
export class Resume {
  id: string;
  resume: string;
  keySkills: string[];
  laboralExperiences: ResumeLaboralExperiences[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  imageUrl?: string;
  imageId?: string;
}
