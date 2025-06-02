import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ContentCardComponent } from '../../../components/content-card/content-card.component';
import { SearchBarComponent } from '../../../components/search-bar/search-bar.component';
import { AppEvent } from '../../../models/app-event';
import { RestService } from '../../../services/rest.service';
import { SearchParameters } from '../../../models/search-params';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [ContentCardComponent, SearchBarComponent],
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.scss',
})
export class MainComponentComponent implements OnInit {
  constructor(
    private restService: RestService,
    private dataService: DataService,
  ) {}

  // Array to hold all events
  appEvents: AppEvent[] = [];

  // Array to hold filtered events
  filteredEvents: AppEvent[] = [];

  /**
   * Listen to the search parameters from the search-bar.component and filter appEvents based on them
   */
  onSearchParametersChanged(searchParams: SearchParameters): void {
    this.filteredEvents = this.dataService.filterEvents(
      searchParams,
      this.appEvents,
    );
  }

  /**
   * Runs when the component loads and fetches the initial data for the view.
   */
  async ngOnInit(): Promise<void> {
    this.appEvents = await this.restService.getData();
    // Set filtered events value to app events on first load because user hasn't filtered yet.
    this.filteredEvents = this.appEvents;
  }
}
