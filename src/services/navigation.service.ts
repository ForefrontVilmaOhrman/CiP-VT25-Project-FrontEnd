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
  navigateToEvent(eventId: string): void {
    this.router.navigate(['/event', eventId]);
  }
  
  /**
   * Method to navigate to the homepage.
   */
  navigateToHomepage(): void {
    this.router.navigate(['/']);
  }

  /**
   * Method to navigate to the event page.
   */
  navigateToEventsPage(): void {
    this.router.navigate(['/events']);
  }
}