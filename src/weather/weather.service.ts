import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationEntity } from '../location/location.entity';
import { ApiService } from '../common/api.service';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
    private readonly apiService: ApiService,
  ) {}

  async fetchCurrentWeatherData(id: number) {
    const location = await this.locationRepository.findOneBy({
      id: id,
      active: 1,
    });
    const requestData = {
      q: `${location.lat},${location.long}`,
      aqi: 'no',
    };
    console.log('calling external service', requestData);
    return await this.apiService.getCurrentWeatherData(requestData);
  }
}
