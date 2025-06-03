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

  @Input() mainCardTitle: string = '';
  @Input() placeholderEventTitle: string = '';
  @Input() locationPlaceholder: string = '';
  @Input() formGroup!: FormGroup;
  @Input() formControlTitleMain: string = 'title';
  @Input() formControlLocation: string = 'location';
  @Input() date: string = '';
  @Input() submitted: boolean = false;

  @Input() imageUrl: string | null = null;
  @Input() selectedImageFile: File | null = null; // Add this
  @Input() readonly: boolean = false;

  @Output() imageSelected = new EventEmitter<File>();

  get displayImageUrl(): string | null {
    if (this.selectedImageFile) {
      return URL.createObjectURL(this.selectedImageFile);
    }
    return this.imageUrl;
  }

  onImageSelected(file: File): void {
    this.imageSelected.emit(file);
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
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
