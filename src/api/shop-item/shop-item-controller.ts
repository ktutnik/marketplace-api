import { createGenericController } from "@plumier/typeorm"
import { Shop } from "../shop/shop-entity"


export const ShopItemController = createGenericController([Shop, "items"], c => {
    c.mutators().authorize("ShopOwner", "ShopStaff")
})