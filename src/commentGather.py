import praw
import pandas as pd
from fillDatabase import *
from Sentiment import *

reddit = praw.Reddit(client_id='6oj7hWOz_EHe7Q', \
                     client_secret='1hnjn5bioeL1T_wTbX9E40xQrsheDA', \
                     user_agent='testing', \
                     username='wrapperburner', \
                     password='popcorn123')

subreddit = reddit.subreddit('wallstreetbets')

submission = reddit.submission(url = "https://www.reddit.com/r/wallstreetbets/comments/knamo8/current_meme_portfolio/")
#for submission in subreddit.hot(limit=1):

def searchString(comment):
    for word in comment.split():
        if len(word) >= 2 and len(word) <= 4:
            if word.isupper():
                print(word)
                if queryWord(word) > 0:
                    postSentiment(comment, word)

def postSentiment(comment, word):
    comment = comment.split('.')
    averageScore = 0
    averageMagnitude = 0
    sentences = 0
    sentiment_dict = {}

    for sentence in comment:
        sentences += 1
        if word in sentence:
            sentiment_dict = sentiment.getSentiment(sentence, True)
        else:
            sentiment_dict = sentiment.getSentiment(sentence, False)
        averageScore += sentiment_dict["Score"]
        averageMagnitude += sentiment_dict["Magnitude"]

    averageScore = averageScore / sentences
    averageMagnitude = averageMagnitude / sentences
    sentiment_dict["Score"] = averageScore
    sentiment_dict["Magnitude"] = averageMagnitude
    print(sentiment_dict)
    return sentiment_dict


def recursiveReply(comment):
    #print(comment.body)
    sentiment.setWeighting(comment.score)
    searchString(comment.body)
    for reply in comment.replies:
        recursiveReply(reply)

sentiment = Sentiment()

for comment in submission.comments:
    recursiveReply(comment)
