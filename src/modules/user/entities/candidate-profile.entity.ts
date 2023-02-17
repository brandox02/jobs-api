import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('candidate_profiles')
@ObjectType()
export class CandidateProfile extends BaseEntity {
  @Column({ name: 'professional_title' })
  professionalTitle: string;

  @Column({ name: 'current_salary' })
  currentSalary: number;

  @Column({ name: 'desired_salary' })
  desiredSalary: number;

  @Column({ name: 'gender_id' })
  genderId: number;

  @Column({ name: 'born_date' })
  bornDate: Date;

  @Column({ name: 'about_me', nullable: true })
  aboutMe: string;

  @Column()
  phone: string;

  @Column({ name: 'country_id' })
  countryId: number;

  @Column({ name: 'city_id' })
  cityId: number;

  @Column({ nullable: true, name: 'facebook_url' })
  facebookUrl: string;

  @Column({ nullable: true, name: 'twitter_url' })
  twitterUrl: string;

  @Column({ nullable: true, name: 'linkein_url' })
  linkedinUrl: string;
}
