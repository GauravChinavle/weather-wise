import {
    HttpStatus,
    HttpException,
    Controller,
    Get,
    ValidationPipe,
    UsePipes,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CacheTTLInterceptor } from '../decorators/cacheTTL/cacheTTL.controller';
import { History } from './history';
import { Logger } from '@nestjs/common';

@Controller('history')
export class HistoryController {
    private readonly logger = new Logger(HistoryController.name);

    constructor(private locationService: HistoryService) { }

    @UseInterceptors(CacheTTLInterceptor)
    @Get()
    @UsePipes(new ValidationPipe())
    async getHistory(@Query() { location_id, days }: History) {
        this.logger.log("getHistory gets called: " + JSON.stringify({ location_id, days }));
        const history = await this.locationService.fetchHistoricalWeatherData(
            location_id,
            days,
        );
        this.logger.log("result of fetchHistoricalWeatherData: "+ JSON.stringify(history || {}));
        if (history)
            return {
                success: true,
                message: 'Historical weather data fetched successfully',
                data: history,
            };
        throw new HttpException(
            `Location was not found. Please add the location before proceeding.`,
            HttpStatus.NOT_FOUND,
        );
    }
}
