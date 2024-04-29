const { User, Thought } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate("friends")
        .populate("thoughts");

      if (!user) {
        return res.status(404).json({ message: "No User with that ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const deletingUser = await User.findOne({ _id: req.params.userId });
      await Thought.deleteMany({
        username: deletingUser.username,
      });
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No user found with this ID." });
      }
      res.status(200).json({ message: "User successfully deleted." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .populate("friends")
        .populate("thoughts");

      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .populate("friends")
        .populate("thoughts");
      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { friends: req.params.userId } },
        { runValidators: true, new: true }
      )
        .populate("friends")
        .populate("thoughts");
      res.json({ user, friend });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .populate("friends")
        .populate("thoughts");
      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { runValidators: true, new: true }
      )
        .populate("friends")
        .populate("thoughts");
      res.json({ user, friend });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
