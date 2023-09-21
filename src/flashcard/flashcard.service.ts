import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Flashcard, FlashcardDocument } from './flashcard.schema';
import { Model } from 'mongoose';
import {
  CreateFlashcardResponse,
  FindAllResponse,
  FindOneResponse,
  Order,
  UpdateFlashcardResponse,
} from './flashcard.pb';
import {
  CreateFlashcardRequestDto,
  FindAllArgsRequestDto,
  FindOneRequestDto,
  UpdateFlashcardRequestDto,
} from './flashcard.dto';

@Injectable()
export class FlashcardService {
  constructor(
    @InjectModel(Flashcard.name) private flashcardModel: Model<Flashcard>,
  ) {}

  async createFlashcard(
    request: CreateFlashcardRequestDto,
  ): Promise<CreateFlashcardResponse> {
    const createdFlashcard = new this.flashcardModel(request);
    const flashcard = await createdFlashcard.save();
    return {
      error: null,
      status: HttpStatus.CREATED,
      data: {
        id: flashcard._id.toString(),
        createdDate: flashcard.createdDate,
      },
    };
  }

  async findOne(request: FindOneRequestDto): Promise<FindOneResponse> {
    const { id } = request;
    const flashcard = await this.flashcardModel.findById(id).exec();
    if (!flashcard || flashcard.id === null) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Flashcard not found'],
        data: undefined,
      };
    }
    flashcard.id = flashcard._id;

    return {
      status: HttpStatus.OK,
      error: null,
      data: flashcard,
    };
  }
  async findAll(request: FindAllArgsRequestDto): Promise<FindAllResponse> {
    const orderBy = request?.orderBy ?? {
      createdDate: Order.DESC,
    };
    orderBy.createdDate = orderBy?.createdDate === Order.ASC ? 1 : -1;
    const flashcards = await this.flashcardModel
      .find()
      .sort({
        createdDate: orderBy.createdDate,
      })
      .exec();

    flashcards.forEach((flashcard: FlashcardDocument) => {
      flashcard.id = flashcard._id;
    });
    return {
      status: HttpStatus.OK,
      error: null,
      data: { flashcards },
    };
  }
  async updateFlashcard(
    request: UpdateFlashcardRequestDto,
  ): Promise<UpdateFlashcardResponse> {
    const flashcard = await this.findOne({ id: request.id });
    if (flashcard.status === HttpStatus.NOT_FOUND) {
      return flashcard;
    }
    const { question, answer } = request;
    await this.flashcardModel.updateOne(
      { _id: request.id },
      { question, answer },
    );
    return {
      status: HttpStatus.OK,
      error: null,
    };
  }

  async deleteFlashcard(
    request: FindOneRequestDto,
  ): Promise<UpdateFlashcardResponse> {
    const flashcard = await this.findOne({ id: request.id });
    if (flashcard.status === HttpStatus.NOT_FOUND) {
      return flashcard;
    }
    await this.flashcardModel.deleteOne({ _id: request.id });
    return {
      status: HttpStatus.OK,
      error: null,
    };
  }
}
