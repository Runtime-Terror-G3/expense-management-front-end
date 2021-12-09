import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExpenseService} from "../../services/expense-service/expense.service";
import {SessionService} from "../../services/session.service";
import {ExpenseCategory} from "../../models/expense-category.enum";
import {isNumeric} from "rxjs/internal-compatibility";
import {StatisticTime} from "../../models/statistic-time";

@Component({
  selector: 'app-statistics-time',
  templateUrl: './statistics-time.component.html',
  styleUrls: ['./statistics-time.component.css']
})
export class StatisticsTimeComponent implements OnInit {

  startDate: FormControl = new FormControl('', [Validators.required, this.startDateValidation]);
  endDate: FormControl = new FormControl('', [Validators.required, this.endDateValidation]);
  granularity: FormControl = new FormControl('', [Validators.required]);
  categories: FormControl = new FormControl('', [Validators.required]);

  datesForm: FormGroup = new FormGroup({
    startDate: this.startDate,
    endDate: this.endDate,
    granularity: this.granularity,
    categories: this.categories
  });

  allCategories = ['All'];

  statistics: StatisticTime[]=[];

  constructor(private expenseService: ExpenseService, private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.initCategories();
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
      this.expenseService.getStatisticsByTime(userId!, this.granularity.value, this.startDate.value, this.endDate.value,this.categories.value).subscribe(data => {
          this.statistics = data;
          console.log(data);
        }
      )
    } else {
      alert('Invalid date fields!');
    }
  }

  checkDates() {
    let start = this.startDate.value;
    let end = this.endDate.value;
    return start < end;
  }

  initCategories() {
    for (let expenseCategoryKey in ExpenseCategory) {
      if (!isNumeric(expenseCategoryKey))
        this.allCategories.push(expenseCategoryKey);
    }
  }
}
