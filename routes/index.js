var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*get register page */
router.get('/register', function(req, res, next) {
  res.render('./register_login/register.ejs');
});

// registering
const app = express();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.render('./register_login/login.ejs');
  } catch (err) {
    res.send('Error registering user.');
  }
});

/* get login page */

app.get('/login', (req, res) => {
  res.render('./reister_loging/login.ejs');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username, password: password }).exec();
    
    if (user) {
      res.send('Login successful');
    } else {
      res.send('Invalid username or password');
    }
  } catch (err) {
    res.send('Error logging in');
  }
});


module.exports = router;
