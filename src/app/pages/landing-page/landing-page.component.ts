import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentCardComponent } from '../../../components/content-card/content-card.component';
import { AppEvent } from '../../../models/app-event';
import { SearchParameters } from '../../../models/search-params';
import { RestService } from '../../../services/rest.service';
import { DataService } from '../../../services/data.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule, ContentCardComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  constructor(
    private restService: RestService,
    private dataService: DataService,
  ) {}

  appEvents: AppEvent[] = [];
  filteredEvents: AppEvent[] = [];

  async ngOnInit(): Promise<void> {
    this.appEvents = await this.restService.getData();

    this.filteredEvents = this.appEvents.slice(0, 3);
  }
}
