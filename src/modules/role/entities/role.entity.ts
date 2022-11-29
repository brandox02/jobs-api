import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('roles')
@ObjectType()
export class Role extends BaseEntity {
  @Column()
  @Field()
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
