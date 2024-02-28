import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { mysqlConfig } from 'src/config/mysql.config';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import { HistoryModule } from './history/history.module';

const envModule = ConfigModule.forRoot({
  isGlobal: true,
});
@Module({
  imports: [
    envModule,
    TypeOrmModule.forRoot(mysqlConfig),
    LocationModule,
    WeatherModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
