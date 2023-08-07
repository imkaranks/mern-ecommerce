const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, forgotPasswd, resetPasswd } = require('../controllers/user');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

router.route('/password/forgot').post(forgotPasswd);
router.route('/password/reset/:token').patch(resetPasswd);

module.exports = router;