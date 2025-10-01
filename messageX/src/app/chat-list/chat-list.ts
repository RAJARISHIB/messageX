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
  currentUserID: any;

  constructor(private _commonService: Common) {}

  ngOnInit() {
    this._commonService.getCurrentUserDetails().subscribe((response: any) => {
      this.currentUserID = response?.id;
    });
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
    this.messages = []
    this.loadMessages(chat);
  }

  loadMessages(chat: any) {
    const payload = { receiver: this.selectedChat };

    this._commonService.getMessage(payload).subscribe((response: any) => {
      if (response && response.messages) {
        this.messages = response.messages.map((msg: any) => ({
          from: msg.sender_id === this.currentUserID ? 'You' : this.selectedChat.username,
          message: msg.content,
          created_at: msg.created_at,
        }));
      }
    });
  }

  sendMessage() {
    console.log('sendMessage', this.selectedChat);
    if (!this.messageText.trim()) return;

    this.messages.push({
      from: this.currentUserID,
      message: this.messageText,
    });

    const payload = {
      message: this.messageText,
      receiver: this.selectedChat,
    };
    this._commonService.sendMessage(payload).subscribe(() => {
      console.log('Data Saved Succesfully');
    });
    this.messageText = '';
  }

  callbutton() {
    this._commonService.tempCall();
  }
}
