import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [],
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
