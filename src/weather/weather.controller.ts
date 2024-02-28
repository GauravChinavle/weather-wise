import { HttpStatus, HttpException, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CacheTTLInterceptor } from '../decorators/cacheTTL/cacheTTL.controller';
import { Logger } from '@nestjs/common';
@Controller('weather')
export class WeatherController {
    private readonly logger = new Logger(WeatherController.name);

    constructor(private locationService: WeatherService) { }
    
    @Get()
    needID() {
        throw new HttpException('Please provide ID of the location.', HttpStatus.NOT_ACCEPTABLE);
    }

    @UseInterceptors(CacheTTLInterceptor)
    @Get(':id')
    async getWeatherByLocationID(@Param("id") id: number) {
        this.logger.log("getWeatherByLocationID gets called", id)
        const currentWeather = await this.locationService.fetchCurrentWeatherData(id);
        this.logger.log("result of currentWeather: " + JSON.stringify(currentWeather || {}))
        if (currentWeather) return {
            success: true,
            message: 'Current weather fetched successfully',
            data: currentWeather
        };
        throw new HttpException(`Location was not found. Please add the location before proceeding.`, HttpStatus.NOT_FOUND);
    }
   
}
