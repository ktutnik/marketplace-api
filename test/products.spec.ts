import supertest from "supertest"
import createApp from "../src/app"
import { createShop, createUser } from "./helper"



describe("Products", () => {
    it("Should able to list all items globally", async () => {
        const app = await createApp({ mode: "production" })
        await createShop(app, {
            items: [
                { name: "MacBook Pro 16 2020", basePrice: 2000, price: 2500 },
                { name: "Li-Ion Battery", basePrice: 200, price: 250 },
                { name: "M3 SSD 1TB", basePrice: 700, price: 900 },
            ]
        })
        await createShop(app, {
            shop: { name: "Ali Shop" },
            owner: { email: "ali.owner@gmial.com" },
            staffs: [],
            items: [
                { name: "MacBook Pro 16 2020", basePrice: 2000, price: 2100 },
                { name: "Li-Ion Battery", basePrice: 200, price: 210 },
                { name: "M3 SSD 1TB", basePrice: 700, price: 800 },
            ]
        })
        const user = await createUser(app, { email: "jane.dane@gmail.com", name: "Jane Dane" })
        const {body} = await supertest(app.callback())
            .get("/api/v1/products")
            .set("Authorization", `Bearer ${user.token}`)
            .expect(200)
        expect(body).toMatchSnapshot()
    })
})