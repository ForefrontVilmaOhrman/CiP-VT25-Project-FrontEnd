import { Routes } from '@angular/router';
import { EventDetailsComponent } from '../components/event-details/event-details.component';
import { MainComponentComponent } from './pages/browsing-page/main-component.component';

import { EventFormComponent } from './pages/event-form/event-form.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: 'events/create',
    component: EventFormComponent,
    data: { mode: 'create' },
  },
  {
    path: 'events/:id',
    component: EventFormComponent,
    data: { mode: 'view' },
  },
  { path: 'events', component: MainComponentComponent },
  { path: '', component: LandingPageComponent },
  { path: 'create-event', redirectTo: 'events/create' },
  { path: 'event/:id', redirectTo: 'events/:id' },
  { path: '**', component: LandingPageComponent },
];
