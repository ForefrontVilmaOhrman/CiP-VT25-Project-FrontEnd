import { Injectable } from '@angular/core';
import mockdata from './mockdata.json'
import { AppEvent } from '../models/app-event';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor() { }

  // Todo implement with real data when API is ready.
  /**
   * Fetches all the appEvents from the API.
   * @returns the app event data from the api.
   */
  getData(): AppEvent[] {
    return mockdata;
  }
}
