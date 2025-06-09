import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-info-drop-down',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-info-drop-down.component.html',
  styleUrl: './event-info-drop-down.component.scss',
})
export class EventInfoDropDownComponent {
  isEditing = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  @Input() options: string[] = [];
  @Input() subTitle: string = '';
  @Input() placeholderTitle: string = '';

  @Input() infoCardtitle: string = '';
  @Input() description: string = '';
  @Input() category: string = '';
  @Input() icon: string = '';

  @Input() formGroup!: FormGroup;

  @Input() formControlTitle: string = 'title';
  @Input() formControlDescription: string = 'description';

  @Input() submitted: boolean = false;
}
