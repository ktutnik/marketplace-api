import { GenericController } from "@plumier/typeorm"
import { bind, GenericControllerConfiguration, JwtClaims, route } from "plumier"
import { getRepository } from "typeorm"

import { CartItem } from "../carts-items/carts-items-entity"
import { Cart } from "./carts-entity"


const config: GenericControllerConfiguration = c => {
    c.methods("Post", "Delete", "GetOne").ignore()
    c.methods("Put", "Patch").authorize("CartOwner")
    c.getMany().authorize("Admin")
}

export class CartsController extends GenericController(Cart, config) {

    @route.ignore()
    private async getOpen(user: JwtClaims) {
        const repo = getRepository(Cart)
        const openCart = await repo.findOne({ where: { user: user.userId, state: "Open" }, relations: ["address"] })
        return openCart ?? await repo.save({ state: "Open", user: { id: user.userId } })
    }

    @route.get()
    async open(@bind.user() user: JwtClaims) {
        const cart = await this.getOpen(user)
        // const items =  await getRepository(CartItem).createQueryBuilder()
        //     .where({ cart: cart.id })
        return { ...cart,  }
    }

    @route.post()
    async checkout(@bind.user() user: JwtClaims) {
        const repo = getRepository(Cart)
        const cart = await this.getOpen(user)
        await repo.save({ ...cart, state: "Closed" })
    }
}