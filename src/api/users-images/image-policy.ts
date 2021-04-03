import { entityPolicy } from "@plumier/core";
import { getRepository } from "typeorm";
import {Image} from "./image-entity"

entityPolicy(Image)
    .register("ResourceOwner", async (ctx, id) => {
        const repo = getRepository(Image)
        const image = await repo.findOne(id, { relations: ["createdBy"] })
        return image?.createdBy?.id === ctx.user?.userId
    })