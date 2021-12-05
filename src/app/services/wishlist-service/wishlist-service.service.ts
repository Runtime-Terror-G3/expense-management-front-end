import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExpense } from 'src/app/models/expense.model';
import { WishlistItemVendor } from 'src/app/models/wishlist-item-vendor.enum';
import { IWishlistItem } from 'src/app/models/wishlist-item.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistServiceService {
  private baseUrl = environment.baseUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private options = {headers: this.headers}

  constructor(private http: HttpClient) { }

  createWishlistItem(wishlistItem: IWishlistItem): Observable<IWishlistItem> {
    const body = JSON.stringify(wishlistItem);
    return this.http.post<IWishlistItem>(`${this.baseUrl}add-wishlistItem`, body, this.options);
  }

  getWishlistItems(): Observable<IWishlistItem[]> { //this endpoint is not yet fully implemented on BE
    return this.http.get<IWishlistItem[]>(`${this.baseUrl}get-wishlist-items`, this.options);
  }

  // TODO - add these methods and sync urls for them when BE implementations are in place 
  // searchWishlistItems(keyword: string, vendor: string): Observable<IWishlistItem[]> {
  //   return this.http.get<IWishlistItem[]>(`${this.baseUrl}search-wishlist-items?keyword=${keyword}&vendor=${vendor}`, this.options);
  // }

  // deleteWishlistItem(wishlistItemId: number, userId: number): Observable<IWishlistItem> {
  //   return this.http.delete<IWishlistItem>(`${this.baseUrl}delete-wishlist-item/${wishlistItemId}/${userId}`, this.options);
  // }

  // purchaseWishlistItem(wishlistItemId: number, expense: IExpense): ... {
  //   const body = JSON.stringify(expense);
  //   return this.http.post<...>(`${this.baseUrl}purchase-wishlist-item/${wishlistItemId}`, body, this.options);
  // }
}
