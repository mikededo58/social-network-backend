const { User } = require("../models");

module.exports = {
  async addFriend(req, res) {
    try {
      console.log("You are adding a Friend");
      console.log(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: { friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No student found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.friendsId },
        { $pull: "user.friends" },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No student found with that ID :(" });
      }

      res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
