import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
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
  imports: [CommonModule, ReactiveFormsModule, TextFieldModule],
  templateUrl: './event-info-card.component.html',
  styleUrl: './event-info-card.component.scss',
})
export class EventInfoCardComponent {
  isEditing = false;

  @Input() isViewMode: boolean = false;
  @Input() submitted: boolean = false;

  @Input() isEditableTitle: boolean = true;
  @Input() staticTitleText: string = '';
  @Input() placeholderTitle: string = '';
  @Input() placeholderTextArea: string = '';

  @Input() infoCardtitle: string = '';
  @Input() titleNote: string = '';
  @Input() description: string = '';
  @Input() icon: string = '';
  @Input() category: string = '';

  @Input() formGroup!: FormGroup;

  @Input() formControlTitle: string = 'title';
  @Input() formControlDescription: string = 'description';
}
