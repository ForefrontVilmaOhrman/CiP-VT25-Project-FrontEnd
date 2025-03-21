import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppEvent } from '../models/app-event';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  /**
   * Method to navigate to a specific event by ID.
   */
  navigateToEvent(eventId: number): void {
    this.router.navigate(['/event', eventId]);
  }
}