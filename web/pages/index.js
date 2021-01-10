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
    },
    secondary: {
      main: '#4791db'
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
  render(){
    return(
      <ThemeProvider theme={theme}>
        <Head>
          <title>Reddit Bets</title>
          <link rel="shortcut icon" href="/rocket.png" />
        </Head>
        <AppBar position="static">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}>
            <Tab label="Stocks"/>
            <Tab label="Crypto"/>
          </Tabs>
        </AppBar>
        <TabPanel
          value={this.state.value}
          index={1}
          subreddits={[{subreddit: "CryptoCurrency"}]}
          data= {this.props.data.cc}
          threshold={0.15}
          redirect={"https://pro.coinbase.com/trade/insert++here-USD"}/>
        <TabPanel
          value={this.state.value}
          index={0}
          subreddits={[{subreddit: "wallstreetbets"}, {subreddit: "investing"}, {subreddit: "stocks"}]}
          data = {this.props.data.wsb}
          threshold={0.15}
          redirect={"https://www.marketwatch.com/investing/stock/"}/>
      </ThemeProvider>

    )
  }
}



