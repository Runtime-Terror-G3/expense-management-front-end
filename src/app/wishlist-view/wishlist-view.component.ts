import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IWishlistItem} from "../models/wishlist-item.model";
import {WishlistServiceService} from "../services/wishlist-service/wishlist-service.service";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-wishlist-view',
  templateUrl: './wishlist-view.component.html',
  styleUrls: ['./wishlist-view.component.css']
})
export class WishlistViewComponent implements OnInit {
  form = new FormGroup({
    item: new FormControl(''),
  });

  showModal?: boolean = false;

  wishlistItems: IWishlistItem[] = [];

  selectedItem?: IWishlistItem;

  spinnerMode: ProgressSpinnerMode = 'indeterminate';

  isLoading: boolean = true;

  constructor(private wishlistService: WishlistServiceService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.wishlistService.getWishlistItems().subscribe(items => {
      this.wishlistItems = items;
      this.isLoading = false;
    });
  }

  filterData(keyword:string){
    this.wishlistService.getWishlistItems().subscribe(items => {
      this.wishlistItems = items.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()));
      this.isLoading = false;
    });
  }

  searchItem() {
    const keyword: string = this.form.get('item')?.value;
    this.wishlistItems = []
    this.isLoading = true;
    if (keyword === '') {
      this.loadData();
    } else {
      this.filterData(keyword);
    }
  }

  cancel() {
    this.showModal = false;
  }

  removeFromWishlist() {
    this.showModal = false;
    this.wishlistService.deleteWishlistItem(this.selectedItem!.id!).subscribe(() => {
      this.wishlistItems=this.wishlistItems.filter(item => item.id!==this.selectedItem!.id!);
    })
  }

  openModal(item: IWishlistItem) {
    this.showModal = true;
    this.selectedItem = item;
  }

}
