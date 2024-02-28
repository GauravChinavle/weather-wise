import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CustomCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setWithTTL(key: string, value: any, ttl: number) {
    console.log({ key, value, ttl });

    await this.cacheManager.set(key, value, ttl);
  }

  async get(key: string) {
    return this.cacheManager.get(key);
  }
}
