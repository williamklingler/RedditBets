from redditParser import CommentProcessor
from DBManager import dbManager
import pandas as pd
import matplotlib
import time
"""
cryptoParser = CommentProcessor('CryptoCurrency', 0, pd.read_csv("/home/sbc/RedditBets/data/cryptoSymbols.csv"))
cryptoParser.parseSubmissions('new',['limit=30'])
print(cryptoParser.getData().to_dict('records'))
"""
"""
df = pd.read_csv('/home/sbc/RedditBets/data/forexSymbols.csv')
df.columns = ['Symbol','a','b','Name']
df = df.drop(columns=['a','b'])


forexParser = CommentProcessor('Forex', 0, df)
forexParser.parseSubmissions('new', ['limit=30'])
print(forexParser.getData())

#print(pd.read_csv("nasdaq_screener.csv"))


wsbParser = CommentProcessor('wallstreetbets',0, pd.read_csv("/home/sbc/RedditBets/data/forexSymbols.csv"));
wsbParser.parseSubmissions('top', ['limit=1', 'time_filter="day"'])
data = wsbParser.getData()
print(data)
print(data.to_dict('records'))

{'postID': 'ghmmf19', 'ticker':
'BTC', 'sentiment': -3.311369154188368e-09, 'magnitude': 0.34111111243565884, 'subreddit': 't5_2wlj3', 'permalink': '/r/CryptoCurrency/comments/knv0ev/inherent_problem_with_cyrpto/ghmmf19/'}
{'postID': 'ghmbhu7', 'ticker': 'DAI', 'sentiment': 0.8999999761581421, 'magnitude': 0.9099999761581421, 'subreddit': 't5_2wlj3', 'permalink': '/r/CryptoCurrency/comments/knt9hl/arthur_breitman_discusses_stable_coins/ghmbhu7/'}

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
#subredditList = ['wallstreetbets','stocks', 'CryptoCurrency']
subredditList = ['stocks', 'CryptoCurrency']

for subreddit in subredditList:
    parser = None
    if (subreddit == 'CryptoCurrency'):
        parser = CommentProcessor('CryptoCurrency', 0, pd.read_csv("/home/sbc/RedditBets/data/cryptoSymbols.csv"))
    else:
        parser = CommentProcessor(subreddit,0, pd.read_csv("/home/sbc/RedditBets/data/nasdaq_screener.csv"));
    parser.parseSubmissions('top', ['limit=5', 'time_filter="day"'])
    parserData = parser.getData()
    dbmanager = dbManager(parserData)
    dbmanager.populateCollections()
    time.sleep(61)
    print("done" + subreddit)

#wsbParser = CommentProcessor('wallstreetbets',0, pd.read_csv("/home/sbc/RedditBets/data/nasdaq_screener.csv"));
#wsbParser.parseSubmissions('top', ['limit=20', 'time_filter="day"'])
#wsbData = wsbParser.getData()

#result = pd.concat(frames)
