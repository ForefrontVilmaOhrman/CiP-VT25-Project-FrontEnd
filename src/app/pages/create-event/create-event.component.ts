import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventInfoCardComponent } from '../../../components/event-info-card/event-info-card.component';
import { EventMainInfoCardComponent } from '../../../components/event-main-info-card/event-main-info-card.component';
import { ToolBarComponent } from '../../../components/tool-bar/tool-bar.component';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule,
    EventInfoCardComponent,
    EventMainInfoCardComponent,
    ToolBarComponent,
    ToolBarComponent,
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
})
export class CreateEventComponent {}
