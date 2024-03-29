import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { City } from 'src/entities/City.entity';
import { Country } from 'src/entities/Country.entity';
import { Gender } from 'src/entities/Gender.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('candidate_profiles')
@ObjectType()
export class CandidateProfile extends BaseEntity {
  @Column({ name: 'professional_title' })
  professionalTitle: string;

  @Column({ name: 'current_salary' })
  currentSalary: number;

  @Column({ name: 'desired_salary', nullable: true })
  desiredSalary?: number;

  @Column({ name: 'gender_id' })
  genderId: number;

  @ManyToOne(() => Gender, { eager: true })
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  @Column({ name: 'born_date' })
  bornDate: string;

  @Column({ name: 'about_me', nullable: true })
  aboutMe?: string;

  @Column()
  phone: string;

  @Column({ name: 'country_id' })
  countryId: number;

  @ManyToOne(() => Country, { eager: true })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ name: 'city_id' })
  cityId: number;

  @ManyToOne(() => City, { eager: true })
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column({ nullable: true, name: 'facebook_url' })
  facebookUrl?: string;

  @Column({ nullable: true, name: 'twitter_url' })
  twitterUrl?: string;

  @Column({ nullable: true, name: 'linkedin_url' })
  linkedinUrl?: string;

  @Column({ nullable: true, name: 'github_url' })
  githubUrl?: string;

  @Column({ nullable: true, default: false, name: 'belong_to_cv_bank' })
  belongToCvBank?: boolean;
}
