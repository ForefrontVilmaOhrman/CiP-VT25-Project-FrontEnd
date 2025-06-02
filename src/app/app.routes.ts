import { Routes } from '@angular/router';
import { EventDetailsComponent } from '../components/event-details/event-details.component';
import { MainComponentComponent } from './pages/browsing-page/main-component.component';

import { CreateEventComponent } from './pages/create-event/create-event.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const routes: Routes = [
  // Define routes used by the application.
  { path: 'event/:id', component: EventDetailsComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'events', component: MainComponentComponent },
  { path: '**', component: LandingPageComponent },
];
