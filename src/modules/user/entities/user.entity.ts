import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Resume } from '../dto/resume.output';
import { CandidateProfile } from './candidate-profile.entity';
import { CompanyProfile } from './company-profile.entity';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true, name: 'image_id' })
  imageId?: string;

  @Column({ nullable: true, name: 'image_url' })
  imageUrl?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'company_profile_id', nullable: true })
  companyProfileId?: number;

  @OneToOne(() => CompanyProfile, { cascade: true })
  @JoinColumn({ name: 'company_profile_id' })
  companyProfile?: CompanyProfile;

  @Column({ name: 'candidate_profile_id', nullable: true })
  candidateProfileId?: number;

  @OneToOne(() => CandidateProfile, { cascade: true })
  @JoinColumn({ name: 'candidate_profile_id' })
  candidateProfile?: CandidateProfile;

  @Column({ name: 'is_candidate' })
  isCandidate: boolean;

  @Column({ type: 'jsonb', nullable: true })
  resume: Resume;
}
