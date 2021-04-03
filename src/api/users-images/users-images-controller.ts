import { type } from "@plumier/reflect"
import { GenericController } from "@plumier/typeorm"
import { bind, FormFile, GenericControllerConfiguration, JwtClaims, route, val } from "plumier"
import { getRepository } from "typeorm"

import { Image } from "./image-entity"

const config: GenericControllerConfiguration = c => {
    c.setPath("users/:pid/images/:id")
    c.methods("Post").ignore()
    c.methods("GetOne", "GetMany", "Delete", "Put", "Patch").authorize("ResourceOwner")
}
export class UsersImagesController extends GenericController([Image, "createdBy"], config) {
    @route.post()
    @type({ id:Number })
    async upload(pid:number, @val.image("1MB") file: FormFile, @bind.user() user: JwtClaims) {
        // usually we push file to cloud storage such as Amazon S3 or Google Storage Bucket
        // Amazon S3 https://stackoverflow.com/a/52369452/212706
        // Google Storage Bucket https://stackoverflow.com/a/57799209/212706
        const imageRepo = getRepository(Image)
        const image = await imageRepo.save({
            name: file.name,
            mimeType: file.type,
            size: file.size,
            createdBy: { id: user.userId },
            url: "https://image.com/image.jpg"
        })
        return {id: image.id}
    }
}