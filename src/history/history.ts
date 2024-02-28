import { IsNotEmpty, Max, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class History {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  location_id: number;

  @IsNotEmpty()
  @IsInt()
  @Max(30)
  @Min(7)
  @Type(() => Number)
  days: number;
}
