import { IsNumber } from 'class-validator';

export class Weather {
  @IsNumber({}, { message: 'please send language id' })
  id: number;
}
