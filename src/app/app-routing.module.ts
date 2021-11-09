import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from "./sign-in/sign-in.component";
import { CreateAccountComponent } from './create-account/create-account.component';

const routes: Routes = [

  {path: 'login', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'log-in', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'signin', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {
    path: 'add-expense',
    component: AddExpenseComponent
  },
  {
    path: 'home', 
    component: DashboardComponent
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
