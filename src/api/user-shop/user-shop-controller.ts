import { createGenericController } from "@plumier/typeorm"

import { User } from "../user/user-entity"

export const ShopUserController = createGenericController([User, "shops"], c => {
    c.getOne().authorize("ShopOwner")
    c.getMany().authorize("ResourceOwner")
    c.mutators().ignore()
})