const Habits = require('../../db/habits');
const Users = require('../../db/users');
let HabitsObj = null;
let UsersObj = null;

beforeAll(() => {
    HabitsObj = new Habits();
    UsersObj = new Users();
})

afterAll(async () => {
    await HabitsObj.closeConnection();
    await UsersObj.closeConnection();
})

function assertHabitContent(result, expectedName, expectedUserId, expectedFrequency, expectedTimeOfDay, expectedIsActive) {
    expect (result[0]).toMatchObject({
        "name": expectedName,
        "user_id": expectedUserId,
        "frequency": expectedFrequency,
        "time_of_day": expectedTimeOfDay,
        "active": expectedIsActive===true?1:0
    });
}

function createUser(id, email, givenName, familyName, name) {
    return { sub: id,  email: email, given_name: givenName, family_name: familyName, name: name
    };
}

function createHabit(name, userId, frequency, timeOfDay, active) {
    return {
        name: name,
        userId: userId,
        frequency: frequency,
        timeOfDay: timeOfDay,
        active: active
    };
}

describe ("test add and get", () => {
    beforeEach(async() => {
        await HabitsObj.deleteByUserId('1');
        await UsersObj.deleteByUserId('1');
    });
    afterEach(async() => {
        await HabitsObj.deleteByUserId('1');
        await UsersObj.deleteByUserId('1');
    });
    test('add with proper input works', async() => {

        //First add the user
        let user = createUser(1, "venkat.nemana.dev@test.com", "Venkat", "Nemana", "Venkat Nemana");
        await UsersObj.add(user);

        //Now add the Habit
        let timeOfDayDate = new Date(2023, 3, 1, 12, 30, 30);
        let timeOfDay = timeOfDayDate.getHours() + ":" + timeOfDayDate.getMinutes() + ":" + timeOfDayDate.getSeconds();
        let habit = createHabit('Walking', '1', 'Daily',
            timeOfDay, true);
        await HabitsObj.add(habit);
        let result = await HabitsObj.getByUserId('1');
        expect(result.length).toBe(1);
        assertHabitContent(result, 'Walking', '1', 'Daily', timeOfDay,
            true);
    });

    test('update habit name', async() => {
        //First add the user
        let user = createUser(1, "venkat.nemana.dev@test.com", "Venkat", "Nemana", "Venkat Nemana");
        await UsersObj.add(user);

        //Now add the Habit
        let timeOfDayDate = new Date(2023, 3, 1, 12, 30, 30);
        let timeOfDay = timeOfDayDate.getHours() + ":" + timeOfDayDate.getMinutes() + ":" + timeOfDayDate.getSeconds();
        let habit = createHabit('Walking', '1', 'Daily',
            timeOfDay, true);
        await HabitsObj.add(habit);
        habit = createHabit('Walking', '1', 'Weekly', timeOfDay, true);
        let result = await HabitsObj.getByUserId('1');
        expect(result.length).toBe(1);
        await HabitsObj.update(habit, result[0].id);
        result = await HabitsObj.getByUserId('1');
        expect(result.length).toBe(1);
        assertHabitContent(result, 'Walking', '1', 'Weekly', timeOfDay, true);
    });
})