import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RestService } from '../../services/rest.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent {
  eventForm: FormGroup;
  validationError: boolean = false;

  constructor(private formBuilder: FormBuilder, private restService: RestService, private navigationService: NavigationService) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      arranger: ['', Validators.required],
      location: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.eventForm.valid) {
      await this.restService.createEvent(this.eventForm.value);
      this.navigationService.navigateToHomepage();
    } else {
      this.validationError = true;
      this.eventForm.markAllAsTouched();
    }
  }
}
