import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInfoDropDownComponent } from './event-info-drop-down.component';

describe('EventInfoDropDownComponent', () => {
  let component: EventInfoDropDownComponent;
  let fixture: ComponentFixture<EventInfoDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventInfoDropDownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventInfoDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
