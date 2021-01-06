import React from 'react'
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'

export default class TabPanel extends React.Component{
  render(){
    //console.log(this.props.data)
    if (this.props.value == this.props.index)
    return(
      <div>
        <Box p={3}> {this.props.subreddit} </Box>
        <List>
        {/*this.props.data.map((entry) => {
          return(
            <ListItem>
              {entry.ticker}
            </ListItem>
          )
        })*/}
        </List>
      </div>
    );
    else return(<></>)
  }
}



