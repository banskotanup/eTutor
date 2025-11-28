const {Router} = require("express");
const contactRouter = Router();
const { submitContact } = require("../controllers/contact.controller");

contactRouter.post("/", submitContact);

module.exports = contactRouter;
