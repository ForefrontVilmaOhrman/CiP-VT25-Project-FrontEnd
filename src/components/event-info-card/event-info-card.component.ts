import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-event-info-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-info-card.component.html',
  styleUrl: './event-info-card.component.scss',
})
export class EventInfoCardComponent {
  isEditing = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  @Input() subTitle: string = '';
  @Input() placeholderTitle: string = '';
  @Input() placeholderTextArea: string = '';

  @Input() infoCardtitle: string = '';
  @Input() description: string = '';
  @Input() category: string = '';
  @Input() icon: string = '';

  @Input() formGroup!: FormGroup;

  @Input() formControlTitle: string = 'title';
  @Input() formControlDescription: string = 'description';

  ngOnInit() {
    if (this.formGroup) {
      const titleControl = this.formGroup.get(this.formControlTitle);
      const descriptionControl = this.formGroup.get(this.formControlDescription);

      // Only set the form control value if infoCardtitle is provided, the control is not already set, and the control is not 'title'
      if (titleControl && this.infoCardtitle && !titleControl.value && this.formControlTitle !== 'title') {
        titleControl.setValue(this.infoCardtitle);
      }

      if (descriptionControl && this.description && !descriptionControl.value) {
        descriptionControl.setValue(this.description);
      }
    }
  }
}
