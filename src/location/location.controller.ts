import {
    HttpStatus,
    HttpException,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Post,
    Body,
} from '@nestjs/common';
import { Location } from './location';
import { LocationService } from './location.service';
import { Logger } from '@nestjs/common';

@Controller('location')
export class LocationController {
    private readonly logger = new Logger(LocationController.name);

    constructor(private locationService: LocationService) { }

    @Get()
    async getAllLocations() {
        this.logger.log("getAllLocations gets called");
        const location = await this.locationService.getAll();
        this.logger.log("result of getAll: " + JSON.stringify(location || {}))
        if (location.length)
            return {
                success: true,
                message: 'Location fetched successfully',
                data: location,
            };
        throw new HttpException(`Location not found.`, HttpStatus.NOT_FOUND);
    }

    @Get(':id')
    async getLocationByID(@Param('id') id: number) {
        this.logger.log("getLocationByID gets called: " + id);
        const location = await this.locationService.findByID(id);
        this.logger.log("result of findByID: " + JSON.stringify(location || {}))
        if (location)
            return {
                success: true,
                message: 'Location fetched successfully',
                data: location,
            };
        throw new HttpException(`Location not found.`, HttpStatus.NOT_FOUND);
    }

    @Put(':id')
    async updateLocation(@Body() body: Location, @Param('id') id: number) {
        this.logger.log("updateLocation gets called", id);
        const location = await this.locationService.update(id, body);
        this.logger.log("result of update: " + JSON.stringify(location || {}))

        if (location)
            return {
                success: true,
                message: 'Location updated successfully',
                data: location,
            };
        throw new HttpException(
            `Could not update the location.`,
            HttpStatus.NOT_MODIFIED,
        );
    }

    @Delete(':id')
    async deleteLocation(@Param('id') id: number) {
        this.logger.log("deleteLocation gets called", id);
        const location = await this.locationService.update(id, { active: 0 });
        this.logger.log("result of delete: " + JSON.stringify(location || {}))
        if (location)
            return {
                success: true,
                message: 'Location deleted successfully',
                data: location,
            };
        throw new HttpException(
            `Could not delete the location.`,
            HttpStatus.NOT_MODIFIED,
        );
    }

    @Post()
    async addLocation(@Body() data: Location) {
        this.logger.log("addLocation gets called", data);
        const location = await this.locationService.create(data);
        this.logger.log("result of create: "+ JSON.stringify(location || {}))
        return {
            success: true,
            message: 'Location created successfully',
            data: location,
        };
    }
}
