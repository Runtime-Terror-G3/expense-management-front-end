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

  vendor_src: string | undefined;

  @Output()
  openModalEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    if (this.vendor == "Altex") {
      this.vendor_src = "assets/vendor_altex.png";
    } else if (this.vendor == "CEL") {
      this.vendor_src = "assets/vendor_cel.png";
    } else {
      this.vendor_src = "";
    }
  }

  goToLink() {
    window.open(this.link, "_blank");
  }

  openModal(){
    this.openModalEvent.emit(true);
  }

}
