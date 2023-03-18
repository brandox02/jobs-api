import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Application } from 'src/modules/application/entities/application.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
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

  @OneToMany(() => Application, (d) => d.user)
  applications: Application[];

  @Column({ name: 'is_candidate' })
  isCandidate: boolean;

  @Column({ type: 'jsonb', nullable: true })
  resume: Resume;

  @Column({ nullable: true, default: false, name: 'is_admin' })
  isAdmin: boolean;
}
