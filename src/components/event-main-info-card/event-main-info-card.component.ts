import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
export class EventMainInfoCardComponent implements OnInit {
  isEditing = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  @Input() title: string = '';
  @Input() location: string = '';
  @Input() image: string =
    'https://cipvt25storage.blob.core.windows.net/images/DancepartyBlue.png'; /// Hardcoded this untill the blob-storage integration is set-up
  @Input() date: string = '';
  @Input() placeholderEventTitle: string = '';
  @Input() locationPlaceholder: string = '';

  @Input() formGroup!: FormGroup;
  @Input() formControlTitleMain: string = 'title';
  @Input() formControlLocation: string = 'location';

  ngOnInit() {
    if (this.formGroup) {
      const titleControl = this.formGroup.get(this.formControlTitleMain);
      const locationControl = this.formGroup.get(this.formControlLocation);
      const dateControl = this.formGroup.get('date');
      const imageControl = this.formGroup.get('image');

      if (titleControl && this.title) titleControl.setValue(this.title);
      if (locationControl && this.location)
        locationControl.setValue(this.location);
      if (dateControl && this.date) dateControl.setValue(this.date);
      if (imageControl && this.image) imageControl.setValue(this.image);
    }
  }

  onDateChange(dateValue: string) {
    if (this.formGroup) {
      const dateControl = this.formGroup.get('date');
      if (dateControl) {
        dateControl.setValue(dateValue);
      }
    }
  }
}
