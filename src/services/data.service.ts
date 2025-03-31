import { Injectable } from '@angular/core';
import { AppEvent } from '../models/app-event';
import { SearchParameters } from '../models/search-params';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() {}

  /**
   * Filters the app events based on the search parameters passed through.
   * @param searchParameters the search parameters such as: City, Location or Start and End Date.
   * @param appEvents the app event array we should filter.
   * @returns A filtered app event array
   */
  public filterEvents(searchParameters: SearchParameters, appEvents: AppEvent[]): AppEvent[] {
    const filteredEvents: AppEvent[] = appEvents.filter((event: AppEvent) => {
      // Check if the title is provided and matches
      const matchesName = searchParameters.title
        ? event.title.toLowerCase().includes(searchParameters.title.toLowerCase())
        : true; // If title is empty, do not filter by title
      // Check if the location (city) is provided and matches
      const matchesCity = searchParameters.location
        ? event.location?.toLowerCase().includes(searchParameters.location.toLowerCase())
        : true; // If location is empty, do not filter by location

      // Date range check: If startDate or endDate is provided, filter by date range
      const matchesDateRange = this.isDateInRange(event.date, searchParameters.startDate, searchParameters.endDate);

      // Return event only if it matches the provided parameters (ignoring empty fields)
      return matchesName && matchesCity && matchesDateRange;
    });

    return filteredEvents;
  }

  /**
   * Helper function to check if the date is within the range
   * @param eventDate the event date
   * @param startDate the start date
   * @param endDate the end date
   * @returns true or false depending on if the date is in the range.
   */
  private isDateInRange(eventDate: string, startDate: string | null, endDate: string | null): boolean {
    if (!startDate && !endDate) {
      return true; // If no range is provided, return true (no filtering by date)
    }

    const eventDateObj = new Date(eventDate); // Assuming event.date is a string like 'YYYY-MM-DD'

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const isAfterStart = start ? eventDateObj >= start : true; // If there's no start date, it passes
    const isBeforeEnd = end ? eventDateObj <= end : true; // If there's no end date, it passes

    return isAfterStart && isBeforeEnd;
  }
}
