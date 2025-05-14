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
  @Input() formControlHeader: string = '';
  @Input() formControlTextArea: string = '';

  @Output() save = new EventEmitter<{
    title: string;
    description: string;
  }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.form.patchValue({
      title: this.infoCardtitle,
      description: this.description,
    });
  }

  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
