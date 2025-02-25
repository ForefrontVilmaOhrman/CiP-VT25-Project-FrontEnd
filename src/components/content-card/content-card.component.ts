import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AppEvent } from '../../models/app-event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.scss'
})
export class ContentCardComponent implements OnInit {

  constructor(private restService: RestService) { }

  appEvents: AppEvent[] = []

  ngOnInit(): void {
    this.appEvents = this.restService.getData()
    console.log(this.appEvents)
  }

}
