import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationEntity } from '../location/location.entity';
import { ApiService } from '../common/api.service';
import moment from 'moment';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
    private readonly apiService: ApiService,
  ) {}

  async fetchHistoricalWeatherData(id: number, days: number) {
    const location = await this.locationRepository.findOneBy({
      id: id,
      active: 1,
    });
    const requestData = {
      q: `${location.lat},${location.long}`,
      dt: moment()
        .subtract(Number(days) - 1, 'days')
        .startOf('day')
        .format('YYYY-MM-DD'),
    };
    console.log('calling external service', requestData);
    return await this.apiService.getHistoricalWeatherData(requestData);
  }
}
