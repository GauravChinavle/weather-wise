import { IsNumber, IsString, Min, Max } from 'class-validator';

export class Location {
  @IsString({
    message: 'name must be a string',
  })
  name: string;

  @IsNumber({}, { message: 'lat must be a number' })
  @Min(-90, { message: 'lat must be greater than or equal to -90' })
  @Max(90, { message: 'lat must be less than or equal to 90' })
  lat: number;

  @IsNumber({}, { message: 'long must be a number' })
  @Min(-180, { message: 'long must be greater than or equal to -180' })
  @Max(180, { message: 'long must be less than or equal to 180' })
  long: number;
}
