import Photo from "../models/events.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

async function addPhotos(req, res) {
  const { eventId } = req.body;

  if (!eventId) {
    return res.status(400).json({ error: "Missing fields !" });
  }

  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "File is required." });
  }

  try {
    const response = await uploadOnCloudinary(file.path);

    const photo = new Photo({
      event_id: eventId,
      url: response?.url,
    });

    const data = await photo.save();

    res.status(200).json({
      message: "Photo added successfully.",
      photoId: data._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add photo." });
  }
}

async function getPhotos(req, res) {
  try {
    const photos = await Photo.find();
    res.status(200).json({
      message: "Fetched photos successfully.",
      photos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch photos." });
  }
}

export { addPhotos, getPhotos };
