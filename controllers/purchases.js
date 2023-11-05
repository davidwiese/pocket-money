const Purchase = require("../models/Purchase");
const User = require("../models/User");

module.exports = {
  getPurchases: async (req, res) => {
    console.log(req.user);
    try {
      const purchaseItems = await Purchase.find({ userId: req.user.id });
      const goalLeft = await User.find({ userId: req.user.goal });
      res.render("purchases.ejs", {
        purchases: purchaseItems,
        goal: goalLeft,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createPurchase: async (req, res) => {
    try {
      await Purchase.create({
        purchase: req.body.purchaseItem,
        price: req.body.price,
        userId: req.user.id,
      });
      console.log("Purchase has been added!");
      res.redirect("/purchases");
    } catch (err) {
      console.log(err);
    }
  },
  deletePurchase: async (req, res) => {
    console.log(req.body.purchaseIdFromJSFile);
    try {
      await Purchase.findOneAndDelete({ _id: req.body.purchaseIdFromJSFile });
      console.log("Deleted Purchase");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
