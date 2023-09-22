import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Flashcard, FlashcardDocument } from './flashcard.schema';
import mongoose, { Model } from 'mongoose';
import {
  CreateAttributeResponse,
  CreateFlashcardResponse,
  FindAllResponse,
  FindOneResponse,
  GetShareLinkResponse,
  GroupBy,
  Order,
  Status,
  UpdateFlashcardResponse,
} from './flashcard.pb';
import {
  CreateAttributeRequestDto,
  CreateFlashcardRequestDto,
  FindAllArgsRequestDto,
  FindOneRequestDto,
  GetShareLinkRequestDto,
  ReviewFlashcardRequestDto,
  UpdateFlashcardRequestDto,
  ViewFromShareLinkRequestDto,
} from './flashcard.dto';

@Injectable()
export class FlashcardService {
  constructor(
    @InjectModel(Flashcard.name) private flashcardModel: Model<Flashcard>,
  ) { }

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

    let flashcards: FlashcardDocument[] = [];

    if (!request?.groupBy || !request.groupBy.attribute) {

      flashcards = await this.flashcardModel
        .find({ nextReviewDate: request?.isVisible ? { $lte: new Date() } : undefined })
        .sort({
          createdDate: orderBy.createdDate,
        })
        .exec();

    } else {
      const { key, value } = request.groupBy.attribute;
      flashcards = await this.flashcardModel
        .find({ $and: [{ attributes: { $elemMatch: { key, value } } }], nextReviewDate: request?.isVisible ? { $lte: new Date() } : {}, })
        .sort({
          createdDate: orderBy.createdDate,
        })
        .exec();
    }

    flashcards.map((flashcard: FlashcardDocument) => ({
      ...flashcard,
      id: flashcard._id,
    }));
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

  async getShareLink({ userId: _ }: GetShareLinkRequestDto): Promise<GetShareLinkResponse> {
    const objectId = new mongoose.Types.ObjectId();
    return {
      status: HttpStatus.OK,
      error: null,
      link: `/view-shared/${objectId._id.toString()}`
    };
  }

  async viewFromShareLink({ token }: ViewFromShareLinkRequestDto): Promise<FindAllResponse> {
    if (!mongoose.isValidObjectId(token)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: ['Invalid link (Broken link)'],
        data: undefined,
      };
    }
    return this.findAll({ orderBy: { createdDate: Order.DESC } });
  }

  async createAttribute(
    request: CreateAttributeRequestDto,
  ): Promise<CreateAttributeResponse> {
    const flashcard = await this.findOne({ id: request.flashcardId });
    if (flashcard.status === HttpStatus.NOT_FOUND) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Flashcard not found'],

      };
    }

    const { key, value } = request;

    await this.flashcardModel.updateOne(
      { _id: request.flashcardId },
      { $push: { attributes: { key, value } } },
    );

    return {
      error: null,
      status: HttpStatus.CREATED,
    };
  }

  async reviewFlashcard(request: ReviewFlashcardRequestDto): Promise<UpdateFlashcardResponse> {
    const SECOND = 1000;
    const intervals = {
      AGAIN: 30 * SECOND,
      EASY: 60 * SECOND,
      HARD: 120 * SECOND,
    } as const;
    const flashcard = await this.findOne({ id: request.id });
    if (flashcard.status === HttpStatus.NOT_FOUND) {
      return flashcard;
    }
    const { reviewStatus } = request;
    const now = new Date();
    // todo: upgrade protoc to version 3.15.0+ to use `string_enums` flag 
    // todo: this allows you to set the increment to be  `interals[reviewStatus]` instead of the following
    const increment = reviewStatus === Status.AGAIN ? intervals.AGAIN :
      reviewStatus === Status.EASY ? intervals.EASY : intervals.HARD;

    await this.flashcardModel.updateOne(
      { _id: request.id },
      { nextReviewDate: new Date(now.getTime() + increment).toISOString() },
    );

    return {
      status: HttpStatus.OK,
      error: null,
    };
  }
}
