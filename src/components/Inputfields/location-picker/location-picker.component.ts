import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventInfoCardComponent } from '../../event-info-card/event-info-card.component';
import { EventInfoDropDownComponent } from '../../event-info-drop-down/event-info-drop-down.component';

@Component({
  selector: 'app-location-picker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EventInfoDropDownComponent],
  templateUrl: './location-picker.component.html',
  styleUrl: './location-picker.component.scss',
})
export class LocationPickerComponent {
  @Input() submitted: boolean = false;
  @Input() formGroup!: FormGroup;

  @Input() controlName: string = 'location';

  placeholderTitle = 'Select or type a city';
  subTitle = 'E.g. Stockholm, Lund...';
  icon = '📍';
  citiesDropDown = ['Stockholm', 'Göteborg', 'Malmö', 'Lund', 'Uppsala'];

  @Output() locationSelected = new EventEmitter<{
    city: string;
    lat: number;
    lng: number;
  }>();

  cities = [
    { name: 'Stockholm', lat: 59.3293, lng: 18.0686 },
    { name: 'Göteborg', lat: 57.7089, lng: 11.9746 },
    { name: 'Malmö', lat: 55.605, lng: 13.0038 },
  ];

  selectedCoords = { lat: 0, lng: 0 };

  onCitySelect(cityName: string): void {
    const city = this.cities.find((c) => c.name === cityName);

    if (city) {
      this.selectedCoords = {
        lat: city.lat,
        lng: city.lng,
      };

      this.locationSelected.emit({
        city: city.name,
        lat: city.lat,
        lng: city.lng,
      });
    } else {
      this.selectedCoords = { lat: 0, lng: 0 };
    }
  }

  ngOnInit() {
    const locationControl = this.formGroup.get(this.controlName);

    if (locationControl) {
      locationControl.valueChanges.subscribe((value: string) => {
        this.onCitySelect(value);
      });
    }
  }
}
