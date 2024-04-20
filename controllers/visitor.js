import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  timestamp: Date,
});

export const Visitor = mongoose.model("Visitor", visitorSchema);

export const visitorTracker = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const timestamp = new Date();

  try {
    const existingVisitor = await Visitor.findOne({ ip });
    if (!existingVisitor) {
      const visitor = new Visitor({ ip, userAgent, timestamp });
      await visitor.save();
      // console.log("New visitor saved:", visitor);
    }
    res.send("Hello, world!");
  } catch (error) {
    // console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
