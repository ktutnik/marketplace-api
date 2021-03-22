import { bind, preSave, val } from "@plumier/core";
import { genericController } from "@plumier/generic-controller";
import { JwtClaims } from "plumier";
import { Column, Entity, getRepository, OneToMany } from "typeorm";
import { Item } from "../items/item-entity";
import { ShopUser } from "../shops-users/shop-user-entity";
import { EntityBase } from "../_shared/entity-base";

@genericController(c => {
    c.methods("Delete", "Put", "Patch").authorize("ShopOwner")
})
@Entity()
export class Shop extends EntityBase {

    @val.required()
    @Column()
    name: string

    @OneToMany(x => ShopUser, x => x.shop)
    users: ShopUser[]

    @OneToMany(x => Item, x => x.shop)
    items: Item[]

    @preSave("post")
    async setShopOwner(@bind.user() user: JwtClaims) {
        const owner = await getRepository(ShopUser).save({ user: { id: user.userId }, role: "ShopOwner" })
        this.users = [ owner ]
    }
}