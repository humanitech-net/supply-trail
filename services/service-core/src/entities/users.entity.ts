import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Users {
  @Field()
  id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field({ nullable: true })
  city: string;
}
