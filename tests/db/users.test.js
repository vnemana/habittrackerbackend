const Users = require('../../db/users');
let usersObj = null;
beforeAll(() => {
    usersObj = new Users();
})
afterAll( async () => {
    await usersObj.closeConnection();
});

function assertUserContent(result, expectedId, expectedEmail, expectedFirstName, expectedLastName, expectedName) {
    expect(result[0]).toStrictEqual({
        "id": expectedId,
        "email": expectedEmail,
        "first_name": expectedFirstName,
        "last_name": expectedLastName,
        "full_name": expectedName
    });
}

function createUser(id, email, givenName, familyName, name) {
    return { sub: id,  email: email, given_name: givenName, family_name: familyName, name: name
    };
}

describe("db getters", ()=> {
    test('user not found', async() => {
        let result = await usersObj.getByUserId('1');
        expect(result.length).toBe(0);
    });
});

describe("db add", () => {
    beforeAll(async() => {
        await usersObj.deleteByUserId('2');
    });
    afterEach(async() => {
        await usersObj.deleteByUserId('2');
    });
    test('add with proper inputs works', async() => {
        let user = createUser(2, "venkat.nemana.dev@test.com", "Venkat", "Nemana", "Venkat Nemana");
        await usersObj.add(user);
        let result = await usersObj.getByUserId('2');
        expect(result.length).toBe(1);
        assertUserContent(result, "2", "venkat.nemana.dev@test.com", "Venkat",
            "Nemana", "Venkat Nemana");
    });

    test('add duplicate data catches exception', async() => {
        let user = createUser(2, 'test@email.com', 'gName', 'fName', 'gName' +
            ' fName');
        await usersObj.add(user);
        const t = async () => {
            await usersObj.add(user);
        };
        let result = await usersObj.getByUserId('2');
        expect(result.length).toBe(1);
        assertUserContent(result, "2", "test@email.com", "gName",
            "fName", "gName fName");
    });
});

describe ("db update", () => {
    beforeAll(async() => {
        await usersObj.deleteByUserId('3');
    });
    afterAll(async() => {
        await usersObj.deleteByUserId('3');
    });
    test('add with proper inputs works', async() => {
        let user = createUser(3, "venkat.nemana.dev@test.com", "Venkat", "Nemana",
            "Venkat Nemana");
        await usersObj.add(user);
        user.given_name = "Pavithra";
        usersObj.update(user);
        let result = await usersObj.getByUserId('3');
        expect(result.length).toBe(1);
        assertUserContent(result, "3", "venkat.nemana.dev@test.com", "Pavithra",
            "Nemana", "Venkat Nemana");
    });
})
