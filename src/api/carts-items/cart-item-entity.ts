import { val } from "@plumier/validator"
import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../_shared/entity-base"
import { Cart } from "../carts/cart-entity"
import { Item } from "../items/item-entity"



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