import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppEvent } from '../../models/app-event';
import { RestService } from '../../services/rest.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  appEvent: AppEvent | undefined;

  constructor(private route: ActivatedRoute, private restService: RestService, private navigationService: NavigationService) { }

  async ngOnInit(): Promise<any> {
    const eventId = this.route.snapshot.paramMap.get('id'); // Use this ID to fetch data about event. Maybe local storage check before getting?
    const allAppEvents: AppEvent[] = await this.restService.getData();
    this.appEvent = allAppEvents.find(event => event.id === eventId)
  }

  handleDeleteEvent(eventId: string): void {
    this.restService.deleteEvent(eventId).then(() => {
      this.navigationService.navigateToHomepage();
    }
    ).catch((error) => {
      console.error("Error deleting event", error);
    });
  }
}
