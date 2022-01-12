import { MatSnackBar } from '@angular/material/snack-bar';
import { IExpense } from 'src/app/models/expense.model';
import { WishlistServiceService } from './../services/wishlist-service/wishlist-service.service';
import { IWishlistItem } from './../models/wishlist-item.model';
import { WishlistItemVendor } from '../models/wishlist-item-vendor.enum';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseCategory } from '../models/expense-category.enum';

@Component({
  selector: 'item-wishlist',
  templateUrl: './item-wishlist.component.html',
  styleUrls: ['./item-wishlist.component.css'],
})
export class ItemWishlistComponent implements OnInit {

  @Input()
  id!: number;
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
    amount: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });
  formDate: string = '';
  defaultCategory = ExpenseCategory.Wishlist;

  @Output()
  openModalEvent = new EventEmitter<boolean>();
  @Output()
  refreshTableEvent = new EventEmitter<boolean>();

  vendorItem = WishlistItemVendor;
  showModal= false;

  constructor(private wishlistService: WishlistServiceService, private snackBar: MatSnackBar) { }

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

  async addItemInWishlist() {
    var vendorType: WishlistItemVendor = this.vendor as unknown as WishlistItemVendor

    let wishlistItem = {
      title: this.title,
      price: this.price,
      link: this.link,
      vendor: vendorType,
      image: this.image_src
    } as IWishlistItem

    this.wishlistService.createWishlistItem(wishlistItem).subscribe();
    this.showModal = true;
    await this.delay(2000);
    this.showModal = false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
    this.categories.push(ExpenseCategory.Wishlist);
    this.categories.push(ExpenseCategory.Others);
  }

  cancel() {
    this.purchaseConfirmationModal = false;
  }

  async purchaseItem(){
    var error_messages = "";
    if (!this.amount) {
      error_messages = "Amount is required!";
    }
    if (!this.date || new Date(this.date).toLocaleDateString('fr-CA') > new Date().toLocaleDateString('fr-CA'))
    {
      error_messages = `${error_messages} Date must be before today or today!`;
    }
    if (!this.category) {
      error_messages = `${error_messages} Category is required!`;
    }
    if (error_messages !== ''){
      this.snackBar!.open(error_messages, '', {
        duration: 3000,
        panelClass: ['snackbar']
      });
    } else {
      let expenseItem = {
        amount: this.amount,
        category: this.category,
        date: this.date,
      } as IExpense
      this.wishlistService.purchaseWishlistItem(this.id, expenseItem).subscribe(
        async () => {
          this.form.reset();
          this.purchased = true;
          await this.delay(2000);
          this.purchaseConfirmationModal = false;
          this.purchased = false;
          this.refreshTableEvent.emit(true);
        },
        error => {
          this.snackBar!.open(error.message, '', {
            duration: 3000,
            panelClass: ['snackbar']
          });
        }
      );
    }
  }

}
