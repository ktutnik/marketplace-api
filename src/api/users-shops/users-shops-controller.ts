import { GenericController } from "@plumier/typeorm"
import { ResponseTransformer } from "plumier"
import { ShopUser } from "../shops-users/shops-users-entity"

import { User } from "../users/users-entity"
import { UserShopDto } from "./users-shops-dto"

const transformer: ResponseTransformer<ShopUser, UserShopDto> = x => ({ shopId: x.shop.id, name: x.shop.name, role: x.role })

export class ShopUserController extends GenericController([User, "shops"], c => {
    c.getOne().authorize("ShopOwner").transformer(UserShopDto, transformer)
    c.getMany().authorize("ResourceOwner").transformer(UserShopDto, transformer)
    c.mutators().ignore()
}) { }