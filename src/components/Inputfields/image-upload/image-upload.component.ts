// image-upload.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  standalone: true,
})
export class ImageUploadComponent {
  @Input() imageUrl: string | null = null;
  @Output() imageSelected = new EventEmitter<File>();

  previewUrl: SafeUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  // Method triggered when file is selected from gallery
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && this.isValidImage(file)) {
      this.imageSelected.emit(file);
      this.createImagePreview(file);
    }
  }

  // Method to validate image file type
  private isValidImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  // Method to create a preview URL
  private createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(
        reader.result as string,
      );
    };
    reader.readAsDataURL(file);
  }

  // Method to trigger file input click from gallery button
  triggerGalleryClick(): void {
    document.getElementById('gallery-upload')?.click();
  }

  // Method to trigger camera/upload from cloud button
  triggerCloudUpload(): void {
    document.getElementById('cloud-upload')?.click();
  }
}
