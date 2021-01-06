import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../components/TabPanel'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#20232a',
    }
  },
});

export async function getServerSideProps(context) {
  var wsb = await fetch('http://localhost:3000/api/entry/wallstreetbets')
  wsb = await wsb.json()
  var cc = await fetch('http://localhost:3000/api/entry/CryptoCurrency');
  cc = await cc.json()
  // Pass data to the page via props
  return { props: { data: {wsb: wsb, cc: cc} } };
}

export default class Index extends React.Component{
  constructor(props){
    super(props);
    this.state={value: 0};
  }
  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };
  componentDidMount(){
    let data = {
      query: {subreddit: "wallstreetbets", ticker: "TSLA"},
      sort: {_id: 1},
      limit: 1,
      skip: 125,
    }
    fetch('http://spaceballcookie.hopto.org:3000/api/entry', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
    .then(res => console.log(res));

  }
  render(){
    return(
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}>
            <Tab label="Stocks"/>
            <Tab label="Crypto"/>
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={1} subreddit="CryptoCurrency" data= {this.props.data.cc} />
        <TabPanel value={this.state.value} index={0} subreddit="wallstreetbets" data = {this.props.data.wsb}/>
      </ThemeProvider>

    )
  }
}



