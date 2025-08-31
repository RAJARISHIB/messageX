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
  private searchSubject = new Subject<string>();
  private subscription!: Subscription;

  constructor(private _commonService: Common) {}

  ngOnInit() {
    // Debounce search input
    this.subscription = this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((term) => {
        this.fetchUsers(term);
      });

    this.chats = [
      { id: 1, username: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 2, username: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 3, username: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3' },
      { id: 4, username: 'David', avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: 5, username: 'Eve', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 6, username: 'Frank', avatar: 'https://i.pravatar.cc/150?img=6' },
      { id: 7, username: 'Grace', avatar: 'https://i.pravatar.cc/150?img=7' },
      { id: 8, username: 'Heidi', avatar: 'https://i.pravatar.cc/150?img=8' },
    ];
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
    const payload = {params: { searchTerm: term }}
    this._commonService.filterUsers(payload).subscribe((response: any) => {
      if (response) {
        this.chats = response?.data
      }
    });
    
  }

  callbutton() {
    this._commonService.tempCall();
  }

  selectChat(chat: any) {
    // console.log('SelectChatCalled', chat);
  }
}
