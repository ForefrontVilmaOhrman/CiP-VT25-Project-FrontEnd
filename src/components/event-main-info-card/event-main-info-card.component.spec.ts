import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMainInfoCardComponent } from './event-main-info-card.component';

describe('EventMainInfoCardComponent', () => {
  let component: EventMainInfoCardComponent;
  let fixture: ComponentFixture<EventMainInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventMainInfoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventMainInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
