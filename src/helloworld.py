import praw
import quandl
from google.cloud import language_v1

# Instantiates a client
client = language_v1.LanguageServiceClient()

# The text to analyze
#text = u"buy $TSLA, it's going to the moon! I bet is will be at $420 per share by the end of the year. It will make me so much money"
text = u"Stimmy checks to take GME to the moon. ell me if this is retarded enough for this group. We need 300K diamond handed members in this sub to use the $600 stimulus checks to buy GME shares. Assuming an average $20 price gives those 300K folks 30 shares each or 9M total. If I am not mistaken, the float is 50M. That effectively takes out about 20 percent of the float. That is 20 percent less for the shorts to borrow and 20 percent less for them to cover. Position: 200 GME shares at 16"
document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)

# Detects the sentiment of the text
sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment

print("Text: {}".format(text))
print("Sentiment: {}, {}".format(sentiment.score, sentiment.magnitude))


quandl.ApiConfig.api_key = "u2wYP-iZ_ryVXcNAAYRz"
print(quandl.get("EIA/PET_RWTC_D"));

reddit = praw.Reddit(client_id='U7vFhmfHkgSGBw',client_secret="Ci3yiYo2nyGew2LVT_o21lW1sHShYA", user_agent="testscript by u/spaceballcookie")
print(reddit.read_only)
wsb = reddit.subreddit("wallstreetbets");

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
            buy $TSLA, it's going to the moon! I bet is will be at $420 per share by the end of the year. It will make me so much money
"""