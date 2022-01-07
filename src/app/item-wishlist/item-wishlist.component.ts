import { WishlistServiceService } from './../services/wishlist-service/wishlist-service.service';
import { IWishlistItem } from './../models/wishlist-item.model';
import { WishlistItemVendor } from '../models/wishlist-item-vendor.enum';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'item-wishlist',
  templateUrl: './item-wishlist.component.html',
  styleUrls: ['./item-wishlist.component.css'],
})
export class ItemWishlistComponent implements OnInit {

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

  @Output()
  openModalEvent = new EventEmitter<boolean>();

  vendor_src: string | undefined;
  vendorItem = WishlistItemVendor;
  showModal= false;

  constructor(private wishlistService: WishlistServiceService) { }

  ngOnInit() {
    if (this.vendor == "Altex") {
      this.vendor_src = "assets/vendor_altex.png";
    } else if (this.vendor == "Cel") {
      this.vendor_src = "assets/vendor_cel.png";
    } else {
      this.vendor_src = "";
    }
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

}
