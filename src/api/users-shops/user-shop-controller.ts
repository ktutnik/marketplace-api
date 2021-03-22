import { GenericController } from "@plumier/typeorm"

import { User } from "../users/user-entity"

export class ShopUserController extends GenericController([User, "shops"], c => {
    c.getOne().authorize("ShopOwner")
    c.getMany().authorize("ResourceOwner")
    c.mutators().ignore()
}) { }