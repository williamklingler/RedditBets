from pymongo import MongoClient
from redditParser import CommentProcessor
import datetime

import pandas as pd

connection = MongoClient("mongodb://127.0.0.1:27017/RedditBets");
db = connection.RedditBets

class dbManager:
    def __init__(self, data):
        self.data = data.to_dict('records')
        self.subreddit = self.data[0]['subreddit']
        self.entriesCollection = db.entries
        self.dailyTickersCollection = db.dailies
        self.weeklyTickersCollection = db.weeklies

    def populateCollections(self):
        self.fillCollection(self.entriesCollection, self.data)

        today = datetime.datetime.today()
        todayEnd = datetime.datetime(today.year,today.month,today.day, 23, 59, 59, 999999)
        todayBeginning = datetime.datetime(today.year,today.month,today.day, 0, 0, 0, 0)

        timeFrame = [todayBeginning, todayEnd]
        list = self.getTickerStats(self.entriesCollection, self.getUsedTickers(self.entriesCollection, timeFrame), timeFrame)
        self.fillCollection(self.dailyTickersCollection, list)

        weekBeginning = today - datetime.timedelta(days=7)
        weekBeginning = datetime.datetime(weekBeginning.year,weekBeginning.month,weekBeginning.day, 0,0,0,0)
        timeFrame = [weekBeginning, todayEnd]
        weekList = self.getTickerStats(self.entriesCollection, self.getUsedTickers(self.entriesCollection, timeFrame), timeFrame)
        self.fillCollection(self.weeklyTickersCollection, weekList)

    def fillCollection(self, dbcollection, listOfDict):
        for record in listOfDict:
            date = datetime.datetime.today()
            record['createdAt'] = date
            day = str(date.day).zfill(2) + "-" + str(date.month).zfill(2) + "-" + str(date.year)
            record['day'] = day
            dbcollection.insert_one(record)

    # Return a set containing every ticker from the last timeframe of entries
    def getUsedTickers(self, dbcollection, timeFrame):
        tickerSet = set()
        #cursor = dbcollection.find({'subreddit':self.subreddit})
        cursor = dbcollection.find({'subreddit':self.subreddit, "createdAt": {
                                       "$gt": timeFrame[0],
                                       "$lte": timeFrame[1] }})
        for record in cursor:
            tickerSet.add(record['ticker'])
        return tickerSet;

    # Given a set of tickers, find stats about each ticker in the entries collection
    def getTickerStats(self, dbcollection, tickerSet, timeFrame):
        statsList = []
        for ticker in tickerSet:
            averageScore = 0
            averageMagnitude = 0
            occurances = 0
            #cursor = dbcollection.find({"ticker":ticker, 'subreddit':self.subreddit})
            cursor = dbcollection.find({'ticker': ticker,'subreddit':self.subreddit, "createdAt": {
                                           "$gt": timeFrame[0],
                                           "$lte": timeFrame[1] }})
            for record in cursor:
                occurances += 1
                averageScore += record['sentiment']
                averageMagnitude += record['magnitude']
            averageScore = averageScore / occurances
            averageMagnitude = averageMagnitude / occurances
            statsList.append({'ticker':ticker,'occurences':occurances,'sentiment':averageScore,'magnitude':averageMagnitude, 'subreddit':self.subreddit})
        return statsList

    def emptyEntriesCollection(self):
        self.entriesCollection.delete_many({})

    def emptydailyTickersCollection(self):
        self.dailyTickersCollection.delete_many({})

    def emptyweeklyTickersCollection(self):
        self.weeklyTickersCollection.delete_many({})

    def printEntriesCollection(self, dict):
        cursor = self.entriesCollection.find(dict)
        for record in cursor:
            print(record)

    def printdailyTickerstCollection(self, dict):
        cursor = self.dailyTickersCollection.find(dict)
        for record in cursor:
            print(record)

    def printweeklyTickerstCollection(self, dict):
        cursor = self.weeklyTickersCollection.find(dict)
        for record in cursor:
            print(record)

"""
*Run this in main:

wsbParser = CommentProcessor('wallstreetbets',0, pd.read_csv("nasdaq_screener.csv"));
wsbParser.parseSubmissions('top', ['limit=1', 'time_filter="day"'])
data = wsbParser.getData()
#print(data)
#print(data.to_dict('records'))
#subreddit = data.to_dict('records')[0]['subreddit']

manager = dbManager(data)
manager.emptyEntriesCollection()          except for the delete lines!
manager.emptydailyTickersCollection()     not this
manager.emptyweeklyTickersCollection()    or this
manager.populateCollections()

*Run this to print and exchange {} with whatever you wanna quary

manager.printEntriesCollection({})
print("skrt skrt")
print("line break uwu")
manager.printdailyTickerstCollection({})
print("skrt skrt")
print("time for the weekly")
manager.printweeklyTickerstCollection({})
"""
