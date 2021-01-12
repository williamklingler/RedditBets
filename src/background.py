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

{'postID': 'ghmmf19', 'ticker':
'BTC', 'sentiment': -3.311369154188368e-09, 'magnitude': 0.34111111243565884, 'subreddit': 't5_2wlj3', 'permalink': '/r/CryptoCurrency/comments/knv0ev/inherent_problem_with_cyrpto/ghmmf19/'}
{'postID': 'ghmbhu7', 'ticker': 'DAI', 'sentiment': 0.8999999761581421, 'magnitude': 0.9099999761581421, 'subreddit': 't5_2wlj3', 'permalink': '/r/CryptoCurrency/comments/knt9hl/arthur_breitman_discusses_stable_coins/ghmbhu7/'}

"""
subredditList = ['wallstreetbets','stocks', 'CryptoCurrency']

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
