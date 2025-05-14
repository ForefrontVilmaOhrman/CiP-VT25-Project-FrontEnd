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
  @Input() image: string = '';
  @Input() date: string = '';

  @Input() formGroup!: FormGroup;
  @Input() formControlHeader: string = '';
  @Input() formControlSubTitle: string = '';

  @Output() save = new EventEmitter<{
    title: string;
    date: Date;
    location: string;
    image: string;
  }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.formGroup) {
      const headerControl = this.formGroup.get(this.formControlHeader);
      const subtitleControl = this.formGroup.get(this.formControlSubTitle);
      const dateControl = this.formGroup.get('date');
      const imageControl = this.formGroup.get('image');

      if (headerControl) headerControl.setValue(this.title);
      if (subtitleControl) subtitleControl.setValue(this.location);
      if (dateControl) dateControl.setValue(this.date);
      if (imageControl) imageControl.setValue(this.image);
    } else {
      console.error('Parent form is not provided to the component');
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

  onSave() {
    if (this.formGroup && this.formGroup.valid) {
      const formValues = {
        title: this.formGroup.get(this.formControlHeader)?.value,
        location: this.formGroup.get(this.formControlSubTitle)?.value,
        date: this.formGroup.get('date')?.value,
        image: this.formGroup.get('image')?.value,
      };

      this.save.emit(formValues);
    } else if (this.formGroup) {
      Object.keys(this.formGroup.controls).forEach((key) => {
        this.formGroup.get(key)?.markAsTouched();
      });
    }
  }
}
