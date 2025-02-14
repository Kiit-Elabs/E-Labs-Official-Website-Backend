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
  try {
    const response = await uploadOnCloudinary(file.path);
    const uploadedFilePath = response?.url;

    const member = new Member({
      designation,
      priority: getPriority(designation),
      domain: domain.toLowerCase(),
      name,
      email,
      image: uploadedFilePath,
      linkedin,
      github,
      instagram,
    });

    await member.save();

    res.status(200).json({ status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add member" });
  }
}

export async function getMembers(req, res) {
  try {
    const members = await Member.find().sort({ priority: -1 });
    res.status(200).json({
      message: "fetched members successfully",
      members,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch members" });
  }
}
