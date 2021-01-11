import React from 'react'
import { Chart } from '../node_modules/frappe-charts/dist/frappe-charts.min.esm';
import fetchEntry from "../lib/fetchEntry"

export default class dailyChart extends React.Component{
  constructor(props){
    super(props)
    this.state ={isLoaded: false}
  }
  componentDidMount(){
    let today = new Date();
    today = (today).toLocaleDateString().replaceAll('/','-');
    let data = {
      query: {$and: [{$or: [this.props.subreddits[0]]},
      {sentiment: {$ne: 0}},
      //{ticker: "TSLA"},
      {day: today}
    ]},
    sort: {occurences: -1},
    limit: 10,
    skip: 0
  }
  fetchEntry('weekly',data).then( (data) => {
    let symbols =[];
    data.map((entry) => {
      symbols.push(entry.ticker);
    })
    this.initialLoad(symbols);
  });
}
initialLoad = (symbols) => {
  let tickers = []
  symbols.map((symbol) => {
    tickers.push({ticker: symbol})
  })
  let today = new Date();
  today = (today).toLocaleDateString().replaceAll('/','-');
  let sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate()-7);
  sevenDaysAgo = sevenDaysAgo.toLocaleDateString().replaceAll('/','-');
  let data = {
    query: {$and: [{$or: [this.props.subreddits[0]]},
    {$or: tickers},
    {sentiment: {$ne: 0}},
    {day: {$lte: today, $gte: sevenDaysAgo}}
  ]},
    sort: {ticker: -1},
    limit: 70,
    skip: 0
  }
  fetchEntry('daily',data).then( (data) => {
    this.setState({data: data, isLoaded: true, symbols: symbols});
  });
}

render(){
  if(this.state.isLoaded){
    var dates = getArrayOfDates(this.state.data);
    var data = {
      labels: dates,
      datasets: []
    }
    this.state.symbols.map((symbol) => {
      let dataset = {
        name: symbol, chartType: "line",
        values: []
      }
      dates.map((date) => {
        let foundItem =  dailiesFind(symbol, date, this.state.data);
        if(foundItem == -1){
          dataset.values.push(0);
        }
        else{
          dataset.values.push(foundItem.occurences)
        }
      })
        data.datasets.push(dataset)
    })

    const chart = new Chart('#'+ this.props.chartContainer, {  // or a DOM element,
    // new Chart() in case of ES6 module with above usage
    title: "Daily Mentions of Top Symbols",
    data: data,
    type: 'bar', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
    height: 500,
  })
}
return(<></>)
}
}

function getArrayOfDates(data){
  let arr = [];
  data.forEach( (item, index) => {
    if (arr.indexOf(item.day) == -1){
      arr.push(item.day)
    }
  });
  for(var i = 0; i < arr.length; i++){
    arr[i] = arr[i].substring(6) + '-' + arr[i].substring(3,5) + '-' + arr[i].substring(0,2)
  }
  arr = arr.sort()
  for(var i = 0; i < arr.length; i++){
    arr[i] = arr[i].substring(8) + '-' + arr[i].substring(5,7) + '-' + arr[i].substring(0,4)
  }
  //console.log(arr);
  return arr;
}

//returns JSON object if found, -1 otherwise
function dailiesFind(ticker,date,data){
  for(var i = 0; i < data.length; i++){
    if(data[i].ticker == ticker && data[i].day == date) return data[i];
  }
  return -1;
}

  /*function findMostRecentDate(data){
  var mostRecent = new Date("January 1, 0001");
  var mostRecentString;
  //var mostRecentIndex = -1;
  data.forEach( (item, index) => {
  itemDate = new Date(Number(item.date.slice(6)), Number(item.date.substring(3,5)), Number(item.date.substring(0,2)))
  if(itemDate > mostRecent){
  mostRecentString = item.day;
  //mostRecentIndex = index;
  }
  });
  return mostRecent;
  }

  function findOldestDate(data){
  var oldest = "01-01-";
  //var mostRecentIndex = -1;
  data.forEach( (item, index) => {
  if(item.day > mostRecent){
  mostRecent = item.day;
  //mostRecentIndex = index;
  }
  });
  return mostRecent;
  }*/