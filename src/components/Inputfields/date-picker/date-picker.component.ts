import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
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
      } else {
        this.formattedDate = 'Date and Time';
      }
    });
  }

  clearDate() {
    this.form.get('date')?.setValue('');
  }
}
