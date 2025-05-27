import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '../Inputfields/date-picker/date-picker.component';
import { ImageUploadComponent } from '../Inputfields/image-upload/image-upload.component';

@Component({
  selector: 'app-event-main-info-card',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DatePickerComponent,
    ImageUploadComponent,
  ],
  templateUrl: './event-main-info-card.component.html',
  styleUrl: './event-main-info-card.component.scss',
})
export class EventMainInfoCardComponent {
  isEditing = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  @Input() mainCardTitle: string = ''; // Card heading/title
  @Input() placeholderEventTitle: string = '';
  @Input() locationPlaceholder: string = '';
  @Input() formGroup!: FormGroup;
  @Input() formControlTitleMain: string = 'title';
  @Input() formControlLocation: string = 'location';
  @Input() date: string = '';

  @Input() image: string =
    'https://cipvt25storage.blob.core.windows.net/images/DancepartyBlue.png';

  // No need to set form values from inputs; let the form handle its own state

  onDateChange(dateValue: string) {
    if (this.formGroup) {
      const dateControl = this.formGroup.get('date');
      if (dateControl) {
        dateControl.setValue(dateValue);
      }
    }
  }
}