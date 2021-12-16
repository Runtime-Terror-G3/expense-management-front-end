import { AddToWishlistComponent } from './add-to-wishlist/add-to-wishlist.component';
import { ExpenseManagementComponent } from './expense-management/expense-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from "./sign-in/sign-in.component";
import { CreateAccountComponent } from './create-account/create-account.component';
import { BudgetManagementComponent } from './budget-management/budget-management.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import {StatisticsComponent} from "./statistics/statistics.component";

const routes: Routes = [

  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'login', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'log-in', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'signin', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {
    path: 'expense-management',
    component:ExpenseManagementComponent
  },
  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  },
  {
    path: 'budget-management',
    component: BudgetManagementComponent 
  },
  {
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
    path:'statistics',
    component:StatisticsComponent
=======
>>>>>>> Stashed changes
    path: 'activate-account/:token',
    component: ActivateAccountComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
<<<<<<< Updated upstream
=======
  },
  {
    path: 'add-to-wishlist',
    component: AddToWishlistComponent
>>>>>>> Stashed changes
>>>>>>> Stashed changes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
