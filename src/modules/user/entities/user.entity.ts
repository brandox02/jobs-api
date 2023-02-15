import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  imageId?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
