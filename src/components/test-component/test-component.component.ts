import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ContentCardComponent } from '../content-card/content-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AppEvent } from '../../models/app-event';
import { RestService } from '../../services/rest.service';
import { SearchParameters } from '../../models/search-params';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ContentCardComponent, SearchBarComponent],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.scss'
})
export class TestComponentComponent implements OnInit {
  constructor(private restService: RestService, private dataService: DataService) {}

  // Array to hold all events
  appEvents: AppEvent[] = [];

  // Array to hold filtered events
  filteredEvents: AppEvent[] = [];

  /**
   * Listen to the search parameters from the search-bar.component and filter appEvents based on them
   */
  onSearchParametersChanged(searchParams: SearchParameters): void {
    this.filteredEvents = this.dataService.filterEvents(searchParams, this.appEvents);
  }

  /**
   * Runs when the component loads and fetches the initial data for the view.
   */
  ngOnInit(): void {
    this.appEvents = this.restService.getData();
    // Set filtered events value to app events on first load because user hasn't filtered yet.
    this.filteredEvents = this.appEvents;
  }
}
