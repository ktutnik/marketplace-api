import { genericController } from "@plumier/generic-controller";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CartItem } from "../carts-items/cart-item-entity";
import { ShippingAddress } from "../users-shipping-addresses/user-shipping-address-entity";
import { User } from "../users/user-entity";
import { EntityBase } from "../_shared/entity-base";

@genericController(c => {
    c.methods("Post", "Delete", "GetOne").ignore()
    c.methods("Put", "Patch").authorize("CartOwner")
    c.getMany().authorize("Admin")
})
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