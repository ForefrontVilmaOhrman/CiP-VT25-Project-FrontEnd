import { Component, EventEmitter, Output } from '@angular/core';
import { SearchParameters } from '../../models/search-params';  // Make sure the model exists for the parameters
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  // Output to emit the search parameters to the parent component.
  @Output() searchParametersChanged = new EventEmitter<SearchParameters>();  // Emit search parameters

  // The search parameters.
  searchParameters: SearchParameters = {
    title: '',
    location: '',
    startDate: '',
    endDate: ''
  };

  /**
   * Handles when the user presses the Search button. The function emits the search parameters selected by the user
   * to the parent component.
   */
  public onSearch(): void {
    // Emit the search parameters to the parent component
    this.searchParametersChanged.emit(this.searchParameters);
  }
}