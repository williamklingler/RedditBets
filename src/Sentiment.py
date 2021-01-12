import praw
import quandl
from google.cloud import language_v1
import time

class Sentiment:
    def __init__(self):
        self.client = language_v1.LanguageServiceClient()
        self.weighting = 1
        self.counter = 0

    def getSentiment(self, text, containsTicker):
        self.counter += 1
        if(self.counter >= 550):
            self.counter = 0
            time.sleep(61)
        document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)
        sentiment = self.client.analyze_sentiment(request={'document': document}).document_sentiment
        sentiment_dict = {"Score":0, "Magnitude":0}
        sentiment_dict["Score"] = sentiment.score
        if (containsTicker):
            sentiment_dict["Magnitude"] = (sentiment.magnitude * 1.5) + self.weighting
        else:
            sentiment_dict["Magnitude"] = sentiment.magnitude + self.weighting
        return sentiment_dict

    def setWeighting(self, score):
        self.weighting = score / 100
