import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IWishlistItem} from "../models/wishlist-item.model";
import {WishlistServiceService} from "../services/wishlist-service/wishlist-service.service";

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

  constructor(private wishlistService: WishlistServiceService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.wishlistService.getWishlistItems().subscribe(items => {
      this.wishlistItems = items;
    });
  }

  searchItem() {
    const keyboard: string = this.form.get('item')?.value;
    if (keyboard === '')
      this.loadData();
    else {
      this.wishlistItems = this.wishlistItems.filter(item => item.title.toLowerCase().includes(keyboard.toLowerCase()))
    }
  }

  cancel() {
    this.showModal = false;
  }

  removeFromWishlist() {
    this.showModal = false;
    this.wishlistService.deleteWishlistItem(this.selectedItem!.id!).subscribe(() => {
      this.loadData();
    })
  }

  openModal(item: IWishlistItem) {
    this.showModal = true;
    this.selectedItem = item;
  }

}
