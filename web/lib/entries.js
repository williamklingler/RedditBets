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
  Weekly = mongoose.model("Weekly", weeklySchema);
}

const dailySchema = {
  ticker: String,
  occurences: Number,
  sentiment: Number,
  magnitude: Number,
  subreddit: String,
  createdAt: Date,
};

let Daily;
try {
  // Trying to get the existing model to avoid OverwriteModelError
  Daily = mongoose.model("Daily");
} catch {
  Daily = mongoose.model("Daily", dailySchema);
}

export {Entry, Weekly, Daily, mongoose}