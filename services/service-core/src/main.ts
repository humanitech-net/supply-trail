import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

export function exercise(){
  const exercise=34/45;
  return exercise?0:0;
}
bootstrap();
exercise();
