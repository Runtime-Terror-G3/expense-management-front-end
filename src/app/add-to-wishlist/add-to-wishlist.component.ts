import { SessionService } from './../services/session.service';
import { WishlistServiceService } from './../services/wishlist-service/wishlist-service.service';
import { IWishlistItem } from './../models/wishlist-item.model';
import { WishlistItemVendor } from './../models/wishlist-item-vendor.enum';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-to-wishlist',
  templateUrl: './add-to-wishlist.component.html',
  styleUrls: ['./add-to-wishlist.component.css']
})
export class AddToWishlistComponent implements OnInit {
  form = new FormGroup({
    item: new FormControl(''),
  });

  loggedUserId: number | undefined;
  vendors: WishlistItemVendor[] = [] as WishlistItemVendor[];
  vendorItem = WishlistItemVendor;
  saved=false;

  itemForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    link: new FormControl(''),
    vendor: new FormControl('')
  });

  showCustomModal = false;

  constructor(private wishlistService: WishlistServiceService, private sessionService: SessionService) { }

  get title() {
    return (this.itemForm.get('title') as FormControl);
  }

  get price() {
    return (this.itemForm.get('price') as FormControl);
  }

  get link() {
    return (this.itemForm.get('link') as FormControl);
  }

  get vendor() {
    return (this.itemForm.get('vendor') as FormControl);
  }
  

  ngOnInit() {
    this.loggedUserId = this.sessionService.getLoggedUserId()!;
    this.createVendorsList();
  }

  searchItem() {
  }

  cancel() {
    this.itemForm.reset();
    this.showCustomModal=false;
  }

  async addCustomItem() {
    let wishlistItem = {
      userId: this.loggedUserId,
      title: this.title.value,
      price: this.price.value,
      link: this.link.value,
      vendor: this.vendor.value
    } as IWishlistItem

    this.wishlistService.createWishlistItem(wishlistItem).subscribe();
    this.itemForm.reset();
    
    this.saved = true;
    await this.delay(2000);
    this.showCustomModal = false;
    this.saved = false;
    
  }

  createVendorsList() {
    this.vendors.push(WishlistItemVendor.Altex);
    this.vendors.push(WishlistItemVendor.Cel);
    this.vendors.push(WishlistItemVendor.Other);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
