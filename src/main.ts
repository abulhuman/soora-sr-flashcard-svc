import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { protobufPackage } from './flashcard/flashcard.pb';
import { ConfigService } from '@nestjs/config';
import { appConfigConstants } from './common/configs/app.config.schema';

const config = new ConfigService();

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${config.get<string>(appConfigConstants.GRPC_SVC_PORT)}`,
        package: protobufPackage,
        protoPath: join('node_modules/soora-sr-proto/proto/flashcard.proto'),
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}

bootstrap();
