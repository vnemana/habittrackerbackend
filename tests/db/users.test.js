const users = require('../../db/users');
const mysql = require('mysql2/promise')

let usersObj = null;
beforeAll(() => {
    usersObj = new users();
})
afterAll( async () => {
    await usersObj.closeConnection();
});

describe("db getters", ()=> {
    test('user not found', async() => {
        let result = await usersObj.getByUserId('1');
        expect(result).toStrictEqual({'Error' : 'No user found for this id: 1'});
    });

    test('user found', async() => {
        let result = await usersObj.getByUserId('109921579247845694480');
        expect(result.length).toBe(1);
        expect(result[0]).toStrictEqual({
            "id":"109921579247845694480",
            "email":"venkat.nemana.dev@gmail.com",
            "first_name":"Venkat",
            "last_name":"Nemana",
            "full_name":"Venkat Nemana"})
    });
});

describe("db add", () => {
    beforeEach(async() => {
        await usersObj.deleteByUserId('2');
    });
    afterEach(async() => {
        await usersObj.deleteByUserId('2');
    });
    test('add with proper inputs works', async() => {
        let user = {
            sub:2,
            email:"venkat.nemana.dev@test.com",
            given_name:"Venkat",
            family_name:"Nemana",
            name:"Venkat Nemana"};
        await usersObj.add(user);
        let result = await usersObj.getByUserId('2');
        expect(result.length).toBe(1);
        expect(result[0]).toStrictEqual({
            "id":"2",
            "email":"venkat.nemana.dev@test.com",
            "first_name":"Venkat",
            "last_name": "Nemana",
            "full_name": "Venkat Nemana"
        });
    });
});

