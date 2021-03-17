import { genericController } from "@plumier/generic-controller";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "../user/user-entity";
import { EntityBase } from "../_shared/entity-base";

@genericController(c => {
    c.setPath("users/:pid/shipping-addresses/:id")
    c.useNested(User, "addresses")
    c.all().authorize("ResourceOwner")
})
@Entity()
export class ShippingAddress extends EntityBase {
    @ManyToOne(x => User)
    user:User

    @Column()
    address: string

    @Column()
    city:string 

    @Column()
    country: string

    @Column()
    zipCode: string
}