import { val } from "plumier"
import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../_shared/entity-base"
import { Cart } from "../carts/carts-entity"
import { Item } from "../items/items-entity"



@Entity()
export class CartItem extends EntityBase{
    @ManyToOne(x => Cart)
    cart:Cart

    @val.required()
    @ManyToOne(x => Item)
    item:Item

    @val.required()
    @Column()
    quantity:number
}