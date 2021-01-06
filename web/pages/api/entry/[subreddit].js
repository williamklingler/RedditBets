import {Entry, mongoose} from "../../../lib/entries"

export default async (req, res) => {
  let subreddit = req.query.subreddit;
  Entry.findOne({subreddit: subreddit}, (err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(foundItems);
    }
  })
}