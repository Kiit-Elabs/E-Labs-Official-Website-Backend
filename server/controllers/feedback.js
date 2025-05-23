import Feedback from "../models/feedback.js";
// import { User } from "../models/user.js";
// import { v4 as uuidv4 } from "uuid";

export async function addFeedback(req, res) {
  const { user, feedback } = req.body;

  if (!user || !feedback) {
    return res.status(400).json({ message: "Missing fields." });
  }

  try {
    // const user = await User.findById(userId);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found." });
    // }

    const newFeedback = new Feedback({
      // id: uuidv4(),
      user,
      feedback,
    });

    const data = await newFeedback.save();

    // user.feedback.push(newFeedback);
    // await user.save();

    res.status(200).json({
      message: "Feedback added successfully.",
      feedbackId: data._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add feedback" });
  }
}

export async function getFeedback(req, res) {
  try {
    const feedback = await Feedback.find();
    res.status(200).json({
      message: "Fetched feedback successfully.",
      feedback,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch feedback." });
  }
}
