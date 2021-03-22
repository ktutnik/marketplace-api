import { GenericController } from "@plumier/typeorm"
import { User } from "../users/users-entity"

export class UserShippingController extends GenericController([User, "addresses"], c => {
    c.setPath("users/:pid/shipping-addresses/:id")
    c.all().authorize("ResourceOwner")
}) { }