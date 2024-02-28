import {
  Inject,
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Logger } from '@nestjs/common';
export const CACHE_TTL_METADATA_KEY = 'cache_ttl';

@Injectable()
export class CacheTTLInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CacheTTLInterceptor.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {

    const key = this.generateCacheKey(context);
    this.logger.log("intercepting key: " + key);
    const cachedKey = await this.cacheManager.get(key);
    this.logger.log("cached key: "+ key);
    if (cachedKey) {
      return from([cachedKey]);
    }
    this.logger.log("no cached key");
    return next.handle().pipe(
      tap(async (data) => {
        await this.cacheManager.set(key, data, {
          ttl: this.getSecondOfEndOfToday(),
        });
      }),
    );
  }

  private generateCacheKey(context: ExecutionContext): string {
    this.logger.log("generateCacheKey gets called");
    const request = context.switchToHttp().getRequest();
    this.logger.log("generated key name: " + request.url);
    return `${request.url}`;
  }

  private getSecondOfEndOfToday(): number {
    this.logger.log("getSecondOfEndOfToday gets called");
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    const secondsUntilEndOfDate = 24 * 60 * 60 - h * 60 * 60 - m * 60 - s;
    this.logger.log("generated remaining seconds of the day: " + secondsUntilEndOfDate);
    return secondsUntilEndOfDate;
  }
}
