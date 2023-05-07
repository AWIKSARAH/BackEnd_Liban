import Blog from "../models/blogModel.js";
import Event from "../models/eventModel.js";
import Place from "../models/placeModel.js";
import NewsLetter from "../models/newsletterModel.js";
import { Visitor } from "./visitor.js";

export const getCounts = async (req, res) => {
  try {
    const [
      blogCount,
      eventCount,
      PlaceCount,
      newsLetter,
      confirmedPlaceCount,
      unconfirmedPlaceCount,
      latestConfirmedPlaces,
      latestUnconfirmedPlaces,

      confirmedEventCount,
      unconfirmedEventCount,
      latestConfirmedEvents,
      latestUnconfirmedEvents,
    ] = await Promise.all([
      Blog.countDocuments(),
      Event.countDocuments(),
      Place.countDocuments(),
      NewsLetter.find({}),

      Place.countDocuments({ confirmation: true }),
      Place.countDocuments({ confirmation: false }),
      Place.find({ confirmation: true }).sort({ _id: -1 }).limit(4),

      Place.find({ confirmation: false }).sort({ _id: -1 }).limit(4),

      Event.countDocuments({ confirmation: true }),
      Event.countDocuments({ confirmation: false }),

      Event.find({ confirmation: true }).sort({ _id: -1 }).limit(4),

      Event.find({ confirmation: false }).sort({ _id: -1 }).limit(4),
    ]);

    res.status(200).json({
      blogCount,
      eventCount,
      PlaceCount,
      newsLetter,

      confirmedPlaceCount,
      unconfirmedPlaceCount,
      latestConfirmedPlaces,
      latestUnconfirmedPlaces,

      confirmedEventCount,
      unconfirmedEventCount,
      latestConfirmedEvents,
      latestUnconfirmedEvents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting counts" });
  }
};
