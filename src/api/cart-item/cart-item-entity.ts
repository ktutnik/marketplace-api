import { genericController } from "@plumier/generic-controller";
import { val } from "@plumier/validator";
import { Column, Entity, ManyToOne } from "typeorm";
import { Cart } from "../cart/cart-entity";
import { Item } from "../item/item-entity";
import { EntityBase } from "../_shared/entity-base";



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