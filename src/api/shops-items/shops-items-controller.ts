import { GenericController } from "@plumier/typeorm"
import { Shop } from "../shops/shops-entity"


export class ShopItemController extends GenericController([Shop, "items"], c => {
    c.mutators().authorize("ShopOwner", "ShopStaff")
}) { }