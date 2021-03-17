import { bind, preSave, val } from "@plumier/core";
import { genericController } from "@plumier/generic-controller";
import { JwtClaims } from "plumier";
import { Column, Entity, getRepository, OneToMany } from "typeorm";
import { Item } from "../shop-item/shop-item-entity";
import { ShopUser } from "../shop-user/shop-user-entity";
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

}