import { SidebarElementComponent } from './sidebar/sidebar-element/sidebar-element.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import {UpdateExpenseDialogComponent} from "./edit-expense/update-expense-dialog/update-expense-dialog.component";
import {DeleteExpenseDialogComponent} from "./edit-expense/delete-expense-dialog/delete-expense-dialog.component";

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
    EditExpenseComponent,
    UpdateExpenseDialogComponent,
    DeleteExpenseDialogComponent
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
    MatDatepickerModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
