import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../_shared/entity-base"
import { User } from "../users/users-entity"


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