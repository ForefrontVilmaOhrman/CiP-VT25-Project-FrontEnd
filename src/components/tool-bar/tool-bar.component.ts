import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss',
})
export class ToolBarComponent {
  @Input() mode: 'create' | 'view' | 'edit' = 'create';
  @Input() isSubmitting: boolean = false;
  @Input() eventId?: string;

  @Output() editClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();
  @Output() saveClicked = new EventEmitter<void>();

  get isCreateMode(): boolean {
    return this.mode === 'create';
  }

  get isViewMode(): boolean {
    return this.mode === 'view';
  }

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  onEditClick(): void {
    this.editClicked.emit();
  }

  onDeleteClick(): void {
    if (
      confirm(
        'Are you sure you want to delete this event? This action cannot be undone.',
      )
    ) {
      this.deleteClicked.emit();
    }
  }

  onSaveClick(): void {
    this.saveClicked.emit();
  }
}
