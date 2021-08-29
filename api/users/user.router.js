const  { createUser , getUserByUserId , getUser ,updateUsers, deleteUsers, getUserByUserEmail,getUserByUserEmail}  = require("./user.controller")

const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation");
router.post("/", checkToken, createUser)
router.get("/", checkToken, getUser);
router.get("/:id",checkToken,getUserByUserId);
router.patch("/",checkToken,updateUsers);
router.delete("/:id",checkToken,deleteUsers)
router.post("/login",login);

module.exports = router;