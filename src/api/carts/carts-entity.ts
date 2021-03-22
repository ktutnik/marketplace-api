import { genericController } from "@plumier/generic-controller";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CartItem } from "../carts-items/carts-items-entity";
import { ShippingAddress } from "../users-shipping-addresses/users-shipping-addresses-entity";
import { User } from "../users/users-entity";
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