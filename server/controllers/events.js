import Event from "../models/events.js";
import { Registeration } from "../models/registration.js";
import { User } from "../models/user.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

async function addEvent(req, res) {
  const { name, desc, organizer, date_time, location } = req.body;

  if (!name || !desc || !organizer || !date_time || !location) {
    return res.status(400).json({ error: "Missing fields !" });
  }

  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "File is required." });
  }

  // try {
  //   const { title, description, startDate, endDate, time, createdBy } =
  //     req.body;
  //   if (
  //     !title ||
  //     !description ||
  //     !startDate ||
  //     !endDate ||
  //     !time ||
  //     !createdBy
  //   ) {
  //     return res.status(400).json({ error: "Missing fields !" });
  //   }

  //   var location = req.body.location;
  //   var localFilePath = req?.file?.path;
  //   if (localFilePath) {
  //     const response = await uploadOnCloudinary(localFilePath);
  //     localFilePath = response?.url;
  //   }

  //   location = JSON.parse(location);

  //   const event = new Event({
  //     title,
  //     description,
  //     startDate,
  //     endDate,
  //     location,
  //     createdBy,
  //     time,
  //     image: localFilePath || "",
  //   });
  //   await event.save();
  //   res.status(201).json({
  //     message: "Event added successfully",
  //     event,
  //   });
  // }

  try {
    const response = await uploadOnCloudinary(file.path);
    const uploadedFilePath = response?.url.replace(
      "/upload/",
      "/upload/ar_1:1,c_auto,g_auto,f_auto/"
    );

    const event = new Event({
      name,
      description: desc,
      organizer,
      image: uploadedFilePath,
      date_time,
      location,
    });

    const data = await event.save();

    res.status(200).json({
      message: "Event added successfully.",
      eventId: data._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add event." });
  }
}

async function getEvents(req, res) {
  try {
    const events = await Event.find();
    res.status(200).json({
      message: "Fetched events successfully.",
      events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events." });
  }
}

async function registerForEvent(req, res) {
  try {
    const { eventId, userId } = req.body;
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);
    const location = event.location;

    const registrationData = new Date();
    registrationData = registrationData.toISOString();

    if (!event || !user) {
      return res.status(404).json({ error: "Event or user not found" });
    }
    const registration = await Registeration.create({
      event: event._id,
      user: user._id,
      registrationData,
      status: "Registered",
      location,
    });
    res.status(201).json(registration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register for event" });
  }
}

export { addEvent, registerForEvent, getEvents };
