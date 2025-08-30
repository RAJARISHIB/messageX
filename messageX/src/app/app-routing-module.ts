import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatList } from './chat-list/chat-list';
import { LoginPage } from './login-page/login-page';

const routes: Routes = [
  {path: '', component: LoginPage},
  {path: 'chat', component: ChatList}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
