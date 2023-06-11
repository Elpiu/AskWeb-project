import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  newWidth: number = 200

  ngOnInit(): void {
    this.newWidth = (window.screen.width / 7) + 60
    console.log(this.newWidth)
  }

}
