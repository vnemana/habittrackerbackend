const dbUsers = require('../db/users')
let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/:userId', function(req, res) {
  dbUsers.get(req.params.userId, function(err, content) {
      if (err) {
        res.send({"Error": err.toString()});
      } else {
        if (!content || content.length === 0) {
          res.send({"Error":"No user found for this id: " + req.params.userId})
        } else {
          res.send(content[0]);
        }
      }
  });
});

router.post('/add', async function (request, response) {

  //Add user details to the database
  try {
    dbUsers.add(request.body)
    console.log(request.body)
    response.send(request.body)

  } catch (error) {
    console.error('Error verifying Google token:', error);
    throw new Error('Invalid Google token');
  }

});
module.exports = router;
