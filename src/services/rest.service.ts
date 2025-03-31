import { Injectable } from '@angular/core';
import mockdata from './mockdata.json'
import { AppEvent } from '../models/app-event';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Constants } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { }

  eventData: AppEvent[] = [];

  // Todo implement with real data when API is ready.
  /**
   * Fetches all the appEvents from the API.
   * @returns the app event data from the api.
   */
   async getData(): Promise<AppEvent[]> {
    this.eventData = await firstValueFrom(this.httpClient.get<AppEvent[]>(Constants.API_URL + '/events'));
    return this.eventData;
  }
}
