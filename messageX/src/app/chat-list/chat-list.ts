import { Component } from '@angular/core';
import { Common } from '../common';

@Component({
  selector: 'app-chat-list',
  standalone: false,
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.scss'
})
export class ChatList {

  constructor(
    private _commonService: Common
  ){}

  callbutton() {
    this._commonService.tempCall()

  }
}
