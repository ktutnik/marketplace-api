import { authorize } from "@plumier/core"
import { genericController } from "@plumier/generic-controller"
import { val } from "@plumier/validator"
import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../_shared/entity-base"
import { Shop } from "../shops/shop-entity"

@genericController(c => {
    c.mutators().ignore()
})
@Entity()
export class Item extends EntityBase {

    @ManyToOne(x => Shop)
    shop:Shop 

    @val.required()
    @Column()
    name:string

    @authorize.read("ShopOwner", "ShopStaff")
    @Column()
    basePrice:number

    @val.required()
    @Column()
    price:number
}
