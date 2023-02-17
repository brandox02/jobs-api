import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Country } from './Country.entity';

@Entity('cities')
@ObjectType()
export class City extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'country_id' })
  countryId: number;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
