import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('user')
export class User extends BaseEntity {
  @Field()
  @Column()
  email: string;

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column('int', { default: 0 })
  tokenVersion: number;
}
