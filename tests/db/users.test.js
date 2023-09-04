const db = require('../../db/db_connection');
const usersTest = require('../../db/users')

afterAll( async () => {
    await db.closeConnection();
});

describe("db tests", ()=> {
    test.only('user not found', async() => {
        let result = await usersTest.get('1')
        expect(result).toStrictEqual({'Error' : 'No user found for this id: 1'});
    });
})

