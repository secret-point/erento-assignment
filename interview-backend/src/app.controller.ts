import { Controller, Get, Post, Body, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Cities } from './app.service';

@Controller('api/cities')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // getHello(): string {
    //   return this.appService.getHello();
    // }
    
  @Get()
  getCities(): Cities[] {
    try {
      return this.appService.getCities();
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post()
  createCity(@Body() {cityName} : Cities): Cities[] {
    try {
      return this.appService.createCity(cityName);
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  deleteCity(@Param('id') id: string): Cities[] {
    try {
      return this.appService.deleteCity(id);
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
