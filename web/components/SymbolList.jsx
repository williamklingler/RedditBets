import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import fetchEntry from "../lib/fetchEntry"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LinkIcon from '@material-ui/icons/Link';
import AppBar from '@material-ui/core/AppBar';

export default class SymbolList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data: this.props.data,
      hasMore: true
    }
    this.fetchMoreData();
  }
  fetchMoreData = () => {
    if (this.state.data.length >= 1500) {
      this.setState({ hasMore: false });
      return;
    }
    let data = {
      query: {$and: [{$or: this.props.subreddits},{sentiment: {$ne: 0}}]},
      sort: {date: -1},
      limit: 20,
      skip: this.state.data.length+20,
    }
    fetchEntry('entry',data).then( (data) => {this.setState({data: this.state.data.concat(data)});});
  }
  render(){
    return (
      <Paper elevation={3} style={{width:this.props.width, marginLeft: 50, marginTop: 50}}>
        <Typography
          variant="h5"
          style={{backgroundColor: '#20232a', width: '100%', lineHeight: '7vh', color: 'white',
             height:'7vh', borderRadius: '10px 10px 0px 0px', textAlign: 'center'}}>
           Recent Mentions</Typography>
          <InfiniteScroll
            style={{width: '100%'}}
            dataLength={this.state.data.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMore}
            loader={
              <h4>Loading...</h4>
            }
            height={700}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>
                  Yay! You have seen it all
                </b>
              </p>
            }>
            <Table stickyHeader style={{ maxWidth: "100%", }}>
              <TableHead style={{backgroundColor:'white'}}>
                <TableRow>
                  <TableCell>
                  <Typography> Symbol </Typography>
                  </TableCell>
                  <TableCell variant ='head' align="right"> <Typography> Sentiment </Typography> </TableCell>
                  <TableCell align="center"> <Typography> Magnitude </Typography> </TableCell>
                  <TableCell align="center"> <Typography> Comment </Typography> </TableCell>
                  <TableCell align="center"> <Typography> Link </Typography> </TableCell>
                  <TableCell align="right"> <Typography> Date </Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map((entry) => (
                  <TableRow key={entry._id+this.props.subreddits[0].subreddit} style={{backgroundColor: 'rgba(71, 145, 219,' + Math.min(entry.magnitude/5,0.5) + ')'}}>
                    <TableCell component="th" scope="row" width="5%">
                      <Link color="secondary" target="_blank" href={this.props.redirect.replace("insert++here",entry.ticker)}>
                          <Typography fontWeight="fontWeightBold">{entry.ticker}</Typography>
                      </Link>
                    </TableCell>
                    {entry.sentiment > this.props.threshold &&
                      <TableCell
                        width="7%"
                        style={{backgroundColor: 'rgba(3, 222, 46, 0.7)'}}>
                          <Typography fontWeight="fontWeightBold">{(entry.sentiment+'').substring(0,7)}</Typography>
                      </TableCell>
                    }
                    {entry.sentiment < -this.props.threshold &&
                      <TableCell
                        width="7%"
                        style={{backgroundColor: 'rgba(240, 52, 52, 0.7)'}}>
                          <Typography fontWeight="fontWeightBold">{(entry.sentiment+'').substring(0,7)}</Typography>
                      </TableCell>
                    }
                    {Math.abs(entry.sentiment) < this.props.threshold &&
                      <TableCell
                        width="7%"
                        style={{backgroundColor: 'rgba(184, 184, 184, 0.7)'}}>
                        <Typography fontWeight="fontWeightBold">{(entry.sentiment+'').substring(0,7)}</Typography>
                      </TableCell>
                    }
                    <TableCell align="right" width="7%">
                      <Typography fontWeight="fontWeightBold">{(entry.magnitude+'').substring(0,7)}</Typography>
                    </TableCell>
                    <TableCell style={{wordWrap: 'break-word', maxWidth:10, fontSize: 12}}>
                        {entry.body}
                    </TableCell>
                    <TableCell width="10%">
                      <Link target="_blank" href={"https://www.reddit.com" + entry.permalink}>
                        <div style={{
                                      margin: 0,
                                      padding: 0,
                                      display: 'flex',
                                      alignItems: 'center',
                                      flexWrap: 'wrap'
                                  }}>
                            <LinkIcon style={{marginTop: 0,padding: 0, fontSize: 17}} />
                            <span>{'r/' + entry.subreddit}</span>
                      </div>
                      </Link>
                    </TableCell>
                    <TableCell align="right" width="15%">
                      {new Date(entry.date * 1000).toString().substring(0,15)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <style jsx>{`
              table tr th:nth-child(3){
                 width: 60%;
                 font
              }
            `}</style>
          </InfiniteScroll>
      </Paper>
    )
  }
}
