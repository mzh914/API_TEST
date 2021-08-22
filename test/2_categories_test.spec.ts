
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

let AdminToken = ''
let BasicToken = ''

test.group('test API categories controller', async () => {

    test('Ensure route login works for admin', async () => {
        await supertest(BASE_URL).post('/login')
            .field(
                {
                    email: "admin@terros.io",
                    password: "password"
                })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                AdminToken = res.body.token
            })
            .expect(200)
    })

    test('Ensure route create category work', async () => {
        await supertest(BASE_URL).post('/admin/categories')
        .auth(AdminToken, { type: 'bearer' })
            .field(
                {
                    title: "New Category",
                })
            .expect(200)
    })

    test('Ensure route update category work', async () => {
        await supertest(BASE_URL).put('/admin/categories/1')
        .auth(AdminToken, { type: 'bearer' })
            .field(
                {
                    title: "Category",
                })
            .expect(200)
    })

    test('Ensure new category created is a json object', async () => {
        await supertest(BASE_URL).post('/admin/categories')
        .auth(AdminToken, { type: 'bearer' })
            .field(
                {
                    title: "New Category",
                })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    })
})
