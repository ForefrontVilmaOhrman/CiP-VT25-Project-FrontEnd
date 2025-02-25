import { Injectable } from '@angular/core';
import mockdata from './mockdata.json'
import { AppEvent } from '../models/app-event';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor() { }

  // Todo implement with real data when API is ready.
  getData(): AppEvent[] {
    return mockdata;
  }
}
