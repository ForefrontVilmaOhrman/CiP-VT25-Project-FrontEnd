import { Routes } from '@angular/router';
import { EventDetailsComponent } from '../components/event-details/event-details.component';
import { TestComponentComponent } from '../components/test-component/test-component.component';

export const routes: Routes = [
  // Define routes used by the application.
  { path: 'event/:id', component: EventDetailsComponent },
  { path: '**', component: TestComponentComponent }
];