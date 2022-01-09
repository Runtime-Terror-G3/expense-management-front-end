import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExpenseService} from "../../services/expense-service/expense.service";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-statistics-category',
  templateUrl: './statistics-category.component.html',
  styleUrls: ['./statistics-category.component.css']
})
export class StatisticsCategoryComponent implements OnInit {
  startDate: FormControl = new FormControl('', [Validators.required, this.startDateValidation]);
  endDate: FormControl = new FormControl('', [Validators.required, this.endDateValidation]);

  datesForm: FormGroup = new FormGroup({
    startDate: this.startDate,
    endDate: this.endDate
  });

  statistics:any;

  constructor(private expenseService: ExpenseService, private sessionService: SessionService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  startDateValidation(datepicker: FormControl) {
    let pickedDate = datepicker.value;
    let now = new Date();
    pickedDate = new Date(pickedDate);
    if (pickedDate >= now) {
      return {dateError: {parsed: pickedDate}}
    }
    return null;
  }

  endDateValidation(datepicker: FormControl) {
    let pickedDate = datepicker.value;
    let now = new Date();
    pickedDate = new Date(pickedDate);
    if (pickedDate > now) {
      return {dateError: {parsed: pickedDate}}
    }
    return null;
  }

  getStatistics(): void {
    if (this.datesForm.valid && this.checkDates()) {
      let userId = this.sessionService.getLoggedUserId();
      this.expenseService.getStatisticsByCategory(userId!,this.startDate.value,this.endDate.value).subscribe(data=>{
          this.statistics=data;
        }
      )
    }
    else {
      this.snackBar!.open('Invalid date fields!', '', {
        duration: 3000,
        panelClass: ['snackbar']
      });
    }
  }

  checkDates(){
    let start=this.startDate.value;
    let end=this.endDate.value;
    return start < end;
  }

}
