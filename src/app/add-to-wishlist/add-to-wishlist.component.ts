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

  constructor() { }

  ngOnInit() {
  }

  searchItem() {
  }

  openAddCustomItemModal() {
  }
}
