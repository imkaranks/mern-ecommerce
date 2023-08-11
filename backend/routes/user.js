const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, forgotPasswd, resetPasswd, getUserDetails, updatePassword, updateProfile } = require('../controllers/user');
const { isUserAuthenticated } = require('../middlewares/auth');

router
  .route('/register')
  .post(registerUser);
router
  .route('/login')
  .post(loginUser);
router
  .route('/logout')
  .post(logoutUser);

router
  .route('/password/forgot')
  .post(forgotPasswd);
router
  .route('/password/reset/:token')
  .patch(resetPasswd);
router
  .route('/password/update')
  .patch(isUserAuthenticated, updatePassword);

router
  .route('/me')
  .get(isUserAuthenticated, getUserDetails);
router
  .route('/me/update')
  .patch(isUserAuthenticated, updateProfile);

module.exports = router;