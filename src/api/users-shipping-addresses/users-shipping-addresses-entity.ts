import { genericController } from "@plumier/generic-controller";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "../users/users-entity";
import { EntityBase } from "../_shared/entity-base";


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