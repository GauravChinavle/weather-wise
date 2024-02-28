import { Injectable, ForbiddenException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class ApiService {
  private readonly weatherURL: string = process.env.WEATHER_API_URL;
  private readonly historyURL: string = process.env.WEATHER_HISTORY_API_URL;
  private readonly apiKey: string = process.env.API_KEY;
  private readonly logger = new Logger(ApiService.name);

  constructor(private readonly httpService: HttpService) {}

  async getCurrentWeatherData(params?: object): Promise<any> {
    this.logger.log("getCurrentWeatherData gets called: " + JSON.stringify(params));
    const request = this.httpService
      .get(this.weatherURL, { params: { ...params, key: this.apiKey } })
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException(
            'External API service is  not available at the moment. Please try again  after sometime!',
          );
        }),
      );
    const report = await lastValueFrom(request);
    this.logger.log("result of getCurrentWeatherData: " + JSON.stringify(report || {}));
    return report;
  }

  async getHistoricalWeatherData(params?: object): Promise<any> {
    this.logger.log("getHistoricalWeatherData gets called: " + JSON.stringify(params));
    const request = this.httpService
      .get(this.historyURL, { params: { ...params, key: this.apiKey } })
      .pipe(map((res) => res.data))
      .pipe(
        catchError((e) => {
          console.log(e.response.data.error, '--');

          throw new ForbiddenException(
            'External API service is not available at the moment. Please try again  after sometime!',
          );
        }),
      );

    const report = await lastValueFrom(request);
    this.logger.log("result of getHistoricalWeatherData: " + JSON.stringify(report || {}));

    return report;
  }
}
