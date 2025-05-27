import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventInfoCardComponent } from '../../../components/event-info-card/event-info-card.component';
import { EventMainInfoCardComponent } from '../../../components/event-main-info-card/event-main-info-card.component';
import { ToolBarComponent } from '../../../components/tool-bar/tool-bar.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RestService } from '../../../services/rest.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule,
    EventInfoCardComponent,
    EventMainInfoCardComponent,
    ToolBarComponent,
    ToolBarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
})
export class CreateEventComponent {
  eventForm: FormGroup;
  validationError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService,
    private navigationService: NavigationService,
  ) {
    this.eventForm = this.formBuilder.group({
      title: [''],
      description: [''],
      category: ['', Validators.required],
      arranger: ['', Validators.required],
      location: ['', Validators.required],
      image: [
        'https://cipvt25storage.blob.core.windows.net/images/DancepartyBlue.png',
        Validators.required,
      ],
      date: ['', Validators.required],
      rsvp: [''],
    });
  }

  async onSubmit() {
    if (this.eventForm.valid) {
      await this.restService.createEvent(this.eventForm.value);
      this.navigationService.navigateToHomepage();
    } else {
      this.validationError = true;
      this.eventForm.markAllAsTouched();
      console.log('Form is invalid. Please check the input fields.');
    }
    console.log('Saved event data:', this.eventForm.value);
  }
}
