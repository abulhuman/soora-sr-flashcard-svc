import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FlashcardService } from './flashcard.service';
import {
  CreateFlashcardResponse,
  FLASHCARD_SERVICE_NAME,
  FindAllResponse,
  UpdateFlashcardResponse,
} from './flashcard.pb';
import {
  CreateFlashcardRequestDto,
  FindAllArgsRequestDto,
  FindOneRequestDto,
  UpdateFlashcardRequestDto,
} from './flashcard.dto';

@Controller()
export class FlashcardController {
  @Inject(FlashcardService)
  private readonly flashcardService: FlashcardService;

  @GrpcMethod(FLASHCARD_SERVICE_NAME, 'CreateFlashcard')
  private createFalshcard(
    payload: CreateFlashcardRequestDto,
  ): Promise<CreateFlashcardResponse> {
    return this.flashcardService.createFlashcard(payload);
  }

  @GrpcMethod(FLASHCARD_SERVICE_NAME, 'FindAll')
  findAll(payload: FindAllArgsRequestDto): Promise<FindAllResponse> {
    return this.flashcardService.findAll(payload);
  }

  @GrpcMethod(FLASHCARD_SERVICE_NAME, 'FindOne')
  findOne({ id }: FindOneRequestDto) {
    return this.flashcardService.findOne({ id });
  }

  @GrpcMethod(FLASHCARD_SERVICE_NAME, 'UpdateFlashcard')
  updateFlashcard(
    payload: UpdateFlashcardRequestDto,
  ): Promise<UpdateFlashcardResponse> {
    return this.flashcardService.updateFlashcard(payload);
  }

  @GrpcMethod(FLASHCARD_SERVICE_NAME, 'DeleteFlashcard')
  deleteFlashcard({ id }: FindOneRequestDto): Promise<UpdateFlashcardResponse> {
    return this.flashcardService.deleteFlashcard({ id });
  }
}
