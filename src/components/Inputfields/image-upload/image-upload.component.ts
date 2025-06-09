import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class ImageUploadComponent {
  @Input() imageUrl: string | null = null;
  @Input() disabled: boolean = false;
  @Output() imageSelected = new EventEmitter<File>();

  previewUrl: SafeUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  get displayImageUrl(): SafeUrl | string | null {
    return this.previewUrl || this.imageUrl;
  }

  onFileSelected(event: any): void {
    if (this.disabled) return;

    const file = event.target.files[0];
    if (file && this.isValidImage(file)) {
      this.imageSelected.emit(file);
      this.createImagePreview(file);
    }
  }

  private isValidImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  private createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(
        reader.result as string,
      );
    };
    reader.readAsDataURL(file);
  }

  triggerGalleryClick(): void {
    if (this.disabled) return;
    document.getElementById('gallery-upload')?.click();
  }
}
