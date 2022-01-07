import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ExpenseCategory } from '../models/expense-category.enum';

@Component({
  selector: 'item-wishlist',
  templateUrl: './item-wishlist.component.html',
  styleUrls: ['./item-wishlist.component.css'],
})
export class ItemWishlistComponent implements OnInit {

  @Input()
  id!: number | undefined;
  @Input()
  title!: string;
  @Input()
  image_src!: string;
  @Input()
  link!: string;
  @Input()
  price!: number;
  @Input()
  vendor!: string;
  @Input()
  isShowCompetitorMode!: boolean;
  @Input()
  isWishListItem!: boolean;
  @Input()
  isItemAffordable!: boolean;

  vendor_src: string | undefined;
  purchaseConfirmationModal = false;
  purchased = false;
  categories: ExpenseCategory[] = [] as ExpenseCategory[];
  expenseCategory = ExpenseCategory;
  form = new FormGroup({
    amount: new FormControl(''),
    date: new FormControl(''),
    category: new FormControl(''),
  });
  formDate: string = '';

  @Output()
  openModalEvent = new EventEmitter<boolean>();

  constructor() { }

  get amount() {
    return (this.form.get('amount') as FormControl).value;
  }

  get category() {
    return (this.form.get('category') as FormControl).value;
  }

  get date() {
    return new Date(this.formDate);
  }

  ngOnInit() {
    if (this.vendor == "Altex") {
      this.vendor_src = "assets/vendor_altex.png";
    } else if (this.vendor == "Cel") {
      this.vendor_src = "assets/vendor_cel.png";
    } else {
      this.vendor_src = "";
    }
    this.createCategoryList();
    this.formDate = new Date().toLocaleDateString('fr-CA');
  }

  goToLink() {
    window.open(this.link, "_blank");
  }

  openModal(){
    this.openModalEvent.emit(true);
  }

  createCategoryList() {
    this.categories.push(ExpenseCategory.Clothing);
    this.categories.push(ExpenseCategory.Education);
    this.categories.push(ExpenseCategory.Entertainment);
    this.categories.push(ExpenseCategory.Food);
    this.categories.push(ExpenseCategory.Health);
    this.categories.push(ExpenseCategory.Housekeeping);
    this.categories.push(ExpenseCategory.SelfCare);
    this.categories.push(ExpenseCategory.Others);
  }

  cancel() {
    this.purchaseConfirmationModal = false;
  }

  async purchaseItem(){
    this.purchased = true;
    await this.delay(2000);
    this.purchaseConfirmationModal = false;
    this.purchased = false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
