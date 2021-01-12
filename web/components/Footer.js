import React from 'react'
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(2),
    },
    container: {
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
    }
}))

export default function Footer() {
    const classes = useStyles();
    return (
        <footer className="footer">
            <Container maxWidth="sm" className={classes.container}>
                <Divider variant="inset" />
                <Typography variant="h5" color="textSecondary" align="center" className={classes.margin}>
                    {'Made with '}<img src="/mongodb.png" height="24px" style={{ verticalAlign: "sub" }} />{',  '}<img src="/nextjs.png" height="24px" style={{ verticalAlign: "sub" }} />{',  '}<img src="/react.png" height="24px" style={{ verticalAlign: "sub" }} />{',  '}<img src="/nodejs.png" height="32px" style={{ verticalAlign: "sub" }} />, && ❤️
                    </Typography>
                <Typography variant="body2" color="textSecondary" align="center" className={classes.margin}> <br/> by Alex Axenti and William Klingler </Typography>
            </Container>
        </footer>
    );
}