import { api, bind, route } from "@plumier/core";
import { getRepository } from "typeorm";
import { Cart } from "./cart-entity";
import { type } from "@plumier/reflect"
import { JwtClaims } from "plumier";
import { CartItem } from "../carts-items/cart-item-entity";


@api.tag("Carts")
export class CartsController {

    @route.ignore()
    private async getOpen(user: JwtClaims) {
        const repo = getRepository(Cart)
        const openCart = await repo.findOne({ where: { user: user.userId, state: "Open" }, relations: ["address"] })
        return openCart ?? await repo.save({ state: "Open", user: { id: user.userId } })
    }

    async open(@bind.user() user: JwtClaims) {
        const cart = await this.getOpen(user)
        const items = await getRepository(CartItem).createQueryBuilder()
            .where({ cart: cart.id })
            .groupBy("item.shop")
            .select()
        return { ...cart, items }
    }

    async checkout(@bind.user() user: JwtClaims) {
        const repo = getRepository(Cart)
        const cart = await this.getOpen(user)
        await repo.save({ ...cart, state: "Closed" })
    }
}