import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlashcardModule } from './flashcard/flashcard.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { appConfigSchema, appConfigConstants } from './common/configs/app.config.schema';

const config = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ...appConfigSchema,
      })
    }),
    FlashcardModule,
    MongooseModule.forRoot(config.get<string>(appConfigConstants.DATABASE_URL))
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
