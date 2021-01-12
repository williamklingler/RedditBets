# RedditBets 🚀✨
### *python, pandas, react, mongoDB, next.js*
#### *with the help of material.ui, chart.js, mongoose, frappe charts, Reddit API, Google Natural Langauge Processing API  and more.*
The ultimate sentiment analysis tool for stocks and cryptocurrencies on popular Reddit subreddits like **r/wallstreetbet, r/stocks, r/investing** and **r/CryptoCurrency**

Link: [RedditBets](http://redditbets.zapto.org)

## Structure
- `web` contains the next.js app with API routes and react pages. This app uses a mixture of server side and client side rendering.
- `src` contains all the python scripts used for finding Reddit comments and analyzing their sentiments and magnitudes. `background.py` gets run every night on the server.
- `data` contains all of the stock and crypto symbols.