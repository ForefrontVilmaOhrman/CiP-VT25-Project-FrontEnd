import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { ContentCardComponent } from "../content-card/content-card.component";

@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ContentCardComponent],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.scss'
})
export class TestComponentComponent implements OnInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    console.log("on changes...")
  }

  ngOnInit(): void {
    console.log(this.test)
  }

  @Input() test!: string

}
