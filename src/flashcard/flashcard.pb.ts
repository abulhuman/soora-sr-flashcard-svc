/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "flashcard";

export enum Status {
  AGAIN = 0,
  EASY = 1,
  HARD = 2,
  UNRECOGNIZED = -1,
}

export enum Order {
  ASC = 0,
  DESC = 1,
  UNRECOGNIZED = -1,
}

export interface CreateFlashcardRequest {
  question: string;
  answer: string;
  userId: string;
}

export interface CreateFlashcardResponse {
  status: number;
  error: string[];
  data: CreateFlashcardData | undefined;
}

export interface CreateFlashcardData {
  id: string;
  createdDate: string;
}

export interface FindOneData {
  id: string;
  question: string;
  answer: string;
  createdDate: string;
  nextReviewDate: string;
  attributes: AttributeData[];
}

export interface FindOneRequest {
  id: string;
}

export interface OrderBy {
  createdDate: Order;
}

export interface GroupBy {
  attribute?: AttributeData | undefined;
  isVisible?: boolean | undefined;
}

export interface FindAllArgsRequest {
  orderBy?: OrderBy | undefined;
  groupBy?: GroupBy | undefined;
}

export interface FindOneResponse {
  status: number;
  error: string[];
  data: FindOneData | undefined;
}

export interface FindAllData {
  flashcards: FindOneData[];
}

export interface FindAllResponse {
  status: number;
  error: string[];
  data: FindAllData | undefined;
}

export interface UpdateFlashcardRequest {
  id: string;
  question?: string | undefined;
  answer?: string | undefined;
  reviewStatus?: Status | undefined;
}

export interface UpdateFlashcardResponse {
  status: number;
  error: string[];
}

export interface GetShareLinkRequest {
  userId: string;
}

export interface GetShareLinkResponse {
  status: number;
  error: string[];
  link: string;
}

export interface ViewFromShareLinkRequest {
  token: string;
}

export interface ViewFromShareLinkResponse {
  status: number;
  error: string[];
  data: FindAllData | undefined;
}

export interface AttributeData {
  key: string;
  value: string;
}

export interface CreateAttributeRequest {
  flashcardId: string;
  key: string;
  value: string;
}

export interface CreateAttributeResponse {
  status: number;
  error: string[];
}

export const FLASHCARD_PACKAGE_NAME = "flashcard";

export interface FlashcardServiceClient {
  createFlashcard(request: CreateFlashcardRequest): Observable<CreateFlashcardResponse>;

  findOne(request: FindOneRequest): Observable<FindOneResponse>;

  findAll(request: FindAllArgsRequest): Observable<FindAllResponse>;

  updateFlashcard(request: UpdateFlashcardRequest): Observable<UpdateFlashcardResponse>;

  deleteFlashcard(request: FindOneRequest): Observable<UpdateFlashcardResponse>;

  getShareLink(request: GetShareLinkRequest): Observable<GetShareLinkResponse>;

  viewFromShareLink(request: ViewFromShareLinkRequest): Observable<ViewFromShareLinkResponse>;

  createAttribute(request: CreateAttributeRequest): Observable<CreateAttributeResponse>;

  reviewFlashcard(request: UpdateFlashcardRequest): Observable<UpdateFlashcardResponse>;
}

export interface FlashcardServiceController {
  createFlashcard(
    request: CreateFlashcardRequest,
  ): Promise<CreateFlashcardResponse> | Observable<CreateFlashcardResponse> | CreateFlashcardResponse;

  findOne(request: FindOneRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  findAll(request: FindAllArgsRequest): Promise<FindAllResponse> | Observable<FindAllResponse> | FindAllResponse;

  updateFlashcard(
    request: UpdateFlashcardRequest,
  ): Promise<UpdateFlashcardResponse> | Observable<UpdateFlashcardResponse> | UpdateFlashcardResponse;

  deleteFlashcard(
    request: FindOneRequest,
  ): Promise<UpdateFlashcardResponse> | Observable<UpdateFlashcardResponse> | UpdateFlashcardResponse;

  getShareLink(
    request: GetShareLinkRequest,
  ): Promise<GetShareLinkResponse> | Observable<GetShareLinkResponse> | GetShareLinkResponse;

  viewFromShareLink(
    request: ViewFromShareLinkRequest,
  ): Promise<ViewFromShareLinkResponse> | Observable<ViewFromShareLinkResponse> | ViewFromShareLinkResponse;

  createAttribute(
    request: CreateAttributeRequest,
  ): Promise<CreateAttributeResponse> | Observable<CreateAttributeResponse> | CreateAttributeResponse;

  reviewFlashcard(
    request: UpdateFlashcardRequest,
  ): Promise<UpdateFlashcardResponse> | Observable<UpdateFlashcardResponse> | UpdateFlashcardResponse;
}

export function FlashcardServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createFlashcard",
      "findOne",
      "findAll",
      "updateFlashcard",
      "deleteFlashcard",
      "getShareLink",
      "viewFromShareLink",
      "createAttribute",
      "reviewFlashcard",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FlashcardService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FlashcardService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const FLASHCARD_SERVICE_NAME = "FlashcardService";
