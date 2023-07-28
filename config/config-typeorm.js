
const configTypeORM = {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'humanitech: supply-trail',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
}

export default configTypeORM;