import { bind, preSave, val } from "@plumier/core";
import { genericController } from "@plumier/generic-controller";
import { JwtClaims } from "plumier";
import { Column, Entity, getRepository, ManyToOne, OneToMany } from "typeorm";
import { Item } from "../shop-item/shop-item-entity";
import { User } from "../user/user-entity";
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

export class ShopUser extends EntityBase {

    @val.required()
    @ManyToOne(x => User)
    user: User

    @ManyToOne(x => Shop)
    shop:Shop

    @Column({ default: "ShopStaff" })
    role: "ShopOwner" | "ShopStaff"
}