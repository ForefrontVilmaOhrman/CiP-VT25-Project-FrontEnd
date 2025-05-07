import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  title = 'Event Title';
  date = 'Date and Time';
  location = 'Location';
  image = 'Image URL';
  isEditing = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  @Output() save = new EventEmitter<{
    title: string;
    date: Date;
    location: string;
    image: string;
  }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [''],
      date: [''],
      location: [''],
      image: [''],
    });
  }

  ngOnInit() {
    this.form.patchValue({
      title: this.title,
      date: this.date,
      location: this.location,
      image: this.image,
    });
  }

  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
