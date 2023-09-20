import { Module } from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { FlashcardController } from './flashcard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Flashcard, FlashcardSchema } from './flashcard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Flashcard.name,
        schema: FlashcardSchema
      }
    ]),
  ],
  controllers: [FlashcardController],
  providers: [FlashcardService],
})
export class FlashcardModule {}
