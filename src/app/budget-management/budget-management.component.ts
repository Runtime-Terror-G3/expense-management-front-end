import { IMonthlyBudget } from './../models/monthly-budget.model';
import { SessionService } from './../services/session.service';
import { BudgetService } from './../services/budget-service/budget.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


const ELEMENT_DATA: IMonthlyBudget[] = [
  {
    "id": 1,
    "userId": 1,
    "income": 25478,
    "date": new Date("11/12/2021")
  }, {
    "id": 2,
    "userId": 1,
    "income": 1078,
    "date": new Date("11/11/2021")
  }, {
      "id": 3,
      "userId": 1,
      "income": 8078,
      "date": new Date("10/10/2021")
  },
  {
    "id": 3,
    "userId": 1,
    "income": 8078,
    "date": new Date("10/10/2021")
},
{
  "id": 3,
  "userId": 1,
  "income": 8078,
  "date": new Date("10/10/2021")
},
{
  "id": 3,
  "userId": 1,
  "income": 8078,
  "date": new Date("10/10/2021")
},
{
  "id": 3,
  "userId": 1,
  "income": 8078,
  "date": new Date("10/10/2021")
},
{
  "id": 3,
  "userId": 1,
  "income": 8078,
  "date": new Date("10/10/2021")
},
{
  "id": 3,
  "userId": 1,
  "income": 8078,
  "date": new Date("10/10/2021")
},
{
  "id": 3,
  "userId": 1,
  "income": 8078,
  "date": new Date("10/10/2021")
},
{
  "id": 3,
  "userId": 1,
  "income": 8078,
  "date": new Date("10/10/2021")
},
{
  "id": 3,
  "userId": 1,
  "income": 8078,
  "date": new Date("10/10/2021")
}
]

@Component({
  selector: 'app-budget-management',
  templateUrl: './budget-management.component.html',
  styleUrls: ['./budget-management.component.css']
})



export class BudgetManagementComponent implements OnInit {
  monthlyBudgets: IMonthlyBudget[] = [] as IMonthlyBudget[];
  loggedUserId: number | undefined;
  currentMonthlyBudget: IMonthlyBudget = {
    "id": 0,
    "userId": 0,
    "income": 0,
    "date": new Date()
  };
  currentBudget = null; 
  showModal = false;
  isAddMode = true;

  form = new FormGroup({
    income: new FormControl(''),
    date: new FormControl('')
  });


  displayedColumns: string[] = ['date', 'income', 'actions'];
  dataSource = ELEMENT_DATA;

  get income() {
    return this.form.get('income') as FormControl;
  }

  get date() {
    return this.form.get('date') as FormControl;
  }

  constructor(private budgetService: BudgetService, private sessionService: SessionService) { }

  ngOnInit() {
    this.loggedUserId = this.sessionService.getLoggedUserId()!;
    // this.budgetService.getMonthlyBudgets(this.loggedUserId, Date.now, Date.now)
  }

  createMonthlyBudget() {
    let budget = {
      userId: this.loggedUserId,
      income: this.income.value,
      date: this.date.value
    } as IMonthlyBudget

    this.budgetService.createMonthlyBudget(budget).subscribe();
    this.form.reset();
    this.showModal = false;
  }

  delelteMonthlyBudget(budgetId: number) {
    this.budgetService.deleteMonthlyBudget(budgetId, this.loggedUserId!).subscribe();
  }

  updateMonthlyBudget() {
    let budget = {
      id: this.currentMonthlyBudget.id,
      userId: this.loggedUserId,
      income: this.income.value,
      date: this.date.value
    } as IMonthlyBudget

    this.budgetService.updateMonthlyBudget(budget).subscribe();
    this.form.reset();
    this.showModal = false;
  }

  addRow() {
    this.showModal = true;
    this.isAddMode = true;
  }

  editRow(row: IMonthlyBudget) {
    this.currentMonthlyBudget = row;
    this.showModal = true;
    this.isAddMode = false;
  }

  deleteRow(row: IMonthlyBudget) {
    
  }

  cancel() {
    this.showModal = false;
  }
}
