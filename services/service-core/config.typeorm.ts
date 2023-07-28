import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const configTypeORM: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'humanitech: supply-trail',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
}