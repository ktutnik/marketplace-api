import { val } from "plumier"
import { Column, Entity, ManyToOne } from "typeorm"

import { EntityBase } from "../_shared/entity-base"
import { Cart } from "../carts/carts-entity"
import { Product } from "../products/product-entity"



@Entity()
export class CartItem extends EntityBase{
    @ManyToOne(x => Cart)
    cart:Cart

    @val.required()
    @ManyToOne(x => Product)
    product:Product

    @val.required()
    @Column()
    quantity:number
}