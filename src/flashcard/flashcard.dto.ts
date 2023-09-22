import { IsBoolean, IsEnum, IsJWT, IsNotEmpty, IsOptional, IsString, ValidateBy } from 'class-validator';
import {
  CreateFlashcardRequest,
  FindAllArgsRequest,
  FindOneRequest,
  OrderBy,
  Order,
  UpdateFlashcardRequest,
  GetShareLinkRequest,
  ViewFromShareLinkRequest,
  CreateAttributeRequest,
  GroupBy,
  Status,
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

export class GroupByRequestDto implements GroupBy {
  @IsOptional()
  public readonly attribute?: { key: string; value: string; } | undefined;
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

  @IsOptional()
  @ValidateBy({
    name: 'IsValidGroupBy',
    validator: (value: GroupBy) => {
      const isValidGroupBy = (value: GroupBy) => {
        return (
          Object.keys(value).length === 1 &&
          Object.keys(value).includes('attribute') &&
          Object.values(value).every(
            (v) => typeof v === 'string' || v === undefined,
          )
        );
      };
      return isValidGroupBy(value);
    }
  },
    {
      message: '$property must be a valid GroupBy',
    })
  public readonly groupBy?: GroupByRequestDto | undefined;

  @IsOptional()
  @IsBoolean()
  public readonly isVisible?: boolean | undefined;
}

export class UpdateFlashcardRequestDto implements UpdateFlashcardRequest {
  @IsNotEmpty()
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

  @IsOptional()
  @IsString()
  public readonly question?: string;

  @IsOptional()
  @IsString()
  public readonly answer?: string;
}

export class ReviewFlashcardRequestDto extends UpdateFlashcardRequestDto {
  @IsNotEmpty()
  @IsEnum(Status, {
    // todo: remove slice(0, 3) when we start using the `string_enums` flag
    message: `$property must be one of the following values: ${Object.values(
      Status,
    ).slice(0, 3).join(', ')}`
  })
  reviewStatus?: Status;
}

export class GetShareLinkRequestDto implements GetShareLinkRequest {
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

export class CreateAttributeRequestDto implements CreateAttributeRequest {
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
  flashcardId: string;

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  value: string;

}
