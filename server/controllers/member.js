import { ObjectId } from "mongodb";
import Member from "../models/member.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { getPriority } from "../utils/util.js";

export async function addMember(req, res) {
  const {
    name,
    designation,
    domain,
    linkedin,
    github,
    instagram,
    email,
    phone,
  } = req.body;

  if (!name || !designation || !domain || !email || !phone) {
    return res.status(400).json({ error: "Missing fields !" });
  }

  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "File is required." });
  }

  try {
    const response = await uploadOnCloudinary(file.path);
    const uploadedFilePath = response?.url.replace(
      "/upload/",
      "/upload/ar_1:1,c_auto,g_auto/"
    );

    const member = new Member({
      designation,
      priority: getPriority(designation),
      domain,
      name,
      email,
      image: uploadedFilePath,
      phone: phone.toString(),
      linkedin,
      github,
      instagram,
    });

    const data = await member.save();

    res.status(200).json({
      message: "Member added successfully.",
      userId: data._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add member" });
  }
}

export async function getMembers(req, res) {
  try {
    const members = await Member.find().sort({ priority: -1 });
    res.status(200).json({
      message: "Fetched members successfully",
      members,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch members" });
  }
}

export async function getMemberDetails(req, res) {
  try {
    const member = await Member.findById(new ObjectId(req.body.userId));
    res.status(200).json({
      member,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch member" });
  }
}
