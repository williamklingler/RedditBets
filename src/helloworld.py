import praw
import quandl
import datetime
from google.cloud import language_v1
from pymongo import MongoClient

connection = MongoClient("mongodb://127.0.0.1:27017/RedditBets")
db = connection.RedditBets

"""
# Instantiates a client
client = language_v1.LanguageServiceClient()

# The text to analyze
#text = u"buy $TSLA, it's going to the moon! I bet is will be at $420 per share by the end of the year. It will make me so much money"
text = u" In case there is a pullback, buy a few more shares."
document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)

# Detects the sentiment of the text
sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment

print("Text: {}".format(text))
print("Sentiment: {}, {}".format(sentiment.score, sentiment.magnitude))

#quandl.ApiConfig.api_key = "u2wYP-iZ_ryVXcNAAYRz"
#print(quandl.get("EIA/PET_RWTC_D"));
"""
""" Delete duplicate entries
cursor = list(db.entries.find())
for i in range(len(cursor)):
    if(i < len(cursor) - 1):
        #if(cursor[i]['permalink'] == cursor[i+1]['permalink'] and cursor[i]['ticker'] == cursor[i+1]['ticker']):
        #    id = cursor[i+1]['_id']
        #    db.entries.delete_one({'_id':id})
        print(i)
"""

"""
#reddit = praw.Reddit(client_id='U7vFhmfHkgSGBw',client_secret="Ci3yiYo2nyGew2LVT_o21lW1sHShYA", user_agent="testscript by u/spaceballcookie")
#print(reddit.read_only)
#wsb = reddit.subreddit("wallstreetbets");
#ring = praw.models.Comment(reddit, url="https://www.reddit.com/r/wallstreetbets/comments/krwgw9/emergency_american_politics_containment_zone/gie5dkz/");
#print(ring.body)

# Code for editing entries
cursor = db.entries.find()
for record in cursor:
    id = record['_id']
    date = record['createdAt']
    day = str(date.day).zfill(2) + "-" + str(date.month).zfill(2) + "-" + str(date.year)
    #print(day)
    db.entries.update_one({'_id':id}, { '$set': {'day':day} })
"""


"""
for submission in wsb.hot(limit = 4):
    # displays the submission title
    #print(submission.title)

    # displays the net upvotes of the submission
    #print(submission.score)

    # displays the url of the submission
    #print(submission.url)

    for comment in submission.comments.list():
        print(comment.body+'\n')
"""

"""
            buy $TSLA, it's going to the moon! I bet is will be at $420 per share by the end of the year. It will make me so much money
"""
