import { Routes } from '@angular/router';
import { EventDetailsComponent } from '../components/event-details/event-details.component';
import { TestComponentComponent } from '../components/test-component/test-component.component';
import { EventFormComponent } from '../components/event-form/event-form.component';

export const routes: Routes = [
  // Define routes used by the application.
  { path: 'event/:id', component: EventDetailsComponent },
  { path: 'add-event', component: EventFormComponent },
  { path: '**', component: TestComponentComponent },
];
