import { entityPolicy } from "@plumier/core";
import { getRepository } from "typeorm";
import { ShopUser } from "../shop-user/shop-user-entity";
import { Item } from "./shop-item-entity";


entityPolicy(Item)
    .register("ShopOwner", async ({ user }, id) => {
        const item = await getRepository(Item).findOne(id, { relations: ["shop", "shop.users"] })
        const shopUser = await getRepository(ShopUser).findOne({ where: { shop: item?.shop.id, user: user?.userId } })
        return shopUser?.role === "ShopOwner"
    })
    .register("ShopStaff", async ({ user }, id) => {
        const item = await getRepository(Item).findOne(id, { relations: ["shop", "shop.users"] })
        const shopUser = await getRepository(ShopUser).findOne({ where: { shop: item?.shop.id, user: user?.userId } })
        return shopUser?.role === "ShopStaff"
    })