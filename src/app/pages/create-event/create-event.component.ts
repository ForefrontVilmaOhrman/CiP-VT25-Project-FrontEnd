import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EventInfoCardComponent } from '../../../components/event-info-card/event-info-card.component';
import { EventMainInfoCardComponent } from '../../../components/event-main-info-card/event-main-info-card.component';
import { ToolBarComponent } from '../../../components/tool-bar/tool-bar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RestService } from '../../../services/rest.service';
import { NavigationService } from '../../../services/navigation.service';
import { EventInfoDropDownComponent } from '../../../components/event-info-drop-down/event-info-drop-down.component';

interface EventForm {
  title: FormControl<string>;
  description: FormControl<string>;
  category: FormControl<string>;
  arranger: FormControl<string>;
  location: FormControl<string>;
  date: FormControl<string>;
  rsvp: FormControl<string>;
}

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule,
    EventInfoCardComponent,
    EventMainInfoCardComponent,
    ToolBarComponent,
    ReactiveFormsModule,
    EventInfoDropDownComponent,
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
})
export class CreateEventComponent {
  private readonly restService = inject(RestService);
  private readonly navigationService = inject(NavigationService);

  eventForm = new FormGroup<EventForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', { nonNullable: true }),
    category: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    arranger: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    location: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    rsvp: new FormControl('', { nonNullable: true }),
  });

  submitted = false;
  selectedImageFile: File | null = null;
  isSubmitting = false;

  onImageSelected(file: File): void {
    this.selectedImageFile = file;
  }

  async onSubmit(): Promise<void> {
    if (this.isSubmitting) return;

    if (!this.eventForm.valid) {
      this.handleInvalidForm();
      return;
    }

    this.isSubmitting = true;
    this.submitted = false;

    try {
      const formData = this.buildFormData();
      await this.restService.createEvent(formData);
      this.navigationService.navigateToHomepage();
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  private handleInvalidForm(): void {
    this.submitted = true;
    this.eventForm.markAllAsTouched();
  }

  private buildFormData(): FormData {
    const formData = new FormData();
    const formValues = this.eventForm.getRawValue();

    const formFields = [
      { key: 'Title', value: formValues.title },
      { key: 'Description', value: formValues.description },
      { key: 'Category', value: formValues.category },
      { key: 'Arranger', value: formValues.arranger },
      { key: 'Location', value: formValues.location },
      { key: 'Rsvp', value: formValues.rsvp },
    ];

    formFields.forEach(({ key, value }) => {
      formData.append(key, value || '');
    });

    if (formValues.date) {
      formData.append('Date', new Date(formValues.date).toISOString());
    }

    if (this.selectedImageFile) {
      formData.append('ImageFile', this.selectedImageFile);
    }

    return formData;
  }
}
