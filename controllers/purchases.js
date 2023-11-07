const Purchase = require("../models/Purchase");
const User = require("../models/User");

module.exports = {
  getPurchases: async (req, res) => {
    console.log(req.user);
    try {
      const purchaseItems = await Purchase.find({ userId: req.user.id });
      const user = await User.findOne({ _id: req.user.id }, "goal");
      const userGoal = user ? user.goal : 0;
      res.render("purchases.ejs", {
        purchases: purchaseItems,
        userGoal: userGoal,
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
  deleteAllPurchases: async (req, res) => {
    try {
      await Purchase.deleteMany({ userID: req.user.id });
      console.log("All purchases deleted");
      res.json("All purchases deleted");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to delete all purchases" });
    }
  },
  editGoal: async (req, res) => {
    const { newGoal } = req.body;
    try {
      const user = await User.findOne({ _id: req.user.id });
      user.goal = newGoal;
      await user.save();
      res.redirect("/purchases");
    } catch (err) {
      console.log(err);
    }
  },
};
