import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Category } from 'src/entities/Category.entity';
import { City } from 'src/entities/City.entity';
import { Country } from 'src/entities/Country.entity';
import { EmploymentContract } from 'src/entities/EmploymentContract.entity';
import { ExperienceTime } from 'src/entities/ExperienceTime.entity';
import { JobStatus } from 'src/entities/JobStatus.entity';
import { Tag } from 'src/entities/Tag.entity';
import { WorkingModality } from 'src/entities/WorkingModality.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'jobs' })
@ObjectType()
export class Job extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'contact_email' })
  contactEmail: string;

  @Column({ name: 'english_required' })
  englishRequired: boolean;

  @Column({ name: 'working_modality_id' })
  workingModalityId: number;

  @ManyToOne(() => WorkingModality)
  @JoinColumn({ name: 'working_modality_id' })
  workingModality: WorkingModality;

  @Column({ name: 'employment_contract_id' })
  employmentContractId: number;

  @ManyToOne(() => EmploymentContract)
  @JoinColumn({ name: 'employment_contract_id' })
  employmentContract: EmploymentContract;

  @Column({ name: 'experience_time_id' })
  experienceTimeId: number;

  @ManyToOne(() => ExperienceTime)
  @JoinColumn({ name: 'experience_time_id' })
  experienceTime: ExperienceTime;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'salary_max' })
  maxSalary: number;

  @Column({ name: 'salary_min' })
  minSalary: number;

  @Column({ name: 'country_id' })
  countryId: number;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ name: 'city_id' })
  cityId: number;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column()
  location: string;

  @Column({ name: 'vigency_days' })
  vigencyDays: number;

  @Column({ name: 'status_id' })
  statusId: number;

  @ManyToOne(() => JobStatus)
  @JoinColumn({ name: 'status_id' })
  status: JobStatus;

  @OneToMany(() => Tag, (t) => t.job, {
    cascade: true,
  })
  tags: Tag[];
}
