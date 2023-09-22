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
  CreateAttributeRequestDto,
  CreateFlashcardRequestDto,
  FindAllArgsRequestDto,
  FindOneRequestDto,
  GetShareLinkRequestDto,
  ReviewFlashcardRequestDto,
  UpdateFlashcardRequestDto,
  ViewFromShareLinkRequestDto,
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
  private findAll(payload: FindAllArgsRequestDto): Promise<FindAllResponse> {
    return this.flashcardService.findAll(payload);
  }

  @GrpcMethod(FLASHCARD_SERVICE_NAME, 'FindOne')
  private findOne({ id }: FindOneRequestDto) {
    return this.flashcardService.findOne({ id });
  }

  @GrpcMethod(FLASHCARD_SERVICE_NAME, 'UpdateFlashcard')
  private updateFlashcard(
    payload: UpdateFlashcardRequestDto,
  ): Promise<UpdateFlashcardResponse> {
    return this.flashcardService.updateFlashcard(payload);
  }

  @GrpcMethod(FLASHCARD_SERVICE_NAME, 'DeleteFlashcard')
  private deleteFlashcard({ id }: FindOneRequestDto): Promise<UpdateFlashcardResponse> {
    return this.flashcardService.deleteFlashcard({ id });
  }

  @GrpcMethod(FLASHCARD_SERVICE_NAME, 'GetShareLink')
  private getShareLink({ userId }: GetShareLinkRequestDto): Promise<UpdateFlashcardResponse> {
    return this.flashcardService.getShareLink({ userId });
  }

  @GrpcMethod(FLASHCARD_SERVICE_NAME, 'ViewFromShareLink')
  private viewFromShareLink({ token }: ViewFromShareLinkRequestDto): Promise<UpdateFlashcardResponse> {
    return this.flashcardService.viewFromShareLink({ token });
  }

  @GrpcMethod(FLASHCARD_SERVICE_NAME, 'CreateAttribute')
  private createAttribute({ flashcardId, key, value }: CreateAttributeRequestDto): Promise<UpdateFlashcardResponse> {
    return this.flashcardService.createAttribute({ flashcardId, key, value });
  }

  @GrpcMethod(FLASHCARD_SERVICE_NAME, 'reviewFlashcard')
  private reviewFlashcard(request: ReviewFlashcardRequestDto): Promise<UpdateFlashcardResponse> {
    return this.flashcardService.reviewFlashcard(request);
  }

}
