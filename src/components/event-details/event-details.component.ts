import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppEvent } from '../../models/app-event';
import { RestService } from '../../services/rest.service';
import { NavigationService } from '../../services/navigation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  appEvent: AppEvent | undefined;
  editForm: FormGroup | undefined;

  constructor(
    private route: ActivatedRoute,
    private restService: RestService,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<any> {
    const eventId = this.route.snapshot.paramMap.get('id'); // Use this ID to fetch data about event. Maybe local storage check before getting?
    const allAppEvents: AppEvent[] = await this.restService.getData();
    this.appEvent = allAppEvents.find((event) => event.id === eventId);

    if (this.appEvent) {
      this.editForm = this.formBuilder.group({
        title: [this.appEvent.title, Validators.required],
        description: [this.appEvent.description, Validators.required],
        category: [this.appEvent.category, Validators.required],
        arranger: [this.appEvent.arranger, Validators.required],
        location: [this.appEvent.location, Validators.required],
        image: [new Blob(), Validators.required], // Empty Blob
        date: [this.appEvent.date, Validators.required],
        rsvp: ["asdasd"],
      });
    }
  }

  handleDeleteEvent(eventId: string): void {
    this.restService
      .deleteEvent(eventId)
      .then(() => {
        this.navigationService.navigateToHomepage();
      })
      .catch((error) => {
        console.error('Error deleting event', error);
      });
  }

  async handleUpdateEvent(eventId: string): Promise<void> {
    if (this.editForm?.valid) {
      const updatedEvent = this.editForm.value;
      await this.restService.updateEvent(eventId, updatedEvent);
      this.navigationService.navigateToHomepage();
    } else {
      console.log(this.editForm?.value);
      console.log('Form is invalid. Please check the input fields.');
    }
  }
}
