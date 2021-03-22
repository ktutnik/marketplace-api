import { genericController } from "@plumier/generic-controller"
import { Column, Entity, ManyToOne } from "typeorm"
import {noop} from "@plumier/reflect"

import { EntityBase } from "../_shared/entity-base"
import { User } from "../users/users-entity"
import { Shop } from "../shops/shops-entity"
import { val } from "@plumier/validator"


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

export class ShopUserDto {
    @noop()
    userId:number

    @noop()
    name:string

    @noop()
    role: "ShopOwner" | "ShopStaff"
}