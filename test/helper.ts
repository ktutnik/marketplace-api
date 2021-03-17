import dotenv from "dotenv"
import { sign } from "jsonwebtoken"
import { join } from "path"
import { JwtClaims } from "plumier"
import supertest from "supertest"
import { getConnection } from "typeorm"
import { User } from "../src/api/user/user-entity"


dotenv.config({ path: join(__dirname, ".env-test") })

export function createToken(id: number, role: "User" | "Admin") {
    return sign(<JwtClaims>{ userId: id, role }, process.env.PLUM_JWT_SECRET!)
}

export const ignoreProps = {
    id: expect.any(Number),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
}

export const userToken = createToken(123, "User")
export const adminToken = createToken(456, "Admin")

export async function createUser(app: any, user: Partial<User> = {}) {
    const { body } = await await supertest(app.callback())
        .post("/api/v1/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
            email: user.email ?? "john.doe@gmail.com",
            password: user.password ?? "john0doe#",
            name: user.name ?? "John Doe",
            role: user.role ?? "User"
        }).expect(200)
    const token = createToken(body.id, user.role ?? "User")
    return { id: body.id, token }
}


export async function createShop(app: any, hasStaff = false) {
    const owner = await createUser(app)
    const { body } = await supertest(app.callback())
        .post("/api/v1/shops")
        .send({ name: "Putra Mahkota" })
        .set("Authorization", `Bearer ${owner.token}`)
        .expect(200)
    let staff: { id: any, token: string } | undefined
    if (hasStaff) {
        staff = await createUser(app, { name: "Shop Staff", email: "shop.staff@gmail.com" })
        await supertest(app.callback())
            .post(`/api/v1/shops/${body.id}/users`)
            .send({ user: staff.id })
            .set("Authorization", `Bearer ${owner.token}`)
            .expect(200)
    }
    return { owner, staff, shop: <{ id: number }>body }
}

export async function closeConnection() {
    const con = getConnection()
    if (con.isConnected)
        await con.close()
}

export const ignore = {
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    id: expect.any(Number)
}