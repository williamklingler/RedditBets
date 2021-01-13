import {Entry, mongoose} from "../../lib/entries"

export default async (req, res) => {
  const data = req.body;
  Entry.count(data.query)
    .exec((err, foundItems) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json(foundItems);
            }
          })
}