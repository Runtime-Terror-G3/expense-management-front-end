import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExpenseService} from "../services/expense-service/expense.service";
import {SessionService} from "../services/session.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  startDate: FormControl = new FormControl('', [Validators.required, this.startDateValidation]);
  endDate: FormControl = new FormControl('', [Validators.required, this.endDateValidation]);

  datesForm: FormGroup = new FormGroup({
    startDate: this.startDate,
    endDate: this.endDate
  });

  statistics:any;

  constructor(private expenseService: ExpenseService, private sessionService: SessionService) {
  }

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
      this.expenseService.getStatisticsForPeriod(userId!,this.startDate.value,this.endDate.value).subscribe(data=>{
        this.statistics=data;
        }
      )
    }
    else {
      alert('Invalid date fields!');
    }
  }

  checkDates(){
    let start=this.startDate.value;
    let end=this.endDate.value;
    return start < end;
  }
}
