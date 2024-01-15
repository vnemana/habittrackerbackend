const app = require('../../app');
const request = require('supertest');
const UsersDb = require('../../db/users');
const DbConnection = require('../../db/db_connection');

// Mock the Users class
jest.mock('../../db/users');
  
describe('UsersRoute API', () => {
    it('should respond with mock data', async() => {
        //Arrange
        const mockDbConnection = new DbConnection('users');
        jest.spyOn(mockDbConnection, 'getConnection').mockResolvedValue('mocked connection');
        jest.spyOn(mockDbConnection, 'closeConnection').mockResolvedValue('mocked close');

        UsersDb.prototype.getByUserId = jest.fn().mockResolvedValue('mocked result');
  
        //Act
        const response = await request(app).get('/users/1');

        //Assert
        expect(response.status).toBe(200);
        console.log(response.text);
        expect(response.text).toEqual('mocked result'); 
    });
});