import { Column, Entity, ManyToOne, OneToMany } from "typeorm"

import { EntityBase } from "../_shared/entity-base"
import { CartItem } from "../carts-items/carts-items-entity"
import { ShippingAddress } from "../users-shipping-addresses/users-shipping-addresses-entity"
import { User } from "../users/users-entity"

@Entity()
export class Cart extends EntityBase {
    @ManyToOne(x => User)
    user:User 

    @OneToMany(x => CartItem, x => x.cart)
    items:CartItem[]

    @ManyToOne(x => ShippingAddress)
    address: ShippingAddress

    @Column()
    state: "Open" | "Closed"
}