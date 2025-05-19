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
  @Output() imageSelected = new EventEmitter<File>();

  previewUrl: SafeUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: any): void {
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
    document.getElementById('gallery-upload')?.click();
  }
}
