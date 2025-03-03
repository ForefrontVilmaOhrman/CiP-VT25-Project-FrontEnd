import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router
import mockdata from './mockdata.json';
import { AppEvent } from '../models/app-event';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  /**
   * Method to navigate to events. //TODO WIP still.
   */
  navigateToEvents(): void {
    this.router.navigate(['/events']);
  }

}
