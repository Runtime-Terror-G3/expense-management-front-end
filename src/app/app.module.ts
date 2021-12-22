import {SidebarElementComponent} from './sidebar/sidebar-element/sidebar-element.component';
import {AddExpenseComponent} from './add-expense/add-expense.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarContainerComponent } from './sidebar/sidebar-container/sidebar-container.component';
import { LayoutComponent } from './layout/layout.component';
import { ExpenseManagementComponent } from './expense-management/expense-management.component';
import { BudgetManagementComponent } from './budget-management/budget-management.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChartsModule } from "ng2-charts";
import { ChartComponent } from './chart-doughnut/chart.component';
import { DatePipe } from '@angular/common';
import { StatisticsCategoryComponent } from './statistics/statistics-category/statistics-category.component';
import { StatisticsTimeComponent } from './statistics/statistics-time/statistics-time.component';
import { ChartLineComponent } from './chart-line/chart-line.component';
import { AddToWishlistComponent } from './add-to-wishlist/add-to-wishlist.component';
import { ItemWishlistComponent } from './item-wishlist/item-wishlist.component';
import { SessionInterceptor } from './helpers/session.interceptor';

@NgModule({
  declarations: [		
    AppComponent,
    SignInComponent,
    AddExpenseComponent,
    CreateAccountComponent,
    DashboardComponent,
    DashboardCardComponent,
    NavbarComponent,
    SidebarElementComponent,
    SidebarContainerComponent,
    LayoutComponent,
    ExpenseManagementComponent,
    BudgetManagementComponent,
    ActivateAccountComponent,
    StatisticsComponent,
    ChartComponent,
    StatisticsCategoryComponent,
    StatisticsTimeComponent,
    ChartLineComponent,
    AddToWishlistComponent,
      ItemWishlistComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    NoopAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTableModule,
    MatIconModule,
    ChartsModule
  ],
  providers: [
    HttpClient,
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
