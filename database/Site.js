import mongoose from "mongoose";

//setup Mongoose schema for Sites database
const SiteSchema = new mongoose.Schema(
  {
    siteId: {
      type: String,
      required: [true, "Please provide site id"],
    },
    siteName: {
      type: String,
      required: [true, "Please provide site name"],
    },
    latLng: {
      type: String,
      required: [true, "Please provide site lat-long"],
    },
    agencyCode: {
      type: String,
      required: [true, "Please provide agency code"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Site", SiteSchema);
