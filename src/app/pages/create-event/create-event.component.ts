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
import { ImageUploadComponent } from '../../../components/Inputfields/image-upload/image-upload.component';

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
  selectedImageFile: File | null = null;

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
      date: ['', Validators.required],
      rsvp: [''],
    });
  }

  onImageSelected(file: File): void {
    this.selectedImageFile = file;
    console.log('Image selected in CreateEvent:', file.name);
  }

  async onSubmit() {
    if (this.eventForm.valid) {
      const formData = new FormData();
      const formValues = this.eventForm.value;

      formData.append('Title', formValues.title || '');
      formData.append('Description', formValues.description || '');
      formData.append('Category', formValues.category || '');
      formData.append('Arranger', formValues.arranger || '');
      formData.append('Location', formValues.location || '');
      formData.append('Rsvp', formValues.rsvp || '');

      if (formValues.date) {
        formData.append('Date', new Date(formValues.date).toISOString());
      }

      if (this.selectedImageFile) {
        formData.append('ImageFile', this.selectedImageFile);
      }

      await this.restService.createEvent(formData);
      this.navigationService.navigateToHomepage();
    } else {
      this.validationError = true;
      this.eventForm.markAllAsTouched();
      console.log('Form is invalid. Please check the input fields.');
    }
    console.log('Saved event data:', this.eventForm.value);
  }
}
