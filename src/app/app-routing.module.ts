import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from "./sign-in/sign-in.component";

const routes: Routes = [
  {path: 'login', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'log-in', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'signin', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
