import { WishlistItemVendor } from "./wishlist-item-vendor.enum";

export interface IWishlistItem {
    id?: number,
    userId: number, //TODO - remove this when authorization is implemented on BE
    title: string,
    price: number,
    link: string,
    image: string,
    vendor: WishlistItemVendor
}