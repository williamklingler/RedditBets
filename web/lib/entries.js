const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/RedditBets", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const entrySchema = {
  postID: String,
  ticker: String,
  sentiment: Number,
  magnitude: Number,
  subreddit: String,
  permalink: String,
  date: Number,
  createdAt: Date
};

let Entry;

try {
  // Trying to get the existing model to avoid OverwriteModelError
  Entry = mongoose.model("Entry");
} catch {
  Entry = mongoose.model("Entry", entrySchema);
}

const weeklySchema = {
  ticker: String,
  occurences: Number,
  sentiment: Number,
  magnitude: Number,
  subreddit: String,
  createdAt: Date
};

let Weekly;
try {
  // Trying to get the existing model to avoid OverwriteModelError
  Weekly = mongoose.model("Weekly");
} catch {
  Entry = mongoose.model("Weekly", weeklySchema);
}

export {Entry, Weekly, mongoose}