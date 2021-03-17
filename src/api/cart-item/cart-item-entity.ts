import { genericController } from "@plumier/generic-controller";
import { val } from "@plumier/validator";
import { Column, Entity, ManyToOne } from "typeorm";
import { Cart } from "../cart/cart-entity";
import { Item } from "../shop-item/shop-item-entity";
import { EntityBase } from "../_shared/entity-base";


@genericController(c => {
    c.methods("GetMany", "GetOne", "Post").ignore()
    c.methods("Put", "Patch", "Delete").authorize("CartOwner")
    c.useNested(Cart, "items")
})
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