import numpy as np
import pandas as pd
from quandl_secret import api_key
from reddit_secret import client_id, client_secret
from Sentiment import *

class CommentProcessor:
    #processes the comments to find sentences with stock tickers.
    def __init__(self, subreddit, sentimentInterval, dataSet):
        self.subreddit, self.sentimentInterval = subreddit, sentimentInterval
        self.subInstance = praw.Reddit(client_id=client_id, client_secret=client_secret, user_agent="testscript by u/spaceballcookie").subreddit(subreddit)
        self.df = pd.DataFrame(columns=['postID', 'ticker', 'sentiment', 'magnitude','subreddit', 'permalink', 'date', 'body'])
        self.sentiment = Sentiment()
        self.dataSet = dataSet

    def getData(self):
        return self.df

    def parseSubmissions(self, type, args):
        #print('self.subInstance.'+type+'('+','.join(args)+ ')\n')
        for submission in eval('self.subInstance.'+type+'('+','.join(args)+ ')'):
            submission.comments.replace_more(limit=0)
            self.parseComments(submission.comments)

    def parseComments(self, comments):
        for comment in comments:
            #analyzeComment(comment.body)
            if not comment.body.isupper():
                self.sentiment.setWeighting(comment.score)
                self.searchString(comment)
            self.parseComments(comment.replies)

    def searchString(self,comment):
        wordsUsed = []
        for word in comment.body.split():
            if len(word) >= 2 and len(word) <= 4:
                if word.isupper():
                    if self.queryContainsWord(word) > 0 and not word in wordsUsed:
                        wordsUsed.append(word)
                        self.analyzeComment(comment, word)

    def analyzeComment(self,comment, word):
            sentences = comment.body.split('.')
            averageScore = 0
            averageMagnitude = 0
            sentenceCount = 0

            for sentence in sentences:
                sentenceCount += 1
                if word in sentence:
                    sentiment_dict = self.sentiment.getSentiment(sentence, True)
                else:
                    sentiment_dict = self.sentiment.getSentiment(sentence, False)
                averageScore += sentiment_dict["Score"]
                averageMagnitude += sentiment_dict["Magnitude"]

            averageScore = averageScore / sentenceCount
            averageMagnitude = averageMagnitude / sentenceCount
            #sentiment_dict["Score"] = averageScore
            #sentiment_dict["Magnitude"] = averageMagnitude
            self.df.loc[len(self.df.index)] = [comment.id, word, averageScore, averageMagnitude,
                                               self.subreddit,comment.permalink, comment.created_utc, comment.body]

    def queryContainsWord(self, word):
        return len(self.dataSet.query('Symbol == @word'))
