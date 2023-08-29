const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID="266691138498-229lt4vgiipq2khh3es66opdsvicehj0.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', async function (req, res) {

  res.send('login request')
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: CLIENT_ID, // Your Google Sign-In Client ID
    });
    const payload = ticket.getPayload();
    const userId = payload['sub']; // The unique Google user ID
    const email = payload['email']; // The user's email address
    // Further processing and user management logic
    return userId;
  } catch (error) {
    console.error('Error verifying Google token:', error);
    throw new Error('Invalid Google token');
  }

});
module.exports = router;
