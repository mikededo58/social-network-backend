const { User, Thought, Reaction } = require("../models");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).populate("reactions");

      if (!thought) {
        return res.status(404).json({ message: "No Thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const userThought = await User.findOneAndUpdate(
        { username: newThought.username },
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );
      console.log(newThought);
      if (!userThought) {
        res.status(404).json({
          message: "Thought created but no user could be found with provided!",
          unknowUsername: newThought.username,
        });
      }
      res.status(200).json({
        message: "Thought created successfully.",
        thought: newThought,
        user: userThought,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No user with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      ).populate("reactions");

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
