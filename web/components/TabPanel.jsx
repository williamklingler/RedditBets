import React from 'react'
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import SymbolList from './SymbolList'
import WeeklyChart from './WeeklyChart'
import DailyChart from './DailyChart';

export default class TabPanel extends React.Component{
  constructor(props){
    super(props)
    this.state={isLoaded: false}
  }
  componentDidMount(){
    this.setState({isLoaded: true})
  }
  render(){
    //console.log(this.props.data)
    if (this.props.value == this.props.index)
    return(
      <div>
        <div id="weeklyChart" style={{width:'70%'}}></div>
        <div id="dailyChart" style={{width:'70%'}}></div>
        {this.state.isLoaded && <WeeklyChart chartContainer="weeklyChart" subreddits={this.props.subreddits}/>}
        {this.state.isLoaded && <DailyChart chartContainer="dailyChart" subreddits={this.props.subreddits}/>}
          <SymbolList threshold={this.props.threshold} redirect={this.props.redirect} subreddits={this.props.subreddits} data={this.props.data}/>
      </div>
    );
    else return(<></>)
  }
}



