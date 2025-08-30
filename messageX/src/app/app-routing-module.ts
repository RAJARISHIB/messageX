import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatList } from './chat-list/chat-list';
import { LoginPage } from './login-page/login-page';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {path: '', component: LoginPage},
  {path: 'chat', component: ChatList, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
