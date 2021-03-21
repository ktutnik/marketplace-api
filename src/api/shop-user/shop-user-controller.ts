import { createGenericController } from "@plumier/typeorm"

import { Shop } from "../shop/shop-entity"

export const ShopUserController = createGenericController([Shop, "users"], c => {
    c.mutators().authorize("ShopOwner")
    c.accessors().ignore()
})