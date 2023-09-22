import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FlashcardDocument = HydratedDocument<Flashcard>;

@Schema({ _id: false })
class Attribute {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  value: string;
}

const AttributeSchema = SchemaFactory.createForClass(Attribute);

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

  @Prop({
    required: true,
    default: new Date().toISOString(),
  })
  nextReviewDate: string;

  @Prop({ type: [AttributeSchema], default: [] })
  attributes: Attribute[];
}


export const FlashcardSchema = SchemaFactory.createForClass(Flashcard);
