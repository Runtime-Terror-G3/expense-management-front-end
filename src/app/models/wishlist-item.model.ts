import { WishlistItemVendor } from "./wishlist-item-vendor.enum";

export interface IWishlistItem {
    id?: number,
    title: string,
    price: number,
    link: string,
    image: string,
    vendor: WishlistItemVendor,
    affordable: boolean
}
