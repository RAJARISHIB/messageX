import { Component, OnInit, OnDestroy } from '@angular/core';
import { Common } from '../common';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-chat-list',
  standalone: false,
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.scss',
})
export class ChatList implements OnInit, OnDestroy {
  searchTerm: string = '';
  chats: any[] = [];
  selectedChat: any = null;
  messages: any;
  messageText: string = '';
  
  private searchSubject = new Subject<string>();
  private subscription!: Subscription;

  constructor(private _commonService: Common) {}

  ngOnInit() {
    this.subscription = this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => {
        this.fetchUsers(term);
      });
    this.fetchUsers('');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSearch(term: string) {
    this.searchSubject.next(term);
  }

  fetchUsers(term: string) {
    const payload = { params: { searchTerm: term } };
    this._commonService.filterUsers(payload).subscribe((response: any) => {
      if (response) {
        this.chats = response?.data;
      }
    });
  }

  selectChat(chat: any) {
    this.selectedChat = chat;
    this.loadMessages(chat);
  }

  loadMessages(chat: any) {
    // Replace this with an API call if needed
    this.messages = [
      { from: chat.username, message: 'Hello!' },
      { from: 'You', message: 'Hi there!' },
    ];
  }

  sendMessage() {
    console.log('sendMessage', this.selectedChat)
    if (!this.messageText.trim()) return;

    this.messages.push({
      message: this.messageText,
    });

    const payload = {
      'message': this.messageText
    }
    this._commonService.sendMessage(payload).subscribe(()=> {
      console.log('nigga subscribed')
    })
    this.messageText = '';
    // Optionally send message to server
    // this._commonService.sendMessage(this.selectedChat.id, this.messageText).subscribe(...)
  }

  callbutton() {
    this._commonService.tempCall();
  }
}
