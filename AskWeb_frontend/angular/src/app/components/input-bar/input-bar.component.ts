import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-input-bar',
  templateUrl: './input-bar.component.html',
  styleUrls: ['./input-bar.component.scss']
})
export class InputBarComponent implements OnInit {

  @ViewChild('textAreaSelector') textAreaSelector!: ElementRef<HTMLInputElement>;
  @Output() userSendQuestion = new EventEmitter<string>();
  @Input() $booleanSubject: BehaviorSubject<boolean>;

  userCanSendInput: boolean

  constructor() {
  }

  clickSendMsg($event: Event) {
    const text = this.textAreaSelector.nativeElement.value.trim();
    if (text !== ''){
      if(this.textAreaSelector.nativeElement.value != "")
      $event.preventDefault()
      this.userSendQuestion.emit(text)
      this.textAreaSelector.nativeElement.value = ""
    }
  }

  ngOnInit(): void {
    this.$booleanSubject.subscribe(value => {
      this.userCanSendInput = value
    })
  }


}
