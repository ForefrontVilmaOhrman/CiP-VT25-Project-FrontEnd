import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AppEvent } from '../../models/app-event';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.scss'
})
export class ContentCardComponent {

  constructor(private navigationService: NavigationService) { }

  // Input with filtered appEvent data passed from the parent component.
  @Input()
  filteredEvents: AppEvent[] = []

  navigateToEvent(appEvent: AppEvent) {
    this.navigationService.navigateToEvent(appEvent.id);
  }

}
