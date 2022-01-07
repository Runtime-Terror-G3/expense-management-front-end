import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-wishlist-view',
  templateUrl: './wishlist-view.component.html',
  styleUrls: ['./wishlist-view.component.css']
})
export class WishlistViewComponent implements OnInit {
  form = new FormGroup({
    item: new FormControl(''),
  });

  showModal?:boolean=false;

  constructor() {
  }

  ngOnInit(): void {

  }

  searchItem() {
  }

  cancel(){
    this.showModal = false;
  }

  removeFromWishlist(){
    this.showModal = false;
  }

  openModal(){
    this.showModal=true;
  }

}
