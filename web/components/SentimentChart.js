import React from 'react'
import Chart from 'chart.js';
import fetchEntry from "../lib/fetchEntry"

export default class dailyChart extends React.Component{
  constructor(props){
    super(props)
    this.state ={isLoaded: false}
  }
  componentDidMount(){
    let today = new Date();
    today = (today).toLocaleDateString('en-GB').replaceAll('/','-');
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
    fetchEntry('weekly',data).then( (data) => {this.setState({data: data.reverse(), isLoaded: true});});
  }
  render(){
    if(this.state.isLoaded){
      let sentimentData = {
        labels: [],
        datasets: [{
          //barThickness: 20,
          label: 'sentiment',
          data: [],
          backgroundColor: [],
        }]
      }
      this.state.data.map((entry) => {
        sentimentData.labels.push(entry.ticker);
        sentimentData.datasets[0].data.push(entry.sentiment);
        if(entry.sentiment > 0){
          sentimentData.datasets[0].backgroundColor.push('rgba(3, 222, 46, 0.7)')
        }
        else if(entry.sentiment < 0){
          sentimentData.datasets[0].backgroundColor.push('rgba(240, 52, 52, 0.7)')
        }
        else{
          sentimentData.datasets[0].backgroundColor.push('rgba(184, 184, 184, 0.7)')
        }
      });
      const ctx = document.getElementById(this.props.chartContainer);
      new Chart(ctx, {
      type: "horizontalBar",
      data: sentimentData,
      options: {
        title: {
           display: true,
           text: 'Average Sentiment of Top Symbols This Week'
       }
      }
    });
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