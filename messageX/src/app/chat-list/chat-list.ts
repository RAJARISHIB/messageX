import { Component } from '@angular/core';
import { Common } from '../common';

@Component({
  selector: 'app-chat-list',
  standalone: false,
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.scss'
})
export class ChatList {
  chats:any = [
    { id: 1, username: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, username: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, username: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, username: 'David', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, username: 'Eve', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, username: 'Frank', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, username: 'Grace', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: 8, username: 'Heidi', avatar: 'https://i.pravatar.cc/150?img=8' }
  ];


  constructor(
    private _commonService: Common
  ){}

  callbutton() {
    this._commonService.tempCall()
  }
  selectChat(chat: any) {
    console.log('SelectChatCalled', chat)
  }
}
