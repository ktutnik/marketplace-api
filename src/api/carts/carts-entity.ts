import { Column, Entity, ManyToOne, OneToMany } from "typeorm"

import { EntityBase } from "../_shared/entity-base"
import { CartItem } from "../carts-items/carts-items-entity"
import { ShippingAddress } from "../users-shipping-addresses/users-shipping-addresses-entity"
import { User } from "../users/users-entity"
import { authorize } from "@plumier/core"

@Entity()
export class Cart extends EntityBase {
    @authorize.readonly()
    @ManyToOne(x => User)
    user:User 

    @OneToMany(x => CartItem, x => x.cart)
    items:CartItem[]

    @ManyToOne(x => ShippingAddress)
    address: ShippingAddress

    @authorize.readonly()
    @Column()
    state: "Open" | "Closed"
}