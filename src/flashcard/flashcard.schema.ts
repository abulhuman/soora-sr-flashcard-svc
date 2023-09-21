import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FlashcardDocument = HydratedDocument<Flashcard>;

@Schema()
export class Flashcard {
  @Prop({
    required: true,
    default: new mongoose.Types.ObjectId(),
  })
  id: string;

  @Prop({
    required: true,
  })
  question: string;

  @Prop({
    required: true,
  })
  answer: string;

  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    required: true,
    default: new Date().toISOString(),
  })
  createdDate: string;
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard);
