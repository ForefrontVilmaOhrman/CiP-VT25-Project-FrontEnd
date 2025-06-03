import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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

  @Input() submitted: boolean = false;
  @Input() readonly: boolean = false;
  @Input() placeholderTitle: string = '';
  @Input() placeholderTextArea: string = '';

  @Input() infoCardtitle: string = '';
  @Input() titleNote: string = '';
  @Input() categoryText: string = '';
  @Input() description: string = '';
  @Input() category: string = '';
  @Input() icon: string = '';

  @Input() formGroup!: FormGroup;

  @Input() formControlTitle: string = 'title';
  @Input() formControlDescription: string = 'description';
}
