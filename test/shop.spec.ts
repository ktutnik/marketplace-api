import supertest from "supertest"
import createApp from "../src/app"
import { closeConnection, createUser, ignore, userToken } from "./helper"


afterEach(async () => {
    await closeConnection()
})

describe("Shop", () => {
    it("Should not able to create shop without authenticated", async () => {
        const app = await createApp({ mode: "production" })
        await supertest(app.callback())
            .post("/api/v1/shops")
            .send({ name: "Putra Mahkota" })
            .expect(403)
    })
    it("Should able to register for any login user", async () => {
        const app = await createApp({ mode: "production" })
        const user = await createUser(app)
        await supertest(app.callback())
            .post("/api/v1/shops")
            .send({ name: "Putra Mahkota" })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
    })
    it("Should assign person who register as owner", async () => {
        const app = await createApp({ mode: "production" })
        const user = await createUser(app)
        const { body } = await supertest(app.callback())
            .post("/api/v1/shops")
            .send({ name: "Putra Mahkota" })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        const { body: result } = await supertest(app.callback())
            .get(`/api/v1/shops/${body.id}/users`)
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        expect(result[0]).toMatchSnapshot({ ...ignore, user: { ...ignore } })
    })
    it("Should restrict other user to modify other shop", async () => {
        const app = await createApp({ mode: "production" })
        const user = await createUser(app)
        const { body } = await supertest(app.callback())
            .post("/api/v1/shops")
            .send({ name: "Putra Mahkota" })
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        await supertest(app.callback())
            .patch(`/api/v1/shops/${body.id}`)
            .set("Authorization", `Bearer ${userToken}`)
            .expect(401)
    })
})