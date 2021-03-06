import { AddToWishlistComponent } from './add-to-wishlist/add-to-wishlist.component';
import { ExpenseManagementComponent } from './expense-management/expense-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from "./sign-in/sign-in.component";
import { CreateAccountComponent } from './create-account/create-account.component';
import { BudgetManagementComponent } from './budget-management/budget-management.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import {StatisticsComponent} from "./statistics/statistics.component";
import {WishlistViewComponent} from "./wishlist-view/wishlist-view.component";

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
    path:'statistics',
    component:StatisticsComponent
  },
  {
    path: 'activate-account/:token',
    component: ActivateAccountComponent
  },
  {
    path: 'add-to-wishlist',
    component: AddToWishlistComponent
  },
  {
    path: 'wishlist-view',
    component: WishlistViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
