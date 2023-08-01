import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import {v4 as uuidv4} from 'uuid';
export interface Cities {
  uuid: string;
  cityName: string;
  count: number;
}

@Injectable()
export class AppService {
  private cities: Array<Cities>;
  constructor() {
    this.cities = JSON.parse(fs.readFileSync('cities.json', 'utf-8'));
  }
  // getHello(): string {
  //   return 'Hello World!';
  // }

  getCities(): Cities[] {
    return this.cities;
  }

  createCity(cityName: string) : Cities[] {
    const city = { uuid: uuidv4(), cityName, count: 1};
    this.cities = [...this.cities, {...city}];
    fs.writeFileSync('cities.json', JSON.stringify(this.cities));
    return this.cities;
  }

  deleteCity(id: string): Cities[] {
    const index = this.cities.findIndex((city) => city.uuid === id);
    this.cities.splice(index,1);
    return this.cities;
  }
}
