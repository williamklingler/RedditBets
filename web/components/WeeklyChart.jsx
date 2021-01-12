import React from 'react'
import { Chart } from '../node_modules/frappe-charts/dist/frappe-charts.min.esm';
import fetchEntry from "../lib/fetchEntry"
//import moment from 'moment'

export default class WeeklyChart extends React.Component{
  constructor(props){
    super(props)
    this.state ={isLoaded: false}
  }
  componentDidMount(){
    //console.log(moment().format())
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
      var data = {
          labels: [],
          datasets: [
              {
                  name: "mentions", chartType: "bar",
                  values: []
              }
          ]
      }
      this.state.data.map((entry) => {
        data.labels.push(entry.ticker);
        data.datasets[0].values.push(entry.occurences);
      })

    const chart = new Chart('#'+ this.props.chartContainer, {  // or a DOM element,
                                                // new Chart() in case of ES6 module with above usage
        title: "Mentions This Week",
        data: data,
        type: 'bar', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
        height: 250,
        colors: ['#7cd6fd', '#743ee2']
    })
  }
    return(<></>)
  }
}