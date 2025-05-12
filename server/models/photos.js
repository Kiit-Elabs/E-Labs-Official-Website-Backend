import mongoose from "mongoose";

const photoScheme = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  event_id: {
    type: String,
    required: true,
  },
});

const MongooseSchema = mongoose.model("Photo", photoScheme);
MongooseSchema.collection.getIndexes().then((indexes) => {
  // console.log("Current indexes for Photo collection: ");
  // console.log(indexes);
});

export default MongooseSchema;
