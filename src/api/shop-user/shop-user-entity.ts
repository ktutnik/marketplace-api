import { genericController } from "@plumier/generic-controller"
import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../_shared/entity-base"
import { User } from "../user/user-entity"
import { Shop } from "../shop/shop-entity"
import { val } from "@plumier/validator"


@genericController(c => {
    c.useNested(Shop, "users")
    c.mutators().authorize("ShopOwner")
})
@Entity()
export class ShopUser extends EntityBase {

    @val.required()
    @ManyToOne(x => User)
    user: User

    @ManyToOne(x => Shop)
    shop:Shop

    @Column({ default: "ShopStaff" })
    role: "ShopOwner" | "ShopStaff"
}