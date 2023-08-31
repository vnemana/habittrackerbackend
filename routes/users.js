const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID="266691138498-229lt4vgiipq2khh3es66opdsvicehj0.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
const dbusers = require('../db/users')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add', async function (request, response) {

  //Add user details to the database
  try {
    //dbusers.add(request)
    console.log(request.body)
    response.send(request.body)

  } catch (error) {
    console.error('Error verifying Google token:', error);
    throw new Error('Invalid Google token');
  }

});
module.exports = router;
