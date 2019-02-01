
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.75)'
    }
}
const backdrop = ({classes}) => <div className={classes.backdrop}></div>;

export default withStyles(styles)(backdrop)