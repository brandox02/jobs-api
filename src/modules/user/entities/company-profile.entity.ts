import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('company_profiles')
@ObjectType()
export class CompanyProfile extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ name: 'foundation_date', nullable: true })
  foundationDate?: string;

  @Column({ name: 'country_id' })
  countryId: number;

  @Column({ name: 'city_id' })
  cityId: number;

  @Column()
  description: string;

  @Column({ nullable: true, name: 'facebook_url' })
  facebookUrl?: string;

  @Column({ nullable: true, name: 'twitter_url' })
  twitterUrl?: string;

  @Column({ nullable: true, name: 'linkein_url' })
  linkedinUrl?: string;
}
