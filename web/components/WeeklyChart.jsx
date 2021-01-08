import React from 'react'
import { Chart } from '../node_modules/frappe-charts/dist/frappe-charts.min.esm';
import fetchEntry from "../lib/fetchEntry"

export default class WeeklyChart extends React.Component{
  constructor(props){
    super(props)
    this.state ={data: 1}
    let data = {
      query: this.props.subreddits,
      sort: {occurences: -1},
      limit: 5,
      skip: 0
    }
    fetchEntry('weekly',data).then( (data) => {this.state={data: data};});
  }
  render(){
    const data = {
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

    const chart = new Chart("#chart", {  // or a DOM element,
                                                // new Chart() in case of ES6 module with above usage
        title: "My Awesome Chart",
        data: data,
        type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
        height: 250,
        colors: ['#7cd6fd', '#743ee2']
    })
    return(<> {this.state.data}</>)
  }
}