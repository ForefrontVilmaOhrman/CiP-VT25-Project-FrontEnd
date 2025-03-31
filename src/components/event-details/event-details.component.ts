import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppEvent } from '../../models/app-event';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  appEvent: AppEvent | undefined;

  constructor(private route: ActivatedRoute, private restService: RestService) {}

  async ngOnInit(): Promise<any> {
    const eventId = this.route.snapshot.paramMap.get('id'); // Use this ID to fetch data about event. Maybe local storage check before getting?
    const allAppEvents: AppEvent[] = await this.restService.getData();
    this.appEvent = allAppEvents.find(event => event.id === eventId)
  }
}
