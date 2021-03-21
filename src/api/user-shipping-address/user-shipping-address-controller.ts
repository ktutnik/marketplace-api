import { createGenericController } from "@plumier/typeorm"
import { User } from "../user/user-entity"

export const UserShippingController = createGenericController([User, "addresses"], c => {
    c.setPath("users/:pid/shipping-addresses/:id")
    c.all().authorize("ResourceOwner")
})