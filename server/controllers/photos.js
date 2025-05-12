import Photo from "../models/photos.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

async function addPhotos(req, res) {
  const { eventId } = req.body;

  if (!eventId) {
    return res.status(400).json({ error: "Missing fields!" });
  }

  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({ error: "Files are required." });
  }

  try {
    files.forEach(async (file) => {
      const response = await uploadOnCloudinary(file.path);

      const photo = new Photo({
        event_id: eventId,
        url: response?.url,
      });

      await photo.save();
    });

    res.status(200).json({
      message: "Photos added successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add photos." });
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
