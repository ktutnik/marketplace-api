import { entityPolicy } from "plumier";
import { getRepository } from "typeorm";
import { ShippingAddress } from "./user-shipping-address-entity";



entityPolicy(ShippingAddress)
    .register("ResourceOwner", async ({ user }, id) => {
        const address = await getRepository(ShippingAddress).findOne(id, { relations: ["user"] })
        return address?.user.id === user?.userId
    })