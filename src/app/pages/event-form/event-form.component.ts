import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-event-form',
  standalone: true,
  imports: [
    CommonModule,
    EventInfoCardComponent,
    EventMainInfoCardComponent,
    ToolBarComponent,
    ReactiveFormsModule,
    EventInfoDropDownComponent,
  ],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
})
export class EventFormComponent implements OnInit, OnDestroy {
  private readonly restService = inject(RestService);
  private readonly navigationService = inject(NavigationService);
  private readonly route = inject(ActivatedRoute);

  mode: 'create' | 'view' | 'edit' = 'create';
  eventId?: string;
  submitted = false;
  isSubmitting = false;

  selectedImageFile: File | null = null;
  imageUrl: string | null = null;

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

  ngOnInit(): void {
    const mode = this.route.snapshot.data['mode'];
    const eventId = this.route.snapshot.params['id'];

    if (mode === 'view') {
      this.mode = 'view';
      this.eventId = eventId;
      this.loadEventData();
      this.eventForm.disable();
    }
  }

  ngOnDestroy(): void {
    if (this.selectedImageFile) {
      URL.revokeObjectURL(URL.createObjectURL(this.selectedImageFile));
    }
  }

  get isViewMode(): boolean {
    return this.mode === 'view';
  }

  get isCreateMode(): boolean {
    return this.mode === 'create';
  }

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  get displayImageUrl(): string | null {
    if (this.selectedImageFile) {
      return URL.createObjectURL(this.selectedImageFile);
    }
    return this.imageUrl;
  }

  onImageSelected(file: File): void {
    if (this.selectedImageFile) {
      URL.revokeObjectURL(URL.createObjectURL(this.selectedImageFile));
    }

    this.selectedImageFile = file;
    this.imageUrl = null;
  }

  async onSubmit(): Promise<void> {
    if (this.isViewMode) return;

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

  private async loadEventData(): Promise<void> {
    try {
      const event = await this.restService.getEventById(this.eventId!);

      const formattedDate = event.date
        ? new Date(event.date).toISOString().split('T')[0]
        : '';

      this.eventForm.patchValue({
        title: event.title || '',
        description: event.description || '',
        category: event.category || '',
        arranger: event.arranger || '',
        location: event.location || '',
        date: formattedDate,
        rsvp: event.rsvp || '',
      });

      console.log('Formatted Date ' + formattedDate);

      if (event.imageFile) {
        this.imageUrl = event.imageFile;
        this.selectedImageFile = null;
      }
    } catch (error) {
      console.error('Error loading event:', error);
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

  handleDeleteEvent(eventId: string): void {
    this.restService
      .deleteEvent(eventId)
      .then(() => {
        this.navigationService.navigateToEventsPage();
      })
      .catch((error) => {
        console.error('Error deleting event', error);
      });
  }

  handleUpdateEvent(): void {
    if (!this.eventForm.valid) {
      this.handleInvalidForm();
      return;
    }

    this.restService
      .updateEvent(this.eventId!, this.buildFormData())
      .then(() => {
        this.loadEventData();
      })
      .catch((error) => {
        console.error('Error updating event:', error);
      });
  }

  toggleEditMode(): void {
    if (this.isViewMode) {
      this.mode = 'edit';
      this.eventForm.enable();
    } else if (this.isEditMode) {
      this.mode = 'view';
      this.handleUpdateEvent();
      this.eventForm.disable();
    }
  }
}
