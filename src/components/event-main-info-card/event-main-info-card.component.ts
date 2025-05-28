import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() imageSelected = new EventEmitter<File>();

  @Input() mainCardTitle: string = '';
  @Input() placeholderEventTitle: string = '';
  @Input() locationPlaceholder: string = '';
  @Input() formGroup!: FormGroup;
  @Input() formControlTitleMain: string = 'title';
  @Input() formControlLocation: string = 'location';
  @Input() date: string = '';

  onImageSelected(file: File): void {
    this.imageSelected.emit(file);
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
