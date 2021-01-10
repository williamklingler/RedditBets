import React from 'react'
import { Chart } from '../node_modules/frappe-charts/dist/frappe-charts.min.esm';
import fetchEntry from "../lib/fetchEntry"

export default class WeeklyChart extends React.Component{
  constructor(props){
    super(props)
    this.state ={isLoaded: false}
  }
  componentDidMount(){
    let from_date = new Date();
    from_date.setDate(from_date.getDate()-1); // a day ago
    from_date = from_date.toISOString();
    let to_date = new Date().toISOString();
    let data = {
      query: {$and: [{$or: this.props.subreddits},
                    {sentiment: {$ne: 0}},
                    //{ticker: "TSLA"},
                    {createdAt: {"$gt": from_date, "$lt": to_date}}
                  ]},
      sort: {occurences: -1},
      limit: 10,
      skip: 0
    }
    fetchEntry('weekly',data).then( (data) => {this.setState({data: data, isLoaded: true});});
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

    const data1 = {
        labels: ["12am-3am", "3am-6pm", "6am-9am", "9am-12am",
            "12pm-3pm", "3pm-6pm", "6pm-9pm", "9am-12am"
        ],
        datasets: [
            {
                name: "Some Data", chartType: "bar",
                values: [25, 40, 30, 35, 8, 52, 17, -4]
            },
            {
                name: "Another Set", chartType: "line",
                values: [25, 50, -10, 15, 18, 32, 27, 14]
            }
        ]
    }

    const chart = new Chart('#'+ this.props.chartContainer, {  // or a DOM element,
                                                // new Chart() in case of ES6 module with above usage
        title: "Mentions this week",
        data: data,
        type: 'bar', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
        height: 250,
        colors: ['#7cd6fd', '#743ee2']
    })
  }
    return(<></>)
  }
}