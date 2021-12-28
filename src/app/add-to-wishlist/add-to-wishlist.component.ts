import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WishlistItemVendor } from '../models/wishlist-item-vendor.enum';
import { IWishlistItem } from '../models/wishlist-item.model';
import { WishlistServiceService } from '../services/wishlist-service/wishlist-service.service';

@Component({
  selector: 'app-add-to-wishlist',
  templateUrl: './add-to-wishlist.component.html',
  styleUrls: ['./add-to-wishlist.component.css']
})
export class AddToWishlistComponent implements OnInit {
  form = new FormGroup({
    item: new FormControl(''),
  });

  searchResult: IWishlistItem[] = [];

  constructor(
    private wishlistService: WishlistServiceService
  ) { }

  ngOnInit() {
  }

  searchItems() {
    this.wishlistService.searchWishlistItems(this.form.get('item')?.value, 'ALL').subscribe(
      items => {
        this.searchResult = items;
      },
      error => {
        console.log(error);
      }
    );
  }

  openAddCustomItemModal() {
  }
}
