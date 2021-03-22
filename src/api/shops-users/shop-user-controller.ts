import { GenericController } from "@plumier/typeorm"

import { Shop } from "../shops/shop-entity"

export class ShopUserController extends GenericController([Shop, "users"], c => {
    c.mutators().authorize("ShopOwner")
    c.accessors().authorize("ShopOwner", "ShopStaff")
}) { }