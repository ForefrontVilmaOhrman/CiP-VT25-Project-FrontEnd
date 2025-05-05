import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterTestingModule,
        MatToolbarModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain a "Home" button', () => {
    fixture.detectChanges(); // Ensure the DOM is updated
    const homeButton = fixture.debugElement.query(By.css('button[ng-reflect-router-link="/"]'));
    expect(homeButton).toBeTruthy();
    expect(homeButton.nativeElement.textContent.trim()).toBe('Home');
  });

  it('should contain an "Add Event" button', () => {
    fixture.detectChanges();
    const addEventButton = fixture.debugElement.query(By.css('button[ng-reflect-router-link="/add-event"]'));
    expect(addEventButton).toBeTruthy();
    expect(addEventButton.nativeElement.textContent.trim()).toBe('Add Event');
  });
});