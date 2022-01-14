import { Component, Input, OnInit } from '@angular/core';
import { WishlistItemVendor } from '../models/wishlist-item-vendor.enum';
import { IWishlistItem } from '../models/wishlist-item.model';

@Component({
  selector: 'app-wishlist-show-competitor',
  templateUrl: './wishlist-show-competitor.component.html',
  styleUrls: ['./wishlist-show-competitor.component.css']
})
export class WishlistShowCompetitorComponent implements OnInit {
  
  @Input()
  title!: string;
  
  @Input() 
  price!: number;
  
  @Input()
  vendor_src!: string;

  @Input()
  searchResultCompetitor!: IWishlistItem[];

  @Input() 
  closeShowCompetitorModal!: () => void;


  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    this.closeShowCompetitorModal();
  }

}
