import supertest from "supertest"
import createApp from "../src/app"
import { closeConnection, createShop, ignore, userToken } from "./helper"


afterEach(async () => {
    await closeConnection()
})

describe("Shop Item", () => {
    it("Should able adding item by staff", async () => {
        const app = await createApp({ mode: "production" })
        const { owner, staff, shop } = await createShop(app, true)
        await supertest(app.callback())
            .post(`/api/v1/shops/${shop.id}/items`)
            .send({ name: "MacBook Pro 16 2020", basePrice: 2000, price: 2500 })
            .set("Authorization", `Bearer ${staff?.token}`)
            .expect(200)
        const { body } = await supertest(app.callback())
            .get(`/api/v1/shops/${shop.id}/items`)
            .set("Authorization", `Bearer ${staff?.token}`)
            .expect(200)
        expect(body[0]).toMatchSnapshot(ignore)
    })
    it("Should hide basePrice for non shop staff", async () => {
        const app = await createApp({ mode: "production" })
        const { staff, shop } = await createShop(app, true)
        await supertest(app.callback())
            .post(`/api/v1/shops/${shop.id}/items`)
            .send({ name: "MacBook Pro 16 2020", basePrice: 2000, price: 2500 })
            .set("Authorization", `Bearer ${staff?.token}`)
            .expect(200)
        const { body } = await supertest(app.callback())
            .get(`/api/v1/shops/${shop.id}/items`)
            .set("Authorization", `Bearer ${userToken}`)
            .expect(200)
        expect(body[0]).toMatchSnapshot(ignore)
    })
})