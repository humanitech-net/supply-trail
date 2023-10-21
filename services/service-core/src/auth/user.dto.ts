import { IsEmail, IsString, IsOptional } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

export class UpdateUserDto {
  @Field()
  @IsOptional()
  firstName: string;

  @Field()
  @IsOptional()
  lastName: string;

  @IsOptional()
  @Field()
  username: string;
}
