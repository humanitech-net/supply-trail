import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { UsersModule } from '../users.module';
import { UsersController } from '../user.controller';
import { UsersService } from '../users.service';
import { User } from '../../../typeorm';
import { Repository } from 'typeorm';
import { TypeormConfig } from '../../../typeorm/typeormconfig';

describe('UsersModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        jest.setTimeout(10000)
        module = await Test.createTestingModule({
            imports: [
                TypeormConfig,
                TypeOrmModule.forFeature([User]),
                UsersModule,
            ],
            providers: [UsersService, {
                provide: getRepositoryToken(User),
                useClass: Repository
            }],
            controllers: [UsersController],
        }).compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });
});