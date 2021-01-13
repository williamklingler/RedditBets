import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../components/TabPanel'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';


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
  handleClick = (event) => {
    this.setState({anchorEl: event.currentTarget});
  };
  handleClose = () => {
    this.setState({anchorEl: null});
  }
  render(){
    return(
      <ThemeProvider theme={theme}>
        <Head>
          <title>Reddit Bets</title>
          <link rel="shortcut icon" href="/rocket.png" />
        </Head>
        <AppBar position="static">
          <Toolbar variant="dense" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}>
              <Tab label="Stocks"/>
              <Tab label="Crypto"/>
            </Tabs>
            <span>
              <IconButton onClick={this.handleClick} color="inherit">
                <InfoOutlinedIcon />
              </IconButton>
              <a href="https://github.com/williamklingler/RedditBets" target="_blank">
                <IconButton color="inherit">
                  <GitHubIcon />
                </IconButton>
              </a>
            </span>
            <Menu
              PaperProps={{
                style: {
                  width: 350,
                  padding: 15
                },
              }}
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              <Typography width={'30%'}> This project uses machine learning to track the sentiment surrounding popular stocks and cryptocurrencies on Reddit, letting you know whether you should buy or sell. Data is updated once daily. Uses data from r/wallstreetbets, r/investing, r/stocks, and r/CryptoCurrency. Sentiment indicates the overall emotion of a comment. Negative sentiment values indicate negative emotional text, whereas positive values indicate positive emotional text. Sentiment values that are greater than 0.15 or less than -0.15 are considered good indicators of emotion in a comment. Magnitude values indicate the how popular the comment was on Reddit. The Recent Mentions table has infinite scroll. </Typography>
            </Menu>
          </Toolbar>
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



