import supertest from "supertest"
import createApp from "../src/app"
import { closeConnection, createShop, createUser, ignore } from "./helper"


afterEach(async () => {
    await closeConnection()
})

describe("Shop User", () => {
    it("Should able to add user by shop owner", async () => {
        const app = await createApp({ mode: "production" })
        const { owner: ali } = await createShop(app, { name: "Ali Shop" }, { email: "ali@gmail.com" }, [])
        const { shop: cuteMart, owner: tia } = await createShop(app, { name: "Tia Shop" }, { email: "tia.shop@gmail.com" }, [])
        await supertest(app.callback())
            .post(`/api/v1/shops/${cuteMart.id}/users`)
            .set("Authorization", `Bearer ${tia.token}`)
            .send({ user: ali.id })
            .expect(200)
        const { body: result } = await supertest(app.callback())
            .get(`/api/v1/users/${ali.id}/shops`)
            .set("Authorization", `Bearer ${ali.token}`)
            .expect(200)
        expect(result[0]).toMatchSnapshot({shopId:expect.any(Number)})
        expect(result[1]).toMatchSnapshot({shopId:expect.any(Number)})
    })
})