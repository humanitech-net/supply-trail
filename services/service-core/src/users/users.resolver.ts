import { Query, Resolver } from '@nestjs/graphql';
import { Users } from 'src/entities/users.entity';

@Resolver(() => Users)
export class UsersResolver {
  @Query(() => Users)
  findAll() {
    return { id: '123', firstName: 'Test' };
  }
}
