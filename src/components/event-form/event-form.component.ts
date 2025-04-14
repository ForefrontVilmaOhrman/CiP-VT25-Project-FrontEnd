import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent {
  eventForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.eventForm = this.formBuilder.group({
      title: [''],
      description: [''],
      category: [''],
      arranger: [''],
      location: [''],
      image: [''],
    });
  }

  onSubmit() {
    console.log(this.eventForm.value);
  }
}
