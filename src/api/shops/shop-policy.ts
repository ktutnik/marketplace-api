import { entityPolicy } from "@plumier/core";
import { getRepository } from "typeorm";
import { ShopUser } from "../shops-users/shop-user-entity";
import { Shop } from "./shop-entity";


entityPolicy(Shop)
    .register("ShopOwner", async ({ user }, id) => {
        const shopUser = await getRepository(ShopUser).findOne({ where: { user: user?.userId, shop: id } })
        return shopUser?.role === "ShopOwner"
    })
    .register("ShopStaff", async ({ user }, id) => {
        const shopUser = await getRepository(ShopUser).findOne({ where: { user: user?.userId, shop: id } })
        return shopUser?.role === "ShopStaff"
    })