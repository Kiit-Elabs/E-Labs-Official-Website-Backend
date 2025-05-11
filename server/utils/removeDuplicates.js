import mongoose from "mongoose";
import Member from "../models/member.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { connect } from "../db/connect.js";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Load the test members JSON file
const testMembers = JSON.parse(fs.readFileSync("../server/public/temp/test.members.json", "utf-8"));

async function deleteTestMembers() {
  try {
    // Extract member IDs and image URLs from the test members JSON
    const membersToDelete = testMembers.map((member) => ({
      id: member._id.$oid,
      imageUrl: member.image,
    }));

    for (const member of membersToDelete) {
      // Delete the member from the database
      const deletedMember = await Member.findByIdAndDelete(member.id);

      if (deletedMember) {
        console.log(`Deleted member with ID: ${member.id}`);

        // Delete the corresponding image from Cloudinary
        const publicId = member.imageUrl.split("/").pop().split(".")[0]; // Extract public ID from the image URL

        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted image from Cloudinary: ${member.imageUrl}`);
      } else {
        console.log(`Member with ID: ${member.id} not found in the database.`);
      }
    }

    console.log("Finished deleting test members.");
  } catch (error) {
    console.error("Error while deleting test members:", error);
  }
}

// Connect to the database and execute the function
connect()
  .then(() => {
    deleteTestMembers().finally(() => mongoose.disconnect());
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
