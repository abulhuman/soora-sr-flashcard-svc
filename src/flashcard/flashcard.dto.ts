import { IsJWT, IsNotEmpty, IsOptional, IsString, ValidateBy } from 'class-validator';
import {
  CreateFlashcardRequest,
  FindAllArgsRequest,
  FindOneRequest,
  OrderBy,
  Order,
  UpdateFlashcardRequest,
  GetShareLinkRequest,
  ViewFromShareLinkRequest,
} from './flashcard.pb';
import { isValidObjectId } from 'mongoose';

export class CreateFlashcardRequestDto implements CreateFlashcardRequest {
  @IsNotEmpty()
  @IsString()
  public readonly question: string;

  @IsNotEmpty()
  @IsString()
  public readonly answer: string;

  @IsNotEmpty()
  @IsString()
  @ValidateBy(
    {
      name: 'IsValidObjectId',
      validator: (value: string) => isValidObjectId(value),
    },
    {
      message: '$property must be a valid ObjectId',
    },
  )
  userId: string;
}

export class FindOneRequestDto implements FindOneRequest {
  @IsNotEmpty()
  @IsString()
  @ValidateBy(
    {
      name: 'IsValidObjectId',
      validator: (value: string) => isValidObjectId(value),
    },
    {
      message: '$property must be a valid ObjectId',
    },
  )
  public readonly id: string;
}

export class FindAllArgsRequestDto implements FindAllArgsRequest {
  @IsOptional()
  @ValidateBy({
    name: 'IsValidOrderBy',
    validator: (value: OrderBy) => {
      const isValidOrderBy = (value: OrderBy) => {
        return (
          Object.keys(value).length === 1 &&
          Object.keys(value).includes('createdDate') &&
          Object.values(value).every(
            (v) =>
              v === Order.ASC || v === Order.DESC || v === Order.UNRECOGNIZED,
          )
        );
      };
      return isValidOrderBy(value);
    },
  })
  public readonly orderBy?: OrderBy | undefined;
}

export class UpdateFlashcardRequestDto implements UpdateFlashcardRequest {
  @ValidateBy(
    {
      name: 'IsValidObjectId',
      validator: (value: string) => isValidObjectId(value),
    },
    {
      message: '$property must be a valid ObjectId',
    },
  )
  public readonly id: string;

  @IsString()
  public readonly question: string;

  @IsString()
  public readonly answer: string;
}

export class GetShareLinkRequestDto implements GetShareLinkRequest {
  @IsNotEmpty()
  @IsString()
  // @ValidateBy(
  //   {
  //     name: 'IsValidObjectId',
  //     validator: (value: string) => isValidObjectId(value),
  //   },
  //   {
  //     message: '$property must be a valid ObjectId',
  //   },
  // )
  public readonly userId: string;
}

export class ViewFromShareLinkRequestDto implements ViewFromShareLinkRequest {
  @IsNotEmpty()
  @IsString()
  @ValidateBy(
    {
      name: 'IsValidObjectId',
      validator: (value: string) => isValidObjectId(value),
    },
    {
      message: '$property must be a valid ObjectId',
    },
  )
  public readonly token: string;
}
