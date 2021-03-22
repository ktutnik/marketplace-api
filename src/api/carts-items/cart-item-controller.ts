import { HttpStatusError, GenericControllerConfiguration } from "plumier"
import { GenericController } from "@plumier/typeorm"
import { getRepository } from "typeorm"

import { Cart } from "../carts/cart-entity"
import { Item } from "../items/item-entity"
import { CartItem } from "./cart-item-entity"

const config: GenericControllerConfiguration = c => {
    c.methods("GetMany", "GetOne", "Post").ignore()
    c.methods("Put", "Patch", "Delete").authorize("CartOwner")
}

export class CartItemController extends GenericController([Cart, "items"], config) {
    async save(pid: number, data: CartItem) {
        const cartItemRepo = getRepository(CartItem)
        const cartRepo = getRepository(Cart)
        const itemRepo = getRepository(Item)
        const cart = await cartRepo.findOne(pid)
        if (!cart) throw new HttpStatusError(404, "Cart not found")
        const item = await itemRepo.findOne(data.item.id)
        if (!item) throw new HttpStatusError(400, "Invalid item id provided")
        const exists = await cartItemRepo.findOne({ where: { cart: cart.id, item: item.id } })
        if (exists) {
            exists.quantity += data.quantity
            await cartItemRepo.save(exists)
            return { id: exists.id }
        }
        else {
            const inserted = await cartItemRepo.save(data)
            return { id: inserted.id }
        }
    }
}
