import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Common {
  audio = new Audio();
  yippeAudio = 'assets/audio/yippe.mp3';

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) {}

  createUser(payload: any) {
    this.http.post(`${this.apiUrl}/user/create_user/`, payload).subscribe((response) => {
      console.log('Received Response', response);
    });
  }

  doLogin(payload: any) {
    this.http.post(`${this.apiUrl}/user/do_login/`, payload).subscribe((response: any) => {
      if (response) {
        if (response?.access) {
          this.playSound(this.yippeAudio);
          sessionStorage.setItem('JWT_token', response?.access);
          this.router.navigateByUrl('chat');
        }
      }
    });
  }

  tempCall() {
    this.http.get(`${this.apiUrl}/chat/temp/`).subscribe((response: any) => {
      console.log('hello');
    });
  }

  checkAuth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/check_auth/`);
  }

  filterUsers(payload: any) {
    return this.http.get(`${this.apiUrl}/chat/filterUsers/`, payload);
  }

  sendMessage(payload: any) {
    return this.http.post(`${this.apiUrl}/chat/sendMessage/`, payload);
  }

  getMessage(payload: any) {
    return this.http.post(`${this.apiUrl}/chat/getMessage/`, payload);
  }

  getCurrentUserDetails() {
    return this.http.get(`${this.apiUrl}/user/get-current-user-detail/`);
  }

  playSound(src: string = '') {
    this.audio.src = src;
    this.audio.load();
    this.audio.play();
  }
}
