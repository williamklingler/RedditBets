import {Entry, mongoose} from "../../../lib/entries"

export default async (req, res) => {
  let subreddit = req.query.subreddit;
  Entry.find({subreddit: subreddit}).sort({date: -1}).limit(20).exec((err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(foundItems);
    }
  })
}