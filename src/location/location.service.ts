import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LocationEntity } from './location.entity';
import { Location } from './location';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
  ) {}

  async getAll() {
    return await this.locationRepository.findBy({ active: 1 });
  }

  async create(data: Location) {
    const location = this.locationRepository.create(data);
    await this.locationRepository.save(data);
    return location;
  }

  async findByID(id: number) {
    return await this.locationRepository.findOneBy({ id: id, active: 1 });
  }

  async update(id: number, data: Partial<LocationEntity>) {
    await this.locationRepository.update({ id }, data);
    return await this.locationRepository.findOneBy({ id: id });
  }

  async delete(id: number) {
    await this.locationRepository.update(
      { id },
      {
        active: 0,
      },
    );
    return await this.locationRepository.findOneBy({ id });
  }
}
