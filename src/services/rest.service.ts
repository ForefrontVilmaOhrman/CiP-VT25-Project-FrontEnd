import { Injectable } from '@angular/core';
import { AppEvent } from '../models/app-event';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Constants } from '../models/constants';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private httpClient: HttpClient) {}

  eventData: AppEvent[] = [];

  /**
   * Fetches all the appEvents from the API.
   * @returns the app event data from the api.
   */
  async getData(): Promise<AppEvent[]> {
    this.eventData = await firstValueFrom(
      this.httpClient.get<AppEvent[]>(Constants.API_URL + '/AppEvent')
    );
    return this.eventData;
  }

  /**
   * Deletes an event by its id.
   * @param eventId The id of the event to delete
   */
  async deleteEvent(eventId: String): Promise<void> {
    // Delete an event
    console.log('Deleting event with id:', eventId);
    await firstValueFrom(
      this.httpClient.delete<void>(`${Constants.API_URL}/AppEvent/${eventId}`)
    );
  }

  async createEvent(data: any): Promise<void> {
    // Create an event
    console.log('Creating event with data:', data);
    await firstValueFrom(
      this.httpClient.post<void>(`${Constants.API_URL}/AppEvent`, data)
    );
  }
}
