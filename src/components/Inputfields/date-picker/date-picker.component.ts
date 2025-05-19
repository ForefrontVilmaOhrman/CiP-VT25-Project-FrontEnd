import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  form!: FormGroup;
  formattedDate: string = 'Date and Time';

  @Input() initialDate: string = '';

  @Output() dateChange = new EventEmitter<string>();

  ngOnInit() {
    this.form = new FormGroup({
      date: new FormControl(this.initialDate, Validators.required),
    });

    this.form.get('date')?.valueChanges.subscribe((value) => {
      if (value) {
        const date = new Date(value);
        this.formattedDate = date.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

        this.dateChange.emit(value);
      } else {
        this.formattedDate = 'Date and Time';
        this.dateChange.emit('');
      }
    });

    if (this.initialDate) {
      const date = new Date(this.initialDate);
      this.formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  }

  clearDate() {
    this.form.get('date')?.setValue('');
  }
}
