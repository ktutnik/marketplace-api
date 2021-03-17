import { genericController } from "@plumier/generic-controller";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CartItem } from "../cart-item/cart-item-entity";
import { ShippingAddress } from "../user-shipping-address/user-shipping-address-entity";
import { User } from "../user/user-entity";
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