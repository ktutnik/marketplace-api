import { entityPolicy } from "@plumier/core";
import { getRepository } from "typeorm";
import { Cart } from "./cart-entity";


entityPolicy(Cart)
    // user become CartOwner only when the state is Open, after that he not authorized to access the cart
    .register("CartOwner", async ({ user }, id) => {
        const cart = await getRepository(Cart).findOne(id, { relations: ["user"] })
        return cart?.state === "Open" && cart?.user.id === user?.userId
    })