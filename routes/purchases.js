const express = require("express");
const router = express.Router();
const purchasesController = require("../controllers/purchases");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, purchasesController.getPurchases);

router.post("/createPurchase", purchasesController.createPurchase);

router.post("/editGoal", purchasesController.editGoal);

router.delete("/deletePurchase", purchasesController.deletePurchase);

router.delete("deleteAll", purchasesController.deleteAllPurchases);

module.exports = router;
