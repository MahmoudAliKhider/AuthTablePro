const express = require("express");
const router = express.Router();
const {
    googleAuthHandler,
    googleAuthCallbackHandler,
    signup,
    login,
} = require("../controllers/authController");

router.get("/google", googleAuthHandler);
router.get("/google/callback", googleAuthCallbackHandler);

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
