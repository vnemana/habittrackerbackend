const dbUsers = require('../db/users')
let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/:userId', async function(req, response) {
  try {
    let usersObj = new dbUsers();
    response.send(await usersObj.getByUserId(req.params.userId));
  } catch (error) {
    console.log("Error in Get: ", error);
    return next(error);
  }
});

router.post('/add', async function (request, response) {

  //Add user details to the database
  try {
    let usersObj = new dbUsers();
    await usersObj.add(request.body);
    response.send(request.body);

  } catch (error) {
    console.error('Error verifying Google token:', error);
    throw new Error('Invalid Google token');
  }

});
module.exports = router;
