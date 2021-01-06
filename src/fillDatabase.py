from pymongo import MongoClient
from redditParser import CommentProcessor

import pandas as pd

connection = MongoClient("mongodb://127.0.0.1:3001/meteor");
db = connection.meteor

"""
def emptyCollection(dbcollection):
    dbcollection.delete_many({})

def fillCollection(dbcollection, listOfDict):
    for record in listOfDict:
        dbcollection.insert_one(record)

def printCollection(dbcollection, dict):
    cursor = dbcollection.find(dict)
    for record in cursor:
        print(record)

def getUsedTickers(dbcollection):
    tickerSet = set()
    cursor = dbcollection.find()
    for record in cursor:
        tickerSet.add(record['ticker'])
    return tickerSet;

def getTickerStats(dbcollection, tickerSet):
    statsList = []
    for ticker in tickerSet:
        averageScore = 0
        averageMagnitude = 0
        occurances = 0
        cursor = dbcollection.find({"ticker":ticker})
        for record in cursor:
            occurances += 1
            averageScore += record['sentiment']
            averageMagnitude += record['magnitude']
        averageScore = averageScore / occurances
        averageMagnitude = averageMagnitude / occurances
        statsList.append({'ticker':ticker,'occurances':occurances,'sentiment':averageScore,'magnitude':averageMagnitude, 'subreddit':subreddit})
    return statsList
"""
"""
Steps:
*Note: Also probably empty previous days collections
1. fillCollection with entries collection and parser data.to_dict('records')
2. tickerSet = getUsedTickers with entries collection
3. statsList = getTickerStats with entries collection and tickerSet
4. fillCollection with tickersCollection and statsList
"""
"""
fillCollection(entriesCollection,data.to_dict('records'))


tickerSet = getUsedTickers(entriesCollection)
statsList = getTickerStats(entriesCollection, tickerSet)

fillCollection(tickersCollection, statsList)
"""



#for stat in getTickerStats(entriesCollection,tickerSet):
#    print(stat)

class dbManager:
    def __init__(self, data):
        self.data = data.to_dict('records')
        self.subreddit = self.data[0]['subreddit']
        self.entriesCollection = db.Entries
        self.tickersCollection = db.Tickers

    def refreshDataAutomatically(self):
        self.fillCollection(self.entriesCollection, self.data)
        list = self.getTickerStats(self.entriesCollection, self.getUsedTickers(self.entriesCollection))
        self.fillCollection(self.tickersCollection, list)

    def emptyEntriesCollection(self):
        self.entriesCollection.delete_many({})

    def emptyTickersCollection(self):
        self.tickersCollection.delete_many({})

    def fillCollection(self, dbcollection, listOfDict):
        for record in listOfDict:
            dbcollection.insert_one(record)

    def getUsedTickers(self, dbcollection):
        tickerSet = set()
        cursor = dbcollection.find({'subreddit':self.subreddit})
        for record in cursor:
            tickerSet.add(record['ticker'])
        return tickerSet;

    def getTickerStats(self, dbcollection, tickerSet):
        statsList = []
        for ticker in tickerSet:
            averageScore = 0
            averageMagnitude = 0
            occurances = 0
            cursor = dbcollection.find({"ticker":ticker})
            for record in cursor:
                occurances += 1
                averageScore += record['sentiment']
                averageMagnitude += record['magnitude']
            averageScore = averageScore / occurances
            averageMagnitude = averageMagnitude / occurances
            statsList.append({'ticker':ticker,'occurances':occurances,'sentiment':averageScore,'magnitude':averageMagnitude, 'subreddit':self.subreddit})
        return statsList

    def printEntriesCollection(self, dict):
        cursor = self.entriesCollection.find(dict)
        for record in cursor:
            print(record)

    def printTickerstCollection(self, dict):
        cursor = self.tickersCollection.find(dict)
        for record in cursor:
            print(record)

wsbParser = CommentProcessor('wallstreetbets',0, pd.read_csv("nasdaq_screener.csv"));
wsbParser.parseSubmissions('top', ['limit=1', 'time_filter="day"'])
data = wsbParser.getData()
#print(data)
#print(data.to_dict('records'))
#subreddit = data.to_dict('records')[0]['subreddit']

database = dbManager(data)
database.emptyEntriesCollection()
database.emptyTickersCollection()
database.refreshDataAutomatically()
database.printEntriesCollection({})
print("skrt skrt")
print("line break uwu")
database.printTickerstCollection({})
